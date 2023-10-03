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
      media: 'Medier',
      quickAdd: 'Hurtig opret',
    },
    app: {
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
      },
    },
    editor: {
      onLeavePage: 'Er du sikker på at du vil forlade siden?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Er du sikker på at du vil slette dette tidliere publiceret dokument, samt dine nuværende ugemte ændringer fra denne session?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody:
        'Er du sikker på at du vil slette dette tidliere publiceret dokument?',
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
      publish: 'Publicer',
      published: 'Publiceret',
      duplicate: 'Kopier',
      publishAndCreateNew: 'Publicer og opret ny',
      publishAndDuplicate: 'Publicer og kopier',
      deleteEntry: 'Slet dokument',
      publishNow: 'Publicer nu',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Fed',
        italic: 'Kursiv',
        code: 'Kode',
        link: 'Link',
        linkPrompt: 'Indtast URL for link',
        headings: 'Overskrifter',
        quote: 'Citat',
        bulletedList: 'Punktopstilling',
        numberedList: 'Nummeret liste',
        addComponent: 'Tilføj komponent',
        richText: 'Formatteret tekst',
        markdown: 'Markdown',
        type: undefined, // English translation: 'Type...'
      },
      image: {
        choose: 'Vælg et billede',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: undefined, // English translation: 'Insert from URL'
        replaceUrl: undefined, // English translation: 'Replace with URL'
        promptUrl: undefined, // English translation: 'Enter the URL of the image'
        chooseDifferent: 'Vælg et andet billede',
        addMore: undefined, // English translation: 'Add more images'
        remove: 'Fjern billede',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: 'Vælg fil',
        chooseUrl: undefined, // English translation: 'Insert from URL'
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: undefined, // English translation: 'Replace with URL'
        promptUrl: undefined, // English translation: 'Enter the URL of the file'
        chooseDifferent: 'Vælg en anden fil',
        addMore: undefined, // English translation: 'Add more files'
        remove: 'Fjern fil',
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
        noControl: "Ingen kontrol finden for '%{widget}'.",
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
      draft: 'Kladde',
      copy: undefined, // English translation: 'Copy'
      copyUrl: undefined, // English translation: 'Copy URL'
      copyPath: undefined, // English translation: 'Copy Path'
      copyName: undefined, // English translation: 'Copy Name'
      copied: undefined, // English translation: 'Copied'
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
      loading: 'Indlæser...',
      noResults: 'Ingen resultater.',
      noAssetsFound: 'Ingen elementer fundet.',
      noImagesFound: 'Ingen billeder fundet.',
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
      darkMode: undefined, // English translation: 'Dark Mode'
      logOut: 'Log af',
    },
    toast: {
      onFailToLoadEntries: 'Fejl ved indlæsning af dokumenter: %{details}',
      onFailToPersist: 'Dokumentet kunne ikke gemmes: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Dokumentet kunne ikke slettes: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Status kunne ikke opdateres: %{details}',
      missingRequiredField:
        'Ups, du mangler et påkrævet felt. Udfyld de påkrævede felter før dokumentet gemmes.',
      entrySaved: 'Dokumentet er gemt',
      entryPublished: 'Dokumentet er publiceret ',
      onFailToPublishEntry: 'Kunne ikke publicere på grund af en fejl: %{details}',
      entryUpdated: 'Dokumentstatus er opdateret',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Du er blevet logget ind, gem venligst evt. ændringer og log på igen',
      onBackendDown:
        'Den bagvedliggende service er ikke tilgængelig i øjeblikket. Se %{details} for mere information',
    },
  },
};

export default da;
