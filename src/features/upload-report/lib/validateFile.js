export function validateFile(file) {
  if (!file) {
    return 'Файл не выбран';
  }

  if (!file.name.toLowerCase().endsWith('.xlsx')) {
    return 'Поддерживается Excel-файл .xlsx';
  }

  return null;
}
