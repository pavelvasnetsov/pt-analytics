import { COLUMN_ALIASES, REQUIRED_FIELDS, REQUIRED_LABELS } from '../config/columnMappings.js';

export function normalizeHeader(header) {
  return String(header ?? '').replace(/\s+/g, ' ').trim();
}

export function buildColumnMap(headers) {
  const normalizedToOriginal = new Map(headers.map((header) => [normalizeHeader(header).toLowerCase(), header]));

  return Object.entries(COLUMN_ALIASES).reduce((map, [field, aliases]) => {
    const match = aliases.find((alias) => normalizedToOriginal.has(normalizeHeader(alias).toLowerCase()));
    if (match) {
      map[field] = normalizedToOriginal.get(normalizeHeader(match).toLowerCase());
    }
    return map;
  }, {});
}

export function validateRequiredColumns(headers) {
  const columnMap = buildColumnMap(headers);
  const missingFields = REQUIRED_FIELDS.filter((field) => {
    if (field === 'accessOpenDate') {
      return !columnMap.accessOpenDate && !columnMap.streamStartDate;
    }
    return !columnMap[field];
  });

  return {
    columnMap,
    missingFields,
    missingLabels: missingFields.map((field) => REQUIRED_LABELS[field] ?? field),
    valid: missingFields.length === 0
  };
}
