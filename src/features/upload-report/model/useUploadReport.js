import { useState } from 'react';
import { parseWorkbook } from '../../../shared/lib/excel/parseWorkbook.js';
import { validateFile } from '../lib/validateFile.js';

export function useUploadReport() {
  const [report, setReport] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isParsing, setIsParsing] = useState(false);

  async function uploadFile(file) {
    const validationError = validateFile(file);
    setErrors([]);

    if (validationError) {
      setReport(null);
      setErrors([validationError]);
      return;
    }

    setIsParsing(true);
    setReport(null);

    try {
      const result = await parseWorkbook(file);
      if (!result.ok) {
        setErrors(result.errors);
        setReport(null);
        return;
      }

      setReport(result.report);
    } catch (error) {
      setReport(null);
      setErrors([`Не удалось прочитать Excel-файл: ${error.message}`]);
    } finally {
      setIsParsing(false);
    }
  }

  return {
    report,
    errors,
    isParsing,
    uploadFile,
    resetReport: () => {
      setReport(null);
      setErrors([]);
    }
  };
}
