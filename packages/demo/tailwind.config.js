const baseConfig = require('../../tailwind.base.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['../core/src/**/*.tsx'],
  ...baseConfig,
};
