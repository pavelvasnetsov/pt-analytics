import { describe, expect, it } from 'vitest';
import { calculateKpis } from '../calculateKpis.js';
import { buildMaterialMatrix } from '../buildMaterialMatrix.js';
import { normalizeReport } from '../normalizeReport.js';
import { validateRequiredColumns } from '../validateRequiredColumns.js';

const headers = [
  'Фамилия и имя',
  'Электронная почта',
  'Название потока',
  'Прогресс прохождения обучения (%)',
  'Время зачисления ученика в поток (UTC+03:00)',
  'Время завершения потока (UTC+03:00)',
  'Статус прохождения',
  'Общее затраченное время (чч:мм:сс)',
  'Курс. Введение (Прогресс прохождения обучения (%))'
];

describe('report business rules', () => {
  it('validates required columns', () => {
    expect(validateRequiredColumns(headers).valid).toBe(true);
    expect(validateRequiredColumns(headers.filter((header) => !header.includes('Прогресс прохождения'))).valid).toBe(false);
  });

  it('normalizes report and calculates kpis', () => {
    const { columnMap } = validateRequiredColumns(headers);
    const { listeners } = normalizeReport(
      [
        {
          'Фамилия и имя': 'Иван И.',
          'Электронная почта': 'ivan@example.test',
          'Название потока': 'PT',
          'Прогресс прохождения обучения (%)': '50%',
          'Время зачисления ученика в поток (UTC+03:00)': '01.05.2026 10:00',
          'Время завершения потока (UTC+03:00)': '30.06.2026 10:00',
          'Статус прохождения': 'Пройдено успешно',
          'Общее затраченное время (чч:мм:сс)': '02:00:00'
        }
      ],
      columnMap
    );

    expect(listeners[0].progress).toBe(50);
    expect(calculateKpis(listeners)).toMatchObject({
      totalListeners: 1,
      startedCount: 1,
      successfullyCompletedCount: 1,
      averageCompletionTimeSeconds: 7200
    });
  });

  it('builds material matrix averages', () => {
    const materials = [
      {
        id: 'intro',
        title: 'Введение',
        sourceColumn: 'Курс. Введение (Прогресс прохождения обучения (%))'
      }
    ];
    const listeners = [
      { rowId: 'row-2', fullName: 'А', email: 'a@test', stream: 'PT' },
      { rowId: 'row-3', fullName: 'Б', email: 'b@test', stream: 'PT' }
    ];
    const matrix = buildMaterialMatrix(
      [
        { 'Курс. Введение (Прогресс прохождения обучения (%))': 100 },
        { 'Курс. Введение (Прогресс прохождения обучения (%))': '' }
      ],
      listeners,
      materials
    );

    expect(matrix.rows[1].values.intro).toBe(0);
    expect(matrix.averages.intro).toBe(50);
  });
});
