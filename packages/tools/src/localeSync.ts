import { join } from 'path';
import get from 'lodash/get';
import prettier from 'prettier';

import locales from '@staticcms/core/locales';
import baseLocale from '@staticcms/core/locales/en';

import type { BaseLocalePhrases, LocalePhrases, LocalePhrasesRoot } from '@staticcms/core/locales';
import { readFileSync, writeFileSync } from 'fs';

// const localesDir = "../core/src/locales";

function processLocaleSection(
  baseSection: BaseLocalePhrases,
  localeSection: LocalePhrases,
): LocalePhrases {
  if (typeof baseSection === 'string') {
    return localeSection ?? undefined;
  }

  return Object.keys(baseSection).reduce((acc, section) => {
    acc[section] = processLocaleSection(
      baseSection[section],
      typeof localeSection === 'string' ? undefined : localeSection?.[section],
    );

    return acc;
  }, {} as LocalePhrasesRoot);
}

function processLocale(name: string, locale: LocalePhrasesRoot) {
  const newLocale = Object.keys(baseLocale).reduce((acc, section) => {
    acc[section] = processLocaleSection(baseLocale[section], locale[section]);

    return acc;
  }, {} as LocalePhrasesRoot);

  const path = join(__dirname, '../../core/src/locales', name, `/index.ts`);

  const formattedCode = prettier.format(
    `import type { LocalePhrasesRoot } from '../types';

const ${name}: LocalePhrasesRoot = ${JSON.stringify(
      newLocale,
      function (_k, v) {
        return v === undefined ? null : v;
      },
      2,
    )};

export default ${name};
`,
    {
      parser: 'typescript',
      arrowParens: 'avoid',
      trailingComma: 'all',
      singleQuote: true,
      printWidth: 100,
    },
  );

  writeFileSync(path, formattedCode);

  const lines = readFileSync(path, 'utf-8').split('\n');

  const outputLines: string[] = [];
  const parentPath: string[] = [];

  for (const line of lines) {
    const parentOpenMatch = /([a-zA-Z0-9_]+): {/.exec(line);
    if (parentOpenMatch && parentOpenMatch.length === 2) {
      parentPath.push(parentOpenMatch[1]);
      outputLines.push(line);
      continue;
    }

    const parentCloseMatch = /},/.exec(line);
    if (parentCloseMatch && parentCloseMatch.length === 1) {
      parentPath.pop();
      outputLines.push(line);
      continue;
    }

    const emptyLine = /([ ]*)([a-zA-Z0-9_]+): null,/.exec(line);
    if (emptyLine && emptyLine.length === 3) {
      const englishTranslation = String(get(
        baseLocale,
        [...parentPath, emptyLine[2]].join('.'),
      )).replace(/\n/g, '\\n');

      outputLines.push(
        `${emptyLine[1]}${emptyLine[2]}: undefined, // English translation: '${englishTranslation}'`,
      );
      continue;
    }

    outputLines.push(line);
  }

  writeFileSync(path, outputLines.join('\n'));
}

(async function () {
  Object.keys(locales).forEach(locale => {
    if (locale === 'en') {
      return;
    }

    processLocale(locale, locales[locale]);
  });
})();
