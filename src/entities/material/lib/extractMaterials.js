import { normalizeHeader } from '../../report/lib/validateRequiredColumns.js';

const COURSE_PROGRESS_SUFFIX = ' (Прогресс прохождения обучения (%))';
const ASSIGNMENT_SCORE_SUFFIX = ' (Набранный балл (%))';

export function extractMaterials(headers) {
  return headers.reduce((materials, header, index) => {
    const normalized = normalizeHeader(header);

    if (normalized.startsWith('Курс. ') && normalized.endsWith(COURSE_PROGRESS_SUFFIX)) {
      const title = normalized.slice('Курс. '.length, -COURSE_PROGRESS_SUFFIX.length).trim();
      materials.push({
        id: `material-${index}`,
        title,
        type: 'course',
        sourceColumn: header,
        valueKind: 'progressPercent',
        order: index
      });
    }

    if (normalized.startsWith('Задание. ') && normalized.endsWith(ASSIGNMENT_SCORE_SUFFIX)) {
      const title = normalized.slice('Задание. '.length, -ASSIGNMENT_SCORE_SUFFIX.length).trim();
      materials.push({
        id: `material-${index}`,
        title: `${title} (балл %)`,
        type: 'assignment',
        sourceColumn: header,
        valueKind: 'scorePercent',
        order: index
      });
    }

    return materials;
  }, []);
}
