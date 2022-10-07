import fs from 'fs-extra';
import path from 'path';
import yaml from 'js-yaml';
import uniq from 'lodash/uniq';

const rawDataPath = '../data/languages-raw.yml';
const outputPath = '../data/languages.json';

interface CodeLanguage {
  extensions: string[];
  aliases: string[];
  codemirror_mode: string;
  codemirror_mime_type: string;
}

interface ProcessedCodeLanguage {
  label: string;
  identifiers: string[];
  codemirror_mode: string;
  codemirror_mime_type: string;
}

async function fetchData() {
  const filePath = path.resolve(__dirname, rawDataPath);
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return yaml.load(fileContent) as Record<string, CodeLanguage>;
}

function outputData(data: ProcessedCodeLanguage[]) {
  const filePath = path.resolve(__dirname, outputPath);
  return fs.writeJson(filePath, data);
}

function transform(data: Record<string, CodeLanguage>) {
  return Object.entries(data).reduce((acc, [label, lang]) => {
    const { extensions = [], aliases = [], codemirror_mode, codemirror_mime_type } = lang;
    if (codemirror_mode) {
      const dotlessExtensions = extensions.map(ext => ext.slice(1));
      const identifiers = uniq(
        [label.toLowerCase(), ...aliases, ...dotlessExtensions].filter(alias => {
          if (!alias) {
            return;
          }
          return !/[^a-zA-Z]/.test(alias);
        }),
      );
      acc.push({ label, identifiers, codemirror_mode, codemirror_mime_type });
    }
    return acc;
  }, [] as ProcessedCodeLanguage[]);
}

async function process() {
  const data = await fetchData();
  const transformedData = transform(data);
  return outputData(transformedData);
}

process();
