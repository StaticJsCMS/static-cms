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
      workflow: 'Workflow',
      media: 'Media',
      quickAdd: 'Aggiunta veloce',
    },
    app: {
      loading: 'Caricamento...',
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
        copyFromLocale: undefined, // English translation: 'Fill in from another locale'
        copyFromLocaleConfirm: undefined, // English translation: 'Do you want to fill in data from %{locale} locale?\nAll existing content will be overwritten.'
      },
    },
    editor: {
      onLeavePage: 'Sei sicuro di voler lasciare questa pagina?',
      onUpdatingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onUpdatingWithUnsavedChangesBody:
        'Hai delle modifiche non salvate, salvale prima di aggiornare lo status.',
      onPublishingNotReadyTitle: undefined, // English translation: 'Not ready to publish'
      onPublishingNotReadyBody: 'Aggiorna lo status a "Pronto" prima di pubblicare.',
      onPublishingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onPublishingWithUnsavedChangesBody:
        'Hai delle modifiche non salvate, salvale prima di pubblicare.',
      onPublishingTitle: undefined, // English translation: 'Publish entry?'
      onPublishingBody: 'Sei sicuro di voler pubblicare questa voce?',
      onUnpublishingTitle: undefined, // English translation: 'Unpublish entry?'
      onUnpublishingBody: 'Sei sicuro di voler nascondere questa voce?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Sei sicuro di voler cancellare questa voce pubblicata e tutte le modifiche non salvate della tua sessione corrente?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Sei sicuro di voler cancellare questa voce pubblicata?',
      onDeleteUnpublishedChangesWithUnsavedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        'Questo cancellerà tutte le modifiche non pubblicate di questa voce, come anche tutte le modifiche non salvate della sessione corrente. Vuoi ancora cancellarle?',
      onDeleteUnpublishedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesBody:
        'Tutte le modifiche non pubblicate a questa voce saranno cancellate. Vuoi ancora cancellarle?',
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
      publishing: 'Pubblicando...',
      publish: 'Pubblica',
      published: 'Pubblicato',
      unpublish: 'Rimuovi dalla pubblicazione',
      duplicate: 'Duplica',
      unpublishing: 'Rimuovendo dalla pubblicazione...',
      publishAndCreateNew: 'Pubblica e creane uno nuovo',
      publishAndDuplicate: 'Pubblica e duplica',
      deleteUnpublishedChanges: 'Cancella le modifiche non pubblicate',
      deleteUnpublishedEntry: 'Cancella le voci non pubblicate',
      deletePublishedEntry: 'Cancella la voce pubblicata',
      deleteEntry: 'Cancella voce',
      saving: 'Salvando...',
      save: 'Salva',
      statusInfoTooltipDraft: undefined, // English translation: 'Entry status is set to draft. To finalize and submit it for review, set the status to �In review�'
      statusInfoTooltipInReview: undefined, // English translation: 'Entry is being reviewed, no further actions are required. However, you can still make additional changes while it is being reviewed.'
      deleting: 'Cancellando...',
      updating: 'Aggiornando...',
      status: 'Status: %{status}',
      backCollection: ' Scrivendo nella sezione %{collectionLabel}',
      unsavedChanges: 'Modifiche non salvate',
      changesSaved: 'Modifiche salvate',
      draft: 'Bozza',
      inReview: 'In revisione',
      ready: 'Pronto',
      publishNow: 'Pubblica ora',
      deployPreviewPendingButtonLabel: "Controlla l'anteprima",
      deployPreviewButtonLabel: "Guarda l'anteprima",
      deployButtonLabel: 'Guarda Live',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: undefined, // English translation: 'Bold'
        italic: undefined, // English translation: 'Italic'
        strikethrough: undefined, // English translation: 'Strikethrough'
        code: undefined, // English translation: 'Code'
        codeBlock: undefined, // English translation: 'Code block'
        insertCodeBlock: undefined, // English translation: 'Insert code block'
        link: undefined, // English translation: 'Link'
        insertLink: undefined, // English translation: 'Insert link'
        paragraph: undefined, // English translation: 'Paragraph'
        headings: undefined, // English translation: 'Headings'
        quote: undefined, // English translation: 'Quote'
        insertQuote: undefined, // English translation: 'Insert blockquote'
        bulletedList: undefined, // English translation: 'Bulleted List'
        numberedList: undefined, // English translation: 'Numbered List'
        addComponent: undefined, // English translation: 'Add Component'
        richText: undefined, // English translation: 'Rich Text'
        markdown: undefined, // English translation: 'Markdown'
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
      code: {
        language: undefined, // English translation: 'Language'
        selectLanguage: undefined, // English translation: 'Select language'
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
      noResults: 'Nessun risultato.',
      noAssetsFound: 'Nessun assets trovato.',
      noImagesFound: 'Nessuna immagine trovata.',
      private: 'Privato ',
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
      theme: undefined, // English translation: 'Theme'
      logOut: 'Esci',
    },
    toast: {
      onFailToLoadEntries: 'Caricamento voce non riuscito: %{details}',
      onFailToLoadDeployPreview: 'Caricamento della preview non riuscito: %{details}',
      onFailToPersist: 'Salvataggio della voce non riuscito: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Cancellazione della voce non riuscita: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Aggiornamento dello status non riuscito: %{details}',
      missingRequiredField:
        'Oops, ti sei perso un campo obbligatorio. Per favore completalo prima di salvare.',
      entrySaved: 'Voce salvata',
      entryDeleted: undefined, // English translation: 'Entry delete'
      entryPublished: 'Voce pubblicata',
      entryUnpublished: 'Voce rimossa dalla pubblicazione',
      onFailToPublishEntry: 'Pubblicazione fallita: %{details}',
      onFailToUnpublishEntry: 'Rimozione della pubblicazione fallita: %{details}',
      entryUpdated: 'Status della voce aggiornato',
      onDeletePublishedEntry: undefined, // English translation: 'Published entry deleted'
      onDeleteUnpublishedChanges: 'Modifiche non pubblicate cancellate',
      onFailToAuth: '%{details}',
      onLoggedOut: undefined, // English translation: 'You have been logged out, please back up any data and login again'
      onBackendDown: undefined, // English translation: 'The backend service is experiencing an outage. See %{details} for more information'
    },
  },
  workflow: {
    workflow: {
      dashboard: undefined, // English translation: 'Dashboard'
      loading: 'Caricando le voci del Flusso Editoriale',
      workflowHeading: 'Flusso Editoriale',
      newPost: 'Nuovo Post',
      description:
        '%{smart_count} voce attende la revisione, %{readyCount} pronte per la pubblicazione. |||| %{smart_count} voci attendono la revisione, %{readyCount} pronte per la pubblicazione. ',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date} da %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: 'da %{author}',
      deleteChanges: 'Cancella le modifiche',
      deleteNewEntry: 'Cancella nuova voce',
      publishChanges: 'Pubblica modifiche',
      publishNewEntry: 'Pubblica una nuova voce',
    },
    workflowList: {
      onDeleteEntry: 'Sei sicuro di voler cancellare questa voce?',
      onPublishingNotReadyEntry:
        'Solo gli oggetti con lo status "Pronto" possono essere pubblicati. Sposta la Card nella colonna "Pronto" per abilitare la pubblicazione.',
      onPublishEntry: 'Sei sicuro di voler pubblicare questa voce?',
      draft: 'Bozze',
      pending_review: 'In Revisione',
      pending_publish: 'Pronto',
      currentEntries: '%{smart_count} voce |||| %{smart_count} voci',
    },
    openAuthoring: {
      forkRequired: undefined, // English translation: 'Open Authoring is enabled. We need to use a fork on your github account. (If a fork already exists, we'll use that.)'
      forkRepo: undefined, // English translation: 'Fork the repo'
      markReadyForReview: undefined, // English translation: 'Mark Ready for Review'
    },
  },
};

export default it;
