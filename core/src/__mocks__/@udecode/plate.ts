const ELEMENT_BLOCKQUOTE = 'blockquote';
const ELEMENT_CODE_BLOCK = 'code_block';
const ELEMENT_H1 = 'h1';
const ELEMENT_H2 = 'h2';
const ELEMENT_H3 = 'h3';
const ELEMENT_H4 = 'h4';
const ELEMENT_H5 = 'h5';
const ELEMENT_H6 = 'h6';
const ELEMENT_IMAGE = 'img';
const ELEMENT_LI = 'li';
const ELEMENT_LIC = 'lic';
const ELEMENT_LINK = 'a';
const ELEMENT_OL = 'ol';
const ELEMENT_PARAGRAPH = 'p';
const ELEMENT_TABLE = 'table';
const ELEMENT_TD = 'td';
const ELEMENT_TH = 'th';
const ELEMENT_TR = 'tr';
const ELEMENT_UL = 'ul';

export {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_IMAGE,
  ELEMENT_LI,
  ELEMENT_LIC,
  ELEMENT_LINK,
  ELEMENT_OL,
  ELEMENT_PARAGRAPH,
  ELEMENT_TABLE,
  ELEMENT_TD,
  ELEMENT_TH,
  ELEMENT_TR,
  ELEMENT_UL,
};

export const createPlateEditor = jest.fn();
export const createPluginFactory = jest.fn();
export const createPlugins = jest.fn();
export const createTEditor = jest.fn();
export const getTEditor = jest.fn();
export const useEditorRef = jest.fn();
export const useEditorState = jest.fn();
export const usePlateActions = jest.fn();
export const usePlateEditorRef = jest.fn();
export const usePlateEditorState = jest.fn();
export const usePlateSelectors = jest.fn();
export const usePlateStates = jest.fn();
export const findNodePath = jest.fn();
export const getNode = jest.fn();
export const getParentNode = jest.fn();
export const getSelectionBoundingClientRect = jest.fn();
export const getSelectionText = jest.fn();
export const isElement = jest.fn();
export const isElementEmpty = jest.fn();
export const isSelectionExpanded = jest.fn();
export const isText = jest.fn();
export const someNode = jest.fn();
export const usePlateSelection = jest.fn();

export default {};
