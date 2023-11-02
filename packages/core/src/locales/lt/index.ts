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
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        'Deja, nepavyksta pasiekti Identity paslaugos nustatymus. Kai naudojate git-gateway backend metodą, įjunkite „Identity service“ ir „Git Gateway“.',
    },
  },
  app: {
    header: {
      content: 'Turinys',
      workflow: 'Darbo eiga',
      media: 'Medija',
      quickAdd: 'Sukurti naują',
    },
    app: {
      loading: 'Kraunama...',
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
        copyFromLocale: undefined, // English translation: 'Fill in from another locale'
        copyFromLocaleConfirm: undefined, // English translation: 'Do you want to fill in data from %{locale} locale?\nAll existing content will be overwritten.'
      },
    },
    editor: {
      onLeavePage: 'Ar tikrai norite uždaryti šį puslapį?',
      onUpdatingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onUpdatingWithUnsavedChangesBody:
        'Turite neišsaugotų pakeitimų! Prašome išsaugoti prieš pakeičiant statusą.',
      onPublishingNotReadyTitle: undefined, // English translation: 'Not ready to publish'
      onPublishingNotReadyBody: 'Prieš publikuojant, privalote pakeisti statusą į „Paruošta“.',
      onPublishingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onPublishingWithUnsavedChangesBody:
        'Yra neišsaugotų pakeitimų, prašome išsaugoti juos prieš publikuojant.',
      onPublishingTitle: undefined, // English translation: 'Publish entry?'
      onPublishingBody: 'Ae tikrai norite publikuoti šį įrašą?',
      onUnpublishingTitle: undefined, // English translation: 'Unpublish entry?'
      onUnpublishingBody: 'Tikrai norite panaikinti publikavimo statusą?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Tikrai norite panaikinti publikuotą įrašą ir Jūsų pakeiitmus iš dabartinės sesijos?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Tikrai norite ištrinti šį publikuotą įrašą?',
      onDeleteUnpublishedChangesWithUnsavedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        'Tai ištrins visus nepublikuotus pakeitimus įraše, taip pat neišsaugotus pakeitimus per dabartinę sesiją. Vis tiek norite trinti?',
      onDeleteUnpublishedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesBody:
        'Visi Jūsų pakeitimai įraše bus panaikinti. Ar tikrai norite trinti jį?',
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
      publishing: 'Publikuojama...',
      publish: 'Publikuoti',
      published: 'Jau publikuota',
      unpublish: 'Atšaukti paskelbimą',
      duplicate: 'Daryti dublį',
      unpublishing: 'Nebeskelbiama...',
      publishAndCreateNew: 'Publikuoti šitą, po to kurti kažką naujo',
      publishAndDuplicate: 'Publikuoti šitą, po to kurti šito dublį',
      deleteUnpublishedChanges: 'Ištrinti publikuotus pakeitimus',
      deleteUnpublishedEntry: 'Ištrinti nepaskelbtą įrašą',
      deletePublishedEntry: 'Ištrinti paskelbtą įrašą',
      deleteEntry: 'Panaikinti įrašą',
      saving: 'Išsaugojama...',
      save: 'Išsaugoti',
      statusInfoTooltipDraft: undefined, // English translation: 'Entry status is set to draft. To finalize and submit it for review, set the status to �In review�'
      statusInfoTooltipInReview: undefined, // English translation: 'Entry is being reviewed, no further actions are required. However, you can still make additional changes while it is being reviewed.'
      deleting: 'Trinama...',
      updating: 'Atnaujinama...',
      status: 'Statusą: %{status}',
      backCollection: ' Rašoma %{collectionLabel} kolekcijoje',
      unsavedChanges: 'Neišsaugoti pakeitimai',
      changesSaved: 'Pakeitimai išsauogti',
      draft: 'Juodraštis',
      inReview: 'Peržiūrima redakcijoje',
      ready: 'Paruošta',
      publishNow: 'Skelbti naują',
      deployPreviewPendingButtonLabel: 'Tikrinti, ar yra demonstracija',
      deployPreviewButtonLabel: 'Žiūrėti demonstraciją (netiesiogiai)',
      deployButtonLabel: 'Žiūrėti tiesiogiai tinklalapyje',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Paryškinta',
        italic: 'Pasvariu tekstu (italic)',
        strikethrough: undefined, // English translation: 'Strikethrough'
        code: 'Kodo šriftas',
        codeBlock: undefined, // English translation: 'Code block'
        insertCodeBlock: undefined, // English translation: 'Insert code block'
        link: 'Nuoroda (adresas)',
        insertLink: undefined, // English translation: 'Insert link'
        paragraph: undefined, // English translation: 'Paragraph'
        headings: 'Antraštės',
        quote: 'Citata',
        insertQuote: undefined, // English translation: 'Insert blockquote'
        bulletedList: 'Sąrašas su ženkleliais',
        numberedList: 'Sąrašas su numeriais',
        addComponent: 'Pridėti komponentą',
        richText: 'Normali peržiūra',
        markdown: 'Rodyti be formatavimo (Markdown)',
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
      code: {
        language: undefined, // English translation: 'Language'
        selectLanguage: undefined, // English translation: 'Select language'
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
      noResults: 'Nėra rezultatų.',
      noAssetsFound: 'Turinio nerasta.',
      noImagesFound: 'Vaizdų nerasta.',
      private: 'Privatu ',
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
      theme: undefined, // English translation: 'Theme'
      logOut: 'Atsijungti',
    },
    toast: {
      onFailToLoadEntries: 'Nepavyko užkrauti įrašo: %{details}',
      onFailToLoadDeployPreview: 'Nepavyko užkrauti demonstracijos lango: %{details}',
      onFailToPersist: 'Nepavyko išlaikyti įrašo: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Nepayvko ištrinti: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Nepavyko pakeisti statusą: %{details}',
      missingRequiredField:
        'Pasitikrinkite — kažkurio (ar kelių) laukelių neužpildėte. Tai padarius galėsite išsaugoti įrašą.',
      entrySaved: 'Įrašas išsaugotos',
      entryDeleted: undefined, // English translation: 'Entry delete'
      entryPublished: 'Įrašas publikuotas',
      entryUnpublished: 'Įrašas nepublikuotas',
      onFailToPublishEntry: 'Nepavyko publikuoti: %{details}',
      onFailToUnpublishEntry: 'Nepavyko panaikinti publikavimą: %{details}',
      entryUpdated: 'Įrašo statusas pakeistas',
      onDeletePublishedEntry: undefined, // English translation: 'Published entry deleted'
      onDeleteUnpublishedChanges: 'Nepublikuoti pakeitimai ištrinti',
      onFailToAuth: 'Nepavyko prisijungti: %{details}',
      onLoggedOut:
        'Mes jus atjungėme. Jeigu yra poreikis, sukurkite duomenų atsarginę kopiją. Galite tiesiog iš naujo prisijungti.',
      onBackendDown:
        'Deja, serveris šiuo metu neveikia. Bandykite iš naujo dar sykį arba šiek tiek vėliau. Detalės: %{details}',
    },
  },
  workflow: {
    workflow: {
      dashboard: undefined, // English translation: 'Dashboard'
      loading: 'Kraunamas turinys',
      workflowHeading: 'Redakcijos darbo eiga',
      newPost: 'Naujas įrašas',
      description:
        '%{smart_count} įrašas laukia Jūsų peržiūrėjimo, %{readyCount} jau gali būti publikuojamas. |||| %{smart_count} elementai laukia Jūsų peržiūrėjimo, %{readyCount} jau gali būti publikuojami. ',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date} pagal %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: 'oagal %{author}',
      deleteChanges: 'Trinti keitimus',
      deleteNewEntry: 'Trinti naują įrašą',
      publishChanges: 'Publikuoti keitimus',
      publishNewEntry: 'Kurti naują įrašą',
    },
    workflowList: {
      onDeleteEntry: 'Ar tikrai norite ištrinti šį įrašą?',
      onPublishingNotReadyEntry:
        'Tik įrašai su statusu „Paruošta“ gali būti patvirtinti. Prašome pajudinti įrašo kortelę link „Paruošta“ stulpelio, kad galėtumėte publikuoti įrašą.',
      onPublishEntry: 'Ar jūs tikrai norite publikuoti šį įrašą?',
      draft: 'Juodraščiai',
      pending_review: 'Peržiūrima redakcijoje',
      pending_publish: 'Paruošta',
      currentEntries: '%{smart_count} įrašas |||| %{smart_count} įrašai',
    },
    openAuthoring: {
      forkRequired: undefined, // English translation: 'Open Authoring is enabled. We need to use a fork on your github account. (If a fork already exists, we'll use that.)'
      forkRepo: undefined, // English translation: 'Fork the repo'
      markReadyForReview: undefined, // English translation: 'Mark Ready for Review'
    },
  },
};

export default lt;
