declare const _default: {
    properties: {
        default: {
            oneOf: {
                type: string;
            }[];
        };
        default_language: {
            type: string;
        };
        allow_language_selection: {
            type: string;
        };
        keys: {
            type: string;
            properties: {
                code: {
                    type: string;
                };
                lang: {
                    type: string;
                };
            };
        };
        output_code_only: {
            type: string;
        };
        code_mirror_config: {
            type: string;
        };
    };
};
export default _default;
