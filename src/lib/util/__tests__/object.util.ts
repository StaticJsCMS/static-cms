import { set } from '../object.util';

describe('object.util', () => {
  describe('set', () => {
    describe('simple object', () => {
      test('existing key', () => {
        const testObject = {
          something: '12345',
          somethingElse: 5,
        };

        const updatedObject = set(testObject, 'something', '54321');

        expect(testObject.something).toBe('12345');
        expect(updatedObject.something).toBe('54321');
      });

      test('new key', () => {
        const testObject = {
          something: '12345',
          somethingElse: 5,
        } as {
          something: string;
          somethingElse: number;
          somethingNew?: string;
        };

        const updatedObject = set(testObject, 'somethingNew', 'aNewValue');

        expect(testObject.somethingNew).toBeUndefined();
        expect(updatedObject.somethingNew).toBe('aNewValue');
      });
    });

    describe('nested object', () => {
      test('existing key', () => {
        const testObject = {
          something: '12345',
          somethingElse: {
            nestedValue: 65,
          },
        };

        const updatedObject = set(testObject, 'somethingElse.nestedValue', 125);

        expect(testObject.somethingElse.nestedValue).toBe(65);
        expect(updatedObject.somethingElse.nestedValue).toBe(125);
      });

      test('new key', () => {
        const testObject = {
          something: '12345',
          somethingElse: {
            nestedValue: 65,
          },
        } as {
          something: string;
          somethingElse: {
            nestedValue: number;
          };
          somethingNew?: {
            nestedLayer: {
              anotherNestedLayer: string;
            };
          };
        };

        const updatedObject = set(
          testObject,
          'somethingNew.nestedLayer.anotherNestedLayer',
          'aNewNestedValue',
        );

        expect(testObject.somethingNew?.nestedLayer.anotherNestedLayer).toBeUndefined();
        expect(updatedObject.somethingNew?.nestedLayer.anotherNestedLayer).toBe('aNewNestedValue');
      });
    });

    describe('simple array', () => {
      test('existing key', () => {
        const testObject = {
          something: '12345',
          somethingElse: [6, 5, 3],
        };

        const updatedObject = set(testObject, 'somethingElse.1', 13);

        expect(updatedObject.somethingElse).toStrictEqual([6, 13, 3]);
      });

      test('new index should be ignored', () => {
        const testObject = {
          something: '12345',
          somethingElse: [6, 5, 3],
        };

        const updatedObject = set(testObject, 'somethingElse.3', 84);

        expect(updatedObject.somethingElse).toStrictEqual([6, 5, 3]);
      });
    });

    describe('object array', () => {
      test('existing key', () => {
        const testObject = {
          something: '12345',
          somethingElse: [
            { name: 'one', value: '11111' },
            { name: 'two', value: '22222' },
            { name: 'three', value: '33333' },
          ],
        };

        const updatedObject = set(testObject, 'somethingElse.1.value', 'aNewValue');

        expect(testObject.somethingElse[1].value).toBe('22222');
        expect(updatedObject.somethingElse[1].value).toBe('aNewValue');
      });

      test('new index should be ignored', () => {
        const testObject = {
          something: '12345',
          somethingElse: [
            { name: 'one', value: '11111' },
            { name: 'two', value: '22222' },
            { name: 'three', value: '33333' },
          ],
        };

        const updatedObject = set(testObject, 'somethingElse.3.value', 'valueToBeIgnored');

        expect(updatedObject.somethingElse.length).toBe(3);
      });

      test('new key inside existing index', () => {
        const testObject = {
          something: '12345',
          somethingElse: [
            { name: 'one', value: '11111' },
            { name: 'two', value: '22222' },
            { name: 'three', value: '33333' },
          ],
        } as {
          something: string;
          somethingElse: {
            name: string;
            value: string;
            newKey?: string;
          }[];
        };

        const updatedObject = set(testObject, 'somethingElse.1.newKey', 'newValueToBeAdded');

        expect(testObject.somethingElse[1].newKey).toBeUndefined();
        expect(updatedObject.somethingElse[1].newKey).toBe('newValueToBeAdded');
      });
    });
  });
});
