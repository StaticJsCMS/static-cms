import type { LocalePhrasesRoot } from '../types';

const sl: LocalePhrasesRoot = {
  auth: {
    login: 'Vpiši se',
    loggingIn: 'Prijavljanje...',
    loginWithNetlifyIdentity: 'Prijavi se z Netlify Identity',
    loginWithBitbucket: 'Prijavi se z BitBucket računom',
    loginWithGitHub: 'Prijavi se z GitHub računom',
    loginWithGitLab: 'Prijavi se z Gitlab računom',
    loginWithGitea: undefined, // English translation: 'Login with Gitea'
    errors: {
      email: 'Vnesi svoj pravi e-poštni naslov.',
      password: 'Vnesi svoje geslo.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        'Ni mogoče dostopati do nastavitev identitete. Ko uporabljate Git-Gateway zaledje, se prepričajte, da omogočite Identity Service in Git Gateway.',
    },
  },
  app: {
    header: {
      content: 'Vsebina',
      media: 'Media',
      quickAdd: 'Hitro dodajanje',
    },
    app: {
      errorHeader: 'Napaka pri nalaganju CMS konfiguracije',
      configErrors: 'Konfiguracijske napake',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'Preverite svojo datoteko config.yml.',
      loadingConfig: 'Nalaganje konfiguracije ...',
      waitingBackend: 'Čakanje na zaledje ...',
    },
    notFoundPage: {
      header: 'Ni najdeno',
    },
  },
  collection: {
    sidebar: {
      collections: 'Zbirke',
      allCollections: 'Vse zbirke',
      searchAll: 'Išči vse',
      searchIn: 'Išči v',
    },
    collectionTop: {
      sortBy: 'Razvrsti po',
      viewAs: 'Poglej kot',
      newButton: 'Nov %{collectionLabel}',
      ascending: 'Naraščajoče',
      descending: 'Padajoče',
      searchResults: 'Rezultati iskanja za "%{searchTerm}"',
      searchResultsInCollection: 'Rezultati iskanja za "%{searchTerm}" v %{collection}',
      filterBy: 'Filtriraj po',
      groupBy: 'Grupiraj po',
    },
    entries: {
      loadingEntries: 'Nalaganje vnosov ...',
      cachingEntries: 'Predpomnjenje vnosov ...',
      longerLoading: 'To lahko traja nekaj minut',
      noEntries: 'Ni vnosov',
    },
    groups: {
      other: 'Drugo',
      negateLabel: 'Ne %{label}',
    },
    table: {
      summary: undefined, // English translation: 'Summary'
      collection: undefined, // English translation: 'Collection'
    },
    defaultFields: {
      author: {
        label: 'Avtor',
      },
      updatedOn: {
        label: 'Nazadnje posodobljeno',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'opcijsko',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} je obvezen.',
        regexPattern: '%{fieldLabel} se ni ujemal z vzorcem: %{pattern}.',
        processing: '%{fieldLabel} je v obdelavi.',
        range: '%{fieldLabel} mora biti med %{minValue} in %{maxValue}.',
        min: '%{fieldLabel} mora biti vsaj %{minValue}.',
        max: '%{fieldLabel} mora biti %{maxValue} ali manj.',
        rangeCount: '%{fieldLabel} mora imeti med %{minCount} in %{maxCount} elementov.',
        rangeCountExact: '%{fieldLabel} mora imeti točno %{count} elemente.',
        rangeMin: '%{fieldLabel} mora imeti vsaj %{minCount} elementov.',
        rangeMax: '%{fieldLabel} mora imeti %{maxCount} ali manj elementov.',
        invalidPath: "'%{path}' ni veljavna pot",
        pathExists: "Pot '%{path}' že obstaja",
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: 'Pisanje v %{locale}',
      },
    },
    editor: {
      onLeavePage: 'Ste prepričani, da želite zapustiti to stran?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Ste prepričani, da želite izbrisati ta objavljen vnos, pa tudi neshrannjene spremembe iz trenutne seje?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Ste prepričani, da želite izbrisati ta objavljeni vnos?',
      loadingEntry: 'Nalaganje vnosa ...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: 'Preklopi i18n',
      togglePreview: 'Preklopi predogled',
      toggleScrollSync: 'Sinhroniziraj drsenje',
    },
    editorToolbar: {
      publish: 'Objavi',
      published: 'Objavljeno',
      duplicate: 'Podvoji',
      publishAndCreateNew: 'Objavi in ustvari novo',
      publishAndDuplicate: 'Objavi in podvoji',
      deleteEntry: 'Izbriši vnos',
      publishNow: 'Objavi zdaj',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Debelo',
        italic: 'Poševno',
        code: 'Koda',
        link: 'Povezava',
        linkPrompt: 'Vnesite URL povezave',
        headings: 'Naslovi',
        quote: 'Citat',
        bulletedList: 'Seznam z oznakami',
        numberedList: 'Oštevilčen seznam',
        addComponent: 'Dodaj komponento',
        richText: 'Bogato besedilo',
        markdown: 'Markdown',
        type: undefined, // English translation: 'Type...'
      },
      image: {
        choose: 'Izberi sliko',
        chooseMultiple: 'Izberi slike',
        chooseUrl: 'Vstavi iz URL-ja',
        replaceUrl: 'Zamenjaj z URL',
        promptUrl: 'Vnesi URL slike',
        chooseDifferent: 'Izberi drugo sliko',
        addMore: 'Dodaj več slik',
        remove: 'Odstrani sliko',
        removeAll: 'Odstrani vse slike',
      },
      file: {
        choose: 'Izberi datoteko',
        chooseUrl: 'Vstavi iz URL-ja',
        chooseMultiple: 'Izberi datoteke',
        replaceUrl: 'Zamenjaj z URL',
        promptUrl: 'Vnesi URL datoteke',
        chooseDifferent: 'Izberi drugo datoteko',
        addMore: 'Dodaj več datotek',
        remove: 'Odstrani datoteko',
        removeAll: 'Odstrani vse datoteke',
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
        noControl: "Ni kontrole za gradnik '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Nipredogleda za widget '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Naslov 1',
        headingTwo: 'Naslov 2',
        headingThree: 'Naslov 3',
        headingFour: 'Naslov 4',
        headingFive: 'Naslov 5',
        headingSix: 'Naslov 6',
      },
      datetime: {
        now: 'Zdaj',
        invalidDateTitle: undefined, // English translation: 'Invalid date'
        invalidDateBody: undefined, // English translation: 'The date you entered is invalid.'
      },
      list: {
        add: 'Dodaj %{item}',
        addType: 'Dodaj %{item}',
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
      draft: 'Osnutek',
      copy: 'Kopiraj',
      copyUrl: 'Kopiraj URL',
      copyPath: 'Kopiraj pot',
      copyName: 'Kopiraj ime',
      copied: 'Kopirano',
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'Ste prepričani, da želite izbrisati izbrane medije?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody: 'Datoteka je prevelika.\n Ne sme biti večja od %{size} kb.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      loading: 'Nalaganje...',
      noResults: 'Ni rezultatov.',
      noAssetsFound: 'Ni najdenih sredstev.',
      noImagesFound: 'Ni najdenih slik.',
      images: 'Slike',
      mediaAssets: 'Multimedijska sredstva',
      search: 'Iskanje ...',
      uploading: 'Nalaganje ...',
      upload: 'Naloži',
      download: 'Prenesi',
      deleting: 'Brisanje ...',
      deleteSelected: 'Izbriši izbrano',
      chooseSelected: 'Dodaj izbrano',
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
      goBackToSite: 'Vrni se na spletno mesto',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'Napaka',
      details: 'Prišlo je do napake.',
      reportIt: 'Odprite težavo na GitHubu.',
      detailsHeading: 'Podrobnosti',
      privacyWarning:
        'Odpiranje Github Issue bo javno objavilo vašo napako. Ne vključujte osebnih podatkov v vaši napaki.',
      recoveredEntry: {
        heading: 'Obnovljen dokument',
        warning: 'Prosimo, tole kopirajte/prilepite nekam, preden navigirate drugam!',
        copyButtonLabel: 'Kopiraj v odložišče',
      },
    },
    settingsDropdown: {
      darkMode: undefined, // English translation: 'Dark Mode'
      logOut: 'Odjava',
    },
    toast: {
      onFailToLoadEntries: 'Ni naložilo vnosa: %{details}',
      onFailToPersist: 'Ni uspelo vztrajati: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Ni uspelo izbrisati vnosa: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Ni uspelo posodobiti stanja: %{details}',
      missingRequiredField: 'Ups, zgrešili ste obvezno polje. Pred shranjevanjem izpolnite.',
      entrySaved: 'Vnos shranjen',
      entryPublished: 'Vnos objavljen',
      onFailToPublishEntry: 'Vnosa ni uspelo objaviti: %{details}',
      entryUpdated: 'Status vnosa posodobljen',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Bili ste odjavljeni, varnostno kopirate vse podatke in se ponovno prijavite',
      onBackendDown: 'Zaledna storitev doživlja izpad. Glejte %{details} za več informacij',
    },
  },
};

export default sl;
