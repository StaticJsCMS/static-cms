/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      height: {
        main: 'calc(100vh - 64px)',
        'media-card': '240px',
        'media-card-image': '196px',
      },
      minHeight: {
        8: '2rem',
      },
      width: {
        main: 'calc(100% - 256px)',
        preview: 'calc(100% - 450px)',
        'sidebar-expanded': '256px',
        'sidebar-collapsed': '68px',
        'editor-only': '640px',
        'media-card': '278px'
      },
      boxShadow: {
        sidebar: '0 10px 15px 18px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      gridTemplateColumns: {
        editor: '450px auto',
      },
    },
  },
  plugins: [require('@headlessui/tailwindcss')],
};
