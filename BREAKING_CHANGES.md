BREAKING_CHANGES

- Card preview only is used for card view (viewStyle prop removed, theme prop added). Field preview can be used in table view.
- Deprecated stuff removed (getAsset, createReactClass, isFieldDuplicate, isFieldHidden)
- widget prop `isDisabled` renamed to `disabled`
- widget prop `isDuplicate` renamed to `duplicate`
- widget prop `isHidden` renamed to `hidden`
- useMediaInsert now requires collection to be passed
- media path changed from `string | string[]` to `{ path: string | string[], alt?: string }`
- Nested collections, meta config moved into nested config.

CHANGES

- Default styles are now provided in the preview frame. If you provide your own via `registerPreviewStyle`, then these default styles will not be included.

ADDED
- `forSingleList` - Allows for changing styles for single list items

TODO

- Docs on table columns
- Docs on field previews
- Re-add collection description OR document as breaking change
