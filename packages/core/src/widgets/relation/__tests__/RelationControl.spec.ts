/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { configLoaded } from '@staticcms/core/actions/config';
import * as backend from '@staticcms/core/backend';
import { isNotNullish } from '@staticcms/core/lib/util/null.util';
import { store } from '@staticcms/core/store';
import { createMockCollection } from '@staticcms/test/data/collections.mock';
import { createMockConfig } from '@staticcms/test/data/config.mock';
import { createMockEntry } from '@staticcms/test/data/entry.mock';
import { mockRelationField } from '@staticcms/test/data/fields.mock';
import { createWidgetControlHarness } from '@staticcms/test/harnesses/widget.harness';
import RelationControl from '../RelationControl';

import type {
  Collection,
  Config,
  DateTimeField,
  Entry,
  ListField,
  ObjectField,
  RelationField,
  StringOrTextField,
} from '@staticcms/core/interface';

const dateField: DateTimeField = {
  widget: 'datetime',
  name: 'date',
};

const authorField: ObjectField = {
  widget: 'object',
  name: 'author',
  fields: [
    {
      widget: 'string',
      name: 'first',
    },
    {
      widget: 'string',
      name: 'last',
    },
  ],
};

const tagsField: ListField = {
  widget: 'list',
  name: 'tags',
};

const coAuthorsField: ListField = {
  widget: 'list',
  name: 'coAuthors',
  fields: [
    {
      widget: 'string',
      name: 'first',
    },
    {
      widget: 'string',
      name: 'last',
    },
  ],
};

const bodyField: StringOrTextField = {
  widget: 'text',
  name: 'body',
};

const searchCollection = createMockCollection(
  {
    name: 'posts',
  },
  dateField,
  authorField,
  coAuthorsField,
  tagsField,
  bodyField,
) as unknown as Collection;

const config = createMockConfig({
  collections: [searchCollection] as unknown as Collection[],
}) as unknown as Config<RelationField>;

