import type { LocalePhrasesRoot } from '../types';

const es: LocalePhrasesRoot = {
  auth: {
    login: 'Iniciar sesión',
    loggingIn: 'Iniciando sesión...',
    loginWithNetlifyIdentity: 'Iniciar sesión con Netlify Identity',
    loginWithBitbucket: 'Iniciar sesión con Bitbucket',
    loginWithGitHub: 'Iniciar sesión con GitHub',
    loginWithGitLab: 'Iniciar sesión con GitLab',
    loginWithGitea: 'Iniciar sesión con Gitea',
    errors: {
      email: 'Asegúrate de introducir tu correo electrónico.',
      password: 'Por favor introduce tu contraseña.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        'No se pudo acceder a la configuración de Identity. Cuando uses el backend git-gateway asegurate de habilitar el servicio Identity y Git Gateway.',
    },
  },
  app: {
    header: {
      content: 'Contenido',
      media: 'Medios',
      quickAdd: 'Añadir rápido',
    },
    app: {
      errorHeader: 'Error al cargar la configuración del CMS',
      configErrors: 'Errores de configuración',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'Compruebe el archivo config.yml.',
      loadingConfig: 'Cargando configuración....',
      waitingBackend: 'Esperando al servidor...',
    },
    notFoundPage: {
      header: 'No encontrado',
    },
  },
  collection: {
    sidebar: {
      collections: 'Colecciones',
      allCollections: undefined, // English translation: 'All Collections'
      searchAll: 'Buscar todas',
      searchIn: undefined, // English translation: 'Search in'
    },
    collectionTop: {
      sortBy: 'Ordenar por',
      viewAs: 'Ver como',
      newButton: 'Nuevo %{collectionLabel}',
      ascending: 'Ascendente',
      descending: 'Descendente',
      searchResults: undefined, // English translation: 'Search Results for "%{searchTerm}"'
      searchResultsInCollection: undefined, // English translation: 'Search Results for "%{searchTerm}" in %{collection}'
      filterBy: undefined, // English translation: 'Filter by'
      groupBy: undefined, // English translation: 'Group by'
    },
    entries: {
      loadingEntries: 'Cargando entradas',
      cachingEntries: 'Almacenando entradas en caché',
      longerLoading: 'Esto puede tardar varios minutos',
      noEntries: 'Ninguna entrada',
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
        label: 'Autor',
      },
      updatedOn: {
        label: 'Actualizado en',
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
        required: '%{fieldLabel} es obligatorio.',
        regexPattern: '%{fieldLabel} no coincide con el patrón: %{pattern}.',
        processing: '%{fieldLabel} está procesando.',
        range: '%{fieldLabel} debe estar entre %{minValue} y %{maxValue}.',
        min: '%{fieldLabel} debe ser por lo menos %{minValue}.',
        max: '%{fieldLabel} debe ser %{maxValue} o menos.',
        rangeCount: '%{fieldLabel} debe tener entre %{minCount} y %{maxCount} elemento(s).',
        rangeCountExact: '%{fieldLabel} debe tener exactamente %{count} elemento(s).',
        rangeMin: '%{fieldLabel} debe ser por lo menos %{minCount} elemento(s).',
        rangeMax: '%{fieldLabel} debe ser %{maxCount} o menos elemento(s).',
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
      onLeavePage: '¿Estás seguro de que quieres dejar esta página?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        '¿Está seguro de que desea eliminar esta entrada publicada, así como los cambios no guardados de la sesión actual?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: '¿Estás seguro de que quieres borrar esta entrada publicada?',
      loadingEntry: 'Cargando entrada...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: undefined, // English translation: 'Toggle i18n'
      togglePreview: undefined, // English translation: 'Toggle preview'
      toggleScrollSync: undefined, // English translation: 'Sync scrolling'
    },
    editorToolbar: {
      publish: 'Publicar',
      published: 'Publicado',
      duplicate: 'Duplicar',
      publishAndCreateNew: 'Publicar y crear nuevo',
      publishAndDuplicate: 'Publicar y duplicar',
      deleteEntry: 'Eliminar entrada',
      publishNow: 'Publicar ahora',
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
        richText: 'Texto enriquecido',
        markdown: 'Markdown',
        type: undefined, // English translation: 'Type...'
      },
      image: {
        choose: 'Elige una imagen',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: undefined, // English translation: 'Insert from URL'
        replaceUrl: undefined, // English translation: 'Replace with URL'
        promptUrl: undefined, // English translation: 'Enter the URL of the image'
        chooseDifferent: 'Elige una imagen diferente',
        addMore: undefined, // English translation: 'Add more images'
        remove: 'Quita la imagen',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: 'Escoge un archivo',
        chooseUrl: undefined, // English translation: 'Insert from URL'
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: undefined, // English translation: 'Replace with URL'
        promptUrl: undefined, // English translation: 'Enter the URL of the file'
        chooseDifferent: 'Elige un archivo diferente',
        addMore: undefined, // English translation: 'Add more files'
        remove: 'Remover archivo',
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
        noControl: "No existe un control para el widget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "No existe una vista previa para el widget '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Encabezado 1',
        headingTwo: 'Encabezado 2',
        headingThree: 'Encabezado 3',
        headingFour: 'Encabezado 4',
        headingFive: 'Encabezado 5',
        headingSix: 'Encabezado 6',
      },
      datetime: {
        now: 'Ahora',
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
      draft: 'Borrador',
      copy: undefined, // English translation: 'Copy'
      copyUrl: undefined, // English translation: 'Copy URL'
      copyPath: undefined, // English translation: 'Copy Path'
      copyName: undefined, // English translation: 'Copy Name'
      copied: undefined, // English translation: 'Copied'
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: '¿Está seguro de que desea eliminar el archivo seleccionado?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody:
        'Archivo muy pesado.\nConfigurado para no permitir archivos más pesados que %{size} kB.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      loading: 'Cargando...',
      noResults: 'Sin resultados.',
      noAssetsFound: 'Archivos no encontrados.',
      noImagesFound: 'Imágenes no encontradas.',
      images: 'Imágenes',
      mediaAssets: 'Archivos multimedia',
      search: 'Buscar...',
      uploading: 'Subiendo...',
      upload: 'Subir nuevo',
      download: 'Descargar',
      deleting: 'Eliminando...',
      deleteSelected: 'Eliminar selección',
      chooseSelected: 'Confirmar selección',
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
      goBackToSite: 'Regresar al sitio',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'Error',
      details: 'Se ha producido un error - por favor ',
      reportIt: 'infórmenos de ello.',
      detailsHeading: 'Detalles',
      privacyWarning:
        'Abrir un reporte lo rellena previamente con el mensaje de error y los datos de depuración.\nPor favor verifica que la información es correcta y elimina cualquier dato sensible.',
      recoveredEntry: {
        heading: 'Documento recuperado',
        warning: '¡Por favor, copie/pegue esto en algún lugar antes de ir a otra página!',
        copyButtonLabel: 'Copiar al portapapeles',
      },
    },
    settingsDropdown: {
      darkMode: undefined, // English translation: 'Dark Mode'
      logOut: 'Cerrar sesión',
    },
    toast: {
      onFailToLoadEntries: 'No se ha podido cargar la entrada: %{details}',
      onFailToPersist: 'No se ha podido guardar la entrada: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'No se ha podido borrar la entrada: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'No se ha podido actualizar el estado: %{details}',
      missingRequiredField:
        'Oops, no ha rellenado un campo obligatorio. Por favor, rellénelo antes de guardar.',
      entrySaved: 'Entrada guardada',
      entryPublished: 'Entrada publicada',
      onFailToPublishEntry: 'No se ha podido publicar: %{details}',
      entryUpdated: 'Estado de entrada actualizado',
      onFailToAuth: '%{details}',
      onLoggedOut: undefined, // English translation: 'You have been logged out, please back up any data and login again'
      onBackendDown: undefined, // English translation: 'The backend service is experiencing an outage. See %{details} for more information'
    },
  },
};

export default es;
