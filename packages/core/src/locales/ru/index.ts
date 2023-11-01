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
      workflow: 'Рабочая область',
      media: 'Медиафайлы',
      quickAdd: 'Быстрое добавление',
    },
    app: {
      loading: 'Загрузка медифайлов…',
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
        label: 'Дате обновления',
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
        copyFromLocale: 'Заполнить из другого региона',
        copyFromLocaleConfirm:
          'Вы хотите заполнять данные используя %{locale} локализацию?\nВесь существующий контент будет перезаписан.',
      },
    },
    editor: {
      onLeavePage: 'Вы уверены, что хотите покинуть эту страницу?',
      onUpdatingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onUpdatingWithUnsavedChangesBody:
        'У вас есть несохраненные изменения, сохраните их перед обновлением статуса.',
      onPublishingNotReadyTitle: undefined, // English translation: 'Not ready to publish'
      onPublishingNotReadyBody: 'Пожалуйста, измените статус на «Готов» перед публикацией.',
      onPublishingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onPublishingWithUnsavedChangesBody:
        'У вас есть несохраненные изменения, сохраните их перед публикацией.',
      onPublishingTitle: undefined, // English translation: 'Publish entry?'
      onPublishingBody: 'Вы уверены, что хотите опубликовать эту запись?',
      onUnpublishingTitle: undefined, // English translation: 'Unpublish entry?'
      onUnpublishingBody: 'Вы уверены, что хотите отменить публикацию этой записи?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Вы уверены, что хотите удалить эту опубликованную запись, а также несохраненные изменения из текущего сеанса?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Вы уверены, что хотите удалить эту опубликованную запись?',
      onDeleteUnpublishedChangesWithUnsavedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        'Это удалит все неопубликованные изменения в этой записи, а также ваши несохраненные изменения из текущего сеанса. Вы все еще хотите удалить?',
      onDeleteUnpublishedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesBody:
        'Все неопубликованные изменения в этой записи будут удалены. Вы все еще хотите удалить?',
      loadingEntry: 'Загрузка записи…',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: 'Переключиться на i18n',
      togglePreview: 'Переключиться на предварительный просмотр',
      toggleScrollSync: 'Синхронизация прокрутки',
    },
    editorToolbar: {
      publishing: 'Публикация…',
      publish: 'Опубликовать',
      published: 'Опубликовано',
      unpublish: 'Отменить публикацию',
      duplicate: 'Дублировать',
      unpublishing: 'Отмена публикации…',
      publishAndCreateNew: 'Опубликовать и создать новую',
      publishAndDuplicate: 'Опубликовать и дублировать',
      deleteUnpublishedChanges: 'Удалить неопубликованные изменения',
      deleteUnpublishedEntry: 'Удалить неопубликованную запись',
      deletePublishedEntry: 'Удалить опубликованную запись',
      deleteEntry: 'Удалить запись',
      saving: 'Сохранение…',
      save: 'Сохранить',
      statusInfoTooltipDraft:
        'Статус записи установлен на черновик. Чтобы доработать и отправить его на рассмотрение, установите статус «На рассмотрении».',
      statusInfoTooltipInReview:
        'Запись находится на рассмотрении, дальнейших действий не требуется. Тем не менее, вы все еще можете внести дополнительные изменения, пока она находится на рассмотрении.',
      deleting: 'Удаление…',
      updating: 'Обновление…',
      status: 'Cтатус: %{status}',
      backCollection: 'Запись в коллекцию %{collectionLabel}',
      unsavedChanges: 'Несохраненные изменения',
      changesSaved: 'Изменения сохранены',
      draft: 'Черновик',
      inReview: 'На рассмотрении',
      ready: 'Одобрен',
      publishNow: 'Опубликовать сейчас',
      deployPreviewPendingButtonLabel: 'Проверить предварительный просмотр',
      deployPreviewButtonLabel: 'Предварительный просмотр',
      deployButtonLabel: 'Просмотр',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Полужиный',
        italic: 'Курсив',
        strikethrough: undefined, // English translation: 'Strikethrough'
        code: 'Код',
        codeBlock: undefined, // English translation: 'Code block'
        insertCodeBlock: undefined, // English translation: 'Insert code block'
        link: 'Ссылка',
        insertLink: undefined, // English translation: 'Insert link'
        paragraph: undefined, // English translation: 'Paragraph'
        headings: 'Заголовки',
        quote: 'Цитата',
        insertQuote: undefined, // English translation: 'Insert blockquote'
        bulletedList: 'Маркированный список',
        numberedList: 'Нумерованный список',
        addComponent: 'Добавить компонент',
        richText: 'Форматированный текст',
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
        choose: 'Выберите изображение',
        chooseMultiple: 'Выберите изображения',
        chooseUrl: 'Вставить из URL',
        replaceUrl: 'Заменить на URL',
        promptUrl: 'Введите URL изображения',
        chooseDifferent: 'Выберите другое изображение',
        addMore: 'Добавьте еще изображений',
        remove: 'Удалить изображение',
        removeAll: 'Удалить все изображения',
      },
      file: {
        choose: 'Выберите файл',
        chooseUrl: 'Вставить из URL',
        chooseMultiple: 'Выбрать файлы',
        replaceUrl: 'Заменить на URL',
        promptUrl: 'Введите URL файла',
        chooseDifferent: 'Выберите другой файл',
        addMore: 'Добавить больше файлов',
        remove: 'Удалить файл',
        removeAll: 'Удалить все файлы',
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
        add: 'Добавить %{item}',
        addType: 'Добавить %{item}',
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
      noResults: 'Нет результатов.',
      noAssetsFound: 'Ресурсы не найдены.',
      noImagesFound: 'Изображения не найдены.',
      private: 'Приватные ',
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
      theme: undefined, // English translation: 'Theme'
      logOut: 'Выйти',
    },
    toast: {
      onFailToLoadEntries: 'Не удалось загрузить запись: %{details}',
      onFailToLoadDeployPreview: 'Не удалось загрузить превью: %{details}',
      onFailToPersist: 'Не удалось сохранить запись: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Не удалось удалить запись: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Не удалось обновить статус: %{details}',
      missingRequiredField:
        'К сожалению, вы пропустили обязательное поле. Пожалуйста, заполните перед сохранением.',
      entrySaved: 'Запись сохранена',
      entryDeleted: undefined, // English translation: 'Entry delete'
      entryPublished: 'Запись опубликована',
      entryUnpublished: 'Публикация записи отменена',
      onFailToPublishEntry: 'Не удалось опубликовать запись: %{details}',
      onFailToUnpublishEntry: 'Не удалось отменить публикацию записи: %{details}',
      entryUpdated: 'Статус записи обновлен',
      onDeletePublishedEntry: undefined, // English translation: 'Published entry deleted'
      onDeleteUnpublishedChanges: 'Неопубликованные изменения удалены',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Вы вышли. Пожалуйста, сохраните все данные и войдите снова',
      onBackendDown: 'Происходят перебои в работе бекенда. См. %{details}',
    },
  },
  workflow: {
    workflow: {
      loading: 'Загрузка записей в рабочей области',
      workflowHeading: 'Рабочая область',
      newPost: 'Новая запись',
      description:
        'Число записей, ожидающих проверки — %{smart_count}, готовых к публикации — %{readyCount}. |||| Число записей, ожидающих проверки — %{smart_count}, готовых к публикации — %{readyCount}. ',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date}, %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: '%{author}',
      deleteChanges: 'Удалить изменения',
      deleteNewEntry: 'Удалить новую запись',
      publishChanges: 'Опубликовать изменения',
      publishNewEntry: 'Опубликовать новую запись',
    },
    workflowList: {
      onDeleteEntry: 'Вы уверены, что хотите удалить эту запись?',
      onPublishingNotReadyEntry:
        'Только элементы со статусом «Готов» могут быть опубликованы. Перетащите карточку в столбец «Одобренные», чтобы разрешить публикацию.',
      onPublishEntry: 'Вы уверены, что хотите опубликовать эту запись?',
      draft: 'Черновики',
      pending_review: 'На рассмотрении',
      pending_publish: 'Одобренные',
      currentEntries: '%{smart_count} entry |||| %{smart_count} entries',
    },
    openAuthoring: {
      forkRequired: undefined, // English translation: 'undefined'
      forkRepo: undefined, // English translation: 'undefined'
      markReadyForReview: undefined, // English translation: 'undefined'
    },
  },
};

export default ru;
