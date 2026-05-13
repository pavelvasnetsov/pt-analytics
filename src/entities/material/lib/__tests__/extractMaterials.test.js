import { describe, expect, it } from 'vitest';
import { extractMaterials } from '../extractMaterials.js';

describe('extractMaterials', () => {
  it('extracts course and assignment materials in header order', () => {
    const materials = extractMaterials([
      'Фамилия и имя',
      'Курс. Введение (Прогресс прохождения обучения (%))',
      'Задание. Итоговая работа (Набранный балл (%))'
    ]);

    expect(materials).toHaveLength(2);
    expect(materials[0]).toMatchObject({ title: 'Введение', type: 'course' });
    expect(materials[1]).toMatchObject({ title: 'Итоговая работа (балл %)', type: 'assignment' });
  });
});
