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
      media: '媒體',
      quickAdd: '快速新增',
    },
    app: {
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
      },
    },
    editor: {
      onLeavePage: '您確定要離開這頁嗎？',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody: '你確定要刪除這篇已發布的內容以及你尚未儲存的變更？',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: '你確定要刪除這篇已發布的內容？',
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
      publish: '發布',
      published: '已發布',
      duplicate: '建立新內容',
      publishAndCreateNew: '發布並建立內容',
      publishAndDuplicate: '發布並複製內容',
      deleteEntry: '刪除內容',
      publishNow: '立即發布',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: '粗體',
        italic: '斜體',
        code: '程式碼',
        link: '連結',
        linkPrompt: '輸入連結網址',
        headings: '標題',
        quote: '引言',
        bulletedList: '項目符號清單',
        numberedList: '編號清單',
        addComponent: '加入元件',
        richText: 'Rich Text',
        markdown: 'Markdown',
        type: undefined, // English translation: 'Type...'
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
      loading: '載入中...',
      noResults: '沒有結果',
      noAssetsFound: '沒有發現媒體資產。',
      noImagesFound: '沒有發現影像。',
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
      darkMode: undefined, // English translation: 'Dark Mode'
      logOut: '登出',
    },
    toast: {
      onFailToLoadEntries: '無法載入內容： %{details}',
      onFailToPersist: '無法暫存內容： %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: '無法刪除內容： %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: '無法更新狀態： %{details}',
      missingRequiredField: '糟了！你漏填了一個必須填入的欄位，在儲存前請先填完所有內容',
      entrySaved: '已儲存內容',
      entryPublished: '已發布內容',
      onFailToPublishEntry: '無法發布： %{details}',
      entryUpdated: '內容狀態已更新',
      onFailToAuth: '%{details}',
      onLoggedOut: '你已經登出，請備份任何資料然後重新登入',
      onBackendDown: '後端服務發生中斷。看 %{details} 取得更多資訊',
    },
  },
};

export default zh_Hant;
