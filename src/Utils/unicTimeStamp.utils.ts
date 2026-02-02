import dayjs from 'dayjs';

export const parseTimestamp = (
  timestamp: number,
  format: string = 'DD/MM/YYYY HH:mm'
): string => {
  if (!timestamp) return '';
  return dayjs(timestamp * 1000).format(format);
};
