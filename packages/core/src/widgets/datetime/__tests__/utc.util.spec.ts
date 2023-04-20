import { localToUTC, utcToLocal } from '../utc.util';

describe('utc util', () => {
  it('converts local (Hawaii time) to UTC', () => {
    expect(localToUTC(new Date(2023, 1, 12, 10, 5, 35)).toString()).toEqual(
      'Sun Feb 12 2023 20:05:35 GMT-1000 (Hawaii-Aleutian Standard Time)',
    );
  });

  it('converts UTC to local (Hawaii time)', () => {
    expect(utcToLocal(new Date(2023, 1, 12, 15, 5, 35)).toString()).toEqual(
      'Sun Feb 12 2023 05:05:35 GMT-1000 (Hawaii-Aleutian Standard Time)',
    );
  });
});
