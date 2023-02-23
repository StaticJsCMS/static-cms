import cms, { useMediaAsset } from "@staticcms/core";

// Register all the things
cms.init();

const PostPreview = ({ entry, widgetFor }) => {
  return (
    <div>
      <div className="cover">
        <h1>{entry.data.title}</h1>
        {widgetFor("image")}
      </div>
      <p>
        <small>Written {entry.data.date}</small>
      </p>
      <div className="text">{widgetFor("body")}</div>
    </div>
  );
};

const PostPreviewCard = ({ entry, widgetFor, viewStyle }) => {
  return (
    <div style={{ width: "100%" }}>
      {viewStyle === "grid" ? widgetFor("image") : null}
      <div style={{ padding: "16px", width: "100%" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: viewStyle === "grid" ? "column" : "row",
              alignItems: "baseline",
              gap: "8px",
            }}
          >
            <strong style={{ fontSize: "24px" }}>{entry.data.title}</strong>
            <span style={{ fontSize: "16px" }}>{entry.data.date}</span>
          </div>
          <div
            style={{
              backgroundColor: entry.data.draft === true ? "blue" : "green",
              color: "white",
              border: "none",
              padding: "4px 8px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            {entry.data.draft === true ? "Draft" : "Published"}
          </div>
        </div>
      </div>
    </div>
  );
};

const GeneralPreview = ({ widgetsFor, entry }) => {
  const title = entry.data.site_title;
  const posts = entry.data.posts;
  const thumb = posts && posts.thumb;

  const thumbUrl = useMediaAsset(thumb);

  return (
    <div>
      <h1>{title}</h1>
      <dl>
        <dt>Posts on Frontpage</dt>
        <dd>{widgetsFor("posts").widgets.front_limit ?? 0}</dd>
      </dl>
      <dl>
        <dt>Default Author</dt>
        <dd>{widgetsFor("posts").data?.author ?? "None"}</dd>
      </dl>
      <dl>
        <dt>Default Thumbnail</dt>
        <dd>{thumb && <img src={thumbUrl} />}</dd>
      </dl>
    </div>
  );
};

const AuthorsPreview = ({ widgetsFor }) => {
  return (
    <div>
      <h1>Authors</h1>
      {widgetsFor("authors").map((author, index) => (
        <div key={index}>
          <hr />
          <strong>{author.data.name}</strong>
          {author.widgets.description}
        </div>
      ))}
    </div>
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

  if (!post) {
    return null;
  }

  return (
    <div style={{ border: "2px solid #ccc", borderRadius: "8px", padding: "20px" }}>
      <h2>Related Post</h2>
      <h3>{post.title}</h3>
      <img src={post.image} />
      <p>{(post.body ?? "").slice(0, 100) + "..."}</p>
    </div>
  );
};

const CustomPage = () => {
  return <div>I am a custom page!</div>;
};

cms.registerPreviewStyle(".toastui-editor-contents h1 { color: blue }", { raw: true });
cms.registerPreviewTemplate("posts", PostPreview);
CMS.registerPreviewCard("posts", PostPreviewCard);
cms.registerPreviewTemplate("general", GeneralPreview);
cms.registerPreviewTemplate("authors", AuthorsPreview);
// Pass the name of a registered control to reuse with a new widget preview.
cms.registerWidget("relationKitchenSinkPost", "relation", RelationKitchenSinkPostPreview);
cms.registerAdditionalLink({
  id: "docs",
  title: "Static CMS Docs",
  data: "https://staticjsCMS.netlify.app/",
  options: {
    icon: "page",
  },
});
cms.registerAdditionalLink({
  id: "config",
  title: "Demo config.yml",
  data: "https://github.com/StaticJsCMS/static-cms/blob/main/packages/demo/public/config.yml",
  options: {
    icon: "page",
  },
});
cms.registerAdditionalLink({
  id: "custom-page",
  title: "Custom Page",
  data: CustomPage,
  options: {
    icon: "page",
  },
});

cms.registerShortcode("youtube", {
  label: "YouTube",
  openTag: "[",
  closeTag: "]",
  separator: "|",
  toProps: (args) => {
    if (args.length > 0) {
      return { src: args[0] };
    }

    return { src: "" };
  },
  toArgs: ({ src }) => {
    return [src];
  },
  control: ({ src, onChange }) => {
    return (
      <span>
        <input
          key="control-input"
          value={src}
          onChange={(event) => {
            onChange({ src: event.target.value });
          }}
        />
        <iframe key="control-preview" width="420" height="315" src={`https://www.youtube.com/embed/${src}`} />
      </span>
    );
  },
  preview: ({ src }) => {
    return (
      <span>
        <iframe width="420" height="315" src={`https://www.youtube.com/embed/${src}`} />
      </span>
    );
  },
});
