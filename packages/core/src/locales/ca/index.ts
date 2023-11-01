import type { LocalePhrasesRoot } from '../types';

const ca: LocalePhrasesRoot = {
  auth: {
    login: 'Iniciar sessió',
    loggingIn: 'Iniciant sessió...',
    loginWithNetlifyIdentity: "Iniciar sessió amb l'identitat de Netlify",
    loginWithBitbucket: 'Iniciar sessió amb Bitbucket',
    loginWithGitHub: 'Iniciar sessió amb GitHub',
    loginWithGitLab: 'Iniciar sessió amb GitLab',
    loginWithGitea: 'Iniciar sessió amb Gitea',
    errors: {
      email: 'Comprova que has escrit el teu email.',
      password: 'Si us plau escriu la teva contrasenya.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        "No s'ha pogut obtenir accés a les configuracions d'identitat. Quan feu servir backend de git-gateway, assegureu-vos que activeu el servei d’identitat i la passarel·la de Git.",
    },
  },
  app: {
    header: {
      content: 'Contingut',
      workflow: 'Flux Editorial',
      media: 'Multimèdia',
      quickAdd: 'Afegir',
    },
    app: {
      loading: 'Carregant...',
      errorHeader: 'Error al carregar la configuració del CMS',
      configErrors: 'Errors de configuració',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: "Comprovi l'arxiu config.yml.",
      loadingConfig: 'Carregant configuració....',
      waitingBackend: 'Esperant al servidor...',
    },
    notFoundPage: {
      header: 'No trobat',
    },
  },
  collection: {
    sidebar: {
      collections: 'Col·leccions',
      allCollections: 'Totes les col·leccions',
      searchAll: 'Buscar tots',
      searchIn: 'Buscar a',
    },
    collectionTop: {
      sortBy: 'Ordenar per',
      viewAs: 'Veure com',
      newButton: 'Nou %{collectionLabel}',
      ascending: 'Ascendent',
      descending: 'Descendent',
      searchResults: 'Buscar resultats per "%{searchTerm}"',
      searchResultsInCollection: 'Buscar resultats per "%{searchTerm}" a %{collection}',
      filterBy: 'Filtrar per',
      groupBy: 'Agrupar per',
    },
    entries: {
      loadingEntries: 'Carregant entrades',
      cachingEntries: 'Emmagatzemant entrades a la caché',
      longerLoading: 'Això podria tardar uns minuts',
      noEntries: 'Cap entrada',
    },
    groups: {
      other: 'Altre',
      negateLabel: 'No %{label}',
    },
    table: {
      summary: undefined, // English translation: 'Summary'
      collection: undefined, // English translation: 'Collection'
    },
    defaultFields: {
      author: {
        label: 'Autor',
      },
      updatedOn: {
        label: 'Actualitzat el',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'opcional',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} és obligatori.',
        regexPattern: '%{fieldLabel} no coincideix amb el patró: %{pattern}.',
        processing: '%{fieldLabel} està processant.',
        range: "%{fieldLabel} ha d'estar entre %{minValue} i %{maxValue}.",
        min: '%{fieldLabel} ha ser com a mínim %{minValue}.',
        max: '%{fieldLabel} ha de ser %{maxValue} o més.',
        rangeCount: '%{fieldLabel} ha de tenir entre %{minCount} i %{maxCount} element(s).',
        rangeCountExact: '%{fieldLabel} ha de tenir exactament %{count} element(s).',
        rangeMin: "%{fieldLabel} ha de tenir com a mínim %{minCount} d'element(s).",
        rangeMax: '%{fieldLabel} ha de ser %{maxCount} o inferior.',
        invalidPath: "'%{path}' no és una ruta valida",
        pathExists: "'%{path}' ja existeix",
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: 'Escriure en %{locale}',
        copyFromLocale: undefined, // English translation: 'Fill in from another locale'
        copyFromLocaleConfirm: undefined, // English translation: 'Do you want to fill in data from %{locale} locale?\nAll existing content will be overwritten.'
      },
    },
    editor: {
      onLeavePage: 'Estàs segur que vols deixar aquesta pàgina?',
      onUpdatingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onUpdatingWithUnsavedChangesBody:
        "Tens canvis no guardats, si us plau, guarda'ls abans d'actualitzar l'estat.",
      onPublishingNotReadyTitle: undefined, // English translation: 'Not ready to publish'
      onPublishingNotReadyBody: 'Si us plau, actualitza l\'estat a "Llest" abans de publicar.',
      onPublishingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onPublishingWithUnsavedChangesBody:
        "Tens canvis no guardats, si us plau, guarda'ls abans de publicar-los.",
      onPublishingTitle: undefined, // English translation: 'Publish entry?'
      onPublishingBody: 'Estàs segur que vols publicar aquesta entrada?',
      onUnpublishingTitle: undefined, // English translation: 'Unpublish entry?'
      onUnpublishingBody: 'Estàs segur que vols esborrar aquesta entrada?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Està segur que vol eliminar aquesta entrada publicada, així com els canvis no guardats de la sessió actual?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Està segur que vol eliminar aquesta entrada publicada?',
      onDeleteUnpublishedChangesWithUnsavedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        "Això eliminarà tots els canvis no publicats d'aquesta entrada així com els canvis no guardats de la sessió actual. Encara vol procedir?",
      onDeleteUnpublishedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesBody:
        'Tots els canvis no publicats en aquesta entrada seràn esborrats. Encara els vol eliminar?',
      loadingEntry: 'Carregant entrada...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: 'Mostrar/Amagar traduccions',
      togglePreview: 'Mostrar/Amagar previsualització',
      toggleScrollSync: undefined, // English translation: 'Sync scrolling'
    },
    editorToolbar: {
      publishing: 'Publicant...',
      publish: 'Publicar',
      published: 'Publicat',
      unpublish: 'Despublicar',
      duplicate: 'Duplicar',
      unpublishing: 'Despublicant...',
      publishAndCreateNew: 'Publicar i crear de nou',
      publishAndDuplicate: 'Publica i duplica',
      deleteUnpublishedChanges: 'Eliminar canvis no publicats',
      deleteUnpublishedEntry: 'Eliminar entrada no publicada',
      deletePublishedEntry: 'Eliminar entrada publicada',
      deleteEntry: 'Eliminar entrada',
      saving: 'Guardant...',
      save: 'Guardar',
      statusInfoTooltipDraft: undefined, // English translation: 'Entry status is set to draft. To finalize and submit it for review, set the status to �In review�'
      statusInfoTooltipInReview: undefined, // English translation: 'Entry is being reviewed, no further actions are required. However, you can still make additional changes while it is being reviewed.'
      deleting: 'Eliminant...',
      updating: 'Actualizant...',
      status: 'Estat: %{status}',
      backCollection: 'Escrivint a la colecció %{collectionLabel}',
      unsavedChanges: 'Canvis no guardats',
      changesSaved: 'Canvis guardats',
      draft: 'Esborrany',
      inReview: 'En revisió',
      ready: 'Llest',
      publishNow: 'Publicar ara',
      deployPreviewPendingButtonLabel: 'Comprovar Vista Prèvia',
      deployPreviewButtonLabel: 'Veure Vista Prèvia',
      deployButtonLabel: 'Veure publicació',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Negreta',
        italic: 'Cursiva',
        strikethrough: undefined, // English translation: 'Strikethrough'
        code: 'Codi',
        codeBlock: undefined, // English translation: 'Code block'
        insertCodeBlock: undefined, // English translation: 'Insert code block'
        link: 'Enllaç',
        insertLink: undefined, // English translation: 'Insert link'
        paragraph: undefined, // English translation: 'Paragraph'
        headings: 'Encapçalaments',
        quote: undefined, // English translation: 'Quote'
        insertQuote: undefined, // English translation: 'Insert blockquote'
        bulletedList: 'Llista',
        numberedList: 'Llista numèrica',
        addComponent: 'Afegir component',
        richText: 'Text enriquit',
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
        choose: 'Escull una imatge',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: 'Introdueix una URL',
        replaceUrl: 'Substitueix per una URL',
        promptUrl: "Introdueix l'URL de la imatge",
        chooseDifferent: 'Escull una imatge diferent',
        addMore: undefined, // English translation: 'Add more images'
        remove: 'Treu la imatge',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: 'Escull un arxiu',
        chooseUrl: 'Introdueix una URL',
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: 'Substitueix per una URL',
        promptUrl: "Introdueix l'URL de l'arxiu",
        chooseDifferent: 'Escull un arxiu diferent',
        addMore: undefined, // English translation: 'Add more files'
        remove: 'Esborrar arxiu',
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
        noControl: "No existeix un control per al widget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "No existeix una vista prèvia per al widget '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Encapçalament 1',
        headingTwo: 'Encapçalament 2',
        headingThree: 'Encapçalament 3',
        headingFour: 'Encapçalament 4',
        headingFive: 'Encapçalament 5',
        headingSix: 'Encapçalament 6',
      },
      datetime: {
        now: 'Ara',
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
      draft: 'Esborrany',
      copy: 'Copiar',
      copyUrl: 'Copiar URL',
      copyPath: 'Copiar path',
      copyName: 'Copiar nom',
      copied: 'Copiat',
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'Està segur de que vol eliminar el mitjà seleccionat?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody:
        'El fitxer és massa gran.\nLa configuració no permet fitxers més grans de %{size} kB.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      noResults: 'Sense resultats.',
      noAssetsFound: 'Arxius no trobats.',
      noImagesFound: 'Imatges no trobades.',
      private: 'Privat',
      images: 'Imatges',
      mediaAssets: 'Arxius multimèdia',
      search: 'Buscar...',
      uploading: 'Penjant...',
      upload: 'Penjar nou',
      download: 'Descarregar',
      deleting: 'Eliminant...',
      deleteSelected: 'Eliminar selecció',
      chooseSelected: 'Confirmar selecció',
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
      goBackToSite: 'Torna enrere al lloc',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'Error',
      details: "S'ha produït un error - si us plau ",
      reportIt: "Informa'ns d'això a GitHub.",
      detailsHeading: 'Detalls',
      privacyWarning: undefined, // English translation: 'Opening an issue pre-populates it with the error message and debugging data.\nPlease verify the information is correct and remove sensitive data if exists.'
      recoveredEntry: {
        heading: 'Document recuperat',
        warning:
          'Si us plau, copiï/enganxi això en algun lloc abans de navegar a una altre pàgina!',
        copyButtonLabel: 'Copiar al porta-retalls',
      },
    },
    settingsDropdown: {
      theme: undefined, // English translation: 'Theme'
      logOut: 'Tancar sessió',
    },
    toast: {
      onFailToLoadEntries: "No s'ha ha pogut carregar l'entrada: %{details}",
      onFailToLoadDeployPreview: "No s'ha pogut carregar la vista prèvia: %{details}",
      onFailToPersist: "No s'ha pogut guardar l'entrada: %{details}",
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: "No s'ha pogut eliminar l'entrada: %{details}",
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: "No s'ha pogut actualitzar l'estat: %{details}",
      missingRequiredField:
        "Ups, no ha omplert un camp obligatori. Si us plau,  ompli'l abans de guardar.",
      entrySaved: 'Entrada guardada',
      entryDeleted: undefined, // English translation: 'Entry delete'
      entryPublished: 'Entrada publicada',
      entryUnpublished: 'Entrada despublicada',
      onFailToPublishEntry: "No s'ha pogut publicar: %{details}",
      onFailToUnpublishEntry: "No s'ha pogut despublicar l'entrada: %{details}",
      entryUpdated: "Estat de l'entrada actualitzat",
      onDeletePublishedEntry: undefined, // English translation: 'Published entry deleted'
      onDeleteUnpublishedChanges: 'Canvis no publicats eliminats',
      onFailToAuth: '%{details}',
      onLoggedOut: 'La teva sessió ha estat tancada. Si us plau, torna a iniciar-la',
      onBackendDown: 'El servidor està patint problemes. Consulta %{details} per a més informació',
    },
  },
  workflow: {
    workflow: {
      loading: 'Carregant Entradas del Flux Editorial',
      workflowHeading: 'Flux Editorial',
      newPost: 'Nou article',
      description:
        '%{smart_count} entrada esperant revisió, %{readyCount} llesta per a publicar |||| %{smart_count} entrades esperant revisió, %{readyCount} llestes per a publicar. ',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date} per %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: 'per %{author}',
      deleteChanges: 'Eliminar canvis',
      deleteNewEntry: 'Eliminar nova entrada',
      publishChanges: 'Publicar canvis',
      publishNewEntry: 'Publicar nova entrada',
    },
    workflowList: {
      onDeleteEntry: 'Està segur que vol borrar aquesta entrada?',
      onPublishingNotReadyEntry:
        'Només es poden publicar elements amb estat "Llest". Si us plau, arrossegui la targeta fins la columna "Llest" per a permetre\'n la publicació',
      onPublishEntry: 'Està segur que vol publicar aquesta entrada?',
      draft: 'Esborranys',
      pending_review: 'En revisió',
      pending_publish: 'Llest',
      currentEntries: '%{smart_count} entrada |||| %{smart_count} entrades',
    },
    openAuthoring: {
      forkRequired: undefined, // English translation: 'Open Authoring is enabled. We need to use a fork on your github account. (If a fork already exists, we'll use that.)'
      forkRepo: undefined, // English translation: 'Fork the repo'
      markReadyForReview: undefined, // English translation: 'Mark Ready for Review'
    },
  },
};

export default ca;
