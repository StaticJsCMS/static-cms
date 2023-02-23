import { DRAFT_CHANGE_FIELD, DRAFT_CREATE_EMPTY } from '@staticcms/core/constants';
import entryDraftReducer from '../entryDraft';
import { createMockEntry } from '@staticcms/test/data/entry.mock';

import type { EntryDraftState } from '../entryDraft';

describe('entryDraft', () => {
  describe('reducer', () => {
    describe('DRAFT_CHANGE_FIELD', () => {
      let startState: EntryDraftState;

      beforeEach(() => {
        startState = entryDraftReducer(undefined, {
          type: DRAFT_CREATE_EMPTY,
          payload: createMockEntry({ data: {} }),
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
