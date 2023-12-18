export interface LocalePhrasesRoot {
    [property: string]: LocalePhrases;
}
export type LocalePharsesSection = {
    [property: string]: LocalePhrases;
};
export type LocalePhrases = string | undefined | LocalePharsesSection;
export interface BaseLocalePhrasesRoot {
    [property: string]: BaseLocalePhrases;
}
export type BaseLocalePharsesSection = {
    [property: string]: BaseLocalePhrases;
};
export type BaseLocalePhrases = string | BaseLocalePharsesSection;
