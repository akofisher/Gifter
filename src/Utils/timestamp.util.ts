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
