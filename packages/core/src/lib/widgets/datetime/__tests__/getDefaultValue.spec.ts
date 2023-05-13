import { mockDateField, mockDateTimeField, mockTimeField } from '../../../../test/data/fields.mock';
import getDefaultValue from '../getDefaultValue';

describe('DateTime getDefaultValue', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: new Date(2023, 1, 12, 10, 15, 35, 0) });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('datetime', () => {
    it("should use today's date", () => {
      expect(getDefaultValue(undefined, mockDateTimeField)).toEqual('2023-02-12T10:15:35.000');
    });

    it('should use provided default', () => {
      expect(getDefaultValue('2022-06-18T14:30:01.000', mockDateTimeField)).toEqual(
        '2022-06-18T14:30:01.000',
      );
    });
  });

  describe('date', () => {
    it("should use today's date", () => {
      expect(getDefaultValue(undefined, mockDateField)).toEqual('2023-02-12');
    });

    it('should use provided default', () => {
      expect(getDefaultValue('2022-06-18', mockDateField)).toEqual('2022-06-18');
    });
  });

  describe('time', () => {
    it("should use today's date", () => {
      expect(getDefaultValue(undefined, mockTimeField)).toEqual('10:15:35.000');
    });

    it('should use provided default', () => {
      expect(getDefaultValue('14:30:01.000', mockTimeField)).toEqual('14:30:01.000');
    });
  });
});
