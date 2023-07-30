export const convertToISODateTime = (inputDate: FormDataEntryValue) => {
  if (typeof inputDate !== 'string') {
    throw new Error(
      'Invalid input type. Expected a string representing a date.'
    );
  }

  return convertStringToISO(inputDate);
};

const convertStringToISO = (inputDate: string) => {
  const dateObject = new Date(inputDate);
  dateObject.setUTCHours(0, 0, 0, 0); // Set the time to midnight in UTC
  const isoDateTime = dateObject.toISOString();
  return isoDateTime;
};
