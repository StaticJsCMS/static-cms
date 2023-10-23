const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');

const devTestDirectory = path.join(__dirname, '..', '..', 'packages', 'core', 'dev-test');
const backendsDirectory = path.join(devTestDirectory, 'backends');

async function copyBackendFiles(backend) {
  await Promise.all(
    ['config.yml', 'index.html'].map(file => {
      return fs.copyFile(
        path.join(backendsDirectory, backend, file),
        path.join(devTestDirectory, file),
      );
    }),
  );
}

async function updateConfig(configModifier) {
  const configFile = path.join(devTestDirectory, 'config.yml');
  const configContent = await fs.readFile(configFile);
  const config = yaml.load(configContent);
  await configModifier(config);
  await fs.writeFileSync(configFile, yaml.dump(config));
}

async function switchVersion(version) {
  const htmlFile = path.join(devTestDirectory, 'index.html');
  const content = await fs.readFile(htmlFile);

  const replaceString =
    version === 'latest'
      ? '<script src="dist/static-cms.js"></script>'
      : `<script src="https://unpkg.com/static-cms@${version}/dist/static-cms.js"></script>`;

  await fs.writeFile(
    htmlFile,
    content.toString().replace(/<script src=".+?static-cms.+?"><\/script>/, replaceString),
  );
}

module.exports = { copyBackendFiles, updateConfig, switchVersion };
