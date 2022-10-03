import AccessTokenError from './AccessTokenError';
import { readFile, readFileMetadata, requestWithBackoff, throwOnConflictingBranches } from './API';
import APIError from './APIError';
import {
  generateContentKey,
  parseContentKey
} from './APIUtils';
import { asyncLock } from './asyncLock';
import {
  filterByExtension,
  getAllResponses,
  getPathDepth,
  parseLinkHeader,
  parseResponse,
  responseParser
} from './backendUtil';
import Cursor, { CURSOR_COMPATIBILITY_SYMBOL } from './Cursor';
import getBlobSHA from './getBlobSHA';
import {
  createPointerFile,
  getLargeMediaFilteredMediaFiles,
  getLargeMediaPatternsFromGitAttributesFile,
  getPointerFileForMediaFileObj,
  parsePointerFile
} from './git-lfs';
import {
  allEntriesByFolder,
  blobToFileObj,
  entriesByFiles,
  entriesByFolder,
  getMediaAsBlob,
  getMediaDisplayURL,
  runWithLock
} from './implementation';
import loadScript from './loadScript';
import localForage from './localForage';
import { basename, fileExtension, fileExtensionWithSeparator, isAbsolutePath } from './path';
import { flowAsync, onlySuccessfulPromises, then } from './promise';
import transientOptions from './transientOptions';
import unsentRequest from './unsentRequest';

import type { ApiRequest as AR, FetchError as FE } from './API';
import type { AsyncLock as AL } from './asyncLock';
import type { PointerFile as PF } from './git-lfs';

export type AsyncLock = AL;
export type ApiRequest = AR;
export type FetchError = FE;
export type PointerFile = PF;

export const StaticCmsLibUtil = {
  APIError,
  Cursor,
  CURSOR_COMPATIBILITY_SYMBOL,
  localForage,
  basename,
  fileExtensionWithSeparator,
  fileExtension,
  onlySuccessfulPromises,
  flowAsync,
  then,
  unsentRequest,
  filterByExtension,
  parseLinkHeader,
  parseResponse,
  responseParser,
  loadScript,
  getBlobSHA,
  getPathDepth,
  entriesByFiles,
  entriesByFolder,
  getMediaDisplayURL,
  getMediaAsBlob,
  readFile,
  readFileMetadata,
  generateContentKey,
  runWithLock,
  parseContentKey,
  createPointerFile,
  getLargeMediaFilteredMediaFiles,
  getLargeMediaPatternsFromGitAttributesFile,
  parsePointerFile,
  getPointerFileForMediaFileObj,
  blobToFileObj,
  requestWithBackoff,
  allEntriesByFolder,
  AccessTokenError,
  throwOnConflictingBranches,
  transientOptions,
};
export {
  APIError,
  Cursor,
  CURSOR_COMPATIBILITY_SYMBOL,
  localForage,
  basename,
  fileExtensionWithSeparator,
  fileExtension,
  onlySuccessfulPromises,
  flowAsync,
  then,
  unsentRequest,
  filterByExtension,
  parseLinkHeader,
  getAllResponses,
  parseResponse,
  responseParser,
  loadScript,
  getBlobSHA,
  asyncLock,
  isAbsolutePath,
  getPathDepth,
  entriesByFiles,
  entriesByFolder,
  getMediaDisplayURL,
  getMediaAsBlob,
  readFile,
  readFileMetadata,
  generateContentKey,
  runWithLock,
  parseContentKey,
  createPointerFile,
  getLargeMediaFilteredMediaFiles,
  getLargeMediaPatternsFromGitAttributesFile,
  parsePointerFile,
  getPointerFileForMediaFileObj,
  blobToFileObj,
  requestWithBackoff,
  allEntriesByFolder,
  AccessTokenError,
  throwOnConflictingBranches,
  transientOptions,
};
