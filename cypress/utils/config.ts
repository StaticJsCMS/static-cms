import fs from 'fs-extra';
import path from 'path';
import yaml from 'js-yaml';

import type { Config } from '@staticcms/core/interface';

const devTestDirectory = path.join(__dirname, '..', '..', 'packages', 'core', 'dev-test');
const backendsDirectory = path.join(devTestDirectory, 'backends');

export async function copyBackendFiles(backend: string) {
  await Promise.all(
    ['config.yml', 'index.html'].map(file => {
      return fs.copyFile(
        path.join(backendsDirectory, backend, file),
        path.join(devTestDirectory, file),
      );
    }),
  );
}

export async function updateConfig(configModifier: (config: Config) => void) {
  const configFile = path.join(devTestDirectory, 'config.yml');
  const configContent = await fs.readFile(configFile, 'utf-8');
  const config = yaml.load(configContent) as Config;
  await configModifier(config);
  await fs.writeFileSync(configFile, yaml.dump(config));
}

export async function switchVersion(version: string) {
  const htmlFile = path.join(devTestDirectory, 'index.html');
  const content = await fs.readFile(htmlFile);

  const replaceString =
    version === 'latest'
      ? '<script src="dist/static-cms.js"></script>'
      : `<script src="https://unpkg.com/@staticcms/app@${version}/dist/static-cms-app.js"></script>`;

  await fs.writeFile(
    htmlFile,
    content.toString().replace(/<script src=".+?static-cms.+?"><\/script>/, replaceString),
  );
}
