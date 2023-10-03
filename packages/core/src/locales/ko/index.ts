import type { LocalePhrasesRoot } from '../types';

const ko: LocalePhrasesRoot = {
  auth: {
    login: '로그인',
    loggingIn: '로그인 중...',
    loginWithNetlifyIdentity: 'Netlify Identity 로 로그인',
    loginWithBitbucket: 'Bitbucket 으로 로그인',
    loginWithGitHub: 'GitHub 로 로그인',
    loginWithGitLab: 'GitLab 으로 로그인',
    loginWithGitea: 'Gitea 으로 로그인',
    errors: {
      email: '반드시 이메일을 입력해 주세요.',
      password: '암호를 입력해 주세요.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        '설정에 접근할 수 없습니다. git-gateway 백엔드 사용시 Identity service와 Git Gateway를 활성화 해야 합니다.',
    },
  },
  app: {
    header: {
      content: '콘텐츠',
      media: '미디어',
      quickAdd: '빠른 추가',
    },
    app: {
      errorHeader: 'CMS 구성을 불러오는 중 오류가 발생했습니다.',
      configErrors: '구성 오류',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'config.yml 파일을 확인하세요.',
      loadingConfig: '구성 불러오는 중...',
      waitingBackend: '백엔드 기다리는 중...',
    },
    notFoundPage: {
      header: '찾을 수 없음',
    },
  },
  collection: {
    sidebar: {
      collections: '컬렉션',
      allCollections: '모든 컬렉션',
      searchAll: '모든 컬렉션에서 검색',
      searchIn: '다음 컬렉션에서 검색',
    },
    collectionTop: {
      sortBy: '정렬 기준',
      viewAs: '다음으로 보기',
      newButton: '새 %{collectionLabel} 항목',
      ascending: '오름차순',
      descending: '내림차순',
      searchResults: '"%{searchTerm}"에 대한 검색결과',
      searchResultsInCollection: '%{collection} 컬랙션에서 "%{searchTerm}"에 대한 검색결과',
      filterBy: '필터 기준',
      groupBy: undefined, // English translation: 'Group by'
    },
    entries: {
      loadingEntries: '항목 불러오는 중...',
      cachingEntries: '항목 캐시 중...',
      longerLoading: '몇 분 정도 걸릴 수 있습니다.',
      noEntries: '항목 없음',
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
        label: '저자',
      },
      updatedOn: {
        label: '업데이트 시각',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: '선택사항',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} 은(는) 필수입니다.',
        regexPattern: '%{fieldLabel} 이(가) %{pattern} 패턴과 일치하지 않습니다.',
        processing: '%{fieldLabel} 은(는) 처리중 입니다.',
        range: '%{fieldLabel} 은(는) 반드시 %{minValue} 에서 %{maxValue} 사이여야 합니다.',
        min: '%{fieldLabel} 은(는) 적어도 %{minValue} 이상 이여야 합니다.',
        max: '%{fieldLabel} 은(는) 최대 %{maxValue} 여야 합니다.',
        rangeCount: '%{fieldLabel} 개수는 %{minCount} 개 에서 %{maxCount} 개 사이여야 합니다.',
        rangeCountExact: '%{fieldLabel} 개수는 정확히 %{count} 개 여야 합니다.',
        rangeMin: '%{fieldLabel} 개수는 적어도 %{minCount} 개 이상 이여야 합니다.',
        rangeMax: '%{fieldLabel} 개수는 최대 %{maxCount} 개 여야 합니다.',
        invalidPath: "'%{path}' 은(는) 올바른 경로가 아닙니다.",
        pathExists: "'%{path}' 경로가 이미 존재합니다.",
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: undefined, // English translation: 'Writing in %{locale}'
      },
    },
    editor: {
      onLeavePage: '이 페이지를 떠나시겠습니까?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        '현재 세션에서의 저장되지 않은 변경사항과 이 게시된 항목을 삭제하시겠습니까?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: '이 게시된 항목을 삭제하시겠습니까?',
      loadingEntry: '항목 불러오는 중...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: undefined, // English translation: 'Toggle i18n'
      togglePreview: undefined, // English translation: 'Toggle preview'
      toggleScrollSync: undefined, // English translation: 'Sync scrolling'
    },
    editorToolbar: {
      publish: '게시',
      published: '게시됨',
      duplicate: '복제',
      publishAndCreateNew: '게시하고 새로 만들기',
      publishAndDuplicate: '게시하고 복제',
      deleteEntry: '항목 삭제',
      publishNow: '지금 게시',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: undefined, // English translation: 'Bold'
        italic: undefined, // English translation: 'Italic'
        code: undefined, // English translation: 'Code'
        link: undefined, // English translation: 'Link'
        linkPrompt: undefined, // English translation: 'Enter the URL of the link'
        headings: undefined, // English translation: 'Headings'
        quote: undefined, // English translation: 'Quote'
        bulletedList: undefined, // English translation: 'Bulleted List'
        numberedList: undefined, // English translation: 'Numbered List'
        addComponent: undefined, // English translation: 'Add Component'
        richText: '리치 텍스트',
        markdown: '마크다운',
        type: undefined, // English translation: 'Type...'
      },
      image: {
        choose: '이미지 선택',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: undefined, // English translation: 'Insert from URL'
        replaceUrl: undefined, // English translation: 'Replace with URL'
        promptUrl: undefined, // English translation: 'Enter the URL of the image'
        chooseDifferent: '다른 이미지 선택',
        addMore: undefined, // English translation: 'Add more images'
        remove: '이미지 삭제',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: '파일 선택',
        chooseUrl: undefined, // English translation: 'Insert from URL'
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: undefined, // English translation: 'Replace with URL'
        promptUrl: undefined, // English translation: 'Enter the URL of the file'
        chooseDifferent: '다른 파일 선택',
        addMore: undefined, // English translation: 'Add more files'
        remove: '파일 삭제',
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
        noControl: "'%{widget}' 위젝에 대한 컨트롤이 없습니다.",
      },
      unknownPreview: {
        noPreview: "'%{widget}' 위젯에 대한 미리보기가 없습니다.",
      },
      headingOptions: {
        headingOne: '제목 1',
        headingTwo: '제목 2',
        headingThree: '제목 3',
        headingFour: '제목 4',
        headingFive: '제목 5',
        headingSix: '제목 6',
      },
      datetime: {
        now: '현재시각',
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
      draft: '초안',
      copy: undefined, // English translation: 'Copy'
      copyUrl: undefined, // English translation: 'Copy URL'
      copyPath: undefined, // English translation: 'Copy Path'
      copyName: undefined, // English translation: 'Copy Name'
      copied: undefined, // English translation: 'Copied'
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: '선택하신 미디어를 삭제하시겠습니까?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody:
        '파일이 너무 큽니다.\n%{size} kB 보다 큰 파일을 허용하지 않도록 구성되어 있습니다.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      loading: '불러오는 중...',
      noResults: '일치 항목 없음.',
      noAssetsFound: '발견된 에셋 없음.',
      noImagesFound: '발견된 이미지 없음.',
      images: '이미지',
      mediaAssets: '미디어 에셋',
      search: '검색...',
      uploading: '업로드 중...',
      upload: '업로드',
      download: '다운로드',
      deleting: '삭제 중...',
      deleteSelected: '선택항목 삭제',
      chooseSelected: '선택한 것으로 결정',
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
      goBackToSite: '사이트로 돌아가기',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: '오류',
      details: '오류가 발생했습니다.',
      reportIt: 'GitHub에서 이슈를 열어 보고해 주세요.',
      detailsHeading: '자세한 내용',
      privacyWarning:
        '이슈를 열면 사전에 오류 메시지와 디버깅 데이터로 채워집니다.\n정보가 올바른지 확인하시고 민감한 정보가 있다면 지워주세요.',
      recoveredEntry: {
        heading: '복구된 문서',
        warning: '다른 곳으로 가시기 전에 이 내용을 꼭 복사해두세요!',
        copyButtonLabel: '클립보드로 복사',
      },
    },
    settingsDropdown: {
      darkMode: undefined, // English translation: 'Dark Mode'
      logOut: '로그아웃',
    },
    toast: {
      onFailToLoadEntries: '항목 불러오기 실패: %{details}',
      onFailToPersist: '항목 저장 실패: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: '항목 삭제 실패: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: '상태 업데이트 실패: %{details}',
      missingRequiredField: '이런! 필수 필드를 놓치셨습니다. 저장하기 전에 먼저 채우세요.',
      entrySaved: '항목 저장됨',
      entryPublished: '항목 게시됨',
      onFailToPublishEntry: '게시 실패: %{details}',
      entryUpdated: '항목 상태 업데이트됨',
      onFailToAuth: '%{details}',
      onLoggedOut: '로그아웃 하셨습니다, 데티어를 백업하시고 다시 로그인 하세요.',
      onBackendDown:
        '백엔드 서비스가 장애를 겪고 있습니다. 자세한 사항은 %{details} 을(를) 참고하세요.',
    },
  },
};

export default ko;