describe(RelationControl.name, () => {
  const renderControl = createWidgetControlHarness(RelationControl, {
    field: mockRelationField,
    config,
  });
  let currentBackendSpy: jest.SpyInstance;
  let mockListAllEntries: jest.Mock;

  beforeEach(() => {
    store.dispatch(configLoaded(config as unknown as Config));

    const mockEntries: Entry[] = [
      createMockEntry({
        slug: 'post-1',
        data: {
          title: 'Post 1',
          date: '2023-02-01',
          tags: ['tagA', 'tagB', 'tagC'],
          author: {
            first: 'Bob',
            last: 'Frank',
          },
          coAuthors: [
            {
              first: 'Sam',
              last: 'Smith',
            },
          ],
          body: 'Post body text for Post 1',
        },
      }),
      createMockEntry({
        slug: 'post-2',
        data: {
          title: 'Post 2',
          date: '2023-02-03',
          tags: ['tagB', 'tagC'],
          author: {
            first: 'Sam',
            last: 'Smith',
          },
          coAuthors: [],
          body: 'Post body text for Post 2',
        },
      }),
      createMockEntry({
        slug: 'post-3',
        data: {
          title: 'Post 3',
          date: '2023-02-04',
          tags: ['tagC'],
          author: {
            first: 'Jane',
            last: 'Jones',
          },
          coAuthors: [
            {
              first: 'Sam',
              last: 'Smith',
            },
          ],
          body: 'Post body text for Post 3',
        },
      }),
      createMockEntry({
        slug: 'post-4',
        data: {
          title: 'Post 4',
          date: '2023-02-06',
          tags: ['tagB'],
          author: {
            first: 'Jane',
            last: 'Jones',
          },
          coAuthors: [],
          body: 'Post body text for Post 4',
        },
      }),
      createMockEntry({
        slug: 'post-5',
        data: {
          title: 'Post 5',
          date: '2023-02-08',
          tags: ['tagZ'],
          author: {
            first: 'Sam',
            last: 'Smith',
          },
          coAuthors: [
            {
              first: 'Jane',
              last: 'Jones',
            },
          ],
          body: 'Post body text for Post 5',
        },
      }),
      createMockEntry({
        slug: 'post-6',
        data: {
          title: 'Post 6',
          date: '2023-02-11',
          tags: ['tagA', 'tagM'],
          author: {
            first: 'Sam',
            last: 'Smith',
          },
          coAuthors: [
            {
              first: 'Jane',
              last: 'Jones',
            },
            {
              first: 'Bob',
              last: 'Frank',
            },
          ],
          body: 'Post body text for Post 6',
        },
      }),
    ];

    mockListAllEntries = jest.fn();
    mockListAllEntries.mockReturnValue(mockEntries);

    currentBackendSpy = jest.spyOn(backend, 'currentBackend');
    currentBackendSpy.mockReturnValue({
      listAllEntries: mockListAllEntries,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  interface RenderRelationControlOptions {
    expectedValue?: string;
    expectedText?: string;
  }

  const renderRelationControl = async (
    options?: Parameters<typeof renderControl>[0],
    relationOptions?: RenderRelationControlOptions,
  ): Promise<ReturnType<typeof renderControl>> => {
    const response = renderControl(options);

    expect(currentBackendSpy).toHaveBeenCalledWith(config);
    expect(mockListAllEntries).toHaveBeenCalledWith(searchCollection);

    const { expectedValue = '', expectedText } = relationOptions ?? {};

    if (isNotNullish(expectedText)) {
      const inputWrapper = response.getByTestId('autocomplete-input-wrapper');
      await waitFor(() => expect(inputWrapper.textContent).toBe(expectedText));
    } else {
      const input = response.getByTestId('autocomplete-input');
      await waitFor(() => expect(input).toHaveValue(expectedValue));
    }

    return response;
  };

  it('should render', async () => {
    const { getByTestId } = await renderRelationControl({ label: 'I am a label' });

    expect(getByTestId('autocomplete-input')).toBeInTheDocument();

    const label = getByTestId('label');
    expect(label.textContent).toBe('I am a label');
    expect(label).toHaveClass('text-slate-500');

    const field = getByTestId('field');
    expect(field).toHaveClass('group/active');

    const fieldWrapper = getByTestId('field-wrapper');
    expect(fieldWrapper).not.toHaveClass('mr-14');

    // Relation Widget uses text cursor
    expect(label).toHaveClass('cursor-text');
    expect(field).toHaveClass('cursor-text');

    // Relation Widget uses default label layout, without bottom padding on field
    expect(label).toHaveClass('px-3', 'pt-3');
    expect(field).not.toHaveClass('pb-3');
  });

  it('should render as single list item', async () => {
    const { getByTestId } = await renderRelationControl({
      label: 'I am a label',
      forSingleList: true,
    });

    expect(getByTestId('autocomplete-input')).toBeInTheDocument();

    const fieldWrapper = getByTestId('field-wrapper');
    expect(fieldWrapper).toHaveClass('mr-14');
  });

  it('should disable input if disabled', async () => {
    const { getByTestId } = await renderRelationControl({ disabled: true });

    const input = getByTestId('autocomplete-input');
    expect(input).toBeDisabled();
  });

  it('should show loading indicator while loading entries', async () => {
    const { getByTestId, queryByTestId } = renderControl({ value: 'Post 1' });

    const input = getByTestId('autocomplete-input');

    expect(input).toHaveValue('');

    getByTestId('relation-loading-indicator');

    await waitFor(() => expect(input).toHaveValue('Post 1 2023-02-01'));

    expect(queryByTestId('relation-loading-indicator')).not.toBeInTheDocument();
  });

  it('should stop showing loading indicator if no entries found', async () => {
    mockListAllEntries.mockReturnValue([]);
    const { getByTestId, queryByTestId } = renderControl({ value: 'Post 1' });

    const input = getByTestId('autocomplete-input');

    expect(input).toHaveValue('');

    getByTestId('relation-loading-indicator');

    await waitFor(() =>
      expect(queryByTestId('relation-loading-indicator')).not.toBeInTheDocument(),
    );
  });

  it('should not try to load entiries if search collection does not exist', () => {
    const field: RelationField = {
      label: 'Relation',
      name: 'relation',
      widget: 'relation',
      collection: 'bad-collection-name',
      display_fields: ['title', 'date'],
      search_fields: ['title', 'body'],
      value_field: 'title',
      multiple: true,
    };

    renderControl({ field });

    expect(currentBackendSpy).not.toHaveBeenCalledWith(config);
    expect(mockListAllEntries).not.toHaveBeenCalled();
  });

  it('should show error', async () => {
    const { getByTestId } = await renderRelationControl({
      errors: [{ type: 'error-type', message: 'i am an error' }],
    });

    const error = getByTestId('error');
    expect(error.textContent).toBe('i am an error');

    const field = getByTestId('field');
    expect(field).not.toHaveClass('group/active');

    const label = getByTestId('label');
    expect(label).toHaveClass('text-red-500');
  });

  it('should focus input on field click', async () => {
    const { getByTestId } = await renderRelationControl();

    const input = getByTestId('autocomplete-input');
    expect(input).not.toHaveFocus();

    const field = getByTestId('field');

    await act(async () => {
      await userEvent.click(field);
    });

    expect(input).toHaveFocus();
  });

  describe('single relation widget', () => {
    it('should only use prop value as initial value', async () => {
      const { rerender, getByTestId } = await renderRelationControl(
        { value: 'Post 1' },
        { expectedValue: 'Post 1 2023-02-01' },
      );

      rerender({ value: 'Post 2' });

      const input = getByTestId('autocomplete-input');
      expect(input).toHaveValue('Post 1 2023-02-01');
    });

    it('should use prop value exclusively if field is i18n duplicate', async () => {
      const { rerender, getByTestId } = await renderRelationControl(
        {
          field: { ...mockRelationField, i18n: 'duplicate' },
          duplicate: true,
          value: 'Post 1',
        },
        { expectedValue: 'Post 1 2023-02-01' },
      );

      rerender({ value: 'Post 2' });

      const input = getByTestId('autocomplete-input');
      expect(input).toHaveValue('Post 2 2023-02-03');
    });

    it('should filter results when text input changes', async () => {
      const {
        getByTestId,
        queryByTestId,
        props: { onChange },
      } = await renderRelationControl();

      const input = getByTestId('autocomplete-input');

      await act(async () => {
        await userEvent.type(input, 'P');
      });

      expect(onChange).not.toHaveBeenCalled();
      expect(input).toHaveValue('P');

      const option1 = 'autocomplete-option-Post 1';
      const option2 = 'autocomplete-option-Post 2';
      const option3 = 'autocomplete-option-Post 3';
      const option4 = 'autocomplete-option-Post 4';
      const option5 = 'autocomplete-option-Post 5';
      const option6 = 'autocomplete-option-Post 6';

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId(option3)).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId(option4)).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId(option5)).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId(option6)).toHaveClass('text-gray-900'); // Not selected

      await act(async () => {
        await userEvent.type(input, 'ost body text for Post 3');
      });

      expect(onChange).not.toHaveBeenCalled();
      expect(input).toHaveValue('Post body text for Post 3');

      await waitFor(() => expect(queryByTestId(option1)).not.toBeInTheDocument());
      expect(queryByTestId(option2)).not.toBeInTheDocument();
      expect(getByTestId(option3)).toHaveClass('text-gray-900'); // Not selected
      expect(queryByTestId(option4)).not.toBeInTheDocument();
      expect(queryByTestId(option5)).not.toBeInTheDocument();
      expect(queryByTestId(option6)).not.toBeInTheDocument();
    });

    it('objects options limit', async () => {
      const field: RelationField = {
        label: 'Relation',
        name: 'relation',
        widget: 'relation',
        collection: 'posts',
        display_fields: ['title', 'date'],
        search_fields: ['title', 'body'],
        value_field: 'title',
        options_length: 5,
      };

      const { getByTestId, queryByTestId } = await renderRelationControl({ field });

      const input = getByTestId('autocomplete-input');

      await act(async () => {
        await userEvent.type(input, 'P');
      });

      expect(input).toHaveValue('P');

      expect(getByTestId('autocomplete-option-Post 1')).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId('autocomplete-option-Post 2')).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId('autocomplete-option-Post 3')).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId('autocomplete-option-Post 4')).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId('autocomplete-option-Post 5')).toHaveClass('text-gray-900'); // Not selected
      expect(queryByTestId('autocomplete-option-Post 6')).not.toBeInTheDocument();
    });

    it('always shows selected options in results', async () => {
      const field: RelationField = {
        label: 'Relation',
        name: 'relation',
        widget: 'relation',
        collection: 'posts',
        display_fields: ['title', 'date'],
        search_fields: ['title', 'body'],
        value_field: 'title',
        options_length: 5,
      };

      const { getByTestId, queryByTestId } = await renderRelationControl(
        { field, value: 'Post 6' },
        { expectedValue: 'Post 6 2023-02-11' },
      );

      const input = getByTestId('autocomplete-input');

      await act(async () => {
        await userEvent.clear(input);
      });

      await act(async () => {
        await userEvent.type(input, 'P');
      });

      expect(getByTestId('autocomplete-option-Post 1')).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId('autocomplete-option-Post 2')).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId('autocomplete-option-Post 3')).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId('autocomplete-option-Post 4')).toHaveClass('text-gray-900'); // Not selected
      expect(queryByTestId('autocomplete-option-Post 5')).not.toBeInTheDocument();
      expect(getByTestId('autocomplete-option-Post 6')).toHaveClass('bg-gray-100', 'text-gray-900'); // Selected
    });

    it('should call onChange when option is selected', async () => {
      const {
        getByTestId,
        props: { onChange },
      } = await renderRelationControl();

      const input = getByTestId('autocomplete-input');

      await act(async () => {
        await userEvent.type(input, 'Post body text for Post 3');
      });

      expect(onChange).not.toHaveBeenCalled();

      const option3 = getByTestId('autocomplete-option-Post 3');

      await act(async () => {
        await userEvent.click(option3);
      });

      expect(onChange).toHaveBeenCalledWith('Post 3');
    });
  });

  describe('multi relation widget', () => {
    const mockMultiRelationField: RelationField = {
      label: 'Relation',
      name: 'relation',
      widget: 'relation',
      collection: 'posts',
      display_fields: ['title', 'date'],
      search_fields: ['title', 'body'],
      value_field: 'title',
      multiple: true,
    };

    it('should only use prop value as initial value', async () => {
      const { rerender, getByTestId } = await renderRelationControl(
        {
          field: mockMultiRelationField,
          value: ['Post 2', 'Post 3'],
        },
        { expectedText: 'Post 2 2023-02-03Post 3 2023-02-04' },
      );

      const input = getByTestId('autocomplete-input');
      expect(input).toHaveValue('');

      rerender({ value: ['Post 1'] });

      expect(input).toHaveValue('');

      const inputWrapper = getByTestId('autocomplete-input-wrapper');
      expect(inputWrapper.textContent).toBe('Post 2 2023-02-03Post 3 2023-02-04');
    });

    it('should use prop value exclusively if field is i18n duplicate', async () => {
      const { rerender, getByTestId } = await renderRelationControl(
        {
          field: { ...mockMultiRelationField, i18n: 'duplicate' },
          duplicate: true,
          value: ['Post 2', 'Post 3'],
        },
        { expectedText: 'Post 2 2023-02-03Post 3 2023-02-04' },
      );

      const input = getByTestId('autocomplete-input');
      expect(input).toHaveValue('');

      rerender({ value: ['Post 1'] });

      expect(input).toHaveValue('');

      const inputWrapper = getByTestId('autocomplete-input-wrapper');
      expect(inputWrapper.textContent).toBe('Post 1 2023-02-01');
    });

    it('should call onChange when text input changes', async () => {
      const {
        getByTestId,
        props: { onChange },
      } = await renderRelationControl({ field: mockMultiRelationField });

      const input = getByTestId('autocomplete-input');

      await act(async () => {
        await userEvent.type(input, 'P');
      });

      const option1 = 'autocomplete-option-Post 1';
      const option2 = 'autocomplete-option-Post 2';

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not Selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not Selected

      await act(async () => {
        await userEvent.click(getByTestId(option2));
      });

      expect(onChange).toHaveBeenLastCalledWith(['Post 2']);
      const inputWrapper = getByTestId('autocomplete-input-wrapper');
      expect(inputWrapper.textContent).toBe('Post 2 2023-02-03');

      await act(async () => {
        await userEvent.type(input, 'o');
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not Selected
      expect(getByTestId(option2)).toHaveClass('bg-gray-100', 'text-gray-900'); // Selected

      await act(async () => {
        await userEvent.click(getByTestId(option1));
      });

      expect(onChange).toHaveBeenLastCalledWith(['Post 2', 'Post 1']);
      expect(inputWrapper.textContent).toBe('Post 2 2023-02-03Post 1 2023-02-01');

      await act(async () => {
        await userEvent.type(input, 's');
      });

      expect(getByTestId(option1)).toHaveClass('bg-gray-100', 'text-gray-900'); // Selected
      expect(getByTestId(option2)).toHaveClass('bg-gray-100', 'text-gray-900'); // Selected

      await act(async () => {
        await userEvent.click(getByTestId(option2));
      });

      expect(onChange).toHaveBeenLastCalledWith(['Post 1']);
      expect(inputWrapper.textContent).toBe('Post 1 2023-02-01');

      await act(async () => {
        await userEvent.type(input, 't');
      });

      expect(getByTestId(option1)).toHaveClass('bg-gray-100', 'text-gray-900'); // Selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not Selected
    });
  });

  describe('parse options', () => {
    it('should default to valueField if displayFields is not set', async () => {
      const field: RelationField = {
        label: 'Relation',
        name: 'relation',
        widget: 'relation',
        collection: 'posts',
        search_fields: ['title', 'body'],
        value_field: 'title',
      };

      const { getByTestId, queryByTestId } = await renderRelationControl(
        {
          value: 'Post 1',
          field,
        },
        { expectedValue: 'Post 1' },
      );

      const input = getByTestId('autocomplete-input');

      await act(async () => {
        await userEvent.clear(input);
      });

      await act(async () => {
        await userEvent.type(input, 'Post body text for Post 3');
      });

      await waitFor(() => {
        expect(queryByTestId('autocomplete-option-Post 3')).toBeInTheDocument();
      });

      const option3 = getByTestId('autocomplete-option-Post 3');

      await act(async () => {
        await userEvent.click(option3);
      });

      expect(input).toHaveValue('Post 3');
    });

    describe('valueField', () => {
      it('should handle wildcards for list widgets', async () => {
        const field: RelationField = {
          label: 'Relation',
          name: 'relation',
          widget: 'relation',
          collection: 'posts',
          search_fields: ['title', 'body'],
          value_field: 'tags.*',
        };

        await renderRelationControl(
          {
            value: 'tagZ',
            field,
          },
          { expectedValue: 'tagZ' },
        );
      });

      it('should handle nested fields', async () => {
        const field: RelationField = {
          label: 'Relation',
          name: 'relation',
          widget: 'relation',
          collection: 'posts',
          search_fields: ['title', 'body'],
          value_field: 'author.last',
        };

        await renderRelationControl(
          {
            value: 'Smith',
            field,
          },
          { expectedValue: 'Smith' },
        );
      });

      it('should handle nested wildcard fields', async () => {
        const field: RelationField = {
          label: 'Relation',
          name: 'relation',
          widget: 'relation',
          collection: 'posts',
          search_fields: ['title', 'body'],
          value_field: 'coAuthors.*.first',
        };

        await renderRelationControl(
          {
            value: 'Sam',
            field,
          },
          { expectedValue: 'Sam' },
        );
      });

      it('should allow template variable', async () => {
        const field: RelationField = {
          label: 'Relation',
          name: 'relation',
          widget: 'relation',
          collection: 'posts',
          search_fields: ['title', 'body'],
          value_field: '{{title}} by {{author.first}} {{author.last}}',
        };

        await renderRelationControl(
          {
            value: 'Post 1 by Bob Frank',
            field,
          },
          { expectedValue: 'Post 1 by Bob Frank' },
        );
      });
    });

    describe('displayValues', () => {
      it('should handle wildcards for list widgets (selecting the first avaiable)', async () => {
        const field: RelationField = {
          label: 'Relation',
          name: 'relation',
          widget: 'relation',
          collection: 'posts',
          search_fields: ['title', 'body'],
          value_field: 'title',
          display_fields: ['tags.*'],
        };

        await renderRelationControl(
          {
            value: 'Post 1',
            field,
          },
          { expectedValue: 'tagA' },
        );
      });

      it('should handle nested fields', async () => {
        const field: RelationField = {
          label: 'Relation',
          name: 'relation',
          widget: 'relation',
          collection: 'posts',
          search_fields: ['title', 'body'],
          value_field: 'title',
          display_fields: ['author.last'],
        };

        await renderRelationControl(
          {
            value: 'Post 1',
            field,
          },
          { expectedValue: 'Frank' },
        );
      });

      it('should handle nested wildcard fields', async () => {
        const field: RelationField = {
          label: 'Relation',
          name: 'relation',
          widget: 'relation',
          collection: 'posts',
          search_fields: ['title', 'body'],
          value_field: 'title',
          display_fields: ['coAuthors.*.first'],
        };

        await renderRelationControl(
          {
            value: 'Post 1',
            field,
          },
          { expectedValue: 'Sam' },
        );
      });

      it('should match valueField and displayFields wildcard entries to each other', async () => {
        const field: RelationField = {
          label: 'Relation',
          name: 'relation',
          widget: 'relation',
          collection: 'posts',
          search_fields: ['title', 'body'],
          value_field: 'coAuthors.*.first',
          display_fields: ['coAuthors.*.last'],
        };

        await renderRelationControl(
          {
            value: 'Sam',
            field,
          },
          { expectedValue: 'Smith' },
        );
      });

      it('should default to value field if nested display field is not found on entry', async () => {
        const field: RelationField = {
          label: 'Relation',
          name: 'relation',
          widget: 'relation',
          collection: 'posts',
          search_fields: ['title', 'body'],
          value_field: 'title',
          display_fields: ['coAuthors.*.last'],
        };

        await renderRelationControl(
          {
            value: 'Post 2',
            field,
          },
          { expectedValue: 'Post 2' },
        );
      });

      it('should allow template variable', async () => {
        const field: RelationField = {
          label: 'Relation',
          name: 'relation',
          widget: 'relation',
          collection: 'posts',
          search_fields: ['title', 'body'],
          value_field: 'title',
          display_fields: ['{{title}} by {{author.first}} {{author.last}}'],
        };

        await renderRelationControl(
          {
            value: 'Post 1',
            field,
          },
          { expectedValue: 'Post 1 by Bob Frank' },
        );
      });
    });
  });
});
