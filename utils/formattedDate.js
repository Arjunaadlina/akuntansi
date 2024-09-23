function formatDateString(inputDateString) {
  const inputDate = new Date(inputDateString);    

  const day = inputDate.getUTCDate();
  const month = inputDate.getUTCMonth() + 1; 
  const year = inputDate.getUTCFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  const formattedDateString = `${formattedDay}/${formattedMonth}/${year}`;
  return formattedDateString;
}

export {formatDateString}