export const VIEW_STYLE_TABLE = 'table';
export const VIEW_STYLE_GRID = 'grid';

export type ViewStyle = typeof VIEW_STYLE_TABLE | typeof VIEW_STYLE_GRID;
export const VIEW_STYLES = [VIEW_STYLE_TABLE, VIEW_STYLE_GRID];

export const COLLECTION_CARD_WIDTH = 240;
export const COLLECTION_CARD_HEIGHT = 204;
export const COLLECTION_CARD_IMAGE_HEIGHT = 140;
export const COLLECTION_CARD_HEIGHT_WITHOUT_IMAGE = 56;
export const COLLECTION_CARD_DATE_HEIGHT = 24;
export const COLLECTION_CARD_MARGIN = 10;

export const EDITOR_SIZE_COMPACT = 'compact';
export const EDITOR_SIZE_HALF = 'half';

export type EditorSize = typeof EDITOR_SIZE_COMPACT | typeof EDITOR_SIZE_HALF;
export const EDITOR_SIZES = [EDITOR_SIZE_COMPACT, EDITOR_SIZE_HALF];
