module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      height: {
        main: 'calc(100vh - 64px)',
        'media-library-dialog': '80vh',
        'media-card': '240px',
        'media-preview-image': '104px',
        'media-card-image': '196px',
        input: '24px',
      },
      minHeight: {
        8: '2rem',
        'markdown-toolbar': '40px',
      },
      width: {
        main: 'calc(100% - 256px)',
        preview: 'calc(100% - 450px)',
        'sidebar-expanded': '256px',
        'sidebar-collapsed': '68px',
        'editor-only': '640px',
        'media-library-dialog': '80vw',
        'media-card': '240px',
        'media-preview-image': '126px',
      },
      maxWidth: {
        'media-search': '400px',
      },
      boxShadow: {
        sidebar: '0 10px 15px 18px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      gridTemplateColumns: {
        editor: '450px auto',
        'media-preview': '126px auto',
      },
    },
  },
};
