declare const _default: {
    properties: {
        default: {
            oneOf: ({
                type: string;
                minItems?: undefined;
                items?: undefined;
            } | {
                type: string;
                minItems: number;
                items: {
                    oneOf: {
                        type: string;
                    }[];
                };
            })[];
        };
        allow_add: {
            type: string;
        };
        collapsed: {
            type: string;
        };
        summary: {
            type: string;
        };
        label_singular: {
            type: string;
        };
        fields: {
            type: string;
            items: {
                type: string;
            };
        };
        max: {
            type: string;
        };
        min: {
            type: string;
        };
        i18n: {
            type: string;
        };
        add_to_top: {
            type: string;
        };
        types: {
            type: string;
            items: {
                type: string;
            };
        };
        type_key: {
            type: string;
        };
    };
};
export default _default;
