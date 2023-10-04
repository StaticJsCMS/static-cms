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
      workflow: 'Potek dela',
      media: 'Media',
      quickAdd: 'Hitro dodajanje',
    },
    app: {
      loading: 'Nalaganje...',
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
        copyFromLocale: 'Izpolnite iz drugega jezika',
        copyFromLocaleConfirm:
          'Ali želiš izpolniti podatke iz %{locale} jezika?\nVsa obstoječa vsebina bo prepisana.',
      },
    },
    editor: {
      onLeavePage: 'Ste prepričani, da želite zapustiti to stran?',
      onUpdatingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onUpdatingWithUnsavedChangesBody:
        'Imaš neshranjene spremembe. Shrani pred posodobitvijo stanja.',
      onPublishingNotReadyTitle: undefined, // English translation: 'Not ready to publish'
      onPublishingNotReadyBody: 'Pred objavo posodobi status na "pripravljen".',
      onPublishingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onPublishingWithUnsavedChangesBody: 'Imaš neshranjene spremembe. Shrani pred objavo.',
      onPublishingTitle: undefined, // English translation: 'Publish entry?'
      onPublishingBody: 'Ste prepričani, da želite objaviti ta vnos?',
      onUnpublishingTitle: undefined, // English translation: 'Unpublish entry?'
      onUnpublishingBody: 'Ste prepričani, da želite preklicati objavo tega vnosa?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Ste prepričani, da želite izbrisati ta objavljen vnos, pa tudi neshrannjene spremembe iz trenutne seje?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Ste prepričani, da želite izbrisati ta objavljeni vnos?',
      onDeleteUnpublishedChangesWithUnsavedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        'To bo izbrisalo vse neobjavljene spremembe tega vnosa, pa tudi neshranjene spremembe iz trenutne seje. Ali še vedno želiš izbrisati?',
      onDeleteUnpublishedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesBody:
        'Vse neobjavljene spremembe tega vnosa bodo izbrisane. Ali še vedno želiš izbrisati?',
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
      publishing: 'Objavljanje ...',
      publish: 'Objavi',
      published: 'Objavljeno',
      unpublish: 'Prekliči objavo',
      duplicate: 'Podvoji',
      unpublishing: 'Preklicevanje objave ...',
      publishAndCreateNew: 'Objavi in ustvari novo',
      publishAndDuplicate: 'Objavi in podvoji',
      deleteUnpublishedChanges: 'Izbriši neobjavljene spremembe',
      deleteUnpublishedEntry: 'Izbriši neobjavljen vnos',
      deletePublishedEntry: 'Izbriši objavljen vnos',
      deleteEntry: 'Izbriši vnos',
      saving: 'Shranjevanje ...',
      save: 'Shrani',
      statusInfoTooltipDraft:
        'Status vnosa je nastavljen na osnutek. Če ga želiš dokončati in predložiti v pregled, nastavi stanje na „v pregledu“',
      statusInfoTooltipInReview:
        'Vnos je v pregledu, nadaljnja dejanja niso potrebna. Vendar lahko med pregledovanjem še vedno narediš spremembe.',
      deleting: 'Brisanje ...',
      updating: 'Posodabljanje ...',
      status: 'status: %{status}',
      backCollection: ' Pisanje v %{collectionLabel} zbirko',
      unsavedChanges: 'Neshranjene spremembe',
      changesSaved: 'Spremembe shranjene',
      draft: 'Osnutek',
      inReview: 'V pregledu',
      ready: 'Pripravljen',
      publishNow: 'Objavi zdaj',
      deployPreviewPendingButtonLabel: 'Preveri za predogled',
      deployPreviewButtonLabel: 'Ogled predogleda',
      deployButtonLabel: 'Pogled v živo',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Debelo',
        italic: 'Poševno',
        strikethrough: undefined, // English translation: 'Strikethrough'
        code: 'Koda',
        codeBlock: undefined, // English translation: 'Code block'
        insertCodeBlock: undefined, // English translation: 'Insert code block'
        link: 'Povezava',
        insertLink: undefined, // English translation: 'Insert link'
        linkPrompt: 'Vnesite URL povezave',
        paragraph: undefined, // English translation: 'Paragraph'
        headings: 'Naslovi',
        quote: 'Citat',
        insertQuote: undefined, // English translation: 'Insert blockquote'
        bulletedList: 'Seznam z oznakami',
        numberedList: 'Oštevilčen seznam',
        addComponent: 'Dodaj komponento',
        richText: 'Bogato besedilo',
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
      code: {
        language: undefined, // English translation: 'Language'
        selectLanguage: undefined, // English translation: 'Select language'
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
      noResults: 'Ni rezultatov.',
      noAssetsFound: 'Ni najdenih sredstev.',
      noImagesFound: 'Ni najdenih slik.',
      private: 'Private',
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
      theme: undefined, // English translation: 'Theme'
      logOut: 'Odjava',
    },
    toast: {
      onFailToLoadEntries: 'Ni naložilo vnosa: %{details}',
      onFailToLoadDeployPreview: 'Ni naložilo predogleda: %{details}',
      onFailToPersist: 'Ni uspelo vztrajati: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Ni uspelo izbrisati vnosa: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Ni uspelo posodobiti stanja: %{details}',
      missingRequiredField: 'Ups, zgrešili ste obvezno polje. Pred shranjevanjem izpolnite.',
      entrySaved: 'Vnos shranjen',
      entryDeleted: undefined, // English translation: 'Entry delete'
      entryPublished: 'Vnos objavljen',
      entryUnpublished: 'Objava vnosa preklicana',
      onFailToPublishEntry: 'Vnosa ni uspelo objaviti: %{details}',
      onFailToUnpublishEntry: 'Preklicanje objave vnosa ni uspelo: %{details}',
      entryUpdated: 'Status vnosa posodobljen',
      onDeletePublishedEntry: undefined, // English translation: 'Published entry deleted'
      onDeleteUnpublishedChanges: 'Neobjavljene spremembe izbrisane',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Bili ste odjavljeni, varnostno kopirate vse podatke in se ponovno prijavite',
      onBackendDown: 'Zaledna storitev doživlja izpad. Glejte %{details} za več informacij',
    },
  },
  workflow: {
    workflow: {
      loading: 'Nalaganje uredniških vnosov',
      workflowHeading: 'Uredniški potek dela',
      newPost: 'Nov vnos',
      description:
        '%{smart_count} vnos čaka na pregled, %{readyCount} pripravljen za objavo. |||| %{smart_count} vnosov čaka na pregled, %{readyCount} pripravljenih za objavo.',
      dateFormat: 'DD. MM. YYYY',
    },
    workflowCard: {
      lastChange: '%{date} by %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: 'by %{author}',
      deleteChanges: 'Izbriši spremembe',
      deleteNewEntry: 'Izbriši nov vnos',
      publishChanges: 'Objavi spremembe',
      publishNewEntry: 'Objavi nov vnos',
    },
    workflowList: {
      onDeleteEntry: 'Ali ste prepričani, da želite izbrisati ta vnos?',
      onPublishingNotReadyEntry:
        'Objavijo se lahko samo elementi s statusom "pripravljen". Prosimo, povlecite kartico v stolpec "pripravljen", da omogočite objavo.',
      onPublishEntry: 'Ste prepričani, da želite objaviti ta vnos?',
      draft: 'Osnutki',
      pending_review: 'V pregledu',
      pending_publish: 'Pripravljen',
      currentEntries: '%{smart_count} vnos |||| %{smart_count} vnosov',
    },
  },
};

export default sl;
