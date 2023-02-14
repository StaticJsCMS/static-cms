import { getTimezoneOffset, localToUTC, utcToLocal } from '../utc.util';

describe('utc util', () => {
  it('gets the timezone offset in milliseconds', () => {
    expect(getTimezoneOffset(new Date())).toBe(300);
  });

  it('converts local (EST) to UTC', () => {
    expect(localToUTC(new Date(2023, 1, 12, 10, 5, 35)).toString()).toEqual(
      'Sun Feb 12 2023 15:05:35 GMT-0500 (Eastern Standard Time)',
    );
  });

  it('converts UTC to local (EST)', () => {
    expect(utcToLocal(new Date(2023, 1, 12, 15, 5, 35)).toString()).toEqual(
      'Sun Feb 12 2023 10:05:35 GMT-0500 (Eastern Standard Time)',
    );
  });
});
