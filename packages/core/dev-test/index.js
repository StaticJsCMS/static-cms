// Register all the things
CMS.init();

const PostPreview = ({ entry, widgetFor }) => {
  return h(
    'div',
    {},
    h('div', { className: 'cover' }, h('h1', {}, entry.data.title), widgetFor('image')),
    h('p', {}, h('small', {}, 'Written ' + entry.data.date)),
    h('div', { className: 'text' }, widgetFor('body')),
  );
};

const PostDateFieldPreview = ({ value }) => {
  const date = new Date(value);

  const month = date.getMonth() + 1;
  const day = date.getDate();

  return h(
    'div',
    {},
    `${date.getFullYear()}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`,
  );
};

const PostDraftFieldPreview = ({ value }) => {
  return h(
    'div',
    {
      style: {
        backgroundColor: value === true ? 'rgb(37 99 235)' : 'rgb(22 163 74)',
        color: 'white',
        border: 'none',
        padding: '2px 6px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        cursor: 'pointer',
        borderRadius: '4px',
        fontSize: '14px',
        lineHeight: '16px',
        height: '20px',
      },
    },
    value === true ? 'Draft' : 'Published',
  );
};

const GeneralPreview = ({ widgetsFor, entry, collection }) => {
  const title = entry.data.site_title;
  const posts = entry.data.posts;
  const thumb = posts && posts.thumb;

  const thumbUrl = useMediaAsset(thumb, collection, undefined, entry);

  return h(
    'div',
    {},
    h('h1', {}, title),
    h(
      'dl',
      {},
      h('dt', {}, 'Posts on Frontpage'),
      h('dd', {}, widgetsFor('posts').widgets.front_limit ?? 0),

      h('dt', {}, 'Default Author'),
      h('dd', {}, widgetsFor('posts').data?.author ?? 'None'),

      h('dt', {}, 'Default Thumbnail'),
      h('dd', {}, thumb && h('img', { src: thumbUrl })),
    ),
  );
};

const AuthorsPreview = ({ widgetsFor }) => {
  return h(
    'div',
    {},
    h('h1', {}, 'Authors'),
    widgetsFor('authors').map(function (author, index) {
      return h(
        'div',
        { key: index },
        h('hr', {}),
        h('strong', {}, author.data.name),
        author.widgets.description,
      );
    }),
  );
};

const CustomPage = () => {
  return h('div', {}, 'I am a custom page!');
};

CMS.registerPreviewTemplate('posts', PostPreview);
CMS.registerFieldPreview('posts', 'date', PostDateFieldPreview);
CMS.registerPreviewTemplate('general', GeneralPreview);
CMS.registerPreviewTemplate('authors', AuthorsPreview);
// Pass the name of a registered control to reuse with a new widget preview.
CMS.registerWidget('relationKitchenSinkPost', 'relation');
CMS.registerAdditionalLink({
  id: 'example',
  title: 'Example.com',
  data: 'https://example.com',
  options: {
    icon: 'page',
  },
});
CMS.registerAdditionalLink({
  id: 'custom-page',
  title: 'Custom Page',
  data: CustomPage,
  options: {
    icon: 'page',
  },
});

CMS.registerTheme({
  name: 'Custom Red Orange',
  extends: 'dark',
  primary: {
    main: '#ff4500',
  }
});

CMS.registerShortcode('youtube', {
  label: 'YouTube',
  openTag: '[',
  closeTag: ']',
  separator: '|',
  toProps: args => {
    if (args.length > 0) {
      return { src: args[0] };
    }

    return { src: '' };
  },
  toArgs: ({ src }) => {
    return [src];
  },
  control: ({ src, onChange }) => {
    const theme = useTheme();

    return h('span', {}, [
      h('input', {
        key: 'control-input',
        value: src,
        onChange: event => {
          onChange({ src: event.target.value });
        },
        style: {
          width: '100%',
          backgroundColor: theme.common.gray,
          color: theme.text.primary,
          padding: '4px 8px',
        },
      }),
      h(
        'iframe',
        {
          key: 'control-preview',
          width: '100%',
          height: '315',
          src: `https://www.youtube.com/embed/${src}`,
        },
        '',
      ),
    ]);
  },
  preview: ({ src }) => {
    return h(
      'span',
      {},
      h(
        'iframe',
        {
          width: '420',
          height: '315',
          src: `https://www.youtube.com/embed/${src}`,
        },
        '',
      ),
    );
  },
});
