declare const _default: {
    properties: {
        default: {
            oneOf: ({
                type: string;
                items?: undefined;
            } | {
                type: string;
                items: {
                    oneOf: {
                        type: string;
                    }[];
                };
            })[];
        };
        options: {
            type: string;
            items: {
                oneOf: ({
                    type: string;
                    properties?: undefined;
                    required?: undefined;
                } | {
                    type: string;
                    properties: {
                        label: {
                            type: string;
                        };
                        value: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                    };
                    required: string[];
                })[];
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
    };
    required: string[];
};
export default _default;
