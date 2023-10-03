import type { LocalePhrasesRoot } from '../types';

const ru: LocalePhrasesRoot = {
  auth: {
    login: 'Войти',
    loggingIn: 'Вхожу...',
    loginWithNetlifyIdentity: 'Войти через Netlify Identity',
    loginWithBitbucket: 'Войти через Bitbucket',
    loginWithGitHub: 'Войти через GitHub',
    loginWithGitLab: 'Войти через GitLab',
    loginWithGitea: 'Войти через Gitea',
    errors: {
      email: 'Введите ваш email.',
      password: 'Введите пароль.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        'Нет доступа к настройкам. Если используете git-gateway, убедитесь, что включили Identity service и Git Gateway.',
    },
  },
  app: {
    header: {
      content: 'Записи',
      media: 'Медиафайлы',
      quickAdd: 'Быстрое добавление',
    },
    app: {
      errorHeader: 'Ошибка загрузки конфигурации CMS',
      configErrors: 'Ошибки конфигурации',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'Проверьте свой config.yml файл.',
      loadingConfig: 'Загрузка конфигурации…',
      waitingBackend: 'Ожидание ответа от бэкенда…',
    },
    notFoundPage: {
      header: 'Не найден',
    },
  },
  collection: {
    sidebar: {
      collections: 'Коллекции',
      allCollections: 'Все коллекции',
      searchAll: 'Искать повсюду',
      searchIn: 'Искать в',
    },
    collectionTop: {
      sortBy: 'Сортировать по',
      viewAs: 'Вид',
      newButton: 'Создать %{collectionLabel}',
      ascending: 'По возрастанию',
      descending: 'По убывания',
      searchResults: 'Результаты по запросу "%{searchTerm}"',
      searchResultsInCollection: 'Результаты по запросу "%{searchTerm}" в %{collection}',
      filterBy: 'Фильтровать по',
      groupBy: 'Группировать по',
    },
    entries: {
      loadingEntries: 'Загрузка записей…',
      cachingEntries: 'Кэширование записей…',
      longerLoading: 'Это может занять несколько минут',
      noEntries: 'Нет записей',
    },
    groups: {
      other: 'Другая',
      negateLabel: 'Не %{label}',
    },
    table: {
      summary: undefined, // English translation: 'Summary'
      collection: undefined, // English translation: 'Collection'
    },
    defaultFields: {
      author: {
        label: 'Автор',
      },
      updatedOn: {
        label: 'Обновлено',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'необязательный',
      },
    },
    editorControlPane: {
      widget: {
        required: 'Необходимо указать значение поля %{fieldLabel}.',
        regexPattern: 'Значение поля %{fieldLabel} не соответствует шаблону: %{pattern}.',
        processing: 'Значение поля %{fieldLabel} обрабатывается…',
        range: 'Значение поля %{fieldLabel} должно быть между %{minValue} и %{maxValue}.',
        min: 'Значение поля %{fieldLabel} должно быть не менее %{minValue}.',
        max: 'Значение поля %{fieldLabel} должно быть %{maxValue} или менее.',
        rangeCount: '%{fieldLabel} должно содержать от %{minCount} до %{maxCount} элементов.',
        rangeCountExact: '%{fieldLabel} должно содержать строго %{count} элементов.',
        rangeMin: '%{fieldLabel} должно содержать не менее %{minCount} элементов.',
        rangeMax: '%{fieldLabel} должно содержать %{maxCount} или менее элементов.',
        invalidPath: "Путь '%{path}' содежрит ошибки",
        pathExists: "Путь '%{path}' уже существует",
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: 'Пишем на %{locale}',
      },
    },
    editor: {
      onLeavePage: 'Вы уверены, что хотите покинуть эту страницу?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Вы уверены, что хотите удалить эту опубликованную запись, а также несохраненные изменения из текущего сеанса?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Вы уверены, что хотите удалить эту опубликованную запись?',
      loadingEntry: 'Загрузка записи…',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: undefined, // English translation: 'Toggle i18n'
      togglePreview: undefined, // English translation: 'Toggle preview'
      toggleScrollSync: undefined, // English translation: 'Sync scrolling'
    },
    editorToolbar: {
      publish: 'Опубликовать',
      published: 'Опубликовано',
      duplicate: 'Дублировать',
      publishAndCreateNew: 'Опубликовать и создать новую',
      publishAndDuplicate: 'Опубликовать и дублировать',
      deleteEntry: 'Удалить запись',
      publishNow: 'Опубликовать сейчас',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Полужиный',
        italic: 'Курсив',
        code: 'Код',
        link: 'Ссылка',
        linkPrompt: 'Укажите URL ссылки',
        headings: 'Заголовки',
        quote: 'Цитата',
        bulletedList: 'Маркированный список',
        numberedList: 'Нумерованный список',
        addComponent: 'Добавить компонент',
        richText: 'Форматированный текст',
        markdown: 'Markdown',
        type: undefined, // English translation: 'Type...'
      },
      image: {
        choose: 'Выберите изображение',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: 'Вставить из URL',
        replaceUrl: 'Заменить на URL',
        promptUrl: 'Введите URL изображения',
        chooseDifferent: 'Выберите другое изображение',
        addMore: undefined, // English translation: 'Add more images'
        remove: 'Удалить изображение',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: 'Выберите файл',
        chooseUrl: 'Вставить из URL',
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: 'Заменить на URL',
        promptUrl: 'Введите URL файла',
        chooseDifferent: 'Выберите другой файл',
        addMore: undefined, // English translation: 'Add more files'
        remove: 'Удалить файл',
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
        noControl: "Нет контрола для виджета '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Нет превью для виджета '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Heading 1',
        headingTwo: 'Heading 2',
        headingThree: 'Heading 3',
        headingFour: 'Heading 4',
        headingFive: 'Heading 5',
        headingSix: 'Heading 6',
      },
      datetime: {
        now: 'Сейчас',
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
      draft: 'Черновик',
      copy: 'Копировать',
      copyUrl: 'Копировать URL',
      copyPath: 'Копировать путь',
      copyName: 'Копировать имя',
      copied: 'Скопировано',
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'Вы уверены, что хотите удалить выбранный медиафайл?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody:
        'Файл слишком большой.\nНастройки не позволяют сохранять файлы более %{size} kB.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      loading: 'Загрузка медифайлов…',
      noResults: 'Нет результатов.',
      noAssetsFound: 'Ресурсы не найдены.',
      noImagesFound: 'Изображения не найдены.',
      images: 'Изображения',
      mediaAssets: 'Медиаресурсы',
      search: 'Идёт поиск…',
      uploading: 'Загрузка…',
      upload: 'Загрузить новый',
      download: 'Скачать',
      deleting: 'Удаление…',
      deleteSelected: 'Удалить помеченные',
      chooseSelected: 'Выбрать помеченные',
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
      goBackToSite: 'Вернуться на сайт',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'Ошибка',
      details: 'Произошла ошибка. Пожалуйста, ',
      reportIt: 'сообщите о ней.',
      detailsHeading: 'Подробности',
      privacyWarning:
        'При открытии тикет автоматически предзаполняется сообщением об ошибке и отладочной информацией.\nПожалуйста, проверьте, что данные верны и не содержат конфиденциальной информации.',
      recoveredEntry: {
        heading: 'Восстановленный документ',
        warning: 'Пожалуйста, скопируйте это сообщение куда-нибудь, прежде чем уйти со страницы!',
        copyButtonLabel: 'Скопировать в буфер обмена',
      },
    },
    settingsDropdown: {
      darkMode: undefined, // English translation: 'Dark Mode'
      logOut: 'Выйти',
    },
    toast: {
      onFailToLoadEntries: 'Не удалось загрузить запись: %{details}',
      onFailToPersist: 'Не удалось сохранить запись: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Не удалось удалить запись: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Не удалось обновить статус: %{details}',
      missingRequiredField:
        'К сожалению, вы пропустили обязательное поле. Пожалуйста, заполните перед сохранением.',
      entrySaved: 'Запись сохранена',
      entryPublished: 'Запись опубликована',
      onFailToPublishEntry: 'Не удалось опубликовать запись: %{details}',
      entryUpdated: 'Статус записи обновлен',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Вы вышли. Пожалуйста, сохраните все данные и войдите снова',
      onBackendDown: 'Происходят перебои в работе бекенда. См. %{details}',
    },
  },
};

export default ru;
