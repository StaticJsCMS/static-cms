import AccessTokenError from './AccessTokenError';
import { readFile, readFileMetadata, requestWithBackoff, throwOnConflictingBranches } from './API';
import APIError from './APIError';
import {
  DEFAULT_PR_BODY,
  generateContentKey,
  labelToStatus,
  MERGE_COMMIT_MESSAGE,
  parseContentKey,
  statusToLabel,
} from './APIUtils';
import { asyncLock } from './asyncLock';
import {
  filterByExtension,
  getAllResponses,
  getPathDepth,
  parseLinkHeader,
  parseResponse,
  responseParser,
} from './backendUtil';
import Cursor, { CURSOR_COMPATIBILITY_SYMBOL } from './Cursor';
import getBlobSHA from './getBlobSHA';
import {
  createPointerFile,
  getLargeMediaFilteredMediaFiles,
  getLargeMediaPatternsFromGitAttributesFile,
  getPointerFileForMediaFileObj,
  parsePointerFile,
} from './git-lfs';
import {
  allEntriesByFolder,
  blobToFileObj,
  entriesByFiles,
  entriesByFolder,
  getMediaAsBlob,
  getMediaDisplayURL,
  runWithLock,
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
import type {
  AssetProxy as AP,
  Config as C,
  Credentials as Cred,
  DataFile as DF,
  DisplayURL as DU,
  DisplayURLObject as DUO,
  Entry as E,
  Implementation as I,
  ImplementationFile as IF,
  ImplementationMediaFile as IMF,
  PersistOptions as PO,
  User as U,
} from './implementation';

export type AsyncLock = AL;
export type Implementation = I;
export type ImplementationMediaFile = IMF;
export type ImplementationFile = IF;
export type DisplayURL = DU;
export type DisplayURLObject = DUO;
export type Credentials = Cred;
export type User = U;
export type Entry = E;
export type PersistOptions = PO;
export type AssetProxy = AP;
export type ApiRequest = AR;
export type Config = C;
export type FetchError = FE;
export type PointerFile = PF;
export type DataFile = DF;

export const SimpleCmsLibUtil = {
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
  labelToStatus,
  statusToLabel,
  DEFAULT_PR_BODY,
  MERGE_COMMIT_MESSAGE,
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
  labelToStatus,
  statusToLabel,
  DEFAULT_PR_BODY,
  MERGE_COMMIT_MESSAGE,
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
