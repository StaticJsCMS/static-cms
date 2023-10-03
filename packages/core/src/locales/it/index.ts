import type { LocalePhrasesRoot } from '../types';

const it: LocalePhrasesRoot = {
  auth: {
    login: 'Accedi',
    loggingIn: "Effettuando l'accesso...",
    loginWithNetlifyIdentity: 'Accedi con Netlify Identity',
    loginWithBitbucket: 'Accedi con Bitbucket',
    loginWithGitHub: 'Accedi con GitHub',
    loginWithGitLab: 'Accedi con GitLab',
    loginWithGitea: 'Accedi con Gitea',
    errors: {
      email: 'Assicurati di inserire la tua mail.',
      password: 'Inserisci la tua password.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        'Impossibile accedere alle impostazioni di Identity. Quando usi git-gateway come backend assicurati di abilitare il servizio Itentity e Git Gateway.',
    },
  },
  app: {
    header: {
      content: 'Contenuti',
      media: 'Media',
      quickAdd: 'Aggiunta veloce',
    },
    app: {
      errorHeader: 'Errore nel caricamento della configurazione CMS',
      configErrors: 'Errori di Configurazione',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'Controlla il tuo file config.yml.',
      loadingConfig: 'Caricando la configurazione...',
      waitingBackend: 'Attendi il backend...',
    },
    notFoundPage: {
      header: 'Non trovato',
    },
  },
  collection: {
    sidebar: {
      collections: 'Collezioni',
      allCollections: undefined, // English translation: 'All Collections'
      searchAll: 'Cerca su tutto',
      searchIn: undefined, // English translation: 'Search in'
    },
    collectionTop: {
      sortBy: undefined, // English translation: 'Sort by'
      viewAs: 'Vedi come',
      newButton: 'Nuovo/a %{collectionLabel}',
      ascending: undefined, // English translation: 'Ascending'
      descending: undefined, // English translation: 'Descending'
      searchResults: undefined, // English translation: 'Search Results for "%{searchTerm}"'
      searchResultsInCollection: undefined, // English translation: 'Search Results for "%{searchTerm}" in %{collection}'
      filterBy: undefined, // English translation: 'Filter by'
      groupBy: undefined, // English translation: 'Group by'
    },
    entries: {
      loadingEntries: 'Caricando le voci',
      cachingEntries: 'Cachando le voci',
      longerLoading: 'Questa operazione potrebbe durare diversi minuti',
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
        optional: 'opzionale',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} è richiesto.',
        regexPattern: '%{fieldLabel} non corrisponde allo schema: %{pattern}.',
        processing: '%{fieldLabel} sta elaborando.',
        range: '%{fieldLabel} deve essere tra %{minValue} e %{maxValue}.',
        min: '%{fieldLabel} deve essere almeno %{minValue}.',
        max: '%{fieldLabel} deve essere %{maxValue} o meno.',
        rangeCount: undefined, // English translation: '%{fieldLabel} must have between %{minCount} and %{maxCount} item(s).'
        rangeCountExact: undefined, // English translation: '%{fieldLabel} must have exactly %{count} item(s).'
        rangeMin: undefined, // English translation: '%{fieldLabel} must have at least %{minCount} item(s).'
        rangeMax: undefined, // English translation: '%{fieldLabel} must have %{maxCount} or less item(s).'
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
      onLeavePage: 'Sei sicuro di voler lasciare questa pagina?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Sei sicuro di voler cancellare questa voce pubblicata e tutte le modifiche non salvate della tua sessione corrente?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Sei sicuro di voler cancellare questa voce pubblicata?',
      loadingEntry: 'Caricando la voce...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: undefined, // English translation: 'Toggle i18n'
      togglePreview: undefined, // English translation: 'Toggle preview'
      toggleScrollSync: undefined, // English translation: 'Sync scrolling'
    },
    editorToolbar: {
      publish: 'Pubblica',
      published: 'Pubblicato',
      duplicate: 'Duplica',
      publishAndCreateNew: 'Pubblica e creane uno nuovo',
      publishAndDuplicate: 'Pubblica e duplica',
      deleteEntry: 'Cancella voce',
      publishNow: 'Pubblica ora',
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
        richText: undefined, // English translation: 'Rich Text'
        markdown: undefined, // English translation: 'Markdown'
        type: undefined, // English translation: 'Type...'
      },
      image: {
        choose: "Scegli un'immagine",
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: undefined, // English translation: 'Insert from URL'
        replaceUrl: undefined, // English translation: 'Replace with URL'
        promptUrl: undefined, // English translation: 'Enter the URL of the image'
        chooseDifferent: "Scegli un'immagine diversa",
        addMore: undefined, // English translation: 'Add more images'
        remove: 'Rimuovi immagine',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: 'Scegli un file',
        chooseUrl: undefined, // English translation: 'Insert from URL'
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: undefined, // English translation: 'Replace with URL'
        promptUrl: undefined, // English translation: 'Enter the URL of the file'
        chooseDifferent: 'Scegli un altro file',
        addMore: undefined, // English translation: 'Add more files'
        remove: 'Rimuovi il file',
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
        noControl: "Nessun controllo per il widget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Nessuna preview per il widget '%{widget}'.",
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
        now: undefined, // English translation: 'Now'
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
      draft: 'Bozza',
      copy: undefined, // English translation: 'Copy'
      copyUrl: undefined, // English translation: 'Copy URL'
      copyPath: undefined, // English translation: 'Copy Path'
      copyName: undefined, // English translation: 'Copy Name'
      copied: undefined, // English translation: 'Copied'
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'Sei sicuro di voler cancellare il media selezionato?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody:
        'File troppo grande.\nConfigurato per non accettare file piú grandi di %{size} kB.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      loading: 'Caricamento...',
      noResults: 'Nessun risultato.',
      noAssetsFound: 'Nessun assets trovato.',
      noImagesFound: 'Nessuna immagine trovata.',
      images: 'Immagini',
      mediaAssets: 'Media assets',
      search: 'Cerca...',
      uploading: 'Uploading...',
      upload: 'Upload',
      download: undefined, // English translation: 'Download'
      deleting: 'Deleting...',
      deleteSelected: 'Cancella selezionato',
      chooseSelected: 'Prendi selezionato',
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
      title: 'Errore',
      details: "C'è stato un errore - per favore ",
      reportIt: 'riportalo.',
      detailsHeading: 'Dettagli',
      privacyWarning: undefined, // English translation: 'Opening an issue pre-populates it with the error message and debugging data.\nPlease verify the information is correct and remove sensitive data if exists.'
      recoveredEntry: {
        heading: 'Documento recuperato',
        warning: 'Per favore copia/incollalo da qualche parte prima di navigare altrove!',
        copyButtonLabel: 'Copialo negli appunti',
      },
    },
    settingsDropdown: {
      darkMode: undefined, // English translation: 'Dark Mode'
      logOut: 'Esci',
    },
    toast: {
      onFailToLoadEntries: 'Caricamento voce non riuscito: %{details}',
      onFailToPersist: 'Salvataggio della voce non riuscito: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Cancellazione della voce non riuscita: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Aggiornamento dello status non riuscito: %{details}',
      missingRequiredField:
        'Oops, ti sei perso un campo obbligatorio. Per favore completalo prima di salvare.',
      entrySaved: 'Voce salvata',
      entryPublished: 'Voce pubblicata',
      onFailToPublishEntry: 'Pubblicazione fallita: %{details}',
      entryUpdated: 'Status della voce aggiornato',
      onFailToAuth: '%{details}',
      onLoggedOut: undefined, // English translation: 'You have been logged out, please back up any data and login again'
      onBackendDown: undefined, // English translation: 'The backend service is experiencing an outage. See %{details} for more information'
    },
  },
};

export default it;
