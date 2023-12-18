export declare const API_ERROR = "API_ERROR";
export default class APIError extends Error {
    message: string;
    status: null | number;
    api: string;
    meta: {};
    constructor(message: string, status: null | number, api: string, meta?: {});
}
