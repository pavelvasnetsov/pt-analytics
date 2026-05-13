export const COLUMN_ALIASES = {
  fullName: ['Фамилия Имя', 'Фамилия и имя'],
  email: ['Email', 'Электронная почта'],
  stream: ['Поток', 'Название потока'],
  progress: ['Прогресс', 'Прогресс прохождения обучения (%)'],
  accessOpenDate: ['Дата открытия доступа', 'Время зачисления ученика в поток (UTC+03:00)'],
  streamStartDate: ['Время старта потока (UTC+03:00)'],
  startDate: ['Дата начала', 'Время начала обучения учеником (UTC+03:00)'],
  lastActivityDate: ['Последняя активность', 'Время последней активности (UTC+03:00)'],
  accessCloseDate: ['Дата закрытия', 'Время завершения потока (UTC+03:00)'],
  completionStatus: ['Статус прохождения'],
  programStatus: ['Статус завершения программы'],
  spentTime: ['Затраченное время', 'Общее затраченное время (чч:мм:сс)'],
  spentTimeSeconds: ['Общее затраченное время (сек)']
};

export const REQUIRED_FIELDS = ['fullName', 'email', 'stream', 'progress', 'accessOpenDate', 'accessCloseDate'];

export const REQUIRED_LABELS = {
  fullName: 'Фамилия Имя / Фамилия и имя',
  email: 'Email / Электронная почта',
  stream: 'Поток / Название потока',
  progress: 'Прогресс / Прогресс прохождения обучения (%)',
  accessOpenDate: 'Дата открытия доступа / Время зачисления ученика в поток (UTC+03:00)',
  accessCloseDate: 'Дата закрытия / Время завершения потока (UTC+03:00)'
};
