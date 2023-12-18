import type { ShortcodeConfig } from '@staticcms/core/interface';
import type { MdValue } from '../plateTypes';
export declare const testShortcodeConfigs: Record<string, ShortcodeConfig>;
export interface SerializationTestData {
    markdown: string;
    slate: MdValue;
}
interface SerializationMarkdownMdxSplitTests {
    markdown?: Record<string, SerializationTestData>;
    mdx?: Record<string, SerializationTestData>;
    both?: Record<string, SerializationTestData>;
}
type SerializationTests = Record<string, SerializationMarkdownMdxSplitTests>;
export declare const deserializationOnlyTestData: SerializationTests;
export declare function runSerializationTests(testCallback: (key: string, mode: 'markdown' | 'mdx' | 'both', data: SerializationTestData) => void, testData?: SerializationTests): void;
export {};
