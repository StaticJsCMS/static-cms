declare const _default: {
    properties: {
        default: {
            oneOf: ({
                type: string;
                items?: undefined;
            } | {
                type: string;
                items: {
                    type: string;
                };
            })[];
        };
        collection: {
            type: string;
        };
        value_field: {
            type: string;
        };
        search_fields: {
            type: string;
            minItems: number;
            items: {
                type: string;
            };
        };
        file: {
            type: string;
        };
        display_fields: {
            type: string;
            minItems: number;
            items: {
                type: string;
            };
        };
        multiple: {
            type: string;
        };
        min: {
            type: string;
        };
        max: {
            type: string;
        };
        options_length: {
            type: string;
        };
    };
    oneOf: {
        required: string[];
    }[];
};
export default _default;
