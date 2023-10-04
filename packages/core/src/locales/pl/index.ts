import type { LocalePhrasesRoot } from '../types';

const pl: LocalePhrasesRoot = {
  auth: {
    login: 'Zaloguj się',
    loggingIn: 'Logowanie...',
    loginWithNetlifyIdentity: 'Zaloguj przez konto Netlify',
    loginWithBitbucket: 'Zaloguj przez Bitbucket',
    loginWithGitHub: 'Zaloguj przez GitHub',
    loginWithGitLab: 'Zaloguj przez GitLab',
    loginWithGitea: 'Zaloguj przez Gitea',
    errors: {
      email: 'Wprowadź swój adres email',
      password: 'Wprowadź swoje hasło',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        'Brak dostępu do ustawień tożsamości. Jeśli używasza backendu git-gateway upewnij się, że usługa tożsamośći (Identity service) oraz Git Gateway są włączone.',
    },
  },
  app: {
    header: {
      content: 'Treść',
      workflow: 'Przebieg redakcyjny',
      media: 'Multimedia',
      quickAdd: 'Szybkie dodawanie',
    },
    app: {
      loading: 'Ładowanie...',
      errorHeader: 'Błąd ładowania konfiguracji CMS',
      configErrors: 'Błędy konfiguracji',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'Sprawdź plik config.yml.',
      loadingConfig: 'Ładowanie konfiguracji...',
      waitingBackend: 'Oczekiwanie na backend...',
    },
    notFoundPage: {
      header: 'Nie znaleziono',
    },
  },
  collection: {
    sidebar: {
      collections: 'Kolekcje',
      allCollections: 'Wszystkie kolekcje',
      searchAll: 'Wyszukaj wszystkie',
      searchIn: 'Wyszukaj w',
    },
    collectionTop: {
      sortBy: 'Sortuj po',
      viewAs: 'Wyświetl jako',
      newButton: 'Nowy %{collectionLabel}',
      ascending: 'Rosnąco',
      descending: 'Malejąco',
      searchResults: 'Wyszukaj wyniki dla %{searchTerm}',
      searchResultsInCollection: 'Wyszukaj wyniki dla %{searchTerm} w %{collection}',
      filterBy: 'Filtruj po',
      groupBy: 'Grupuj po',
    },
    entries: {
      loadingEntries: 'Ładowanie pozycji...',
      cachingEntries: 'Ładowanie pozycji do pamięci podręcznej...',
      longerLoading: 'To może zająć kilka minut',
      noEntries: 'Brak pozycji',
    },
    groups: {
      other: 'Inne',
      negateLabel: 'Nie %{label}',
    },
    table: {
      summary: undefined, // English translation: 'Summary'
      collection: undefined, // English translation: 'Collection'
    },
    defaultFields: {
      author: {
        label: 'Autor',
      },
      updatedOn: {
        label: 'Zaktualizowano',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'opcjonalne',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} jest wymagane.',
        regexPattern: '%{fieldLabel} nie pasuje do formatu: %{pattern}.',
        processing: '%{fieldLabel} jest przetwarzane.',
        range: '%{fieldLabel} musi być pomiędzy %{minValue} a %{maxValue}.',
        min: '%{fieldLabel} musi być co najmniej %{minValue}.',
        max: '%{fieldLabel} musi być %{maxValue} lub mniej.',
        rangeCount: '%{fieldLabel} musi mieć od %{minCount} do %{maxCount} elementów',
        rangeCountExact: '%{fieldLabel} musi mieć %{count} elementów',
        rangeMin: '%{fieldLabel} musi mieć przynajmniej %{minCount} elementów',
        rangeMax: '%{fieldLabel} może mieć maksymalnie %{maxCount} elementów',
        invalidPath: "'%{path}' nie jest poprawna",
        pathExists: "Ścieżka '%{path}' już istnieje",
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: 'Pisz w języku %{locale}',
      },
    },
    editor: {
      onLeavePage: 'Czy na pewno chcesz opuścić tę stronę?',
      onUpdatingWithUnsavedChangesBody:
        'Masz niezapisane zmiany, proszę zapisz je przed aktualizacją statusu.',
      onPublishingNotReadyBody: 'Proszę zaktualizować status do "Gotowe" przed publikacją.',
      onPublishingWithUnsavedChangesBody:
        'Masz niezapisane zmiany, proszę zapisz je przed publikacją.',
      onPublishingBody: 'Czy na pewno chcesz opublikować tę pozycję?',
      onUnpublishingBody: 'Czy na pewno chcesz cofnąć publikację tej pozycji?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Czy na pewno chcesz usunąć tę opublikowaną pozycję, a także niezapisane zmiany z bieżącej sesji?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Czy na pewno chcesz usunąć tę opublikowaną pozycję?',
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        'Spowoduje to usunięcie wszystkich nieopublikowanych zmian tej pozycji, a także niezapisanych zmian z bieżącej sesji. Czy nadal chcesz usunąć?',
      onDeleteUnpublishedChangesBody:
        'Wszystkie nieopublikowane zmiany tej pozycji zostaną usunięte. Czy nadal chcesz usunąć?',
      loadingEntry: 'Ładowanie pozycji...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: 'Przełącz i18n',
      togglePreview: 'Przełącz podgląd',
      toggleScrollSync: 'Synchroniczne przesuwanie',
    },
    editorToolbar: {
      publishing: 'Publikowanie...',
      publish: 'Opublikuj',
      published: 'Opublikowane',
      unpublish: 'Cofnij publikację',
      duplicate: 'Zduplikuj',
      unpublishing: 'Cofanie publikacji...',
      publishAndCreateNew: 'Opublikuj i dodaj nowy',
      publishAndDuplicate: 'Opublikuj i zduplikuj',
      deleteUnpublishedChanges: 'Usuń nieopublikowane zmiany',
      deleteUnpublishedEntry: 'Usuń nieopublikowaną pozycję',
      deletePublishedEntry: 'Usuń opublikowaną pozycję',
      deleteEntry: 'Usuń pozycję',
      saving: 'Zapisywanie...',
      save: 'Zapisz',
      statusInfoTooltipDraft:
        'Dodano jako wersję roboczą. Aby zakończyć i oddać do recenzji zmień status na `Do recenzji`',
      statusInfoTooltipInReview:
        'Wpis jest w trakcie recenzji, żadne dodatkowe akcje nie są wymagane. Jeśli chcesz, możesz jeszcze nanieść zmiany.',
      deleting: 'Usuwanie...',
      updating: 'Uaktualnianie...',
      status: 'Status: %{status}',
      backCollection: ' Edycja treści w zbiorze %{collectionLabel}',
      unsavedChanges: 'Niezapisane zmiany',
      changesSaved: 'Zmiany zapisane',
      draft: 'Wersja robocza',
      inReview: 'W recenzji',
      ready: 'Gotowe',
      publishNow: 'Opublikuj teraz',
      deployPreviewPendingButtonLabel: 'Sprawdź, czy istnieje podgląd',
      deployPreviewButtonLabel: 'Zobacz podgląd',
      deployButtonLabel: 'Zobacz na żywo',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Pogrubienie',
        italic: 'Kursywa',
        code: 'Kod',
        link: 'Link',
        linkPrompt: 'Dodaj adres URL',
        headings: 'Nagłówki',
        quote: 'Cytat',
        bulletedList: 'Lista punktowana',
        numberedList: 'Lista numerowana',
        addComponent: 'Dodaj komponent',
        richText: 'Tekst sformatowany',
        markdown: 'Markdown',
        type: undefined, // English translation: 'Type...'
      },
      image: {
        choose: 'Wybierz zdjęcie',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: 'Dodaj adres URL zdjęcia',
        replaceUrl: 'Zmień adres URL zdjęcia',
        promptUrl: 'Wprować adres URL zdjęcia',
        chooseDifferent: 'Zmień zdjęcie',
        addMore: undefined, // English translation: 'Add more images'
        remove: 'Usuń zdjęcie',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: 'Wybierz plik',
        chooseUrl: 'Dodaj adres URL pliku',
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: 'Zmień adres URL zdjęcia',
        promptUrl: 'Dodaj adres URL pliku',
        chooseDifferent: 'Wybierz inny plik',
        addMore: undefined, // English translation: 'Add more files'
        remove: 'Usuń plik',
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
        noControl: "Brak kontrolki dla widżetu '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Brak podglądu dla widżetu '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Nagłówek 1',
        headingTwo: 'Nagłówek 2',
        headingThree: 'Nagłówek 3',
        headingFour: 'Nagłówek 4',
        headingFive: 'Nagłówek 5',
        headingSix: 'Nagłówek 6',
      },
      datetime: {
        now: 'Teraz',
        invalidDateTitle: undefined, // English translation: 'Invalid date'
        invalidDateBody: undefined, // English translation: 'The date you entered is invalid.'
      },
      list: {
        add: 'Dodaj %{item}',
        addType: 'Dodaj nowy %{item}',
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
      draft: 'Wersja robocza',
      copy: 'Kopiuj',
      copyUrl: 'Kopiuj URL',
      copyPath: 'Kopiuj ścieżkę',
      copyName: 'Kopiuj nazwę',
      copied: 'Skopiowano',
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'Czy na pewno chcesz usunąć zaznaczone multimedia?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody: 'Plik jest za duży.\nUstawiony maksymalny rozmiar pliku: %{size} kB.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      noResults: 'Brak wyników.',
      noAssetsFound: 'Nie znaleziono żadnych zasobów.',
      noImagesFound: 'Nie znaleziono żadnych obrazów.',
      private: 'Prywatne ',
      images: 'Obrazy',
      mediaAssets: 'Zasoby multimedialne',
      search: 'Szukaj...',
      uploading: 'Przesyłanie...',
      upload: 'Prześlij nowe',
      download: 'Pobierz',
      deleting: 'Usuwanie...',
      deleteSelected: 'Usuń zaznaczone',
      chooseSelected: 'Wybierz zaznaczone',
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
      goBackToSite: 'Wróć do strony',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'Błąd',
      details: 'Wystąpił błąd - proszę ',
      reportIt: 'zgłoś to.',
      detailsHeading: 'Szczegóły',
      privacyWarning:
        'Nowe zgłoszenie zostanie wstępnie wypełnione danymi o błędzie.\nZweryfikuj czy dane są poprawne i usuń wrażliwe informacje jeśli takie zostały dodane.',
      recoveredEntry: {
        heading: 'Odzyskany dokument',
        warning: 'Proszę skopiuj/wklej to gdzieś zanim opuścisz tę stronę!',
        copyButtonLabel: 'Skopiuj do schowka',
      },
    },
    settingsDropdown: {
      darkMode: undefined, // English translation: 'Dark Mode'
      logOut: 'Wyloguj się',
    },
    toast: {
      onFailToLoadEntries: 'Nie udało się załadować pozycji: %{details}',
      onFailToLoadDeployPreview: 'Nie udało się załadować podglądu: %{details}',
      onFailToPersist: 'Nie udało się zapisać pozycji: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Nie udało się usunąć pozycji: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Nie udało się zaktualizować statusu: %{details}',
      missingRequiredField: 'Ups, przegapiłeś wymagane pole. Proszę uzupełnij przed zapisaniem.',
      entrySaved: 'Pozycja zapisana',
      entryPublished: 'Pozycja opublikowana',
      entryUnpublished: 'Cofnięto publikację pozycji',
      onFailToPublishEntry: 'Nie udało się opublikować: %{details}',
      onFailToUnpublishEntry: 'Nie udało się cofnąć publikacji pozycji: %{details}',
      entryUpdated: 'Zaktualizowano status pozycji',
      onDeleteUnpublishedChangesBody: 'Nieopublikowane zmiany zostały usunięte',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Zostałeś wylogowany, utwórz kopię zapasową danych i zaloguj się ponownie.',
      onBackendDown: 'Usługa backendu uległa awarii. Zobacz więcej informacji: %{details}',
    },
  },
  workflow: {
    workflow: {
      loading: 'Ładowanie pozycji przebiegu redakcyjnego',
      workflowHeading: 'Przebieg redakcyjny',
      newPost: 'Nowa pozycja',
      description:
        '%{smart_count} pozycja oczekuje na recenzję, %{readyCount} oczekuje na publikacje. |||| %{smart_count} pozycje oczekują na recenzję, %{readyCount} oczekuje na publikacje. |||| %{smart_count} pozycji oczekuje na recenzje, %{readyCount} oczekuje na publikacje. ',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date} przez %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: 'przez %{author}',
      deleteChanges: 'Usuń zmiany',
      deleteNewEntry: 'Usuń nową pozycję',
      publishChanges: 'Opublikuj zmiany',
      publishNewEntry: 'Opublikuj nową pozycję',
    },
    workflowList: {
      onDeleteEntry: 'Czy na pewno chcesz usunąć tę pozycję?',
      onPublishingNotReadyEntry:
        'Tylko pozycje o statusie „Gotowe” mogą być publikowane. Przeciągnij proszę kartę do kolumny „Gotowe do publikacji”, aby umożliwić publikowanie.',
      onPublishEntry: 'Czy na pewno chcesz opublikować tę pozycję?',
      draft: 'Wersje robocze',
      pending_review: 'W recenzji',
      pending_publish: 'Gotowe do publikacji',
      currentEntries:
        '%{smart_count} pozycja |||| %{smart_count} pozycje |||| %{smart_count} pozycji',
    },
  },
};

export default pl;
