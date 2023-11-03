import type { LocalePhrasesRoot } from '../types';

const zh_Hant: LocalePhrasesRoot = {
  auth: {
    login: '登入',
    loggingIn: '正在登入...',
    loginWithNetlifyIdentity: '使用你的 Netlify 帳號來進行登入',
    loginWithBitbucket: '使用你的 Bitbucket 帳號來進行登入',
    loginWithGitHub: '使用你的 GitHub 帳號來進行登入',
    loginWithGitLab: '使用你的 GitLab 帳號來進行登入',
    loginWithGitea: '使用你的 Gitea 帳號來進行登入',
    errors: {
      email: '請確認你已經輸入你的電子郵件。',
      password: '請輸入你的密碼。',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        '無法連接認證系統！當使用 git-gateway 作為後端資料庫時，請確認您已開啟認證服務及 Git Gateway。',
    },
  },
  app: {
    header: {
      content: '內容',
      workflow: '作業流程',
      media: '媒體',
      quickAdd: '快速新增',
    },
    app: {
      loading: '載入中...',
      errorHeader: '載入 CMS 設定時發生錯誤',
      configErrors: '設定錯誤',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: '請確認你的 config.yml 設定檔的內容是否正確',
      loadingConfig: '正在載入設定...',
      waitingBackend: '正在等待後端資料連接...',
    },
    notFoundPage: {
      header: '找不到頁面',
    },
  },
  collection: {
    sidebar: {
      collections: '集合',
      allCollections: '所有集合',
      searchAll: '尋找所有集合',
      searchIn: '搜尋範圍',
    },
    collectionTop: {
      sortBy: '排序方式',
      viewAs: '瀏覽方式',
      newButton: '新增 %{collectionLabel}',
      ascending: '由小到大',
      descending: '由大到小',
      searchResults: '搜尋 "%{searchTerm}" 的結果',
      searchResultsInCollection: '在 %{collection} 中搜尋 %{searchTerm}" 的結果',
      filterBy: '篩選方式',
      groupBy: undefined, // English translation: 'Group by'
    },
    entries: {
      loadingEntries: '載入內容',
      cachingEntries: '快取內容',
      longerLoading: '這可能需要幾分鐘的時間',
      noEntries: '沒有內容',
    },
    groups: {
      other: undefined, // English translation: 'Other'
      negateLabel: undefined, // English translation: 'Not %{label}'
    },
    table: {
      summary: undefined, // English translation: 'Summary'
      collection: undefined, // English translation: 'Collection'
    },
    defaultFields: {
      author: {
        label: '作者',
      },
      updatedOn: {
        label: '更新於',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: '選填',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} 是必須的。',
        regexPattern: '%{fieldLabel} 並不符合 %{pattern} 的型態',
        processing: '%{fieldLabel} 正在處理',
        range: '%{fieldLabel} 必須介於 %{minValue} 和 %{maxValue} 之間',
        min: '%{fieldLabel} 必須至少為 %{minValue}',
        max: '%{fieldLabel} 必須小於或等於 %{maxValue}',
        rangeCount: '%{fieldLabel} 必須有 %{minCount} 到 %{maxCount} 個項目。',
        rangeCountExact: '%{fieldLabel} 必須正好有 %{count} 個項目。',
        rangeMin: '%{fieldLabel} 必須至少有 %{minCount} 個項目。',
        rangeMax: '%{fieldLabel} 最多只能有 %{maxCount} 個項目。',
        invalidPath: "'%{path}' 不是有效的路徑",
        pathExists: "路徑 '%{path}' 已經存在",
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: '以 %{locale} 書寫',
        copyFromLocale: undefined, // English translation: 'Fill in from another locale'
        copyFromLocaleConfirm: undefined, // English translation: 'Do you want to fill in data from %{locale} locale?\nAll existing content will be overwritten.'
      },
    },
    editor: {
      onLeavePage: '您確定要離開這頁嗎？',
      onUpdatingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onUpdatingWithUnsavedChangesBody: '您有未儲存的變更，在更新狀態前請先進行儲存。',
      onPublishingNotReadyTitle: undefined, // English translation: 'Not ready to publish'
      onPublishingNotReadyBody: '在發布前，請先將狀態設定為：預備發布。',
      onPublishingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onPublishingWithUnsavedChangesBody: '您有未儲存的變更，在發布前請先進行儲存。',
      onPublishingTitle: undefined, // English translation: 'Publish entry?'
      onPublishingBody: '你確定要發表此內容嗎？',
      onUnpublishingTitle: undefined, // English translation: 'Unpublish entry?'
      onUnpublishingBody: '你確定要取消發表此內容嗎？',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody: '你確定要刪除這篇已發布的內容以及你尚未儲存的變更？',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: '你確定要刪除這篇已發布的內容？',
      onDeleteUnpublishedChangesWithUnsavedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        '這將會刪除此內容所有未發布的變更，以及未儲存的變更。你確定還是要刪除？',
      onDeleteUnpublishedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesBody: '此內容所有未發布的變更都將會被刪除。你確定還是要刪除？',
      loadingEntry: '載入內容中...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: undefined, // English translation: 'Toggle i18n'
      togglePreview: undefined, // English translation: 'Toggle preview'
      toggleScrollSync: undefined, // English translation: 'Sync scrolling'
    },
    editorToolbar: {
      publishing: '發布中...',
      publish: '發布',
      published: '已發布',
      unpublish: '取消發布',
      duplicate: '建立新內容',
      unpublishing: '取消發布中...',
      publishAndCreateNew: '發布並建立內容',
      publishAndDuplicate: '發布並複製內容',
      deleteUnpublishedChanges: '刪除未發布的變更',
      deleteUnpublishedEntry: '刪除未發布的內容',
      deletePublishedEntry: '刪除已發布的內容',
      deleteEntry: '刪除內容',
      saving: '儲存中...',
      save: '儲存',
      statusInfoTooltipDraft: undefined, // English translation: 'Entry status is set to draft. To finalize and submit it for review, set the status to �In review�'
      statusInfoTooltipInReview: undefined, // English translation: 'Entry is being reviewed, no further actions are required. However, you can still make additional changes while it is being reviewed.'
      deleting: '刪除中...',
      updating: '更新中...',
      status: '狀態: %{status}',
      backCollection: '在集合 %{collectionLabel} 新增內容',
      unsavedChanges: '未儲存變更',
      changesSaved: '已儲存變更',
      draft: '草稿',
      inReview: '正在審核',
      ready: '預備發布',
      publishNow: '立即發布',
      deployPreviewPendingButtonLabel: '點擊來進行預覽',
      deployPreviewButtonLabel: '進行預覽',
      deployButtonLabel: '觀看已發布的內容',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: '粗體',
        italic: '斜體',
        strikethrough: undefined, // English translation: 'Strikethrough'
        code: '程式碼',
        codeBlock: undefined, // English translation: 'Code block'
        insertCodeBlock: undefined, // English translation: 'Insert code block'
        link: '連結',
        insertLink: undefined, // English translation: 'Insert link'
        paragraph: undefined, // English translation: 'Paragraph'
        headings: '標題',
        quote: '引言',
        insertQuote: undefined, // English translation: 'Insert blockquote'
        bulletedList: '項目符號清單',
        numberedList: '編號清單',
        addComponent: '加入元件',
        richText: 'Rich Text',
        markdown: 'Markdown',
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
        choose: '選擇一張圖片',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: undefined, // English translation: 'Insert from URL'
        replaceUrl: undefined, // English translation: 'Replace with URL'
        promptUrl: undefined, // English translation: 'Enter the URL of the image'
        chooseDifferent: '選擇其他圖片',
        addMore: undefined, // English translation: 'Add more images'
        remove: '刪除圖片',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: '選擇一個檔案',
        chooseUrl: undefined, // English translation: 'Insert from URL'
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: undefined, // English translation: 'Replace with URL'
        promptUrl: undefined, // English translation: 'Enter the URL of the file'
        chooseDifferent: '選擇其他檔案',
        addMore: undefined, // English translation: 'Add more files'
        remove: '刪除檔案',
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
        noControl: "無法控制元件： '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "無法預覽元件： '%{widget}'.",
      },
      headingOptions: {
        headingOne: '標題 1',
        headingTwo: '標題 2',
        headingThree: '標題 3',
        headingFour: '標題 4',
        headingFive: '標題 5',
        headingSix: '標題 6',
      },
      datetime: {
        now: '現在',
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
      draft: '草稿',
      copy: undefined, // English translation: 'Copy'
      copyUrl: undefined, // English translation: 'Copy URL'
      copyPath: undefined, // English translation: 'Copy Path'
      copyName: undefined, // English translation: 'Copy Name'
      copied: undefined, // English translation: 'Copied'
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: '你確定要刪除已選擇的媒體嗎？',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody: '檔案太大。\n已設定不允許大於 %{size} kB 的檔案。',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      noResults: '沒有結果',
      noAssetsFound: '沒有發現媒體資產。',
      noImagesFound: '沒有發現影像。',
      private: '私人',
      images: '影像',
      mediaAssets: '媒體資產',
      search: '搜尋中...',
      uploading: '上傳中...',
      upload: '上傳新內容',
      download: '下載',
      deleting: '刪除中...',
      deleteSelected: '刪除已選擇的項目',
      chooseSelected: '選擇已選擇的項目',
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
      goBackToSite: '回到網站',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: '錯誤',
      details: '發生錯誤！請 ',
      reportIt: '回報錯誤',
      detailsHeading: '細節',
      privacyWarning:
        '建立 issue，並加上錯誤訊息及除錯資訊。\n請確認資訊正確，敏感資料也已經去除。',
      recoveredEntry: {
        heading: '已恢復的內容',
        warning: '在你離開本頁前，請將此處的內容複製貼上到其他地方來進行備份！',
        copyButtonLabel: '複製到剪貼簿',
      },
    },
    settingsDropdown: {
      theme: undefined, // English translation: 'Theme'
      logOut: '登出',
    },
    toast: {
      onFailToLoadEntries: '無法載入內容： %{details}',
      onFailToLoadDeployPreview: '無法預覽內容： %{details}',
      onFailToPersist: '無法暫存內容： %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: '無法刪除內容： %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: '無法更新狀態： %{details}',
      missingRequiredField: '糟了！你漏填了一個必須填入的欄位，在儲存前請先填完所有內容',
      entrySaved: '已儲存內容',
      entryDeleted: undefined, // English translation: 'Entry delete'
      entryPublished: '已發布內容',
      entryUnpublished: '已取消發布內容',
      onFailToPublishEntry: '無法發布： %{details}',
      onFailToUnpublishEntry: '無法取消發布： %{details}',
      entryUpdated: '內容狀態已更新',
      onDeletePublishedEntry: undefined, // English translation: 'Published entry deleted'
      onDeleteUnpublishedChanges: '已刪除未發布的變更',
      onFailToAuth: '%{details}',
      onLoggedOut: '你已經登出，請備份任何資料然後重新登入',
      onBackendDown: '後端服務發生中斷。看 %{details} 取得更多資訊',
    },
  },
  workflow: {
    workflow: {
      dashboard: undefined, // English translation: 'Dashboard'
      loading: '正在載入編輯流程的內容',
      workflowHeading: '編輯作業流程',
      newPost: '建立新的內容',
      description:
        '%{smart_count} 篇內容正在等待審核， %{readyCount} 篇已經準備進行發布。 |||| %{smart_count} 篇內容正在等待審核， %{readyCount} 篇已經準備進行發布。',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date} by %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: 'by %{author}',
      deleteChanges: '刪除變更',
      deleteNewEntry: '刪除新內容',
      publishChanges: '發布變更',
      publishNewEntry: '發布新內容',
    },
    workflowList: {
      onDeleteEntry: '你確定要刪除這個項目嗎？',
      onPublishingNotReadyEntry:
        '只有狀態為 預備發布 的內容可以被發布，請將本內容的狀態設定為 預備發布 來進行發布前的準備',
      onPublishEntry: '你確定要發表這篇內容嗎？',
      draft: '草稿',
      pending_review: '正在預覽',
      pending_publish: '準備完成',
      currentEntries: '%{smart_count} 篇內容 |||| %{smart_count} 篇內容',
    },
    openAuthoring: {
      forkRequired: undefined, // English translation: 'Open Authoring is enabled. We need to use a fork on your github account. (If a fork already exists, we'll use that.)'
      forkRepo: undefined, // English translation: 'Fork the repo'
      markReadyForReview: undefined, // English translation: 'Mark Ready for Review'
    },
  },
};

export default zh_Hant;
