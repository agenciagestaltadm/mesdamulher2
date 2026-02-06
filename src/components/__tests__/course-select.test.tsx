import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CourseSelect, type CourseSelectOption } from '@/components/CourseSelect';
import { TooltipProvider } from '@/components/ui/tooltip';

const options: CourseSelectOption[] = [
  {
    course_id: 'a',
    name: 'CRM para empresas',
    starts_at: '2026-03-02T21:00:00.000Z',
    capacity: 20,
    remaining: 12,
  },
  {
    course_id: 'b',
    name: 'Curso lotado',
    starts_at: '2026-03-03T21:00:00.000Z',
    capacity: 10,
    remaining: 0,
  },
];

function ControlledSelect() {
  const [value, setValue] = useState<string>('');
  return (
    <TooltipProvider>
      <CourseSelect value={value} onValueChange={setValue} options={options} />
    </TooltipProvider>
  );
}

describe('CourseSelect', () => {
  it('renderiza placeholder e abre lista de opções', () => {
    render(<ControlledSelect />);
    expect(screen.getByText('Selecione um curso')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('combobox', { name: /seleção de curso/i }));
    expect(screen.getByText('CRM para empresas')).toBeInTheDocument();
    expect(screen.getByText('Curso lotado')).toBeInTheDocument();
  });

  it('desabilita opções esgotadas', () => {
    render(<ControlledSelect />);
    fireEvent.click(screen.getByRole('combobox', { name: /seleção de curso/i }));

    const soldOut = screen.getByText('Curso lotado');
    const option = soldOut.closest('[role="option"]');
    expect(option).toHaveAttribute('aria-disabled', 'true');
  });

  it('seleciona opção disponível e exibe status', () => {
    render(<ControlledSelect />);
    fireEvent.click(screen.getByRole('combobox', { name: /seleção de curso/i }));
    fireEvent.click(screen.getByText('CRM para empresas'));

    expect(screen.getByText('Disponível')).toBeInTheDocument();
    expect(screen.getByText('12/20 vagas')).toBeInTheDocument();
  });
});

