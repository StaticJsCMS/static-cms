import type { LocalePhrasesRoot } from '../types';

const ja: LocalePhrasesRoot = {
  auth: {
    login: 'ログイン',
    loggingIn: 'ログインしています...',
    loginWithNetlifyIdentity: 'Netlify Identity でログインする',
    loginWithBitbucket: 'Bitbucket でログインする',
    loginWithGitHub: 'GitHub でログインする',
    loginWithGitLab: 'GitLab でログインする',
    loginWithGitea: 'Gitea でログインする',
    errors: {
      email: 'メールアドレスを確認してください。',
      password: 'パスワードを入力してください。',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        '認証情報にアクセスできませんでした。git-gateway backend を利用している場合は、認証サービスと Git Gateway が有効になっているかを確認してください。',
    },
  },
  app: {
    header: {
      content: 'コンテンツ',
      workflow: 'ワークフロー',
      media: 'メディア',
      quickAdd: '新規作成',
    },
    app: {
      loading: '読込中...',
      errorHeader: 'CMS設定の読み込みエラー',
      configErrors: '設定エラー',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'config.ymlを確認してください。',
      loadingConfig: '設定を読み込んでいます...',
      waitingBackend: 'バックエンドの応答を待機しています...',
    },
    notFoundPage: {
      header: 'ページが見つかりません',
    },
  },
  collection: {
    sidebar: {
      collections: 'コレクション',
      allCollections: 'すべてのコレクション',
      searchAll: '検索',
      searchIn: '検索対象',
    },
    collectionTop: {
      sortBy: 'ソート',
      viewAs: '表示モード',
      newButton: '%{collectionLabel}を作成',
      ascending: '昇順',
      descending: '降順',
      searchResults: '「%{searchTerm}」の検索結果',
      searchResultsInCollection: '%{collection}内の「%{searchTerm}」の検索結果',
      filterBy: '絞り込み',
      groupBy: 'グルーピング',
    },
    entries: {
      loadingEntries: 'エントリを読み込み中',
      cachingEntries: 'エントリをキャッシュ中',
      longerLoading: '少々お待ちください',
      noEntries: 'エントリがありません',
    },
    groups: {
      other: 'その他',
      negateLabel: '%{label}以外',
    },
    table: {
      summary: undefined, // English translation: 'Summary'
      collection: undefined, // English translation: 'Collection'
    },
    defaultFields: {
      author: {
        label: '作成者',
      },
      updatedOn: {
        label: '最終更新',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: '任意',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel}は必須です。',
        regexPattern: '%{fieldLabel}が入力規則（%{pattern}）と一致しません。',
        processing: '%{fieldLabel}を処理しています。',
        range: '%{fieldLabel}は%{minValue}から%{maxValue}まで入力可能です。',
        min: '%{fieldLabel}の最小値は%{minValue}です。',
        max: '%{fieldLabel}の最大値は%{maxValue}です。',
        rangeCount: '%{fieldLabel}は%{minCount}個から%{maxCount}個まで選択してください。',
        rangeCountExact: '%{fieldLabel}はちょうど%{count}個選択してください。',
        rangeMin: '%{fieldLabel}は%{minCount}個以上選択してください。',
        rangeMax: '%{fieldLabel}は%{maxCount}個以下選択してください。',
        invalidPath: "'%{path}'は有効なパスではありません。",
        pathExists: "'%{path}'というパスはすでに存在しています。",
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: '言語: %{locale}',
        copyFromLocale: undefined, // English translation: 'Fill in from another locale'
        copyFromLocaleConfirm: undefined, // English translation: 'Do you want to fill in data from %{locale} locale?\nAll existing content will be overwritten.'
      },
    },
    editor: {
      onLeavePage: 'このページから遷移しますか？',
      onUpdatingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onUpdatingWithUnsavedChangesBody:
        '変更した項目があります。ステータスを更新する前に保存してください。',
      onPublishingNotReadyTitle: undefined, // English translation: 'Not ready to publish'
      onPublishingNotReadyBody: '公開する前に、ステータスを「準備完了」に更新してください。',
      onPublishingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onPublishingWithUnsavedChangesBody: '変更した項目があります。公開する前に保存してください。',
      onPublishingTitle: undefined, // English translation: 'Publish entry?'
      onPublishingBody: 'このエントリを公開しますか？',
      onUnpublishingTitle: undefined, // English translation: 'Unpublish entry?'
      onUnpublishingBody: 'このエントリを未公開にしますか？',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        '保存されていない変更も削除されますが、この公開エントリを削除しますか？',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'この公開エントリを削除しますか？',
      onDeleteUnpublishedChangesWithUnsavedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        '保存されていない変更も削除されますが、このエントリの未公開の変更を削除しますか？',
      onDeleteUnpublishedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesBody:
        '公開されていない変更も削除されますが、このエントリを削除しますか？',
      loadingEntry: 'エントリの読込中...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: '言語を切り替える',
      togglePreview: 'プレビュー表示を切り替える',
      toggleScrollSync: 'スクロール同期を切り替える',
    },
    editorToolbar: {
      publishing: '公開しています...',
      publish: '公開',
      published: '公開済',
      unpublish: '未公開',
      duplicate: '複製',
      unpublishing: '未公開にしています...',
      publishAndCreateNew: '公開して新規作成',
      publishAndDuplicate: '公開して複製する',
      deleteUnpublishedChanges: '未公開の変更を削除',
      deleteUnpublishedEntry: '未公開エントリを削除',
      deletePublishedEntry: '公開エントリを削除',
      deleteEntry: 'エントリを削除',
      saving: '保存中...',
      save: '保存',
      statusInfoTooltipDraft:
        'エントリのステータスは下書きに設定されています。最終決定してレビューに提出するには、ステータスを「レビュー中」に設定します。',
      statusInfoTooltipInReview:
        'エントリはレビュー中なので、それ以上のアクションは必要ありません。ただし、レビュー中でも追加の変更を行うことができます。',
      deleting: '削除しています...',
      updating: '更新しています...',
      status: 'ステータス: %{status}',
      backCollection: '%{collectionLabel}のエントリを作成中',
      unsavedChanges: '未保存',
      changesSaved: '保存済',
      draft: '下書き',
      inReview: 'レビュー中',
      ready: '準備完了',
      publishNow: '公開する',
      deployPreviewPendingButtonLabel: 'プレビューのチェック',
      deployPreviewButtonLabel: 'プレビューを見る',
      deployButtonLabel: 'ライブで見る',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: '太字',
        italic: '斜体',
        strikethrough: undefined, // English translation: 'Strikethrough'
        code: 'コード',
        codeBlock: undefined, // English translation: 'Code block'
        insertCodeBlock: undefined, // English translation: 'Insert code block'
        link: 'リンク',
        insertLink: undefined, // English translation: 'Insert link'
        paragraph: undefined, // English translation: 'Paragraph'
        headings: '見出し',
        quote: '引用',
        insertQuote: undefined, // English translation: 'Insert blockquote'
        bulletedList: '箇条書き',
        numberedList: '番号付きリスト',
        addComponent: 'コンポーネント追加',
        richText: 'リッチテキスト',
        markdown: 'マークダウン',
        type: undefined, // English translation: 'Type...'
        decreaseIndent: undefined, // English translation: 'Decrease indent'
        increaseIndent: undefined, // English translation: 'Increase indent'
        image: undefined, // English translation: 'Image'
        insertImage: undefined, // English translation: 'Insert image'
        table: {
          table: undefined, // English translation: 'Table'
          deleteColumn: undefined, // English translation: 'Delete column'
          deleteRow: undefined, // English translation: 'Delete row'
          deleteTable: undefined, // English translation: 'Delete table'
          insertColumn: undefined, // English translation: 'Insert column'
          insertRow: undefined, // English translation: 'Insert row'
          insertTable: undefined, // English translation: 'Insert table'
        },
      },
      image: {
        choose: '画像を選択',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: 'URLを入力する',
        replaceUrl: 'URLを変更する',
        promptUrl: '画像のURLを入力してください',
        chooseDifferent: '他の画像を選択',
        addMore: undefined, // English translation: 'Add more images'
        remove: '画像を削除',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: 'ファイルを選択',
        chooseUrl: 'URLを入力する',
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: 'URLを変更する',
        promptUrl: 'ファイルのURLを入力してください',
        chooseDifferent: '他のファイルを選択',
        addMore: undefined, // English translation: 'Add more files'
        remove: 'ファイルを削除',
        removeAll: undefined, // English translation: 'Remove all files'
      },
      folder: {
        choose: undefined, // English translation: 'Choose a folder'
        chooseUrl: undefined, // English translation: 'Insert folder path'
        chooseMultiple: undefined, // English translation: 'Choose folders'
        replaceUrl: undefined, // English translation: 'Replace with path'
        promptUrl: undefined, // English translation: 'Enter path of the folder'
        chooseDifferent: undefined, // English translation: 'Choose different folder'
        addMore: undefined, // English translation: 'Add more folders'
        remove: undefined, // English translation: 'Remove folder'
        removeAll: undefined, // English translation: 'Remove all folders'
      },
      unknownControl: {
        noControl: "'%{widget}'はウィジェットとして利用できません。",
      },
      unknownPreview: {
        noPreview: "'%{widget}'のウィジェットにはプレビューがありません。",
      },
      headingOptions: {
        headingOne: '見出し 1',
        headingTwo: '見出し 2',
        headingThree: '見出し 3',
        headingFour: '見出し 4',
        headingFive: '見出し 5',
        headingSix: '見出し 6',
      },
      datetime: {
        now: '現時刻',
        invalidDateTitle: undefined, // English translation: 'Invalid date'
        invalidDateBody: undefined, // English translation: 'The date you entered is invalid.'
      },
      list: {
        add: undefined, // English translation: 'Add %{item}'
        addType: undefined, // English translation: 'Add %{item}'
        noValue: undefined, // English translation: 'No value'
      },
      keyvalue: {
        key: undefined, // English translation: 'Key'
        value: undefined, // English translation: 'Value'
        uniqueKeys: undefined, // English translation: '%{keyLabel} must be unique'
      },
      code: {
        language: undefined, // English translation: 'Language'
        selectLanguage: undefined, // English translation: 'Select language'
      },
    },
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: '下書き',
      copy: 'コピー',
      copyUrl: 'URLをコピー',
      copyPath: 'パスをコピー',
      copyName: '名前をコピー',
      copied: 'コピーしました',
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: '選択しているデータを削除しますか？',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody: 'ファイルサイズが大きすぎます。\n%{size} kB 以下にしてください。',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      noResults: 'データがありません。',
      noAssetsFound: 'データがありません。',
      noImagesFound: 'データがありません。',
      private: 'プライベート',
      images: '画像',
      mediaAssets: 'メディア',
      search: '検索',
      uploading: 'アップロード中...',
      upload: 'アップロードする',
      download: 'ダウンロードする',
      deleting: '削除中...',
      deleteSelected: '削除する',
      chooseSelected: '選択する',
      dropImages: undefined, // English translation: 'Drop images to upload'
      dropFiles: undefined, // English translation: 'Drop files to upload'
    },
    folderSupport: {
      newFolder: undefined, // English translation: 'New folder'
      createNewFolder: undefined, // English translation: 'Create new folder'
      enterFolderName: undefined, // English translation: 'Enter folder name...'
      create: undefined, // English translation: 'Create'
      home: undefined, // English translation: 'Home'
      up: undefined, // English translation: 'Up'
      upToFolder: undefined, // English translation: 'Up to %{folder}'
    },
  },
  ui: {
    common: {
      yes: undefined, // English translation: 'Yes'
      no: undefined, // English translation: 'No'
      okay: undefined, // English translation: 'OK'
      cancel: undefined, // English translation: 'Cancel'
    },
    default: {
      goBackToSite: 'サイトに戻る',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'エラー',
      details: 'エラーが発生しました。',
      reportIt: 'レポートする',
      detailsHeading: '詳細',
      privacyWarning:
        'エラーメッセージとデバッグのデータがレポートする前に表示されます。\n情報が正しいことを確認し、機密データが存在する場合は削除してください。',
      recoveredEntry: {
        heading: '復旧したエントリ',
        warning: '必要あれば、このページから遷移する前にコピーしてください。',
        copyButtonLabel: 'コピーする',
      },
    },
    settingsDropdown: {
      theme: undefined, // English translation: 'Theme'
      logOut: 'ログアウト',
    },
    toast: {
      onFailToLoadEntries: 'エントリの読み込みに失敗しました。%{details}',
      onFailToLoadDeployPreview: 'プレビューの読み込みに失敗しました。%{details}',
      onFailToPersist: 'エントリの保存に失敗しました。%{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'エントリの削除に失敗しました。%{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'エントリのステータス更新に失敗しました。%{details}',
      missingRequiredField: 'すべての必須項目を入力してください。',
      entrySaved: '保存しました。',
      entryDeleted: undefined, // English translation: 'Entry delete'
      entryPublished: '公開しました。',
      entryUnpublished: '未公開にしました。',
      onFailToPublishEntry: 'エントリの公開に失敗しました。%{details}',
      onFailToUnpublishEntry: 'エントリを未公開にするのに失敗しました。%{details}',
      entryUpdated: 'エントリのステータスを更新しました。',
      onDeletePublishedEntry: undefined, // English translation: 'Published entry deleted'
      onDeleteUnpublishedChanges: '未公開の変更を削除しました。',
      onFailToAuth: '%{details}',
      onLoggedOut: 'ログアウトされています。データをバックアップし、再度ログインしてください。',
      onBackendDown: 'バックエンドのシステムが停止しています。%{details}',
    },
  },
  workflow: {
    workflow: {
      loading: 'ワークフロー内のエントリを読込中',
      workflowHeading: 'ワークフロー',
      newPost: '新規作成',
      description: '%{smart_count}件がレビュー中、%{readyCount}件が準備完了です。',
      dateFormat: 'M月D日',
    },
    workflowCard: {
      lastChange: '%{author}が%{date}に更新',
      lastChangeNoAuthor: '最終更新日：%{date}',
      lastChangeNoDate: '最終更新者：%{author}',
      deleteChanges: '変更を削除',
      deleteNewEntry: 'エントリを削除',
      publishChanges: '変更を公開',
      publishNewEntry: 'エントリを公開',
    },
    workflowList: {
      onDeleteEntry: 'このエントリを削除しますか？',
      onPublishingNotReadyEntry:
        '「準備完了」のエントリのみを公開できます。「準備完了」列にカードを移動し、ステータスを更新してください。',
      onPublishEntry: 'このエントリを公開しますか？',
      draft: '下書き',
      pending_review: 'レビュー中',
      pending_publish: '準備完了',
      currentEntries: '%{smart_count}件のエントリ',
    },
    openAuthoring: {
      forkRequired: undefined, // English translation: 'Open Authoring is enabled. We need to use a fork on your github account. (If a fork already exists, we'll use that.)'
      forkRepo: undefined, // English translation: 'Fork the repo'
      markReadyForReview: undefined, // English translation: 'Mark Ready for Review'
    },
  },
};

export default ja;
