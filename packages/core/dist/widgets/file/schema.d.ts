declare const _default: {
    properties: {
        allow_multiple: {
            type: string;
        };
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
        media_folder: {
            type: string;
        };
        public_folder: {
            type: string;
        };
        select_folder: {
            type: string;
        };
        choose_url: {
            type: string;
        };
        multiple: {
            type: string;
        };
        media_library: {
            type: string;
            properties: {
                max_file_size: {
                    type: string;
                };
                folder_support: {
                    type: string;
                };
            };
        };
    };
};
export default _default;
