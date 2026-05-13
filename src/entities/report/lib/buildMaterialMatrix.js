import { parsePercent } from '../../../shared/lib/number/parsePercent.js';

export function buildMaterialMatrix(rawRows, listeners, materials) {
  const rows = listeners.map((listener, index) => {
    const sourceRow = rawRows[index] ?? {};
    const values = materials.reduce((acc, material) => {
      const rawValue = sourceRow[material.sourceColumn];
      const parsed = parsePercent(rawValue);
      acc[material.id] = parsed.empty && rawValue === undefined ? null : parsed.value;
      return acc;
    }, {});

    return {
      rowId: listener.rowId,
      fullName: listener.fullName,
      email: listener.email,
      stream: listener.stream,
      values
    };
  });

  const averages = materials.reduce((acc, material) => {
    const numericValues = rows.map((row) => row.values[material.id]).filter((value) => Number.isFinite(value));
    acc[material.id] =
      numericValues.length === 0 ? null : numericValues.reduce((sum, value) => sum + value, 0) / numericValues.length;
    return acc;
  }, {});

  return { rows, averages };
}
