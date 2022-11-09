// Register all the things
CMS.init();

const PostPreview = ({ entry, widgetFor, widgetsFor }) => {
  return h(
    'div',
    {},
    h('div', { className: 'cover' }, h('h1', {}, entry.data.title), widgetFor('image')),
    h('p', {}, h('small', {}, 'Written ' + entry.data.date)),
    h('div', { className: 'text' }, widgetFor('body')),
  );
};

const GeneralPreview = ({ widgetsFor, getAsset, entry }) => {
  const title = entry.data.site_title;
  const posts = entry.data.posts;
  const thumb = posts && posts.thumb;

  const [thumbUrl, setThumbUrl] = useState('');

  useEffect(() => {
    let alive = true;

    const loadThumb = async () => {
      const thumbAsset = await getAsset(thumb);
      if (alive) {
        setThumbUrl(thumbAsset.toString());
      }
    };

    loadThumb();

    return () => {
      alive = false;
    };
  }, [thumb]);

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

const RelationKitchenSinkPostPreview = ({ fieldsMetaData }) => {
  // When a post is selected from the relation field, all of it's data
  // will be available in the field's metadata nested under the collection
  // name, and then further nested under the value specified in `value_field`.
  // In this case, the post would be nested under "posts" and then under
  // the title of the selected post, since our `value_field` in the config
  // is "title".
  const post = fieldsMetaData && fieldsMetaData.posts.value;
  const style = { border: '2px solid #ccc', borderRadius: '8px', padding: '20px' };
  return post
    ? h(
        'div',
        { style: style },
        h('h2', {}, 'Related Post'),
        h('h3', {}, post.title),
        h('img', { src: post.image }),
        h('p', {}, (post.body ?? '').slice(0, 100) + '...'),
      )
    : null;
};

const CustomPage = () => {
  return h('div', {}, 'I am a custom page!');
};

CMS.registerPreviewStyle('.toastui-editor-contents h1 { color: blue }', { raw: true });
CMS.registerPreviewTemplate('posts', PostPreview);
CMS.registerPreviewTemplate('general', GeneralPreview);
CMS.registerPreviewTemplate('authors', AuthorsPreview);
// Pass the name of a registered control to reuse with a new widget preview.
CMS.registerWidget('relationKitchenSinkPost', 'relation', RelationKitchenSinkPostPreview);
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
