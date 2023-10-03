import type { LocalePhrasesRoot } from '../types';

const nb_no: LocalePhrasesRoot = {
  auth: {
    login: 'Logg inn',
    loggingIn: 'Logger inn..',
    loginWithNetlifyIdentity: 'Logg på med Netlify Identity',
    loginWithBitbucket: 'Logg på med Bitbucket',
    loginWithGitHub: 'Logg på med GitHub',
    loginWithGitLab: 'Logg på med GitLab',
    loginWithGitea: 'Logg på med Gitea',
    errors: {
      email: 'Du må skrive inn e-posten din.',
      password: 'Du må skrive inn passordet ditt.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        'Fant ingen innstillinger for Identity. Hvis du skal bruke git-gateway må du skru på Identity service og Git Gateway.',
    },
  },
  app: {
    header: {
      content: 'Innhold',
      media: 'Media',
      quickAdd: 'Hurtiginnlegg',
    },
    app: {
      errorHeader: 'Det oppstod en feil under lastingen av CMS konfigurasjonen',
      configErrors: 'Konfigurasjonsfeil',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'Sjekk config.yml filen.',
      loadingConfig: 'Laster konfigurasjon...',
      waitingBackend: 'Venter på backend...',
    },
    notFoundPage: {
      header: 'Ikke funnet',
    },
  },
  collection: {
    sidebar: {
      collections: 'Samlinger',
      allCollections: undefined, // English translation: 'All Collections'
      searchAll: 'Søk i alle',
      searchIn: undefined, // English translation: 'Search in'
    },
    collectionTop: {
      sortBy: 'Sorter etter',
      viewAs: 'Vis som',
      newButton: 'Ny %{collectionLabel}',
      ascending: 'Stigende',
      descending: 'Synkende',
      searchResults: undefined, // English translation: 'Search Results for "%{searchTerm}"'
      searchResultsInCollection: undefined, // English translation: 'Search Results for "%{searchTerm}" in %{collection}'
      filterBy: undefined, // English translation: 'Filter by'
      groupBy: undefined, // English translation: 'Group by'
    },
    entries: {
      loadingEntries: 'Laster innlegg...',
      cachingEntries: 'Mellomlagrer innlegg...',
      longerLoading: 'Dette kan ta opptil flere minutter',
      noEntries: 'Ingen innlegg',
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
        label: 'Forfatter',
      },
      updatedOn: {
        label: 'Oppdatert',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'valgfritt',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} er påkrevd.',
        regexPattern: '%{fieldLabel} samsvarer ikke med mønsteret: %{pattern}.',
        processing: '%{fieldLabel} blir prosessert.',
        range: '%{fieldLabel} må være mellom %{minValue} og %{maxValue}.',
        min: '%{fieldLabel} må minst være %{minValue}.',
        max: '%{fieldLabel} må være %{maxValue} eller mindre.',
        rangeCount: '%{fieldLabel} må ha mellom %{minCount} og %{maxCount} element(er).',
        rangeCountExact: '%{fieldLabel} må ha nøyaktig %{count} element(er).',
        rangeMin: '%{fieldLabel} må minst ha %{minCount} element(er).',
        rangeMax: '%{fieldLabel} må ha %{maxCount} eller færre element(er).',
        invalidPath: undefined, // English translation: ''%{path}' is not a valid path.'
        pathExists: undefined, // English translation: 'Path '%{path}' already exists.'
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: undefined, // English translation: 'Writing in %{locale}'
      },
    },
    editor: {
      onLeavePage: 'Er du sikker på du vil navigere bort fra denne siden?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Er du sikker på at du vil slette et publisert innlegg med tilhørende ulagrede endringer?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Er du sikker på at du vil slette dette publiserte innlegget?',
      loadingEntry: 'Laster innlegg...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: undefined, // English translation: 'Toggle i18n'
      togglePreview: undefined, // English translation: 'Toggle preview'
      toggleScrollSync: undefined, // English translation: 'Sync scrolling'
    },
    editorToolbar: {
      publish: 'Publiser',
      published: 'Publisert',
      duplicate: 'Dupliser',
      publishAndCreateNew: 'Publiser og lag nytt',
      publishAndDuplicate: 'Publiser og dupliser',
      deleteEntry: 'Slett innlegg',
      publishNow: 'Publiser nå',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: undefined, // English translation: 'Bold'
        italic: undefined, // English translation: 'Italic'
        code: undefined, // English translation: 'Code'
        link: undefined, // English translation: 'Link'
        linkPrompt: undefined, // English translation: 'Enter the URL of the link'
        headings: undefined, // English translation: 'Headings'
        quote: undefined, // English translation: 'Quote'
        bulletedList: undefined, // English translation: 'Bulleted List'
        numberedList: undefined, // English translation: 'Numbered List'
        addComponent: undefined, // English translation: 'Add Component'
        richText: 'Rik-tekst',
        markdown: 'Markdown',
        type: undefined, // English translation: 'Type...'
      },
      image: {
        choose: 'Velg et bilde',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: undefined, // English translation: 'Insert from URL'
        replaceUrl: undefined, // English translation: 'Replace with URL'
        promptUrl: undefined, // English translation: 'Enter the URL of the image'
        chooseDifferent: 'Velg et annet bilde',
        addMore: undefined, // English translation: 'Add more images'
        remove: 'Fjern bilde',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: 'Velg en fil',
        chooseUrl: undefined, // English translation: 'Insert from URL'
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: undefined, // English translation: 'Replace with URL'
        promptUrl: undefined, // English translation: 'Enter the URL of the file'
        chooseDifferent: 'Velg en annen fil',
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
        noControl: "Ingen konfigurasjon for widget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Ingen forhåndsvisning tilgjengelig for '%{widget}'.",
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
        now: 'Nå',
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
      draft: 'Kladd',
      copy: undefined, // English translation: 'Copy'
      copyUrl: undefined, // English translation: 'Copy URL'
      copyPath: undefined, // English translation: 'Copy Path'
      copyName: undefined, // English translation: 'Copy Name'
      copied: undefined, // English translation: 'Copied'
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'Er du sikker på at du vil slette markert element?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody: 'Filen er for stor.\nMaksimal konfiguert filstørrelse er %{size} kB.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      loading: 'Laster...',
      noResults: 'Ingen resultater.',
      noAssetsFound: 'Ingen elementer funnet.',
      noImagesFound: 'Ingen bilder funnet.',
      images: 'Bilder',
      mediaAssets: 'Mediebibliotek',
      search: 'Søk...',
      uploading: 'Laster opp...',
      upload: 'Last opp',
      download: 'Last ned',
      deleting: 'Sletter...',
      deleteSelected: 'Slett markert',
      chooseSelected: 'Velg markert',
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
      goBackToSite: 'Gå tilbake til siden',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'Feil',
      details: 'Det har oppstått en feil. Det er fint om du ',
      reportIt: 'oppretter et issue på GitHub.',
      detailsHeading: 'Detaljer',
      privacyWarning:
        'Når du åpner et issue forhåndsutfylles feil og feilsøkingsdata. Dobbeltsjekk at informasjonen er riktig, og fjern eventuelle sensitive data.',
      recoveredEntry: {
        heading: 'Gjenopprettet dokument',
        warning: 'Det kan være lurt å ta kopi av innholdet før navigerer bort fra denne siden!',
        copyButtonLabel: 'Kopier til utklippstavle',
      },
    },
    settingsDropdown: {
      darkMode: undefined, // English translation: 'Dark Mode'
      logOut: 'Logg ut',
    },
    toast: {
      onFailToLoadEntries: 'Kunne ikke laste innlegg: %{details}',
      onFailToPersist: 'Kunne ikke lagre: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Kunne ikke slette: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Kunne ikke laste opp: %{details}',
      missingRequiredField:
        'Oisann, ser ut som du glemte et påkrevd felt. Du må fylle det ut før du kan fortsette.',
      entrySaved: 'Innlegg lagret',
      entryPublished: 'Innlegg publisert',
      onFailToPublishEntry: 'Kunne ikke publisere: %{details}',
      entryUpdated: 'Innleggsstatus oppdatert',
      onFailToAuth: '%{details}',
      onLoggedOut: undefined, // English translation: 'You have been logged out, please back up any data and login again'
      onBackendDown: undefined, // English translation: 'The backend service is experiencing an outage. See %{details} for more information'
    },
  },
};

export default nb_no;
