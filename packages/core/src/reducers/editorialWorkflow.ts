/* eslint-disable no-case-declarations */
import {
  UNPUBLISHED_ENTRIES_REQUEST,
  UNPUBLISHED_ENTRIES_SUCCESS,
  UNPUBLISHED_ENTRY_DELETE_SUCCESS,
  UNPUBLISHED_ENTRY_PERSIST_FAILURE,
  UNPUBLISHED_ENTRY_PERSIST_REQUEST,
  UNPUBLISHED_ENTRY_PERSIST_SUCCESS,
  UNPUBLISHED_ENTRY_PUBLISH_FAILURE,
  UNPUBLISHED_ENTRY_PUBLISH_REQUEST,
  UNPUBLISHED_ENTRY_PUBLISH_SUCCESS,
  UNPUBLISHED_ENTRY_REDIRECT,
  UNPUBLISHED_ENTRY_REQUEST,
  UNPUBLISHED_ENTRY_STATUS_CHANGE_FAILURE,
  UNPUBLISHED_ENTRY_STATUS_CHANGE_REQUEST,
  UNPUBLISHED_ENTRY_STATUS_CHANGE_SUCCESS,
  UNPUBLISHED_ENTRY_SUCCESS,
} from '../constants';
import { isEmpty } from '../lib/util/string.util';

import type { EditorialWorkflowAction } from '../actions/editorialWorkflow';
import type { Entities } from '../interface';

export interface EditorialWorkflowState {
  isFetching: boolean;
  ids: string[];
  entities: Entities;
}

const initialState: EditorialWorkflowState = {
  isFetching: false,
  ids: [],
  entities: {},
};

function unpublishedEntries(
  state: EditorialWorkflowState = initialState,
  action: EditorialWorkflowAction,
): EditorialWorkflowState {
  switch (action.type) {
    case UNPUBLISHED_ENTRY_REQUEST: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [`${action.payload.collection}.${action.payload.slug}`]: {
            ...state.entities[`${action.payload.collection}.${action.payload.slug}`],
            isFetching: true,
          },
        },
      };
    }
    case UNPUBLISHED_ENTRY_PUBLISH_SUCCESS:
    case UNPUBLISHED_ENTRY_DELETE_SUCCESS:
    case UNPUBLISHED_ENTRY_REDIRECT:
      const newEntities = {
        ...state.entities,
      };

      delete newEntities[`${action.payload.collection}.${action.payload.slug}`];

      const newIds = [...state.ids];
      const index = newIds.indexOf(`${action.payload.collection}.${action.payload.slug}`);
      if (index >= 0) {
        newIds.splice(index, 1);
      }

      return {
        ...state,
        ids: newIds,
        entities: newEntities,
      };
    case UNPUBLISHED_ENTRY_SUCCESS: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [`${action.payload.collection}.${action.payload.entry.slug}`]: action.payload.entry,
        },
      };
    }
    case UNPUBLISHED_ENTRIES_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case UNPUBLISHED_ENTRIES_SUCCESS: {
      const newEntities = {
        ...state.entities,
      };

      action.payload.entries.forEach(entry => {
        newEntities[`${entry.collection}.${entry.slug}`] = {
          ...entry,
          isFetching: false,
        };
      });

      return {
        ...state,
        entities: newEntities,
        ids: action.payload.entries.map(entry => entry.slug),
      };
    }
    case UNPUBLISHED_ENTRY_PERSIST_REQUEST: {
      if (isEmpty(action.payload.slug)) {
        return state;
      }

      return {
        ...state,
        entities: {
          ...state.entities,
          [`${action.payload.collection}.${action.payload.slug}`]: {
            ...state.entities[`${action.payload.collection}.${action.payload.slug}`],
            isPersisting: true,
          },
        },
      };
    }
    case UNPUBLISHED_ENTRY_PERSIST_SUCCESS: {
      if (isEmpty(action.payload.slug)) {
        return state;
      }

      const newIds = [...state.ids];
      if (!newIds.includes(action.payload.entry.slug)) {
        newIds.push(action.payload.entry.slug);
      }

      // Update Optimistically
      return {
        ...state,
        ids: newIds,
        entities: {
          ...state.entities,
          [`${action.payload.collection}.${action.payload.entry.slug}`]: {
            ...action.payload.entry,
            isPersisting: false,
          },
        },
      };
    }
    case UNPUBLISHED_ENTRY_PERSIST_FAILURE: {
      if (isEmpty(action.payload.slug)) {
        return state;
      }

      return {
        ...state,
        entities: {
          ...state.entities,
          [`${action.payload.collection}.${action.payload.slug}`]: {
            ...state.entities[`${action.payload.collection}.${action.payload.slug}`],
            isPersisting: false,
          },
        },
      };
    }
    case UNPUBLISHED_ENTRY_STATUS_CHANGE_REQUEST: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [`${action.payload.collection}.${action.payload.slug}`]: {
            ...state.entities[`${action.payload.collection}.${action.payload.slug}`],
            isUpdatingStatus: true,
          },
        },
      };
    }
    case UNPUBLISHED_ENTRY_STATUS_CHANGE_SUCCESS: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [`${action.payload.collection}.${action.payload.slug}`]: {
            ...state.entities[`${action.payload.collection}.${action.payload.slug}`],
            status: action.payload.newStatus,
            isUpdatingStatus: false,
          },
        },
      };
    }
    case UNPUBLISHED_ENTRY_STATUS_CHANGE_FAILURE: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [`${action.payload.collection}.${action.payload.slug}`]: {
            ...state.entities[`${action.payload.collection}.${action.payload.slug}`],
            isUpdatingStatus: false,
          },
        },
      };
    }
    case UNPUBLISHED_ENTRY_PUBLISH_REQUEST: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [`${action.payload.collection}.${action.payload.slug}`]: {
            ...state.entities[`${action.payload.collection}.${action.payload.slug}`],
            isPublishing: true,
          },
        },
      };
    }
    case UNPUBLISHED_ENTRY_PUBLISH_FAILURE:
    default:
      return state;
  }
}

export default unpublishedEntries;
