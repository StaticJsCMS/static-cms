export declare function filterByExtension(file: {
    path: string;
}, extension: string): boolean;
declare const responseFormatters: {
    readonly json: (res: Response) => Promise<any>;
    readonly text: (res: Response) => Promise<string>;
    readonly blob: (res: Response) => Promise<Blob>;
};
interface ParseResponseOptions {
    expectingOk?: boolean;
    format?: keyof typeof responseFormatters;
    apiName?: string;
}
export declare function parseResponse<T extends keyof typeof responseFormatters = 'text'>(res: Response, { expectingOk, format, apiName }: ParseResponseOptions): Promise<Awaited<ReturnType<(typeof responseFormatters)[T]>>>;
export declare function responseParser<T extends keyof typeof responseFormatters = 'text'>(options: {
    expectingOk?: boolean;
    format: T;
    apiName: string;
}): (res: Response) => Promise<Awaited<ReturnType<{
    readonly json: (res: Response) => Promise<any>;
    readonly text: (res: Response) => Promise<string>;
    readonly blob: (res: Response) => Promise<Blob>;
}[T]>>>;
export declare function parseLinkHeader(header: string | null): any;
export declare function getAllResponses(url: string, options: {
    headers?: {} | undefined;
} | undefined, linkHeaderRelName: string, nextUrlProcessor: (url: string) => string): Promise<Response[]>;
export declare function getPathDepth(path: string): number;
export {};
