import type { LocalePhrasesRoot } from '../types';

const vi: LocalePhrasesRoot = {
  auth: {
    login: 'Đăng nhập',
    loggingIn: 'Đang đăng nhập...',
    loginWithNetlifyIdentity: 'Đăng nhập bằng Netlify Identity',
    loginWithBitbucket: 'Đăng nhập bằng Bitbucket',
    loginWithGitHub: 'Đăng nhập bằng GitHub',
    loginWithGitLab: 'Đăng nhập bằng GitLab',
    loginWithGitea: 'Đăng nhập bằng Gitea',
    errors: {
      email: 'Hãy nhập email của bạn.',
      password: 'Hãy nhập mật khẩu của bạn.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: undefined, // English translation: '%{details}'
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        'Không thể truy cập thiêt lập danh tính. Hãy chắc chắn rằng bạn đã bật dịch vụ Identity và Git Gateway khi sử dụng git-gateway.',
    },
  },
  app: {
    header: {
      content: 'Nội dung',
      media: 'Tập tin',
      quickAdd: 'Tạo nhanh',
    },
    app: {
      errorHeader: 'Xảy ra lỗi khi tải cấu hình CMS',
      configErrors: 'Lỗi cấu hình',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'Kiểm tra lại file config.yml của bạn.',
      loadingConfig: 'Đang tải cấu hình...',
      waitingBackend: 'Đang chờ backend...',
    },
    notFoundPage: {
      header: 'Không tìm thấy',
    },
  },
  collection: {
    sidebar: {
      collections: 'Bộ sưu tập',
      allCollections: 'Tất cả bộ sưu tập',
      searchAll: 'Tìm kiếm tất cả',
      searchIn: 'Tìm kiếm trong',
    },
    collectionTop: {
      sortBy: 'Sắp xếp theo',
      viewAs: 'View as',
      newButton: '%{collectionLabel} mới',
      ascending: 'Tăng dần',
      descending: 'Giảm dần',
      searchResults: 'Kết quả tìm kiếm cho "%{searchTerm}"',
      searchResultsInCollection: 'Kết quả tìm kiếm cho "%{searchTerm}" trong %{collection}',
      filterBy: 'Lọc theo',
      groupBy: undefined, // English translation: 'Group by'
    },
    entries: {
      loadingEntries: 'Đang tải...',
      cachingEntries: 'Đang lưu...',
      longerLoading: 'Sẽ mất vài phút',
      noEntries: 'Không có mục nào',
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
        label: 'Tác giả',
      },
      updatedOn: {
        label: 'Ngày cập nhật',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'không bắt buộc',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} bắt buộc nhập.',
        regexPattern: '%{fieldLabel} không khớp với mẫu: %{pattern}.',
        processing: '%{fieldLabel} đang xử lý.',
        range: '%{fieldLabel} phải nằm trong khoảng từ %{minValue} đến %{maxValue}.',
        min: '%{fieldLabel} phải ít nhất %{minValue}.',
        max: '%{fieldLabel} tối đa %{maxValue} hoặc ít hơn.',
        rangeCount: '%{fieldLabel} phải nằm trong khoảng từ %{minCount} đến %{maxCount} mục.',
        rangeCountExact: '%{fieldLabel} phải có %{count} mục.',
        rangeMin: '%{fieldLabel} phải có ít nhất %{minCount} mục.',
        rangeMax: '%{fieldLabel} phải có tối đa %{maxCount} mục hoặc ít hơn.',
        invalidPath: "Đường dẫn '%{path}' không hợp lệ",
        pathExists: "Đường dẫn '%{path}' đã tồn tại",
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: undefined, // English translation: 'Writing in %{locale}'
      },
    },
    editor: {
      onLeavePage: 'Bạn có chắc rằng bạn muốn rời khỏi trang này?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Bạn có chắc rằng bạn muốn xoá mục đã được công bố này, cũng như là những thay đổi chưa lưu của bạn trong phiên làm việc này?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Bạn có chắc rằng bạn muốn xoá mục đã được công bố này?',
      loadingEntry: 'Đang tải...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: undefined, // English translation: 'Toggle i18n'
      togglePreview: undefined, // English translation: 'Toggle preview'
      toggleScrollSync: undefined, // English translation: 'Sync scrolling'
    },
    editorToolbar: {
      publish: 'Công bố',
      published: 'Đã công bố',
      duplicate: 'Sao chép',
      publishAndCreateNew: 'Công bố và tạo mới',
      publishAndDuplicate: 'Công bố và sao chép',
      deleteEntry: 'Xoá mục này',
      publishNow: 'Công bố ngay',
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
        richText: 'Văn bản định dạng',
        markdown: 'Markdown',
        type: undefined, // English translation: 'Type...'
      },
      image: {
        choose: 'Chọn một hình',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: undefined, // English translation: 'Insert from URL'
        replaceUrl: undefined, // English translation: 'Replace with URL'
        promptUrl: undefined, // English translation: 'Enter the URL of the image'
        chooseDifferent: 'Chọn hình khác',
        addMore: undefined, // English translation: 'Add more images'
        remove: 'Gỡ bỏ hình',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: 'Chọn một tập tin',
        chooseUrl: undefined, // English translation: 'Insert from URL'
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: undefined, // English translation: 'Replace with URL'
        promptUrl: undefined, // English translation: 'Enter the URL of the file'
        chooseDifferent: 'Chọn tập tin khác',
        addMore: undefined, // English translation: 'Add more files'
        remove: 'Gỡ bỏ tập tin',
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
        noControl: "Không tìm thấy control cho widget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Không tìm thấy preview cho widget '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Tiêu đề cấp 1',
        headingTwo: 'Tiêu đề cấp 2',
        headingThree: 'Tiêu đề cấp 3',
        headingFour: 'Tiêu đề cấp 4',
        headingFive: 'Tiêu đề cấp 5',
        headingSix: 'Tiêu đề cấp 6',
      },
      datetime: {
        now: 'Ngay lúc này',
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
      draft: 'Bản nháp',
      copy: undefined, // English translation: 'Copy'
      copyUrl: undefined, // English translation: 'Copy URL'
      copyPath: undefined, // English translation: 'Copy Path'
      copyName: undefined, // English translation: 'Copy Name'
      copied: undefined, // English translation: 'Copied'
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'Bạn có chắc rằng bạn muốn xoá tập tin này?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody:
        'Tập tin quá lớn.\nCấu hình không cho phép những tập tin lớn hơn %{size} kB.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      loading: 'Đang tải...',
      noResults: 'Không có kết quả.',
      noAssetsFound: 'Không tìm thấy tập tin nào.',
      noImagesFound: 'Không tìm thấy hình nào.',
      images: 'Hình ảnh',
      mediaAssets: 'Tập tin',
      search: 'Tìm kiếm...',
      uploading: 'Đang tải lên...',
      upload: 'Tải lên',
      download: 'Tải về',
      deleting: 'Đang xoá...',
      deleteSelected: 'Xoá những cái đã chọn',
      chooseSelected: 'Lấy những cái đã chọn',
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
      goBackToSite: 'Quay về trang web',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'Lỗi',
      details: 'Đã xảy ra lỗi - xin hãy ',
      reportIt: 'tạo một issue trên GitHub.',
      detailsHeading: 'Chi tiết',
      privacyWarning:
        'Tạo một issue với nội dung lỗi và dữ liệu debug được nhập sẵn.\nHãy xác nhận những thông tin này là đúng và gỡ bỏ dữ liệu nhạy cảm nếu cần thiết.',
      recoveredEntry: {
        heading: 'Tài liệu đã được phục hồi',
        warning: 'Hãy sao chép/dán nội dung này ở đâu đó trước khi chuyển sang trang khác!',
        copyButtonLabel: 'Sao chép vào vùng nhớ',
      },
    },
    settingsDropdown: {
      darkMode: undefined, // English translation: 'Dark Mode'
      logOut: 'Đăng xuất',
    },
    toast: {
      onFailToLoadEntries: 'Không thể tải mục: %{details}',
      onFailToPersist: 'Không thể giữ lại mục: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Không thể xoá mục: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Không thể cập nhật trạng thái: %{details}',
      missingRequiredField: 'Bạn còn thiếu vài thông tin bắt buộc. Hãy hoàn thành trước khi lưu.',
      entrySaved: 'Mục đã được lưu',
      entryPublished: 'Mục đã được công bố',
      onFailToPublishEntry: 'Không thể công bố: %{details}',
      entryUpdated: 'Trạng thái của mục đã được cập nhật',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Bạn đã đăng xuất, hãy sao lưu dữ liệu và đăng nhập lại',
      onBackendDown: 'Dịch vụ backend đang gặp trục trặc. Hãy xem {details} để biết thêm thông tin',
    },
  },
};

export default vi;
