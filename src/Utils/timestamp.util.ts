export const convertTimestampToDDMMYYYY = (unixTimestamp: any) => {
  const date = new Date(unixTimestamp * 1000);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day.toString();
  const formattedMonth = month < 10 ? `0${month}` : month.toString();

  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  return formattedDate;
};

export const formatDateDDMMYYYY = (
  input: string | number | Date | null | undefined
): string => {
  if (!input) return "";

  const date =
    typeof input === "number"
      ? new Date(input < 1e12 ? input * 1000 : input) // unix sec or ms
      : new Date(input);

  if (isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const toISODateOnly = (d: Date) => {
  // YYYY-MM-DD (no timezone shifting)
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const formatDDMMYYYY = (iso: string) => {
  if (!iso) return '';
  const [yyyy, mm, dd] = iso.split('-');
  return `${dd}/${mm}/${yyyy}`;
};

export const calcAge = (iso: string) => {
  if (!iso) return 0;
  const [y, m, d] = iso.split('-').map(Number);
  const birth = new Date(y, m - 1, d);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const mDiff = now.getMonth() - birth.getMonth();
  if (mDiff < 0 || (mDiff === 0 && now.getDate() < birth.getDate())) age--;
  return age;
};


