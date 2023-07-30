import { convertToISODateTime } from './reward'; // Replace 'your-module' with the actual path to the module containing the function

describe('convertToISODateTime', () => {
  it('should convert valid date string to ISO date', () => {
    const inputDate = '2023-07-30T12:34:56';
    const isoDateTime = convertToISODateTime(inputDate);
    expect(isoDateTime).toBe('2023-07-30T00:00:00.000Z');
  });

  it('should throw an error for non-string input', () => {
    const inputDate = new Date(); // You can use any non-string value here
    expect(() => convertToISODateTime(inputDate)).toThrowError(
      'Invalid input type. Expected a string representing a date.'
    );
  });
});
