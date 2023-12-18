export declare function isAbsolutePath(path: string): boolean;
/**
 * Return the last portion of a path. Similar to the Unix basename command.
 * @example Usage example
 *   path.basename('/foo/bar/baz/asdf/quux.html')
 *   // returns
 *   'quux.html'
 *
 *   path.basename('/foo/bar/baz/asdf/quux.html', '.html')
 *   // returns
 *   'quux'
 */
export declare function basename(p: string, ext?: string): string;
/**
 * Return the extension of the path, from the last '.' to end of string in the
 * last portion of the path. If there is no '.' in the last portion of the path
 * or the first character of it is '.', then it returns an empty string.
 * @example Usage example
 *   path.fileExtensionWithSeparator('index.html')
 *   // returns
 *   '.html'
 */
export declare function fileExtensionWithSeparator(p: string): string;
/**
 * Return the extension of the path, from after the last '.' to end of string in the
 * last portion of the path. If there is no '.' in the last portion of the path
 * or the first character of it is '.', then it returns an empty string.
 * @example Usage example
 *   path.fileExtension('index.html')
 *   // returns
 *   'html'
 */
export declare function fileExtension(p: string): string;
