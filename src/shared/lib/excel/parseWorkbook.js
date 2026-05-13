import * as XLSX from 'xlsx';
import { extractMaterials } from '../../../entities/material/lib/extractMaterials.js';
import { buildMaterialMatrix } from '../../../entities/report/lib/buildMaterialMatrix.js';
import { calculateKpis } from '../../../entities/report/lib/calculateKpis.js';
import { normalizeReport } from '../../../entities/report/lib/normalizeReport.js';
import { detectSheet } from './detectSheet.js';

export async function parseWorkbook(file) {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array', cellDates: true });
  const detected = detectSheet(workbook, XLSX);

  if (!detected || detected.rows.length === 0) {
    return {
      ok: false,
      errors: ['В файле не найдены данные'],
      warnings: []
    };
  }

  if (!detected.valid) {
    return {
      ok: false,
      errors: [`Не найдены обязательные колонки: ${detected.missingLabels.join(', ')}`],
      warnings: []
    };
  }

  const materials = extractMaterials(detected.headers);
  const normalized = normalizeReport(detected.rawRows, detected.columnMap);
  const materialMatrix = buildMaterialMatrix(detected.rawRows, normalized.listeners, materials);

  const warnings = [...normalized.warnings];
  if (materials.length === 0) {
    warnings.push('В файле не найдены колонки материалов для матрицы');
  } else if (materials.length < 15) {
    warnings.push(`Найдено материалов: ${materials.length}. В примере BRD ожидается 15.`);
  }

  return {
    ok: true,
    report: {
      fileMeta: {
        name: file.name,
        uploadedAt: new Date(),
        sheetName: detected.sheetName
      },
      rawRows: detected.rawRows,
      listeners: normalized.listeners,
      materials,
      materialMatrix,
      kpis: calculateKpis(normalized.listeners),
      warnings,
      errors: []
    }
  };
}
