import type { LocalePhrasesRoot } from '../types';

const nl: LocalePhrasesRoot = {
  auth: {
    login: 'Inloggen',
    loggingIn: 'Inloggen...',
    loginWithNetlifyIdentity: 'Inloggen met Netlify Identity',
    loginWithBitbucket: 'Inloggen met Bitbucket',
    loginWithGitHub: 'Inloggen met GitHub',
    loginWithGitLab: 'Inloggen met GitLab',
    loginWithGitea: 'Inloggen met Gitea',
    errors: {
      email: 'Voer uw email in.',
      password: 'Voer uw wachtwoord in.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: undefined, // English translation: '%{details}'
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        'Netlify Identity instellingen niet gevonden. Wanneer u git-gateway als backend gebruikt moet u de Identity service en Git Gateway activeren in uw Netlify instellingen.',
    },
  },
  app: {
    header: {
      content: 'Inhoud',
      media: 'Media',
      quickAdd: 'Snel toevoegen',
    },
    app: {
      errorHeader: 'Fout bij het laden van de CMS configuratie',
      configErrors: 'configuratiefouten',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'Controleer je config.yml bestand',
      loadingConfig: 'Configuatie laden...',
      waitingBackend: 'Wachten op server...',
    },
    notFoundPage: {
      header: 'Niet gevonden',
    },
  },
  collection: {
    sidebar: {
      collections: 'Inhoudstypen',
      allCollections: 'Alle inhoudstypen',
      searchAll: 'Zoeken',
      searchIn: 'Zoeken in',
    },
    collectionTop: {
      sortBy: 'Sorteer op',
      viewAs: 'Bekijk als',
      newButton: 'Voeg %{collectionLabel} toe',
      ascending: 'Oplopend',
      descending: 'Aflopend',
      searchResults: 'Zoekresultaten voor "%{searchTerm}"',
      searchResultsInCollection: 'Zoekresultaten voor "%{searchTerm}" in %{collection}',
      filterBy: 'Filteren op',
      groupBy: 'Groepeer op',
    },
    entries: {
      loadingEntries: 'Items laden',
      cachingEntries: 'Items cachen',
      longerLoading: 'Dit kan een paar minuten duren',
      noEntries: 'Geen items',
    },
    groups: {
      other: 'Anders',
      negateLabel: 'Geen %{label}',
    },
    table: {
      summary: undefined, // English translation: 'Summary'
      collection: undefined, // English translation: 'Collection'
    },
    defaultFields: {
      author: {
        label: 'Auteur',
      },
      updatedOn: {
        label: 'Bijgewerkt op',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'optioneel',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} is vereist.',
        regexPattern: '%{fieldLabel} komt niet overeen met het patroon: %{pattern}.',
        processing: '%{fieldLabel} wordt verwerkt.',
        range: '%{fieldLabel} moet tussen %{minValue} en %{maxValue} liggen.',
        min: '%{fieldLabel} moet tenminste %{minValue} bevatten.',
        max: '%{fieldLabel} moet hoogstens %{maxValue} bevatten.',
        rangeCount: '%{fieldLabel} moet tussen %{minCount} en %{maxCount} item(s) bevatten.',
        rangeCountExact: '%{fieldLabel} moet exact %{count} item(s) bevatten.',
        rangeMin: '%{fieldLabel} moet tenminste %{minCount} item(s) bevatten.',
        rangeMax: '%{fieldLabel} moet hoogstens %{maxCount} item(s) bevatten.',
        invalidPath: undefined, // English translation: ''%{path}' is not a valid path.'
        pathExists: undefined, // English translation: 'Path '%{path}' already exists.'
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: '%{locale} aan het bewerken',
      },
    },
    editor: {
      onLeavePage: 'Weet je zeker dat je deze pagina wilt verlaten?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Weet u zeker dat u dit gepubliceerde item en uw niet-opgeslagen wijzigingen uit de huidige sessie wilt verwijderen?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Weet u zeker dat u dit gepubliceerde item wilt verwijderen?',
      loadingEntry: 'Item laden...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: 'Wissel i18n',
      togglePreview: 'Wissel voorvertoning',
      toggleScrollSync: 'Synchroniseer scrollen',
    },
    editorToolbar: {
      publish: 'Publiceer',
      published: 'Gepubliceerd',
      duplicate: 'Dupliceren',
      publishAndCreateNew: 'Publiceer en maak nieuw item aan',
      publishAndDuplicate: 'Publiceer en dupliceer item',
      deleteEntry: 'Item verwijderen',
      publishNow: 'Publiceer nu',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Vet',
        italic: 'Cursief',
        code: 'Code',
        link: 'Link',
        linkPrompt: 'Voer de URL in',
        headings: 'Hoofdtekst',
        quote: 'Quote',
        bulletedList: 'Lijst met opsommingstekens',
        numberedList: 'Genummerde lijst',
        addComponent: 'Voeg component toe',
        richText: 'Rijke tekst',
        markdown: 'Markdown',
        type: undefined, // English translation: 'Type...'
      },
      image: {
        choose: 'Kies een afbeelding',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: 'Voeg toe via URL',
        replaceUrl: 'Vervang met URL',
        promptUrl: 'Voer de URL van de afbeelding in',
        chooseDifferent: 'Kies een andere afbeelding',
        addMore: undefined, // English translation: 'Add more images'
        remove: 'Verwijder afbeelding',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: 'Kies een bestand',
        chooseUrl: 'Voeg toe via URL',
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: 'Vervang met URL',
        promptUrl: 'Voer de URL van het bestand in',
        chooseDifferent: 'Kies een ander bestand',
        addMore: undefined, // English translation: 'Add more files'
        remove: 'Verwijder bestand',
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
        noControl: "Geen control voor widget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Geen voorvertoning voor widget '%{widget}'.",
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
        now: 'Nu',
        invalidDateTitle: undefined, // English translation: 'Invalid date'
        invalidDateBody: undefined, // English translation: 'The date you entered is invalid.'
      },
      list: {
        add: 'Voeg %{item} toe',
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
      draft: 'Concept',
      copy: 'Kopieer',
      copyUrl: 'Kopieer URL',
      copyPath: 'Kopieer pad',
      copyName: 'Kopieer naam',
      copied: 'Gekopieerd',
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'Weet u zeker dat u de geselecteerde media wilt verwijderen?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody:
        'Het bestand is te groot.\n De instellingen staan geen bestanden toe groter dan %{size} kB.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      loading: 'Laden...',
      noResults: 'Geen resultaten.',
      noAssetsFound: 'Geen media gevonden.',
      noImagesFound: 'Geen afbeeldingen gevonden.',
      images: 'Afbeeldingen',
      mediaAssets: 'Media',
      search: 'Zoeken...',
      uploading: 'Uploaden...',
      upload: 'Nieuwe uploaden',
      download: 'Downloaden',
      deleting: 'Verwijderen...',
      deleteSelected: 'Verwijder selectie',
      chooseSelected: 'Gebruik selectie',
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
      goBackToSite: 'Ga terug naar site',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'Fout',
      details: 'Er is een fout opgetreden - ',
      reportIt: 'maak er alstublieft een melding van.',
      detailsHeading: 'Details',
      privacyWarning:
        'Als u een probleem opent, wordt het vooraf gevuld met het foutbericht en foutopsporingsgegevens. \nControleer of de informatie correct is en verwijder, indien aanwezig, gevoelige gegevens.',
      recoveredEntry: {
        heading: 'Hersteld document',
        warning: 'Kopieer / plak dit ergens voordat u weggaat!',
        copyButtonLabel: 'Kopieer naar klembord',
      },
    },
    settingsDropdown: {
      darkMode: undefined, // English translation: 'Dark Mode'
      logOut: 'Uitloggen',
    },
    toast: {
      onFailToLoadEntries: 'Kan item niet laden: %{details}',
      onFailToPersist: 'Kan item niet opslaan: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Kan item niet verwijderen: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Kan status niet updaten: %{details}',
      missingRequiredField: 'Oeps, sommige verplichte velden zijn niet ingevuld.',
      entrySaved: 'Item opgeslagen',
      entryPublished: 'Item gepubliceerd',
      onFailToPublishEntry: 'Kan item niet publiceren: %{details}',
      entryUpdated: 'Status van item geüpdatet',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Je bent uitgelogd, back-up alstublieft uw data log daarna in',
      onBackendDown:
        'De backend-service ondervindt een storing. Zie% {details} voor meer informatie',
    },
  },
};

export default nl;
