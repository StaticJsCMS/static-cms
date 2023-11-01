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
      workflow: 'Flujo Editorial',
      media: 'Medios',
      quickAdd: 'Añadir rápido',
    },
    app: {
      loading: 'Cargando...',
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
        copyFromLocale: undefined, // English translation: 'Fill in from another locale'
        copyFromLocaleConfirm: undefined, // English translation: 'Do you want to fill in data from %{locale} locale?\nAll existing content will be overwritten.'
      },
    },
    editor: {
      onLeavePage: '¿Estás seguro de que quieres dejar esta página?',
      onUpdatingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onUpdatingWithUnsavedChangesBody:
        'Tiene cambios no guardados, por favor, guárdelos antes de actualizar el estado.',
      onPublishingNotReadyTitle: undefined, // English translation: 'Not ready to publish'
      onPublishingNotReadyBody: 'Por favor, actualice el estado a "Ready" antes de publicar.',
      onPublishingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onPublishingWithUnsavedChangesBody:
        'Tiene cambios no guardados, por favor guárdelos antes de publicarlos.',
      onPublishingTitle: undefined, // English translation: 'Publish entry?'
      onPublishingBody: '¿Estás seguro de que quieres publicar esta entrada?',
      onUnpublishingTitle: undefined, // English translation: 'Unpublish entry?'
      onUnpublishingBody: '¿Estás seguro de que quieres retirar esta entrada?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        '¿Está seguro de que desea eliminar esta entrada publicada, así como los cambios no guardados de la sesión actual?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: '¿Estás seguro de que quieres borrar esta entrada publicada?',
      onDeleteUnpublishedChangesWithUnsavedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        'Esto eliminará todos los cambios no publicados de esta entrada, así como los cambios no guardados de la sesión actual. ¿Todavía quieres borrar?',
      onDeleteUnpublishedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesBody:
        'Todos los cambios no publicados en esta entrada serán eliminados. ¿Todavía quieres borrar?',
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
      publishing: 'Publicando...',
      publish: 'Publicar',
      published: 'Publicado',
      unpublish: 'Retirar',
      duplicate: 'Duplicar',
      unpublishing: 'Retirando...',
      publishAndCreateNew: 'Publicar y crear nuevo',
      publishAndDuplicate: 'Publicar y duplicar',
      deleteUnpublishedChanges: 'Eliminar cambios no publicados',
      deleteUnpublishedEntry: 'Eliminar entrada no publicada',
      deletePublishedEntry: 'Eliminar entrada publicada',
      deleteEntry: 'Eliminar entrada',
      saving: 'Guardando...',
      save: 'Guardar',
      statusInfoTooltipDraft: undefined, // English translation: 'Entry status is set to draft. To finalize and submit it for review, set the status to �In review�'
      statusInfoTooltipInReview: undefined, // English translation: 'Entry is being reviewed, no further actions are required. However, you can still make additional changes while it is being reviewed.'
      deleting: 'Eliminando...',
      updating: 'Actualizando...',
      status: 'Estado: %{status}',
      backCollection: ' Escribiendo en la colección %{collectionLabel}',
      unsavedChanges: 'Cambios no guardados',
      changesSaved: 'Cambios guardados',
      draft: 'Borrador',
      inReview: 'En revisión',
      ready: 'Listo',
      publishNow: 'Publicar ahora',
      deployPreviewPendingButtonLabel: 'Comprobar Vista Previa',
      deployPreviewButtonLabel: 'Ver Vista Previa',
      deployButtonLabel: 'Ver publicación',
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
        richText: 'Texto enriquecido',
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
      code: {
        language: undefined, // English translation: 'Language'
        selectLanguage: undefined, // English translation: 'Select language'
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
      noResults: 'Sin resultados.',
      noAssetsFound: 'Archivos no encontrados.',
      noImagesFound: 'Imágenes no encontradas.',
      private: 'Privado ',
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
      theme: undefined, // English translation: 'Theme'
      logOut: 'Cerrar sesión',
    },
    toast: {
      onFailToLoadEntries: 'No se ha podido cargar la entrada: %{details}',
      onFailToLoadDeployPreview: 'No se ha podido cargar la vista previa: %{details}',
      onFailToPersist: 'No se ha podido guardar la entrada: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'No se ha podido borrar la entrada: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'No se ha podido actualizar el estado: %{details}',
      missingRequiredField:
        'Oops, no ha rellenado un campo obligatorio. Por favor, rellénelo antes de guardar.',
      entrySaved: 'Entrada guardada',
      entryDeleted: undefined, // English translation: 'Entry delete'
      entryPublished: 'Entrada publicada',
      entryUnpublished: 'Entrada retirada',
      onFailToPublishEntry: 'No se ha podido publicar: %{details}',
      onFailToUnpublishEntry: 'No se ha podido retirar la entrada: %{details}',
      entryUpdated: 'Estado de entrada actualizado',
      onDeletePublishedEntry: undefined, // English translation: 'Published entry deleted'
      onDeleteUnpublishedChanges: 'Cambios no publicados eliminados',
      onFailToAuth: '%{details}',
      onLoggedOut: undefined, // English translation: 'You have been logged out, please back up any data and login again'
      onBackendDown: undefined, // English translation: 'The backend service is experiencing an outage. See %{details} for more information'
    },
  },
  workflow: {
    workflow: {
      loading: 'Cargando Entradas del Flujo Editorial',
      workflowHeading: 'Flujo Editorial',
      newPost: 'Nuevo artículo',
      description:
        '%{smart_count} entrada esperando revisión, %{readyCount} lista para publicar |||| %{smart_count} entradas esperando revisión, %{readyCount} listas para publicar. ',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date} por %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: 'por %{author}',
      deleteChanges: 'Eliminar cambios',
      deleteNewEntry: 'Eliminar nueva entrada',
      publishChanges: 'Publicar cambios',
      publishNewEntry: 'Publicar nueva entrada',
    },
    workflowList: {
      onDeleteEntry: '¿Está seguro de que quiere borrar esta entrada?',
      onPublishingNotReadyEntry:
        'Sólo se pueden publicar los elementos con el estado "Listo". Por favor, arrastre la tarjeta hasta la columna "Listo" para permitir la publicación.',
      onPublishEntry: '¿Estás seguro de que quieres publicar esta entrada?',
      draft: 'Borradores',
      pending_review: 'En revisión',
      pending_publish: 'Listo',
      currentEntries: '%{smart_count} entrada |||| %{smart_count} entradas',
    },
    openAuthoring: {
      forkRequired: undefined, // English translation: 'Open Authoring is enabled. We need to use a fork on your github account. (If a fork already exists, we'll use that.)'
      forkRepo: undefined, // English translation: 'Fork the repo'
      markReadyForReview: undefined, // English translation: 'Mark Ready for Review'
    },
  },
};

export default es;
