import type { LocalePhrasesRoot } from '../types';

const lt: LocalePhrasesRoot = {
  auth: {
    login: 'Prisijungti',
    loggingIn: 'Prisijungiama...',
    loginWithNetlifyIdentity: 'Prisijungti su Netlify Identity',
    loginWithBitbucket: 'Prisijungti su Bitbucket',
    loginWithGitHub: 'Prisijungti su GitHub',
    loginWithGitLab: 'Prisijungti su GitLab',
    loginWithGitea: 'Prisijungti su Gitea',
    errors: {
      email: 'Įveskite savo elektroninį paštą.',
      password: 'Įveskite savo slaptažodį.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: undefined, // English translation: '%{details}'
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        'Deja, nepavyksta pasiekti Identity paslaugos nustatymus. Kai naudojate git-gateway backend metodą, įjunkite „Identity service“ ir „Git Gateway“.',
    },
  },
  app: {
    header: {
      content: 'Turinys',
      media: 'Medija',
      quickAdd: 'Sukurti naują',
    },
    app: {
      errorHeader: 'Klaida, neišėjo užkrauti/pasiekti CMS konfigūracijos failą',
      configErrors: 'Konfigūracijos (nustatymų) klaidos',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'Patikrinkite config.yml balsą.',
      loadingConfig: 'Kraunamas nustatymų (konfigūracijos) failas...',
      waitingBackend: 'Laukiama serverio...',
    },
    notFoundPage: {
      header: 'Nerasta',
    },
  },
  collection: {
    sidebar: {
      collections: 'Kolekcijos',
      allCollections: 'Visos kolekcijos',
      searchAll: 'Ieškoti viską',
      searchIn: 'Ieškoti tik čia',
    },
    collectionTop: {
      sortBy: 'Rikiavimo tvarka',
      viewAs: 'Peržiūrėti kaip',
      newButton: 'Nauja(s) %{collectionLabel}',
      ascending: 'Didėjimo tvarka (A-Z)',
      descending: 'Mažėjimo tvarka (Z-A)',
      searchResults: 'Paieškos rezultatai: „%{searchTerm}“',
      searchResultsInCollection: 'Paieškos rezultatai: „%{searchTerm}“ iš %{collection}',
      filterBy: 'Filtruoti',
      groupBy: 'Grupuoti',
    },
    entries: {
      loadingEntries: 'Kraunamas turinys...',
      cachingEntries: 'Talpinami įrašai...',
      longerLoading: 'Šis procesas gali trukti keletą minučių',
      noEntries: 'Nėra turinio',
    },
    groups: {
      other: 'Kita',
      negateLabel: 'Ne %{label}',
    },
    table: {
      summary: undefined, // English translation: 'Summary'
      collection: undefined, // English translation: 'Collection'
    },
    defaultFields: {
      author: {
        label: 'Autorius',
      },
      updatedOn: {
        label: 'Atnaujinta',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'neprivaloma',
      },
    },
    editorControlPane: {
      widget: {
        required: 'Privaloma užpildyti laukelį %{fieldLabel}.',
        regexPattern:
          '%{fieldLabel} laukelis neatitiko konfigūracijoje nustatytų taisyklių: %{pattern}.',
        processing: 'Apdorojame %{fieldLabel}.',
        range: '%{fieldLabel} turi būti tarp %{minValue} ir %{maxValue}.',
        min: '%{fieldLabel} turi būti bent %{minValue}.',
        max: '%{fieldLabel} turi būti %{maxValue} arba mažiau.',
        rangeCount: '%{fieldLabel} turi būti tarp %{minCount} ir %{maxCount} elementų/-o.',
        rangeCountExact: '%{fieldLabel} turi turėti būtent tik %{count} elementų/-us.',
        rangeMin: '%{fieldLabel} turi būti bent %{minCount} elementų.',
        rangeMax: '%{fieldLabel} turi būti %{maxCount} arba mažiau elementų.',
        invalidPath: "'%{path}' nėra taisyklinga nuoroda/adresas į resursą/-us",
        pathExists: "Adresas '%{path}' jau egzistuoja",
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: 'Rašome %{locale} kalboje',
      },
    },
    editor: {
      onLeavePage: 'Ar tikrai norite uždaryti šį puslapį?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Tikrai norite panaikinti publikuotą įrašą ir Jūsų pakeiitmus iš dabartinės sesijos?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Tikrai norite ištrinti šį publikuotą įrašą?',
      loadingEntry: 'Kraunamas įrašas...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: undefined, // English translation: 'Toggle i18n'
      togglePreview: undefined, // English translation: 'Toggle preview'
      toggleScrollSync: undefined, // English translation: 'Sync scrolling'
    },
    editorToolbar: {
      publish: 'Publikuoti',
      published: 'Jau publikuota',
      duplicate: 'Daryti dublį',
      publishAndCreateNew: 'Publikuoti šitą, po to kurti kažką naujo',
      publishAndDuplicate: 'Publikuoti šitą, po to kurti šito dublį',
      deleteEntry: 'Panaikinti įrašą',
      publishNow: 'Skelbti naują',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Paryškinta',
        italic: 'Pasvariu tekstu (italic)',
        code: 'Kodo šriftas',
        link: 'Nuoroda (adresas)',
        linkPrompt: 'Įveskite adresą čia',
        headings: 'Antraštės',
        quote: 'Citata',
        bulletedList: 'Sąrašas su ženkleliais',
        numberedList: 'Sąrašas su numeriais',
        addComponent: 'Pridėti komponentą',
        richText: 'Normali peržiūra',
        markdown: 'Rodyti be formatavimo (Markdown)',
        type: undefined, // English translation: 'Type...'
      },
      image: {
        choose: 'Pasirinkti vaizdą',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: undefined, // English translation: 'Insert from URL'
        replaceUrl: undefined, // English translation: 'Replace with URL'
        promptUrl: undefined, // English translation: 'Enter the URL of the image'
        chooseDifferent: 'Pasirinkti skirtingą vaizdą',
        addMore: undefined, // English translation: 'Add more images'
        remove: 'Panaikinti vaizdą',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: 'Pasirinkti failą',
        chooseUrl: undefined, // English translation: 'Insert from URL'
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: undefined, // English translation: 'Replace with URL'
        promptUrl: undefined, // English translation: 'Enter the URL of the file'
        chooseDifferent: 'Pasirinkti kitą failą',
        addMore: undefined, // English translation: 'Add more files'
        remove: 'Panaikinti failą',
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
        noControl: "Klaida: valdiklis taisyklingai neveikia. No control for widget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Klaida: valdiklis taisyklingai neveikia. No preview for widget '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Antraštė 1',
        headingTwo: 'Antraštė 2',
        headingThree: 'Antraštė 3',
        headingFour: 'Antraštė 4',
        headingFive: 'Antraštė 5',
        headingSix: 'Antraštė 6',
      },
      datetime: {
        now: 'Dabar',
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
      draft: 'Juodraštis',
      copy: undefined, // English translation: 'Copy'
      copyUrl: undefined, // English translation: 'Copy URL'
      copyPath: undefined, // English translation: 'Copy Path'
      copyName: undefined, // English translation: 'Copy Name'
      copied: undefined, // English translation: 'Copied'
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'Ar jūs tikrai norite ištrinti pasirinktą mediją?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody:
        'Failas per didelis.\nNustatymuose (konfigūracijoje) nurodyta, kad failai negali viršyti %{size} kB.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      loading: 'Kraunama...',
      noResults: 'Nėra rezultatų.',
      noAssetsFound: 'Turinio nerasta.',
      noImagesFound: 'Vaizdų nerasta.',
      images: 'Vaizdai',
      mediaAssets: 'Medijos turinys',
      search: 'Paieška...',
      uploading: 'Keliama...',
      upload: 'Įkelti',
      download: 'Parsiųsti',
      deleting: 'Trinama...',
      deleteSelected: 'Ištrinti parinktus',
      chooseSelected: 'Pasirinkti parinktus',
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
      goBackToSite: 'Grįžti atgal į tinklalapį',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'Klaida',
      details: 'Buvo klaida - jeigu galite, prašome ',
      reportIt: 'pranešti apie techninę problemą „GitHub“ puslapyje.',
      detailsHeading: 'Detalės',
      privacyWarning:
        'Opening an issue pre-populates it with the error message and debugging data.\nPlease verify the information is correct and remove sensitive data if exists.',
      recoveredEntry: {
        heading: 'Sugrąžintas dokumentas',
        warning: 'Prašome kopijuoti/įkluoti šitą kažkur prieš uždarant puslapį!',
        copyButtonLabel: 'Nukopijuoti į iškarpinę',
      },
    },
    settingsDropdown: {
      darkMode: undefined, // English translation: 'Dark Mode'
      logOut: 'Atsijungti',
    },
    toast: {
      onFailToLoadEntries: 'Nepavyko užkrauti įrašo: %{details}',
      onFailToPersist: 'Nepavyko išlaikyti įrašo: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Nepayvko ištrinti: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Nepavyko pakeisti statusą: %{details}',
      missingRequiredField:
        'Pasitikrinkite — kažkurio (ar kelių) laukelių neužpildėte. Tai padarius galėsite išsaugoti įrašą.',
      entrySaved: 'Įrašas išsaugotos',
      entryPublished: 'Įrašas publikuotas',
      onFailToPublishEntry: 'Nepavyko publikuoti: %{details}',
      entryUpdated: 'Įrašo statusas pakeistas',
      onFailToAuth: 'Nepavyko prisijungti: %{details}',
      onLoggedOut:
        'Mes jus atjungėme. Jeigu yra poreikis, sukurkite duomenų atsarginę kopiją. Galite tiesiog iš naujo prisijungti.',
      onBackendDown:
        'Deja, serveris šiuo metu neveikia. Bandykite iš naujo dar sykį arba šiek tiek vėliau. Detalės: %{details}',
    },
  },
};

export default lt;
