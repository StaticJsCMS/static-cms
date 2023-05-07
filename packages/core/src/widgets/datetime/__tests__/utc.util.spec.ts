import { localToUTC, utcToLocal } from '../utc.util';

describe('utc util', () => {
  it('converts local (Hawaii time) to UTC', () => {
    expect(localToUTC(new Date(2023, 1, 12, 10, 5, 35)).toString()).toEqual(
      new Date(2023, 1, 12, 20, 5, 35).toString(),
    );
  });

  it('converts UTC to local (Hawaii time)', () => {
    expect(utcToLocal(new Date(2023, 1, 12, 15, 5, 35)).toString()).toEqual(
      new Date(2023, 1, 12, 5, 5, 35).toString(),
    );
  });
});
