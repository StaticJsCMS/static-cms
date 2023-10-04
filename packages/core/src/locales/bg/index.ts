import type { LocalePhrasesRoot } from '../types';

const bg: LocalePhrasesRoot = {
  auth: {
    login: 'Вход',
    loggingIn: 'Влизане...',
    loginWithNetlifyIdentity: 'Вход с Netlify Identity',
    loginWithBitbucket: 'Вход с Bitbucket',
    loginWithGitHub: 'Вход с GitHub',
    loginWithGitLab: 'Вход с GitLab',
    loginWithGitea: 'Вход с Gitea',
    errors: {
      email: 'Въведете вашия имейл.',
      password: 'Въведете паролата.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        'Няма достъп до настройките. Ако използвате git-gateway, не забравяйте да активирате услугата Identity и Git Gateway.',
    },
  },
  app: {
    header: {
      content: 'Съдържание',
      workflow: 'Работен процес',
      media: 'Мултимедийни файлове',
      quickAdd: 'Бързо добавяне',
    },
    app: {
      loading: undefined, // English translation: 'Loading...'
      errorHeader: 'Грешка при зареждането на конфигурацията на CMS',
      configErrors: 'Грешки в конфигурацията',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'Проверете вашия файл config.yml.',
      loadingConfig: 'Зареждане на конфигурация ...',
      waitingBackend: 'В очакване на отговор от бекенда ...',
    },
    notFoundPage: {
      header: 'Не е намерен',
    },
  },
  collection: {
    sidebar: {
      collections: 'Колекции',
      allCollections: 'Всички колекции',
      searchAll: 'Търсете навсякъде',
      searchIn: 'Търсене в',
    },
    collectionTop: {
      sortBy: 'Сортирай по',
      viewAs: 'Виж като',
      newButton: 'Създай %{collectionLabel}',
      ascending: 'Възходящ',
      descending: 'Низходящ',
      searchResults: 'Ресултати от търсенето за "%{searchTerm}"',
      searchResultsInCollection: 'Ресултати от търсенето за "%{searchTerm}" в %{collection}',
      filterBy: 'Филтрирай по',
      groupBy: 'Групирай по',
    },
    entries: {
      loadingEntries: 'Зареждане на записи...',
      cachingEntries: 'Кеширане на записи...',
      longerLoading: 'Това може да отнеме няколко минути',
      noEntries: 'Няма записи',
    },
    groups: {
      other: 'Други',
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
        label: 'Обновено',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'незадължителен',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} е задължително.',
        regexPattern: '%{fieldLabel} не съответства на модела: %{pattern}.',
        processing: '%{fieldLabel} се обработва.',
        range: '%{fieldLabel} трябва да бъде между %{minValue} и %{maxValue}.',
        min: '%{fieldLabel} трябва да бъде поне %{minValue}.',
        max: '%{fieldLabel} трябва да бъде %{maxValue} или по-малко.',
        rangeCount: '%{fieldLabel} трябва да има между %{minCount} и %{maxCount} елемент(и).',
        rangeCountExact: '%{fieldLabel} трябва да има точно %{count} елемент(и).',
        rangeMin: '%{fieldLabel} трябва да бъде поне %{minCount} елемент(и).',
        rangeMax: '%{fieldLabel} трябва да бъде %{maxCount} или по-малко елемент(и).',
        invalidPath: "'%{path}' не е валиден път",
        pathExists: "Пътят '%{path}' вече съществува",
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: 'Писане на %{locale}',
        copyFromLocale: undefined, // English translation: 'Fill in from another locale'
        copyFromLocaleConfirm: undefined, // English translation: 'Do you want to fill in data from %{locale} locale?\nAll existing content will be overwritten.'
      },
    },
    editor: {
      onLeavePage: 'Наистина ли искате да напуснете тази страница?',
      onUpdatingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onUpdatingWithUnsavedChangesBody:
        'Имате незапазени промени, моля, запазете преди актуализиране на състоянието.',
      onPublishingNotReadyTitle: undefined, // English translation: 'Not ready to publish'
      onPublishingNotReadyBody:
        'Моля, актуализирайте състоянието на „Готово“, преди да публикувате',
      onPublishingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onPublishingWithUnsavedChangesBody:
        'Имате незапазени промени, моля, запазете преди публикуване.',
      onPublishingTitle: undefined, // English translation: 'Publish entry?'
      onPublishingBody: 'Наистина ли искате да публикувате този запис?',
      onUnpublishingTitle: undefined, // English translation: 'Unpublish entry?'
      onUnpublishingBody: 'Наистина ли искате да прекратите публикуването на този запис?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Наистина ли искате да изтриете този публикуван запис, както и незаписаните промени от текущата сесия?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Наистина ли искате да изтриете този публикуван запис?',
      onDeleteUnpublishedChangesWithUnsavedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        'Това ще изтрие всички непубликувани промени в този запис, както и незаписаните ви промени от текущата сесия. Все още ли искате да изтриете?',
      onDeleteUnpublishedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesBody:
        'Всички непубликувани промени в този запис ще бъдат изтрити. Все още ли искате да изтриете?',
      loadingEntry: 'Зареждане на запис...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: 'Превключване i18n',
      togglePreview: 'Превключване на визуализация',
      toggleScrollSync: 'Синхронизирай превъртане',
    },
    editorToolbar: {
      publishing: 'Публикуване...',
      publish: 'Публикувай',
      published: 'Публикуван',
      unpublish: 'Непубликувай',
      duplicate: 'Дублирай',
      unpublishing: 'Непубликуване...',
      publishAndCreateNew: 'Публикувай и създай нов',
      publishAndDuplicate: 'Публикувай и дублирай',
      deleteUnpublishedChanges: 'Изтриване на непубликувани промени',
      deleteUnpublishedEntry: 'Изтрий непубликувани записи',
      deletePublishedEntry: 'Изтрий публикувани записи',
      deleteEntry: 'Изтрий запис',
      saving: 'Запазване...',
      save: 'Запази',
      statusInfoTooltipDraft: undefined, // English translation: 'Entry status is set to draft. To finalize and submit it for review, set the status to �In review�'
      statusInfoTooltipInReview: undefined, // English translation: 'Entry is being reviewed, no further actions are required. However, you can still make additional changes while it is being reviewed.'
      deleting: 'Изтриване...',
      updating: 'Актуализиране...',
      status: 'Cъстояние: %{status}',
      backCollection: 'Записване в %{collectionLabel} колекция',
      unsavedChanges: 'Незапазени Промени',
      changesSaved: 'Запазени промени',
      draft: 'Чернова',
      inReview: 'В ревю',
      ready: 'Готово',
      publishNow: 'Публикувай сега',
      deployPreviewPendingButtonLabel: 'Проверете  визуализацията',
      deployPreviewButtonLabel: 'Визуализация',
      deployButtonLabel: 'Изглед',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Удебелен',
        italic: 'Курсив',
        code: 'Код',
        link: 'Връзка',
        linkPrompt: 'Моля, въведете URL на връзката',
        headings: 'Заглавия',
        quote: 'Цитат',
        bulletedList: 'Маркиран Списък',
        numberedList: 'Номериран Списък',
        addComponent: 'Добави Компонент',
        richText: 'Форматиране на текст',
        markdown: 'Markdown',
        type: undefined, // English translation: 'Type...'
      },
      image: {
        choose: 'Избери изображение',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: 'Вмъкване от URL',
        replaceUrl: 'Замяна с URL',
        promptUrl: 'Въведете URL адреса на изображението',
        chooseDifferent: 'Избери различно изображение',
        addMore: undefined, // English translation: 'Add more images'
        remove: 'Премахни изображение',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: 'Избери файл file',
        chooseUrl: 'Вмъкване от URL',
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: 'Замяна с URL',
        promptUrl: 'Въведете URL адреса на файла',
        chooseDifferent: 'Избери различен файл',
        addMore: undefined, // English translation: 'Add more files'
        remove: 'Премахни файл',
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
        noControl: "Няма контрол за приспособлението '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Няма визуализация за приспособлението '%{widget}'.",
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
        now: 'Сега',
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
      draft: 'Чернова',
      copy: 'Копирай',
      copyUrl: 'Копирай URL',
      copyPath: 'Копитай път',
      copyName: 'Копитай име',
      copied: 'Копирано',
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'Наистина ли искате да изтриете избрания медиен файл?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody:
        'Файлът е твърде голям.\nНастройките не позволяват запазване на файлове по-големи от %{size} kB.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      noResults: 'Няма резултати.',
      noAssetsFound: 'Няма намерени ресурси.',
      noImagesFound: 'Няма намерени изображения.',
      private: 'Частен ',
      images: 'Изображения',
      mediaAssets: 'Медийни ресурси',
      search: 'Търсене...',
      uploading: 'Качване...',
      upload: 'Качи',
      download: 'Изтегли',
      deleting: 'Изтриване...',
      deleteSelected: 'Изтрай избрани',
      chooseSelected: 'Избери избрани',
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
      goBackToSite: 'Обратно към сайта',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'Грешка',
      details: 'Възникна грешка - моля ',
      reportIt: 'докладвайте в GitHub.',
      detailsHeading: 'Детайли',
      privacyWarning:
        'При отваряне на билет той автоматично се попълва предварително със съобщение за грешка и информация за отстраняване на грешки.\nМоля, проверете дали данните са верни и не съдържат поверителна информация.',
      recoveredEntry: {
        heading: 'Възстановен документ',
        warning: 'Моля, копирайте това съобщение някъде, преди да напуснете страницата!',
        copyButtonLabel: 'Копиране в клипборда',
      },
    },
    settingsDropdown: {
      theme: undefined, // English translation: 'Theme'
      logOut: 'Изход',
    },
    toast: {
      onFailToLoadEntries: 'Неуспешно зареждане на записа: %{details}',
      onFailToLoadDeployPreview: 'Неуспешно зареждане на визуализация: %{details}',
      onFailToPersist: 'Неуспешно запазване на записа: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Неуспешно изтриване на записа: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Неуспешно актуализиране на състоянието: %{details}',
      missingRequiredField:
        'Извинете, пропуснахте задължително поле. Моля, попълнете преди запазване.',
      entrySaved: 'Записът е запазен',
      entryDeleted: undefined, // English translation: 'Entry delete'
      entryPublished: 'Записът е публикуван',
      entryUnpublished: 'Записът е непубликуван',
      onFailToPublishEntry: 'Неуспешно публикуване на запис: %{details}',
      onFailToUnpublishEntry: 'Неуспешно премахване на публикацията на записа: %{details}',
      entryUpdated: 'Статусът на записа е актуализиран',
      onDeletePublishedEntry: undefined, // English translation: 'Published entry deleted'
      onDeleteUnpublishedChanges: 'Непубликуваните промени са изтрити',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Излезли сте. Моля, запазете всички данни и влезте отново',
      onBackendDown: 'Има прекъсване в работата на бекенда. Виж детайлите %{details}',
    },
  },
  workflow: {
    workflow: {
      loading: 'Зареждане на редакционни записи',
      workflowHeading: 'Редакционен работен процес',
      newPost: 'Нова публикация',
      description:
        'Броят на записите, които очакват проверка -% {smart_count}, готови за публикуване -% {readyCount}. |||| Броят на записите, които очакват проверка -% {smart_count}, готови за публикуване -% {readyCount}. ',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date}, %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: '%{author}',
      deleteChanges: 'Изтриване на промените',
      deleteNewEntry: 'Изтриване на нов запис',
      publishChanges: 'Публикуване на промени',
      publishNewEntry: 'Публикуване на нов запис',
    },
    workflowList: {
      onDeleteEntry: 'Наистина ли искате да изтриете този запис?',
      onPublishingNotReadyEntry:
        'Могат да се публикуват само елементи със статус "Готов". Плъзенете картата в колоната "Готов" за да активирате публикуването.',
      onPublishEntry: 'Наистина ли искате да публикувате този запис?',
      draft: 'Чернови',
      pending_review: 'В Ревю',
      pending_publish: 'Готов',
      currentEntries: '%{smart_count} запис |||| %{smart_count} записи',
    },
  },
};

export default bg;
