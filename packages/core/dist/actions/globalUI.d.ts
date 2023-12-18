export declare function changeTheme(theme: 'dark' | 'light'): {
    readonly type: "THEME_CHANGE";
    readonly payload: "dark" | "light";
};
export type GlobalUIAction = ReturnType<typeof changeTheme>;
