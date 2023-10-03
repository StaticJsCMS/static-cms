import type { LocalePhrasesRoot } from '@staticcms/core/interface';

const ua: LocalePhrasesRoot = {
  auth: {
    login: 'Увійти',
    loggingIn: 'Вхід...',
    loginWithNetlifyIdentity: 'Увійти через Netlify Identity',
    loginWithAzure: 'Увійти через Azure',
    loginWithBitbucket: 'Увійти через Bitbucket',
    loginWithGitHub: 'Увійти через GitHub',
    loginWithGitLab: 'Увійти через GitLab',
    errors: {
      email: 'Введіть ваш email.',
      password: 'Введіть пароль.',
      identitySettings:
        'Немає доступу до налаштувань. Якщо використовуєте git-gateway, переконайтеся, що включили Identity service та Git Gateway.',
    },
  },
  app: {
    header: {
      content: 'Записи',
      workflow: 'Документообіг',
      media: 'Медіафайли',
      quickAdd: 'Швидке додавання',
    },
    app: {
      loading: 'Завантаження медіафайлів…',
      errorHeader: 'Помилка завантаження конфігурації CMS',
      configErrors: 'Помилки конфігурації',
      checkConfigYml: 'Перевірте свій config.yml файл.',
      loadingConfig: 'Завантаження конфігурації...',
      waitingBackend: 'Очікування відповіді від бекенду...',
    },
    notFoundPage: {
      header: 'Не знайдено',
    },
  },
  collection: {
    sidebar: {
      collections: 'Колекції',
      allCollections: 'Всі колекції',
      searchAll: 'Шукати всюди',
      searchIn: 'Шукати в',
    },
    collectionTop: {
      sortBy: 'Сортувати за',
      viewAs: 'Вигляд',
      newButton: 'Створити %{collectionLabel}',
      ascending: 'За зростанням',
      descending: 'За спаданням',
      searchResults: 'Результати по запиту "%{searchTerm}"',
      searchResultsInCollection: 'Результати по запиту "%{searchTerm}" в %{collection}',
      filterBy: 'Фільтрувати за',
      groupBy: 'Групувати за',
    },
    entries: {
      loadingEntries: 'Завантаження записів...',
      cachingEntries: 'Кешування записів...',
      longerLoading: 'Це може зайняти деякий час',
      noEntries: 'Немає записів',
    },
    groups: {
      other: 'Інша',
      negateLabel: 'Не %{label}',
    },
    defaultFields: {
      author: {
        label: 'Автор',
      },
      updatedOn: {
        label: 'Оновлено',
      },
    },
  },
  editor: {
    editorControl: {
      field: {
        optional: 'необов’язковий',
      },
    },
    editorControlPane: {
      widget: {
        required: 'Необхідно вказати значення поля %{fieldLabel}.',
        regexPattern: 'Значення поля %{fieldLabel} не відповідає шаблону: %{pattern}.',
        processing: 'Значення поля %{fieldLabel} обробляється…',
        range: 'Значення поля %{fieldLabel} повинно бути між %{minValue} і %{maxValue}.',
        min: 'Значення поля %{fieldLabel} повинно бути не менше %{minValue}.',
        max: 'Значення поля %{fieldLabel} повинно бути %{maxValue} або менше.',
        rangeCount: '%{fieldLabel} повинно містити від %{minCount} до %{maxCount} елементів.',
        rangeCountExact: '%{fieldLabel} повинно містити строго %{count} елементів.',
        rangeMin: '%{fieldLabel} повинно містити не менше %{minCount} елементів.',
        rangeMax: '%{fieldLabel} повинно містити %{maxCount} або менше елементів.',
        invalidPath: `Шлях '%{path}' містить помилки`,
        pathExists: `Шлях '%{path}' вже існує`,
      },
      i18n: {
        writingInLocale: 'Пишемо на %{locale}',
      },
    },
    editor: {
      onLeavePage: 'Ви впевнені, що хочете залишити цю сторінку?',
      onUpdatingWithUnsavedChangesBody:
        'У вас є незбережені зміни, будь ласка, збережіть їх перед оновленням статусу.',
      onPublishingNotReadyBody: 'Будь ласка, змініть статус на «Готово» перед публікацією.',
      onPublishingWithUnsavedChangesBody:
        'У вас є незбережені зміни, будь ласка, збережіть їх перед публікацією.',
      onPublishingBody: 'Ви впевнені, що хочете опублікувати цей запис?',
      onUnpublishingBody: 'Ви впевнені, що хочете скасувати публікацію цієї записи?',
      onDeleteWithUnsavedChangesBody:
        'Ви впевнені, що хочете видалити цю опубліковану запис, а також незбережені зміни з поточного сеансу?',
      onDeletePublishedEntryBody: 'Ви впевнені, що хочете видалити цю опубліковану запис?',
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        'Це видалить всі неопубліковані зміни в цій записі, а також ваші незбережені зміни з поточного сеансу. Ви все ще хочете видалити?',
      onDeleteUnpublishedChangesBody:
        'Всі неопубліковані зміни в цій записі будуть видалені. Ви все ще хочете видалити?',
      loadingEntry: 'Завантаження запису ...',
    },
    editorToolbar: {
      publishing: 'Публікація...',
      publish: 'Опублікувати',
      published: 'Опубліковано',
      unpublish: 'Скасувати публікацію',
      duplicate: 'Дублювати',
      unpublishing: 'Скасування публікації...',
      publishAndCreateNew: 'Опублікувати і створити нову',
      publishAndDuplicate: 'Опублікувати і дублювати',
      deleteUnpublishedChanges: 'Видалити неопубліковані зміни',
      deleteUnpublishedEntry: 'Видалити неопубліковану запис',
      deletePublishedEntry: 'Видалити опубліковану запис',
      deleteEntry: 'Видалити запис',
      saving: 'Збереження...',
      save: 'Зберегти',
      deleting: 'Видалення...',
      updating: 'Оновлення...',
      status: 'Статус: %{status}',
      backCollection: 'Запис в колекцію %{collectionLabel}',
      unsavedChanges: 'Незбережені зміни',
      changesSaved: 'Зміни збережені',
      draft: 'Чернетка',
      inReview: 'На розгляді',
      ready: 'Готово до публікації',
      publishNow: 'Опублікувати зараз',
      deployPreviewPendingButtonLabel: 'Перевірити попередній перегляд',
      deployPreviewButtonLabel: 'Попередній перегляд',
      deployButtonLabel: 'Перегляд',
    },
    editorWidgets: {
      markdown: {
        bold: 'Напівжирний',
        italic: 'Курсив',
        code: 'Код',
        link: 'Посилання',
        linkPrompt: 'Введіть URL посилання',
        headings: 'Заголовки',
        quote: 'Цитата',
        bulletedList: 'Маркований список',
        numberedList: 'Нумерований список',
        addComponent: 'Додати компонент',
        richText: 'Форматований текст',
        markdown: 'Markdown',
      },
      image: {
        choose: 'Обрати зображення',
        chooseUrl: 'Вставити з URL',
        replaceUrl: 'Замінити на URL',
        promptUrl: 'Введіть URL зображення',
        chooseDifferent: 'Обрати інше зображення',
        remove: 'Видалити зображення',
      },
      file: {
        choose: 'Обрати файл',
        chooseUrl: 'Вставити з URL',
        replaceUrl: 'Замінити на URL',
        promptUrl: 'Введіть URL файлу',
        chooseDifferent: 'Обрати інший файл',
        remove: 'Видалити файл',
      },
      unknownControl: {
        noControl: "Немає контролу для віджета '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Немає попереднього перегляду для віджета '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Заголовок 1',
        headingTwo: 'Заголовок 2',
        headingThree: 'Заголовок 3',
        headingFour: 'Заголовок 4',
        headingFive: 'Заголовок 5',
        headingSix: 'Заголовок 6',
      },
      datetime: {
        now: 'Зараз',
      },
    },
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: 'Чорновик',
      copy: 'Копіювати',
      copyUrl: 'Копіювати URL',
      copyPath: 'Копіювати шлях',
      copyName: 'Копіювати ім’я',
      copied: 'Скопійовано',
    },
    mediaLibrary: {
      onDeleteBody: 'Ви впевнені, що хочете видалити вибраний медіафайл?',
      fileTooLargeBody:
        'Файл занадто великий.\nНалаштування не дозволяють зберігати файли більше %{size} kB.',
    },
    mediaLibraryModal: {
      noResults: 'Немає результатів.',
      noAssetsFound: 'Ресурси не знайдені.',
      noImagesFound: 'Зображення не знайдені.',
      private: 'Приватні ',
      images: 'Зображення',
      mediaAssets: 'Медіаресурси',
      search: 'Йде пошук…',
      uploading: 'Завантаження…',
      upload: 'Завантажити новий',
      download: 'Завантажити',
      deleting: 'Видалення…',
      deleteSelected: 'Видалити позначені',
      chooseSelected: 'Вибрати позначені',
    },
  },

  ui: {
    default: {
      goBackToSite: 'Повернутися на сайт',
    },
    errorBoundary: {
      title: 'Помилка',
      details: 'Сталася помилка. Будь ласка, ',
      reportIt: 'повідомте про неї.',
      detailsHeading: 'Деталі',
      privacyWarning:
        'При відкритті тікету автоматично заповнюється повідомленням про помилку та відлагоджувальною інформацією.\nБудь ласка, перевірте, що дані є вірними та не містять конфіденційної інформації.',
      recoveredEntry: {
        heading: 'Відновлений документ',
        warning: 'Будь ласка, скопіюйте це повідомлення кудись, перед тим як залишити сторінку!',
        copyButtonLabel: 'Скопіювати до буферу обміну',
      },
    },
    settingsDropdown: {
      logOut: 'Вийти',
    },
    toast: {
      onFailToLoadEntries: 'Не вдалося завантажити запис: %{details}',
      onFailToLoadDeployPreview: 'Не вдалося завантажити попередній перегляд: %{details}',
      onFailToPersist: 'Не вдалося зберегти запис: %{details}',
      onFailToDelete: 'Не вдалося видалити запис: %{details}',
      onFailToUpdateStatus: 'Не вдалося оновити статус: %{details}',
      missingRequiredField:
        "На жаль, ви пропустили обов'язкове поле. Будь ласка, заповніть перед збереженням.",
      entrySaved: 'Запис збережений',
      entryPublished: 'Запис опублікований',
      entryUnpublished: 'Публікація запису скасована',
      onFailToPublishEntry: 'Не вдалося опублікувати запис: %{details}',
      onFailToUnpublishEntry: 'Не вдалося скасувати публікацію запису: %{details}',
      entryUpdated: 'Статус запису оновлено',
      onDeleteUnpublishedChangesBody: 'Неопубліковані зміни видалені',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Ви вийшли. Будь ласка, збережіть усі дані та увійдіть знову',
      onBackendDown: 'Трапилися збої в роботі бекенду. Див. %{details}',
    },
  },
  workflow: {
    workflow: {
      loading: 'Завантаження записів редакційного документообігу',
      workflowHeading: 'Редакційний документообіг',
      newPost: 'Новий запис',
      description:
        'Кількість записів, очікуючих перевірки - %{smart_count}, готових до публікації - %{readyCount}. |||| Кількість записів, очікуючих перевірки - %{smart_count}, готових до публікації - %{readyCount}.',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date}, %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: '%{author}',
      deleteChanges: 'Видалити зміни',
      deleteNewEntry: 'Видалити новий запис',
      publishChanges: 'Опублікувати зміни',
      publishNewEntry: 'Опублікувати новий запис',
    },
    workflowList: {
      onDeleteEntry: 'Ви впевнені, що хочете видалити цей запис?',
      onPublishingNotReadyEntry:
        'Лише елементи зі статусом "Готово" можуть бути опубліковані. Перетягніть картку в стовпчик "Схвалено", щоб дозволити публікацію.',
      onPublishEntry: 'Ви впевнені, що хочете опублікувати цей запис?',
      draft: 'Чернетки',
      pending_review: 'На розгляді',
      pending_publish: 'Схвалено',
      currentEntries: '%{smart_count} запис |||| %{smart_count} записів',
    },
  },
};

export default ua;
