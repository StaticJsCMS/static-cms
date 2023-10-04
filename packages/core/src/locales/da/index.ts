import type { LocalePhrasesRoot } from '../types';

const da: LocalePhrasesRoot = {
  auth: {
    login: 'Log ind',
    loggingIn: 'Logger ind...',
    loginWithNetlifyIdentity: 'Log ind med Netlify Identity',
    loginWithBitbucket: 'Log ind med Bitbucket',
    loginWithGitHub: 'Log ind med GitHub',
    loginWithGitLab: 'Log ind med GitLab',
    loginWithGitea: 'Log ind med Gitea',
    errors: {
      email: 'Vær sikker på du har indtastet din e-mail.',
      password: 'Indtast dit kodeord.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        'Kunne ikke tilgå identity opsætning. Ved brug af git-gateway som bagvedliggende service, sørg for at aktivere Identity service og Git Gateway.',
    },
  },
  app: {
    header: {
      content: 'Indhold',
      workflow: 'Arbejdsgang',
      media: 'Medier',
      quickAdd: 'Hurtig opret',
    },
    app: {
      loading: 'Indlæser...',
      errorHeader: 'Fejl ved indlæsning af CMS opsætningen',
      configErrors: 'Opsætningsfejl',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'Kontroller din config.yml fil.',
      loadingConfig: 'Indlæser opsætning...',
      waitingBackend: 'Venter på bagvedliggende service...',
    },
    notFoundPage: {
      header: 'Ikke fundet',
    },
  },
  collection: {
    sidebar: {
      collections: 'Samlinger',
      allCollections: 'Alle samlinger',
      searchAll: 'Søg i alt',
      searchIn: 'Søg i',
    },
    collectionTop: {
      sortBy: 'Sorter efter',
      viewAs: 'Vis som',
      newButton: 'Ny %{collectionLabel}',
      ascending: 'Stigende',
      descending: 'Faldende',
      searchResults: 'Søgeresultater for "%{searchTerm}"',
      searchResultsInCollection: 'Søgeresultater for "%{searchTerm}" i %{collection}',
      filterBy: 'Filtrer efter',
      groupBy: 'Grupper efter',
    },
    entries: {
      loadingEntries: 'Indlæser dokumenter...',
      cachingEntries: 'Caching af dokumenter...',
      longerLoading: 'Dette kan tage adskillige minutter',
      noEntries: 'Ingen dokumenter',
    },
    groups: {
      other: 'Anden',
      negateLabel: 'Ikke %{label}',
    },
    table: {
      summary: undefined, // English translation: 'Summary'
      collection: undefined, // English translation: 'Collection'
    },
    defaultFields: {
      author: {
        label: 'Forfatter',
      },
      updatedOn: {
        label: 'Opdateret ',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'kan udelades',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} er påkrævet.',
        regexPattern: '%{fieldLabel} matchede ikke: %{pattern}.',
        processing: '%{fieldLabel} behandles.',
        range: '%{fieldLabel} skal være mellem %{minValue} og %{maxValue}.',
        min: '%{fieldLabel} skal være mindst %{minValue}.',
        max: '%{fieldLabel} være være %{maxValue} eller mindre.',
        rangeCount: '%{fieldLabel} skal have mellem %{minCount} og %{maxCount} element(er).',
        rangeCountExact: '%{fieldLabel} skal have præcis %{count} element(er).',
        rangeMin: '%{fieldLabel} skal have mindst %{minCount} element(er).',
        rangeMax: '%{fieldLabel} skal have %{maxCount} eller færre element(er).',
        invalidPath: "'%{path}' er ikke en gyldig sti",
        pathExists: "Stien '%{path}' findes allerede",
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: 'Skriver på %{locale}',
        copyFromLocale: 'Kopier fra et andet sprog',
        copyFromLocaleConfirm:
          'Vil du indsætte data fra sproget %{locale}?\nAlt eksisterende indhold vil blive overskrevet.',
      },
    },
    editor: {
      onLeavePage: 'Er du sikker på at du vil forlade siden?',
      onUpdatingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onUpdatingWithUnsavedChangesBody:
        'Du har ændringer der ikke er gemt, gem disse før status ændres.',
      onPublishingNotReadyTitle: undefined, // English translation: 'Not ready to publish'
      onPublishingNotReadyBody: 'Skift status til "Klar" inden publicering.',
      onPublishingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onPublishingWithUnsavedChangesBody: 'Du har ændringer der ikke er gemt, gem inden publicing.',
      onPublishingTitle: undefined, // English translation: 'Publish entry?'
      onPublishingBody: 'Er du sikker på at du vil publicere dette dokument?',
      onUnpublishingTitle: undefined, // English translation: 'Unpublish entry?'
      onUnpublishingBody: 'Er du sikker på at du vil afpublicere dette dokument?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Er du sikker på at du vil slette dette tidliere publiceret dokument, samt dine nuværende ugemte ændringer fra denne session?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody:
        'Er du sikker på at du vil slette dette tidliere publiceret dokument?',
      onDeleteUnpublishedChangesWithUnsavedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        'Alle ikke publicerede ændringer til dette dokument vil blive slettet ligesom dine nuværende ugemte ændringer fra denne session. Er du sikker på at du vil slette?',
      onDeleteUnpublishedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesBody:
        'Alle ikke publicerede ændringer til dette dokument vil blive slettet. Er du sikker på at du vil slette?',
      loadingEntry: 'Indlæser dokument...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: undefined, // English translation: 'Toggle i18n'
      togglePreview: undefined, // English translation: 'Toggle preview'
      toggleScrollSync: undefined, // English translation: 'Sync scrolling'
    },
    editorToolbar: {
      publishing: 'Publicerer...',
      publish: 'Publicer',
      published: 'Publiceret',
      unpublish: 'Afpublicer',
      duplicate: 'Kopier',
      unpublishing: 'Afpublicerer...',
      publishAndCreateNew: 'Publicer og opret ny',
      publishAndDuplicate: 'Publicer og kopier',
      deleteUnpublishedChanges: 'Slet upublicerede ændringer',
      deleteUnpublishedEntry: 'Slet upubliceret dokument',
      deletePublishedEntry: 'Slet publiceret dokument',
      deleteEntry: 'Slet dokument',
      saving: 'Gemmer...',
      save: 'Gem',
      statusInfoTooltipDraft:
        'Status for elementet er kladde. For at afslutte og sende til gennemsyn, skift status til ‘Til gennemsyn’',
      statusInfoTooltipInReview:
        'Elementet er til gennemsyn, det er ikke nødvendigt med yderligere handlinger. Du kan dog stadig lave yderligere ændringer mens det er til gennemsyn.',
      deleting: 'Sletter...',
      updating: 'Opdaterer...',
      status: 'Status: %{status}',
      backCollection: ' Skriver til %{collectionLabel} samlingen',
      unsavedChanges: 'Ugemte ændringer',
      changesSaved: 'Ændringer gemt',
      draft: 'Kladder',
      inReview: 'Til gennemsyn',
      ready: 'Klar',
      publishNow: 'Publicer nu',
      deployPreviewPendingButtonLabel: 'Lav preview',
      deployPreviewButtonLabel: 'Vis preview',
      deployButtonLabel: 'Vis live',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Fed',
        italic: 'Kursiv',
        strikethrough: undefined, // English translation: 'Strikethrough'
        code: 'Kode',
        codeBlock: undefined, // English translation: 'Code block'
        insertCodeBlock: undefined, // English translation: 'Insert code block'
        link: 'Link',
        insertLink: undefined, // English translation: 'Insert link'
        paragraph: undefined, // English translation: 'Paragraph'
        headings: 'Overskrifter',
        quote: 'Citat',
        insertQuote: undefined, // English translation: 'Insert blockquote'
        bulletedList: 'Punktopstilling',
        numberedList: 'Nummeret liste',
        addComponent: 'Tilføj komponent',
        richText: 'Formatteret tekst',
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
        choose: 'Vælg et billede',
        chooseMultiple: 'Vælg billeder',
        chooseUrl: 'Indsæt fra URL',
        replaceUrl: 'Erstat med URL',
        promptUrl: 'Indtast URL for billeder',
        chooseDifferent: 'Vælg et andet billede',
        addMore: 'Tilføj flere billeder',
        remove: 'Fjern billede',
        removeAll: 'Fjern alle billeder',
      },
      file: {
        choose: 'Vælg fil',
        chooseUrl: 'Indsæt fra URL',
        chooseMultiple: 'Vælg filer',
        replaceUrl: 'Erstat med URL',
        promptUrl: 'Indtast URL for filen',
        chooseDifferent: 'Vælg en anden fil',
        addMore: 'Tilføj flere filer',
        remove: 'Fjern fil',
        removeAll: 'Fjern alle filer',
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
        noControl: "Ingen kontrol for '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Ingen preview for '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Overskrift 1',
        headingTwo: 'Overskrift 2',
        headingThree: 'Overskrift 3',
        headingFour: 'Overskrift 4',
        headingFive: 'Overskrift 5',
        headingSix: 'Overskrift 6',
      },
      datetime: {
        now: 'Nu',
        invalidDateTitle: undefined, // English translation: 'Invalid date'
        invalidDateBody: undefined, // English translation: 'The date you entered is invalid.'
      },
      list: {
        add: 'Tilføj %{item}',
        addType: 'Tilføj %{item}',
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
      draft: 'Kladde',
      copy: 'Kopier',
      copyUrl: 'Kopier URL',
      copyPath: 'Kopier sti',
      copyName: 'Kopier navn',
      copied: 'Kopieret',
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'Er du sikker på at du vil slette det valgte medie?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody:
        'Filen er for stor.\nOpsætningen tillader ikke filer større end %{size} kB.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      noResults: 'Ingen resultater.',
      noAssetsFound: 'Ingen elementer fundet.',
      noImagesFound: 'Ingen billeder fundet.',
      private: 'Privat ',
      images: 'Billeder',
      mediaAssets: 'Medie elementer',
      search: 'Søg...',
      uploading: 'Uploader...',
      upload: 'Upload',
      download: 'Download',
      deleting: 'Slet...',
      deleteSelected: 'Slet valgte',
      chooseSelected: 'Anvend valgte',
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
      goBackToSite: 'Tilbage til hjemmesiden',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'Fejl',
      details: 'Der opstod en fejl - venligst ',
      reportIt: 'opret et issue på GitHub.',
      detailsHeading: 'Detalger',
      privacyWarning:
        'Ved at oprette et issue forudfyldes det med fejlbeskeden og data til debugging.\nKontroller venligst at informationerne er korrekte og fjern eventuelle følsomme data.',
      recoveredEntry: {
        heading: 'Gendannet dokument',
        warning: 'Kopier dette et sted hen inden du navigerer væk!',
        copyButtonLabel: 'Kopier til udklipsholder',
      },
    },
    settingsDropdown: {
      theme: undefined, // English translation: 'Theme'
      logOut: 'Log af',
    },
    toast: {
      onFailToLoadEntries: 'Fejl ved indlæsning af dokumenter: %{details}',
      onFailToLoadDeployPreview: 'Preview kunne ikke indlæses: %{details}',
      onFailToPersist: 'Dokumentet kunne ikke gemmes: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Dokumentet kunne ikke slettes: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Status kunne ikke opdateres: %{details}',
      missingRequiredField:
        'Ups, du mangler et påkrævet felt. Udfyld de påkrævede felter før dokumentet gemmes.',
      entrySaved: 'Dokumentet er gemt',
      entryDeleted: undefined, // English translation: 'Entry delete'
      entryPublished: 'Dokumentet er publiceret ',
      entryUnpublished: 'Dokumentet er afpubliceret',
      onFailToPublishEntry: 'Kunne ikke publicere på grund af en fejl: %{details}',
      onFailToUnpublishEntry: 'Kunne ikke afpublicere på grund af en fejl: %{details}',
      entryUpdated: 'Dokumentstatus er opdateret',
      onDeletePublishedEntry: undefined, // English translation: 'Published entry deleted'
      onDeleteUnpublishedChanges: 'Upublicerede ændringer blev slettet',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Du er blevet logget ind, gem venligst evt. ændringer og log på igen',
      onBackendDown:
        'Den bagvedliggende service er ikke tilgængelig i øjeblikket. Se %{details} for mere information',
    },
  },
  workflow: {
    workflow: {
      loading: 'Indlæser dokumenter i redaktionel arbejdsgang',
      workflowHeading: 'Redaktionel arbejdsgang',
      newPost: 'Nyt indlæg',
      description:
        '%{smart_count} dokumenter afventer gennemsyn, %{readyCount} er klar til live. |||| %{smart_count} dokumenter afventer gennemsyn, %{readyCount} klar til go live. ',
      dateFormat: 'D. MMMM',
    },
    workflowCard: {
      lastChange: '%{date} af %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: 'af %{author}',
      deleteChanges: 'Slet ændringer',
      deleteNewEntry: 'Slet nye dokumenter',
      publishChanges: 'Publicer ændringer',
      publishNewEntry: 'Publicer nye dokumenter',
    },
    workflowList: {
      onDeleteEntry: 'Er du sikker på at du vil slette dette dokument?',
      onPublishingNotReadyEntry:
        'Kun dokumenter med "Klar" status kan publiceres. Træk kortet til "Klar" kolonnen for at tillade publicering.',
      onPublishEntry: 'Er du sikker på at du vil publicere dokumentet?',
      draft: 'Kladder',
      pending_review: 'Til gennemsyn',
      pending_publish: 'Klar',
      currentEntries: '%{smart_count} dokument |||| %{smart_count} dokumenter',
    },
  },
};

export default da;
