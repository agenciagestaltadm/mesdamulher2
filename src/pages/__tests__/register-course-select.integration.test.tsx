import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Register from '@/pages/Register';
import { TooltipProvider } from '@/components/ui/tooltip';

const rpcMock = vi.fn();

vi.mock('@/lib/supabase', () => {
  return {
    isSupabaseConfigured: true,
    requireSupabase: () => ({
      rpc: rpcMock,
      auth: {
        signInWithPassword: vi.fn(),
        signOut: vi.fn(),
        getSession: vi.fn(),
      },
    }),
  };
});

describe('Register + CourseSelect (integração)', () => {
  it('bloqueia confirmação quando o curso selecionado fica lotado em tempo real', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    rpcMock.mockImplementation(async (fnName: string) => {
      if (fnName === 'get_course_availability') {
        return {
          data: [
            {
              course_id: 'emp-1',
              name: 'CRM para empresas',
              category: 'Empreendedorismo',
              starts_at: '2026-03-02T21:00:00.000Z',
              capacity: 20,
              filled: 10,
              remaining: 10,
            },
          ],
          error: null,
        };
      }

      return { data: null, error: null };
    });

    render(
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <MemoryRouter initialEntries={['/registro']}>
            <Register />
          </MemoryRouter>
        </TooltipProvider>
      </QueryClientProvider>,
    );

    const combobox = await screen.findByRole('combobox', { name: /seleção de curso/i });
    fireEvent.click(combobox);
    fireEvent.click(await screen.findByText('CRM para empresas'));

    const submit = screen.getByRole('button', { name: /fazer inscrição/i });
    expect(submit).toBeEnabled();

    queryClient.setQueryData(['course_availability', 'empreendedorismo'], [
      {
        course_id: 'emp-1',
        name: 'CRM para empresas',
        category: 'Empreendedorismo',
        starts_at: '2026-03-02T21:00:00.000Z',
        capacity: 20,
        filled: 20,
        remaining: 0,
      },
    ]);

    await waitFor(() => {
      expect(screen.getByText(/este curso está lotado/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /curso lotado/i })).toBeDisabled();
    });
  });
});

