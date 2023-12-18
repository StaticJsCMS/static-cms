declare const _default: {
    properties: {
        default: {
            type: string;
        };
        media_folder: {
            type: string;
        };
        public_folder: {
            type: string;
        };
        choose_url: {
            type: string;
        };
        multiple: {
            type: string;
        };
        show_raw: {
            type: string;
        };
        toolbar_buttons: {
            type: string;
            properties: {
                main: {
                    type: string;
                    items: {
                        anyOf: ({
                            type: string;
                            enum: string[];
                            properties?: undefined;
                            required?: undefined;
                        } | {
                            type: string;
                            properties: {
                                label: {
                                    type: string;
                                };
                                icon: {
                                    type: string;
                                };
                                groups: {
                                    type: string;
                                    items: {
                                        type: string;
                                        properties: {
                                            items: {
                                                type: string;
                                                items: {
                                                    type: string;
                                                    enum: string[];
                                                };
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                            required: string[];
                            enum?: undefined;
                        })[];
                    };
                };
                empty: {
                    type: string;
                    items: {
                        anyOf: ({
                            type: string;
                            enum: string[];
                            properties?: undefined;
                            required?: undefined;
                        } | {
                            type: string;
                            properties: {
                                label: {
                                    type: string;
                                };
                                icon: {
                                    type: string;
                                };
                                groups: {
                                    type: string;
                                    items: {
                                        type: string;
                                        properties: {
                                            items: {
                                                type: string;
                                                items: {
                                                    type: string;
                                                    enum: string[];
                                                };
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                            required: string[];
                            enum?: undefined;
                        })[];
                    };
                };
                selection: {
                    type: string;
                    items: {
                        anyOf: ({
                            type: string;
                            enum: string[];
                            properties?: undefined;
                            required?: undefined;
                        } | {
                            type: string;
                            properties: {
                                label: {
                                    type: string;
                                };
                                icon: {
                                    type: string;
                                };
                                groups: {
                                    type: string;
                                    items: {
                                        type: string;
                                        properties: {
                                            items: {
                                                type: string;
                                                items: {
                                                    type: string;
                                                    enum: string[];
                                                };
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                            required: string[];
                            enum?: undefined;
                        })[];
                    };
                };
                table_empty: {
                    type: string;
                    items: {
                        anyOf: ({
                            type: string;
                            enum: string[];
                            properties?: undefined;
                            required?: undefined;
                        } | {
                            type: string;
                            properties: {
                                label: {
                                    type: string;
                                };
                                icon: {
                                    type: string;
                                };
                                groups: {
                                    type: string;
                                    items: {
                                        type: string;
                                        properties: {
                                            items: {
                                                type: string;
                                                items: {
                                                    type: string;
                                                    enum: string[];
                                                };
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                            required: string[];
                            enum?: undefined;
                        })[];
                    };
                };
                table_select: {
                    type: string;
                    items: {
                        anyOf: ({
                            type: string;
                            enum: string[];
                            properties?: undefined;
                            required?: undefined;
                        } | {
                            type: string;
                            properties: {
                                label: {
                                    type: string;
                                };
                                icon: {
                                    type: string;
                                };
                                groups: {
                                    type: string;
                                    items: {
                                        type: string;
                                        properties: {
                                            items: {
                                                type: string;
                                                items: {
                                                    type: string;
                                                    enum: string[];
                                                };
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                            required: string[];
                            enum?: undefined;
                        })[];
                    };
                };
            };
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
