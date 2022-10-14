// Register all the things
window.CMS.init();

const PostPreview = window.createClass({
  render: function () {
    console.log('hello?', this.props.widgetFor('body'));
    var entry = this.props.entry;
    return window.h(
      'div',
      {},
      window.h(
        'div',
        { className: 'cover' },
        window.h('h1', {}, entry.data.title),
        this.props.widgetFor('image'),
      ),
      window.h('p', {}, window.h('small', {}, 'Written ' + entry.data.date)),
      window.h('div', { className: 'text' }, this.props.widgetFor('body')),
    );
  },
});

const GeneralPreview = window.createClass({
  render: function () {
    const entry = this.props.entry;
    const title = entry.data.site_title;
    const posts = entry.data.posts;
    const thumb = posts && posts.thumb;

    return window.h(
      'div',
      {},
      window.h('h1', {}, title),
      window.h(
        'dl',
        {},
        window.h('dt', {}, 'Posts on Frontpage'),
        window.h('dd', {}, this.props.widgetsFor('posts').widgets.front_limit || 0),

        window.h('dt', {}, 'Default Author'),
        window.h('dd', {}, this.props.widgetsFor('posts').data.author || 'None'),

        window.h('dt', {}, 'Default Thumbnail'),
        window.h(
          'dd',
          {},
          thumb && window.h('img', { src: this.props.getAsset(thumb).toString() }),
        ),
      ),
    );
  },
});
const AuthorsPreview = window.createClass({
  render: function () {
    return window.h(
      'div',
      {},
      window.h('h1', {}, 'Authors'),
      this.props.widgetsFor('authors').map(function (author, index) {
        return window.h(
          'div',
          { key: index },
          window.h('hr', {}),
          window.h('strong', {}, author.data.name),
          author.widgets.description,
        );
      }),
    );
  },
});

const RelationKitchenSinkPostPreview = window.createClass({
  render: function () {
    // When a post is selected from the relation field, all of it's data
    // will be available in the field's metadata nested under the collection
    // name, and then further nested under the value specified in `value_field`.
    // In this case, the post would be nested under "posts" and then under
    // the title of the selected post, since our `value_field` in the config
    // is "title".
    const { value, fieldsMetaData } = this.props;
    const post = fieldsMetaData && fieldsMetaData.posts.value;
    const style = { border: '2px solid #ccc', borderRadius: '8px', padding: '20px' };
    return post
      ? window.h(
          'div',
          { style: style },
          window.h('h2', {}, 'Related Post'),
          window.h('h3', {}, post.title),
          window.h('img', { src: post.image }),
          window.h('p', {}, (post.body ?? '').slice(0, 100) + '...'),
        )
      : null;
  },
});

window.CMS.registerPreviewTemplate('posts', PostPreview);
window.CMS.registerPreviewTemplate('general', GeneralPreview);
window.CMS.registerPreviewTemplate('authors', AuthorsPreview);
// Pass the name of a registered control to reuse with a new widget preview.
window.CMS.registerWidget('relationKitchenSinkPost', 'relation', RelationKitchenSinkPostPreview);
window.CMS.registerAdditionalLink({
  id: 'example',
  title: 'Example.com',
  data: 'https://example.com',
  options: {
    icon: 'page',
  },
});
