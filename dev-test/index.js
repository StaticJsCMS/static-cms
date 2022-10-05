// Register all the things
window.CMS.registerBackend('git-gateway', window.CMS.GitGatewayBackend);
window.CMS.registerBackend('proxy', window.CMS.ProxyBackend);
window.CMS.registerBackend('test-repo', window.CMS.TestBackend);
window.CMS.registerWidget([
  window.CMS.StringWidget.Widget(),
  window.CMS.NumberWidget.Widget(),
  window.CMS.TextWidget.Widget(),
  window.CMS.ImageWidget.Widget(),
  window.CMS.FileWidget.Widget(),
  window.CMS.SelectWidget.Widget(),
  window.CMS.MarkdownWidget.Widget(),
  window.CMS.ListWidget.Widget(),
  window.CMS.ObjectWidget.Widget(),
  window.CMS.RelationWidget.Widget(),
  window.CMS.BooleanWidget.Widget(),
  window.CMS.DateTimeWidget.Widget(),
  window.CMS.ColorStringWidget.Widget(),
]);
window.CMS.registerEditorComponent(window.CMS.imageEditorComponent);
window.CMS.registerEditorComponent({
  id: 'code-block',
  label: 'Code Block',
  widget: 'code',
  type: 'code-block',
});
window.CMS.registerLocale('en', window.CMS.locales.en);

Object.keys(window.CMS.images).forEach(iconName => {
  window.CMS.registerIcon(iconName, window.h(window.CMS.Icon, { type: iconName }));
});

window.CMS.init();

const PostPreview = window.createClass({
  render: function () {
    var entry = this.props.entry;
    return window.h(
      'div',
      {},
      window.h(
        'div',
        { className: 'cover' },
        window.h('h1', {}, entry.getIn(['data', 'title'])),
        this.props.widgetFor('image'),
      ),
      window.h('p', {}, window.h('small', {}, 'Written ' + entry.getIn(['data', 'date']))),
      window.h('div', { className: 'text' }, this.props.widgetFor('body')),
    );
  },
});

const GeneralPreview = window.createClass({
  render: function () {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'site_title']);
    const posts = entry.getIn(['data', 'posts']);
    const thumb = posts && posts.thumb;

    return window.h(
      'div',
      {},
      window.h('h1', {}, title),
      window.h(
        'dl',
        {},
        window.h('dt', {}, 'Posts on Frontpage'),
        window.h('dd', {}, this.props.widgetsFor('posts').getIn(['widgets', 'front_limit']) || 0),

        window.h('dt', {}, 'Default Author'),
        window.h('dd', {}, this.props.widgetsFor('posts').getIn(['data', 'author']) || 'None'),

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
          window.h('strong', {}, author.getIn(['data', 'name'])),
          author.getIn(['widgets', 'description']),
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
    const post = fieldsMetaData && fieldsMetaData.getIn(['posts', value]);
    const style = { border: '2px solid #ccc', borderRadius: '8px', padding: '20px' };
    return post
      ? window.h(
          'div',
          { style: style },
          window.h('h2', {}, 'Related Post'),
          window.h('h3', {}, post.title),
          window.h('img', { src: post.image }),
          window.h('p', {}, post.get('body', '').slice(0, 100) + '...'),
        )
      : null;
  },
});

window.CMS.registerPreviewTemplate('posts', PostPreview);
window.CMS.registerPreviewTemplate('general', GeneralPreview);
window.CMS.registerPreviewTemplate('authors', AuthorsPreview);
// Pass the name of a registered control to reuse with a new widget preview.
window.CMS.registerWidget('relationKitchenSinkPost', 'relation', RelationKitchenSinkPostPreview);
window.CMS.registerAdditionalLink('example', 'Example.com', 'https://example.com', 'page');
