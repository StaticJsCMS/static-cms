import OptionUnstyled from '@mui/base/OptionUnstyled';
import SelectUnstyled from '@mui/base/SelectUnstyled';
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_PARAGRAPH,
  focusEditor,
} from '@udecode/plate';
import { someNode, toggleNodeType } from '@udecode/plate-core';
import React, { useCallback, useMemo, useState } from 'react';

import useDebounce from '@staticcms/core/lib/hooks/useDebounce';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';

import type { FC, FocusEvent, KeyboardEvent, MouseEvent } from 'react';

type Option = {
  value: string;
  label: string;
};

const types: Option[] = [
  {
    value: ELEMENT_H1,
    label: 'Heading 1',
  },
  {
    value: ELEMENT_H2,
    label: 'Heading 2',
  },
  {
    value: ELEMENT_H3,
    label: 'Heading 3',
  },
  {
    value: ELEMENT_H4,
    label: 'Heading 4',
  },
  {
    value: ELEMENT_H5,
    label: 'Heading 5',
  },
  {
    value: ELEMENT_H6,
    label: 'Heading 6',
  },
  {
    value: ELEMENT_PARAGRAPH,
    label: 'Paragraph',
  },
];

export interface FontTypeSelectProps {
  disabled?: boolean;
}

/**
 * Toolbar button to toggle the type of elements in selection.
 */
const FontTypeSelect: FC<FontTypeSelectProps> = ({ disabled = false }) => {
  const editor = useMdPlateEditorState();
  const [version, setVersion] = useState(0);

  const selection = useDebounce(editor?.selection, 100);

  const value = useMemo(() => {
    return (
      selection &&
      types.find(type => someNode(editor, { match: { type: type.value }, at: selection?.anchor }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, selection, version]);

  const handleChange = useCallback(
    (_event: KeyboardEvent | FocusEvent | MouseEvent | null, newValue: string | null) => {
      console.log('newValue', newValue);
      if (!newValue || value?.value === newValue) {
        return;
      }

      toggleNodeType(editor, {
        activeType: newValue,
      });

      setVersion(oldVersion => oldVersion + 1);

      setTimeout(() => {
        focusEditor(editor);
      });
    },
    [editor, value?.value],
  );

  return (
    <div
      className="
        w-28
        h-7
      "
    >
      <SelectUnstyled
        value={value?.value ?? ELEMENT_PARAGRAPH}
        onChange={handleChange}
        disabled={disabled}
        slotProps={{
          root: {
            className: `
              flex
              items-center
              text-sm
              font-medium
              relative
              px-1.5
              py-0.5
              w-full
              h-7
              border
              rounded-sm
              text-gray-900
              border-gray-200
              dark:text-gray-100
            `,
          },
          popper: {
            disablePortal: false,
            className: `
              max-h-40
              w-50
              overflow-auto
              rounded-md
              bg-white
              text-base
              shadow-lg
              ring-1
              ring-black
              ring-opacity-5
              focus:outline-none
              sm:text-sm
              dark:bg-slate-800
            `,
          },
        }}
      >
        {types.map(type => {
          const selected = (value?.value ?? ELEMENT_PARAGRAPH) === type.value;
          console.log(
            `[MARKDOWN] ${value?.value ?? ELEMENT_PARAGRAPH} === ${type.value}`,
            (value?.value ?? ELEMENT_PARAGRAPH) === type.value,
          );

          return (
            <OptionUnstyled
              key={type.value}
              value={type.value}
              slotProps={{
                root: {
                  className: classNames(
                    `
                      relative
                      select-none
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-blue-500
                      hover:text-white
                      dark:hover:bg-blue-500
                    `,
                    selected &&
                      `
                        bg-blue-500/25
                        dark:bg-blue-700/20
                      `,
                  ),
                },
              }}
            >
              <span
                className={classNames('block truncate', selected ? 'font-medium' : 'font-normal')}
              >
                {type.label}
              </span>
            </OptionUnstyled>
          );
        })}
      </SelectUnstyled>
    </div>
    // <div className="relative flex-inline w-28 h-7">
    //   <Listbox
    //     value={value?.value ?? ELEMENT_PARAGRAPH}
    //     onChange={handleChange}
    //     disabled={disabled}
    //   >
    //     <Listbox.Button
    //       className="
    //         flex
    //         items-center
    //         text-sm
    //         font-medium
    //         relative
    //         px-1.5
    //         py-0.5
    //         w-full
    //         h-7
    //         border
    //         rounded-sm
    //         text-gray-900
    //         border-gray-200
    //         dark:text-gray-100
    //       "
    //       data-testid="select-input"
    //     >
    //       {value?.label ?? 'Paragraph'}
    //       <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-0.5">
    //         <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
    //       </span>
    //     </Listbox.Button>
    //     <Transition
    //       as={Fragment}
    //       leave="transition ease-in duration-100"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0"
    //     >
    //       <Listbox.Options
    //         data-testid="select-options"
    //         className="
    //           absolute
    //           mt-1
    //           max-h-60
    //           w-50
    //           overflow-auto
    //           rounded-md
    //           bg-white
    //           py-1
    //           text-base
    //           shadow-lg
    //           ring-1
    //           ring-black
    //           ring-opacity-5
    //           focus:outline-none
    //           sm:text-sm
    //           z-40
    //         "
    //       >
    //         {types.map((type, index) => {
    //           const selected = (value?.value ?? ELEMENT_PARAGRAPH) === type.value;

    //           return (
    //             <Listbox.Option
    //               key={index}
    //               data-testid={`select-option-${type.value}`}
    //               className={classNames(
    //                 `
    //                   relative
    //                   select-none
    //                   py-2
    //                   pl-10
    //                   pr-4
    //                   cursor-pointer
    //                 `,
    //                 selected ? 'bg-gray-100 text-gray-900' : 'text-gray-900',
    //               )}
    //               value={type.value}
    //             >
    //               <span
    //                 className={classNames(
    //                   'block truncate',
    //                   selected ? 'font-medium' : 'font-normal',
    //                 )}
    //               >
    //                 {type.label}
    //               </span>
    //               {selected ? (
    //                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
    //                   <CheckIcon className="h-5 w-5" aria-hidden="true" />
    //                 </span>
    //               ) : null}
    //             </Listbox.Option>
    //           );
    //         })}
    //       </Listbox.Options>
    //     </Transition>
    //   </Listbox>
    // </div>
  );
};

export default FontTypeSelect;
