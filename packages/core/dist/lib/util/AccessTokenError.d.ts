export declare const ACCESS_TOKEN_ERROR = "ACCESS_TOKEN_ERROR";
export default class AccessTokenError extends Error {
    message: string;
    constructor(message: string);
}
