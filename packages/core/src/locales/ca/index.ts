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
      media: 'Multimèdia',
      quickAdd: 'Afegir',
    },
    app: {
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
      },
    },
    editor: {
      onLeavePage: 'Estàs segur que vols deixar aquesta pàgina?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Està segur que vol eliminar aquesta entrada publicada, així com els canvis no guardats de la sessió actual?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Està segur que vol eliminar aquesta entrada publicada?',
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
      publish: 'Publicar',
      published: 'Publicat',
      duplicate: 'Duplicar',
      publishAndCreateNew: 'Publicar i crear de nou',
      publishAndDuplicate: 'Publica i duplica',
      deleteEntry: 'Eliminar entrada',
      publishNow: 'Publicar ara',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Negreta',
        italic: 'Cursiva',
        code: 'Codi',
        link: 'Enllaç',
        linkPrompt: "Introdueix l'URL de l'enllaç",
        headings: 'Encapçalaments',
        quote: undefined, // English translation: 'Quote'
        bulletedList: 'Llista',
        numberedList: 'Llista numèrica',
        addComponent: 'Afegir component',
        richText: 'Text enriquit',
        markdown: 'Markdown',
        type: undefined, // English translation: 'Type...'
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
      loading: 'Carregant...',
      noResults: 'Sense resultats.',
      noAssetsFound: 'Arxius no trobats.',
      noImagesFound: 'Imatges no trobades.',
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
      darkMode: undefined, // English translation: 'Dark Mode'
      logOut: 'Tancar sessió',
    },
    toast: {
      onFailToLoadEntries: "No s'ha ha pogut carregar l'entrada: %{details}",
      onFailToPersist: "No s'ha pogut guardar l'entrada: %{details}",
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: "No s'ha pogut eliminar l'entrada: %{details}",
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: "No s'ha pogut actualitzar l'estat: %{details}",
      missingRequiredField:
        "Ups, no ha omplert un camp obligatori. Si us plau,  ompli'l abans de guardar.",
      entrySaved: 'Entrada guardada',
      entryPublished: 'Entrada publicada',
      onFailToPublishEntry: "No s'ha pogut publicar: %{details}",
      entryUpdated: "Estat de l'entrada actualitzat",
      onFailToAuth: '%{details}',
      onLoggedOut: 'La teva sessió ha estat tancada. Si us plau, torna a iniciar-la',
      onBackendDown: 'El servidor està patint problemes. Consulta %{details} per a més informació',
    },
  },
};

export default ca;
