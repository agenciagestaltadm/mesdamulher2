import { describe, expect, it } from 'vitest';
import * as XLSX from 'xlsx';

import { buildDisparoCsv, buildFullWorkbookArrayBuffer } from '@/lib/exports';

describe('exports', () => {
  it('gera CSV para disparo com cabeçalho e linhas', () => {
    const csv = buildDisparoCsv([
      { name: 'Ana', phone: '559494039847' },
      { name: 'Maria', phone: '5511912345678' },
    ]);
    expect(csv.startsWith('Name,Phone\r\n')).toBe(true);
    expect(csv).toContain('Ana,559494039847');
    expect(csv).toContain('Maria,5511912345678');
    expect(csv).not.toContain('"');
  });

  it('gera CSV com 10.000+ registros sem erro', () => {
    const rows = Array.from({ length: 10001 }, (_, idx) => ({ name: `User ${idx}`, phone: `55${idx}` }));
    const csv = buildDisparoCsv(rows);
    expect(csv.split('\r\n').length).toBeGreaterThan(10000);
  });

  it('gera workbook XLSX com cabeçalho e autofiltro', async () => {
    const buffer = buildFullWorkbookArrayBuffer([
      { createdAt: '2026-02-06T00:00:00.000Z', name: 'Ana', email: 'ana@x.com', phone: '5594', course: 'Curso A' },
      { createdAt: '2026-02-07T00:00:00.000Z', name: 'Maria', email: 'maria@x.com', phone: '5595', course: 'Curso B' },
    ]);

    const wb = XLSX.read(buffer, { type: 'array' });
    const ws = wb.Sheets[wb.SheetNames[0]];

    expect(ws).toBeTruthy();
    expect(ws['A1']?.v).toBe('Data');
    expect(ws['B1']?.v).toBe('Nome');
    expect(ws['C1']?.v).toBe('Email');
    expect(ws['D1']?.v).toBe('Telefone');
    expect(ws['E1']?.v).toBe('Curso');
    expect(ws['!autofilter']).toBeTruthy();
  });

  it('gera workbook XLSX com 10.000+ registros sem erro', () => {
    const rows = Array.from({ length: 10001 }, (_, idx) => ({
      createdAt: '2026-02-06T00:00:00.000Z',
      name: `User ${idx}`,
      email: `user${idx}@example.com`,
      phone: `55${idx}`.padEnd(12, '0'),
      course: 'Curso',
    }));

    const buffer = buildFullWorkbookArrayBuffer(rows);
    expect(buffer.byteLength).toBeGreaterThan(1000);
  });
});
