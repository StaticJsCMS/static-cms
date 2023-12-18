export declare function validateMinMax<T = string | number>(t: (key: string, options: unknown) => string, fieldLabel: string, value?: string | number | T[] | undefined | null, min?: number, max?: number): false | {
    type: "RANGE";
    message: string;
};
