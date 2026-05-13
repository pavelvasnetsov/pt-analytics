import { parseDate } from '../../../shared/lib/date/parseDate.js';
import { parsePercent } from '../../../shared/lib/number/parsePercent.js';
import { parseDuration } from '../../../shared/lib/time/parseDuration.js';

function getCell(row, column) {
  return column ? row[column] : undefined;
}

function asText(value) {
  const text = String(value ?? '').trim();
  return text || null;
}

function parseDateField(row, columnMap, field, sourceRowIndex, warnings) {
  const parsed = parseDate(getCell(row, columnMap[field]));
  if (!parsed.valid && !parsed.empty) {
    warnings.push(`Строка ${sourceRowIndex}: не распознана дата в колонке "${columnMap[field]}"`);
  }
  return parsed.value;
}

export function normalizeReport(rawRows, columnMap) {
  const warnings = [];

  const listeners = rawRows.map((row, index) => {
    const sourceRowIndex = index + 2;
    const progressResult = parsePercent(getCell(row, columnMap.progress));
    if (!progressResult.valid && !progressResult.empty) {
      warnings.push(`Строка ${sourceRowIndex}: не распознан прогресс, значение принято за 0%`);
    }

    const accessOpenDateResult = parseDate(getCell(row, columnMap.accessOpenDate));
    const streamStartDateResult = parseDate(getCell(row, columnMap.streamStartDate));
    const accessOpenDate = accessOpenDateResult.value ?? streamStartDateResult.value;
    if (!accessOpenDateResult.valid && !accessOpenDateResult.empty) {
      warnings.push(`Строка ${sourceRowIndex}: не распознана дата открытия доступа`);
    }
    if (!accessOpenDate && !streamStartDateResult.valid && !streamStartDateResult.empty) {
      warnings.push(`Строка ${sourceRowIndex}: не распознана fallback-дата старта потока`);
    }

    const accessCloseDate = parseDateField(row, columnMap, 'accessCloseDate', sourceRowIndex, warnings);
    const startDate = parseDateField(row, columnMap, 'startDate', sourceRowIndex, warnings);
    const lastActivityDate = parseDateField(row, columnMap, 'lastActivityDate', sourceRowIndex, warnings);

    const duration = parseDuration(getCell(row, columnMap.spentTime), getCell(row, columnMap.spentTimeSeconds));
    if (!duration.valid && (getCell(row, columnMap.spentTime) || getCell(row, columnMap.spentTimeSeconds))) {
      warnings.push(`Строка ${sourceRowIndex}: не распознано затраченное время`);
    }

    return {
      rowId: `row-${sourceRowIndex}`,
      sourceRowIndex,
      fullName: asText(getCell(row, columnMap.fullName)) ?? '—',
      email: asText(getCell(row, columnMap.email)) ?? '—',
      stream: asText(getCell(row, columnMap.stream)) ?? '—',
      progress: progressResult.value,
      accessOpenDate,
      startDate,
      lastActivityDate,
      accessCloseDate,
      completionStatus: asText(getCell(row, columnMap.completionStatus)),
      programStatus: asText(getCell(row, columnMap.programStatus)),
      spentTimeSeconds: duration.value
    };
  });

  return { listeners, warnings };
}
