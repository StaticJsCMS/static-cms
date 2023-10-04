import type { LocalePhrasesRoot } from '../types';

const hu: LocalePhrasesRoot = {
  auth: {
    login: undefined, // English translation: 'Login'
    loggingIn: undefined, // English translation: 'Logging in...'
    loginWithNetlifyIdentity: undefined, // English translation: 'Login with Netlify Identity'
    loginWithBitbucket: undefined, // English translation: 'Login with Bitbucket'
    loginWithGitHub: undefined, // English translation: 'Login with GitHub'
    loginWithGitLab: undefined, // English translation: 'Login with GitLab'
    loginWithGitea: undefined, // English translation: 'Login with Gitea'
    errors: {
      email: undefined, // English translation: 'Make sure to enter your email.'
      password: undefined, // English translation: 'Please enter your password.'
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings: undefined, // English translation: 'Unable to access identity settings. When using git-gateway backend make sure to enable Identity service and Git Gateway.'
    },
  },
  app: {
    header: {
      content: 'Tartalom',
      workflow: 'Munkafolyamat',
      media: 'Média',
      quickAdd: 'Gyors hozzáadás',
    },
    app: {
      loading: 'Betöltés...',
      errorHeader: 'Hiba történt a CMS konfiguráció betöltése közben',
      configErrors: 'Configurációs hibák',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'Ellenőrizd a config.yml filet.',
      loadingConfig: 'Konfiguráció betöltése...',
      waitingBackend: 'Várakozás hattérrendszerekre...',
    },
    notFoundPage: {
      header: 'Nincs találat',
    },
  },
  collection: {
    sidebar: {
      collections: 'Gyűjtemények',
      allCollections: undefined, // English translation: 'All Collections'
      searchAll: 'Keresés mindenre',
      searchIn: undefined, // English translation: 'Search in'
    },
    collectionTop: {
      sortBy: undefined, // English translation: 'Sort by'
      viewAs: 'Nézet mint',
      newButton: 'Új %{collectionLabel}',
      ascending: undefined, // English translation: 'Ascending'
      descending: undefined, // English translation: 'Descending'
      searchResults: undefined, // English translation: 'Search Results for "%{searchTerm}"'
      searchResultsInCollection: undefined, // English translation: 'Search Results for "%{searchTerm}" in %{collection}'
      filterBy: undefined, // English translation: 'Filter by'
      groupBy: undefined, // English translation: 'Group by'
    },
    entries: {
      loadingEntries: 'Bejegyzések betöltése',
      cachingEntries: 'Bejegyzések cacheelése',
      longerLoading: 'Ez még eltarthat néhany percig',
      noEntries: undefined, // English translation: 'No Entries'
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
        label: undefined, // English translation: 'Author'
      },
      updatedOn: {
        label: undefined, // English translation: 'Updated On'
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'választható',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} kötelező mező.',
        regexPattern: '%{fieldLabel} nem egyezik a %{pattern} mintával.',
        processing: '%{fieldLabel} feldolgozás alatt.',
        range: '%{fieldLabel}, %{minValue} és %{maxValue} értékek között kell legyen.',
        min: '%{fieldLabel} legalább %{minValue} kell legyen vagy több.',
        max: '%{fieldLabel} legalabb %{maxValue} vagy kevesebb kell legyen.',
        rangeCount: undefined, // English translation: 'undefined'
        rangeCountExact: undefined, // English translation: 'undefined'
        rangeMin: undefined, // English translation: 'undefined'
        rangeMax: undefined, // English translation: 'undefined'
        invalidPath: undefined, // English translation: 'undefined'
        pathExists: undefined, // English translation: 'undefined'
        invalidColor: undefined, // English translation: 'undefined'
        invalidHexCode: undefined, // English translation: 'undefined'
      },
      i18n: {
        writingInLocale: undefined, // English translation: 'undefined'
        copyFromLocale: undefined, // English translation: 'undefined'
        copyFromLocaleConfirm: undefined, // English translation: 'undefined'
      },
    },
    editor: {
      onLeavePage: 'Biztos hogy el akarod hagyni az oldalt?',
      onUpdatingWithUnsavedChangesTitle: undefined, // English translation: 'undefined'
      onUpdatingWithUnsavedChangesBody:
        'Mentettlen változtatások vannak, kérjük, mentse az állapot frissítése előtt.',
      onPublishingNotReadyTitle: undefined, // English translation: 'undefined'
      onPublishingNotReadyBody: 'Változtasd az állapotot "Kész"-re publikálás előtt.',
      onPublishingWithUnsavedChangesTitle: undefined, // English translation: 'undefined'
      onPublishingWithUnsavedChangesBody:
        'Mentetlen változtatások vannak, kérjük, mentsen a publikálás előtt.',
      onPublishingTitle: undefined, // English translation: 'undefined'
      onPublishingBody: 'Publikálod ezt a bejegyzést?',
      onUnpublishingTitle: undefined, // English translation: 'undefined'
      onUnpublishingBody: 'Publikálás visszavonása erre a bejegyzésre?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'undefined'
      onDeleteWithUnsavedChangesBody:
        'Töröljük ezt a publikált bejegyzést, a többi mentetlen modositással együtt?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'undefined'
      onDeletePublishedEntryBody: 'Töröljük ezt a publikált bejegyzést?',
      onDeleteUnpublishedChangesWithUnsavedChangesTitle: undefined, // English translation: 'undefined'
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        'Ezzel törli a bejegyzés összes nem közzétett módosítását, valamint az aktuális munkamenetből nem mentett módosításokat. Még mindig törli?',
      onDeleteUnpublishedChangesTitle: undefined, // English translation: 'undefined'
      onDeleteUnpublishedChangesBody:
        'A bejegyzés összes, nem közzétett módosítása törlődik. Még mindig törli?',
      loadingEntry: 'Bejegyzés betöltése...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'undefined'
      preview: undefined, // English translation: 'undefined'
      toggleI18n: undefined, // English translation: 'undefined'
      togglePreview: undefined, // English translation: 'undefined'
      toggleScrollSync: undefined, // English translation: 'undefined'
    },
    editorToolbar: {
      publishing: 'Publikálás...',
      publish: 'Publikáció',
      published: 'Publikálás',
      unpublish: 'Publikálás visszavonása',
      duplicate: 'Duplikált',
      unpublishing: 'Publikálás visszavonása...',
      publishAndCreateNew: 'Publikálás és új létrehozása',
      publishAndDuplicate: 'Publikálás és duplikál',
      deleteUnpublishedChanges: 'Nempublikált változtatások törlése',
      deleteUnpublishedEntry: 'Nempublikált bejegyzés törlése',
      deletePublishedEntry: 'Publikált bejegyzés törlése',
      deleteEntry: 'Bejegyzés törlése',
      saving: 'Mentés...',
      save: 'Mentés',
      statusInfoTooltipDraft: undefined, // English translation: 'undefined'
      statusInfoTooltipInReview: undefined, // English translation: 'undefined'
      deleting: 'Törlés...',
      updating: 'Frissítés...',
      status: 'Beállitása: %{status}',
      backCollection: ' Írás a %{collectionLabel} gyűjteménybe',
      unsavedChanges: 'Nemmentett változtatások',
      changesSaved: 'Változások elmentve',
      draft: 'Piszkozat',
      inReview: 'Felülvizsgálat alatt',
      ready: 'Kész',
      publishNow: 'Publikálás most',
      deployPreviewPendingButtonLabel: 'Előnézet ellenörzése',
      deployPreviewButtonLabel: 'Előnézet megtekintése',
      deployButtonLabel: 'Élő megtekintése',
      discardChanges: undefined, // English translation: 'undefined'
      discardChangesTitle: undefined, // English translation: 'undefined'
      discardChangesBody: undefined, // English translation: 'undefined'
    },
    editorWidgets: {
      markdown: {
        bold: undefined, // English translation: 'undefined'
        italic: undefined, // English translation: 'undefined'
        code: undefined, // English translation: 'undefined'
        link: undefined, // English translation: 'undefined'
        linkPrompt: undefined, // English translation: 'undefined'
        headings: undefined, // English translation: 'undefined'
        quote: undefined, // English translation: 'undefined'
        bulletedList: undefined, // English translation: 'undefined'
        numberedList: undefined, // English translation: 'undefined'
        addComponent: undefined, // English translation: 'undefined'
        richText: undefined, // English translation: 'undefined'
        markdown: undefined, // English translation: 'undefined'
        type: undefined, // English translation: 'undefined'
      },
      image: {
        choose: 'Válasszon képet',
        chooseMultiple: undefined, // English translation: 'undefined'
        chooseUrl: undefined, // English translation: 'undefined'
        replaceUrl: undefined, // English translation: 'undefined'
        promptUrl: undefined, // English translation: 'undefined'
        chooseDifferent: 'Válasszon másik képet',
        addMore: undefined, // English translation: 'undefined'
        remove: 'Távolítsa el a képet',
        removeAll: undefined, // English translation: 'undefined'
      },
      file: {
        choose: 'Válasszon fájlt',
        chooseUrl: undefined, // English translation: 'undefined'
        chooseMultiple: undefined, // English translation: 'undefined'
        replaceUrl: undefined, // English translation: 'undefined'
        promptUrl: undefined, // English translation: 'undefined'
        chooseDifferent: 'Válasszon másik fájlt',
        addMore: undefined, // English translation: 'undefined'
        remove: 'Távolítsa el a fájlt',
        removeAll: undefined, // English translation: 'undefined'
      },
      folder: {
        choose: undefined, // English translation: 'undefined'
        chooseUrl: undefined, // English translation: 'undefined'
        chooseMultiple: undefined, // English translation: 'undefined'
        replaceUrl: undefined, // English translation: 'undefined'
        promptUrl: undefined, // English translation: 'undefined'
        chooseDifferent: undefined, // English translation: 'undefined'
        addMore: undefined, // English translation: 'undefined'
        remove: undefined, // English translation: 'undefined'
        removeAll: undefined, // English translation: 'undefined'
      },
      unknownControl: {
        noControl: "Nincs vezérlés a '%{widget}' widget számára.",
      },
      unknownPreview: {
        noPreview: "Nincs előnézet a '%{widget}' widget számára.",
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
        now: undefined, // English translation: 'undefined'
        invalidDateTitle: undefined, // English translation: 'undefined'
        invalidDateBody: undefined, // English translation: 'undefined'
      },
      list: {
        add: 'Új %{item}',
        addType: 'Új típus %{item}',
        noValue: undefined, // English translation: 'undefined'
      },
      keyvalue: {
        key: undefined, // English translation: 'undefined'
        value: undefined, // English translation: 'undefined'
        uniqueKeys: undefined, // English translation: 'undefined'
      },
    },
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: 'Piszkozat',
      copy: undefined, // English translation: 'Copy'
      copyUrl: undefined, // English translation: 'Copy URL'
      copyPath: undefined, // English translation: 'Copy Path'
      copyName: undefined, // English translation: 'Copy Name'
      copied: undefined, // English translation: 'Copied'
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'Biztos törli a kiválasztott média tartalmat?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody: undefined, // English translation: 'File too large.\nConfigured to not allow files greater than %{size} kB.'
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      noResults: 'Nincs találat.',
      noAssetsFound: 'Nem található tartalom.',
      noImagesFound: 'Nem található kép.',
      private: 'Privát ',
      images: 'Képek',
      mediaAssets: 'Média tartalmak',
      search: 'Keresés...',
      uploading: 'Feltöltés...',
      upload: 'Új feltöltés',
      download: undefined, // English translation: 'Download'
      deleting: 'Törlés...',
      deleteSelected: 'Kijelöltek törlése',
      chooseSelected: 'Kijelöl',
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
      goBackToSite: undefined, // English translation: 'Go back to site'
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'Hiba',
      details: 'Hiba történt - kérjük ',
      reportIt: 'jelentse.',
      detailsHeading: 'Részletek',
      privacyWarning: undefined, // English translation: 'Opening an issue pre-populates it with the error message and debugging data.\nPlease verify the information is correct and remove sensitive data if exists.'
      recoveredEntry: {
        heading: 'Helyreállitott dokumentum',
        warning: 'Kérjük mentse ezt el (vágólapra) mielőtt elhagyná az oldalt!',
        copyButtonLabel: 'Másolás a vágólapra',
      },
    },
    settingsDropdown: {
      theme: undefined, // English translation: 'Theme'
      logOut: 'Kijelentkezés',
    },
    toast: {
      onFailToLoadEntries: 'A bejegyzés betöltése nem sikerült: %{details}',
      onFailToLoadDeployPreview: 'Az előnézet betöltése nem sikerült: %{details}',
      onFailToPersist: 'Bejegyzés megtartása sikertelen: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'A bejegyzés törlése sikertelen: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Az állapot frissítése nem sikerült: %{details}',
      missingRequiredField: 'Hoppá, kihagytál egy kötelező mezőt. Mentés előtt töltsd ki.',
      entrySaved: 'Bejegyzés elmentve',
      entryDeleted: undefined, // English translation: 'Entry delete'
      entryPublished: 'Bejegyzés publikálva',
      entryUnpublished: 'Bejegyzés publikálása visszavonva',
      onFailToPublishEntry: 'Bejegyzés publikálása sikertelen: %{details}',
      onFailToUnpublishEntry: 'Bejegyzés publikálásának visszavonása sikertelen: %{details}',
      entryUpdated: 'Bejegyzés állapota frissült',
      onDeletePublishedEntry: undefined, // English translation: 'Published entry deleted'
      onDeleteUnpublishedChanges: 'Unpublished changes deleted',
      onFailToAuth: '%{details}',
      onLoggedOut: undefined, // English translation: 'You have been logged out, please back up any data and login again'
      onBackendDown: undefined, // English translation: 'The backend service is experiencing an outage. See %{details} for more information'
    },
  },
  workflow: {
    workflow: {
      loading: 'A szerkesztési munkafolyamat-bejegyzések betöltése',
      workflowHeading: 'Szerkesztői Folyamat',
      newPost: 'New Post',
      description:
        '%{smart_count} bejegyzés felülvizsgálatra vár, %{readyCount} élesítésre vár. |||| %{smart_count} bejegyzés felülvizsgálatra vár, %{readyCount} élesítésre vár. ',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date}, írta %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: '%{author}',
      deleteChanges: 'Változtatások törlése',
      deleteNewEntry: 'Új bejegyzés törlése',
      publishChanges: 'Változtatások publikálása',
      publishNewEntry: 'Új bejegyzés publikálása',
    },
    workflowList: {
      onDeleteEntry: 'Biztosan törli ezt a bejegyzést?',
      onPublishingNotReadyEntry:
        'Csak a "Kész" állapotú tételek tehetők közzé. A közzététel engedélyezéséhez húzza a kártyát a „Kész” oszlopba.',
      onPublishEntry: 'Biztosan közzéteszi ezt a bejegyzést?',
      draft: 'Piszkozat',
      pending_review: 'Vizsgálat alatt',
      pending_publish: 'Kész',
      currentEntries: '%{smart_count} bejegyzés |||| %{smart_count} bejegyzések',
    },
  },
};

export default hu;
