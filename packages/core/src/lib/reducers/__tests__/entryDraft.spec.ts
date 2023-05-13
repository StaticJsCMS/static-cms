import { DRAFT_CHANGE_FIELD, DRAFT_CREATE_EMPTY } from '@staticcms/core/constants';
import entryDraftReducer from '../entryDraft';
import { createMockEntry } from '@staticcms/test/data/entry.mock';

import type { I18nSettings, StringOrTextField } from '@staticcms/core/interface';
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
            isMeta: false,
          },
        });

        expect(state.entry?.data).toEqual({
          path1: {
            path2: 'newValue',
          },
        });
      });

      it('should update meta path with value', () => {
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
            isMeta: true,
          },
        });

        expect(state.entry?.meta).toEqual({
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
            isMeta: false,
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
            isMeta: false,
          },
        });

        expect(state.entry?.data).toEqual({
          path1: ['newValue1', 'newValue2Updated', 'newValue3'],
        });
      });

      describe('i18n', () => {
        it('duplicate values to other locales', () => {
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
              isMeta: false,
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

        it('should duplicate values to other locales for singleton list', () => {
          const field: StringOrTextField = {
            widget: 'string',
            name: 'stringInput',
            i18n: 'duplicate',
          };

          const i18n: I18nSettings = {
            locales: ['en', 'fr', 'es'],
            defaultLocale: 'en',
            currentLocale: 'en',
          };

          let state = entryDraftReducer(startState, {
            type: DRAFT_CHANGE_FIELD,
            payload: {
              path: 'path1',
              field,
              value: ['newValue1', 'newValue2', 'newValue3'],
              i18n,
              isMeta: false,
            },
          });

          expect(state.entry?.data).toEqual({
            path1: ['newValue1', 'newValue2', 'newValue3'],
          });

          expect(state.entry?.i18n).toEqual({
            fr: {
              data: {
                path1: ['newValue1', 'newValue2', 'newValue3'],
              },
            },
            es: {
              data: {
                path1: ['newValue1', 'newValue2', 'newValue3'],
              },
            },
          });

          state = entryDraftReducer(state, {
            type: DRAFT_CHANGE_FIELD,
            payload: {
              path: 'path1.1',
              field,
              value: 'newValue2Updated',
              i18n,
              isMeta: false,
            },
          });

          expect(state.entry?.data).toEqual({
            path1: ['newValue1', 'newValue2Updated', 'newValue3'],
          });

          expect(state.entry?.i18n).toEqual({
            fr: {
              data: {
                path1: ['newValue1', 'newValue2Updated', 'newValue3'],
              },
            },
            es: {
              data: {
                path1: ['newValue1', 'newValue2Updated', 'newValue3'],
              },
            },
          });
        });
      });
    });
  });
});
