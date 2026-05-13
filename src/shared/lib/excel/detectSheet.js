import { validateRequiredColumns } from '../../../entities/report/lib/validateRequiredColumns.js';

export function rowsToObjects(rows) {
  const [headers = [], ...body] = rows;
  const normalizedHeaders = headers.map((header) => String(header ?? '').trim());

  return body
    .filter((row) => row.some((cell) => cell !== null && cell !== undefined && cell !== ''))
    .map((row) =>
      normalizedHeaders.reduce((acc, header, index) => {
        if (header) {
          acc[header] = row[index] ?? null;
        }
        return acc;
      }, {})
    );
}

export function detectSheet(workbook, XLSX) {
  const inspectedSheets = workbook.SheetNames.map((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null, raw: true });
    const headers = rows[0] ?? [];
    const validation = validateRequiredColumns(headers);

    return {
      sheetName,
      rows,
      headers,
      rawRows: rowsToObjects(rows),
      ...validation
    };
  });

  return inspectedSheets.find((sheet) => sheet.valid) ?? inspectedSheets[0] ?? null;
}
