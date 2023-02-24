import { DRAFT_CHANGE_FIELD, DRAFT_CREATE_EMPTY } from '@staticcms/core/constants';
import mockEntry from '@staticcms/core/lib/test-utils/mock-data/MockEntry';
import entryDraftReducer from '../entryDraft';

import type { EntryDraftState } from '../entryDraft';

describe('entryDraft', () => {
  describe('reducer', () => {
    describe('DRAFT_CHANGE_FIELD', () => {
      let startState: EntryDraftState;

      beforeEach(() => {
        startState = entryDraftReducer(undefined, {
          type: DRAFT_CREATE_EMPTY,
          payload: mockEntry,
        });
      });

      it('should update path with value', () => {
        const state = entryDraftReducer(startState, {
          type: DRAFT_CHANGE_FIELD,
          payload: {
            path: 'path1.path2',
            field: {
              widget: 'string',
              name: 'stringInput',
            },
            value: 'newValue',
            i18n: undefined,
          },
        });

        expect(state.entry?.data).toEqual({
          path1: {
            path2: 'newValue',
          },
        });
      });

      fit('duplicate values to other locales', () => {
        const state = entryDraftReducer(startState, {
          type: DRAFT_CHANGE_FIELD,
          payload: {
            path: 'path1.path2',
            field: {
              widget: 'string',
              name: 'stringInput',
              i18n: 'duplicate',
            },
            value: 'newValue',
            i18n: {
              locales: ['en', 'fr', 'es'],
              defaultLocale: 'en',
              currentLocale: 'en',
            },
          },
        });

        expect(state.entry?.data).toEqual({
          path1: {
            path2: 'newValue',
          },
        });

        expect(state.entry?.i18n).toEqual({
          fr: {
            data: {
              path1: {
                path2: 'newValue',
              },
            },
          },
          es: {
            data: {
              path1: {
                path2: 'newValue',
              },
            },
          },
        });
      });

      it('should update path with value for singleton list', () => {
        let state = entryDraftReducer(startState, {
          type: DRAFT_CHANGE_FIELD,
          payload: {
            path: 'path1',
            field: {
              widget: 'string',
              name: 'stringInput',
            },
            value: ['newValue1', 'newValue2', 'newValue3'],
            i18n: undefined,
          },
        });

        expect(state.entry?.data).toEqual({
          path1: ['newValue1', 'newValue2', 'newValue3'],
        });

        state = entryDraftReducer(state, {
          type: DRAFT_CHANGE_FIELD,
          payload: {
            path: 'path1.1',
            field: {
              widget: 'string',
              name: 'stringInput',
            },
            value: 'newValue2Updated',
            i18n: undefined,
          },
        });

        expect(state.entry?.data).toEqual({
          path1: ['newValue1', 'newValue2Updated', 'newValue3'],
        });
      });
    });
  });
});
