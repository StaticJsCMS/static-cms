import type { LocalePhrasesRoot } from '../types';

const ro: LocalePhrasesRoot = {
  auth: {
    login: 'Autentifică-te',
    loggingIn: 'Te autentificăm...',
    loginWithNetlifyIdentity: 'Autentifică-te cu Netlify Identity',
    loginWithBitbucket: 'Autentifică-te cu Bitbucket',
    loginWithGitHub: 'Autentifică-te cu GitHub',
    loginWithGitLab: 'Autentifică-te cu GitLab',
    loginWithGitea: 'Autentifică-te cu Gitea',
    errors: {
      email: 'Asigură-te că ai introdus email-ul.',
      password: 'Te rugăm introdu parola.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        'Nu s-a putut accesa serviciul de autentificare. Dacă folosești git-gateway, asigură-te că ai activat serviciul Identity și Git-Gateway.',
    },
  },
  app: {
    header: {
      content: 'Conținut',
      workflow: 'Workflow',
      media: 'Fișiere',
      quickAdd: 'Adaugă',
    },
    app: {
      loading: 'Se încarcă...',
      errorHeader: 'A apărut o eroare cu configurarea CMS-ului.',
      configErrors: 'Au apărut erori de configurare.',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'Verifică fișierul de configurare (config.yml).',
      loadingConfig: 'Se încarcă configurările...',
      waitingBackend: 'Așteptăm după backend...',
    },
    notFoundPage: {
      header: 'Pagină inexistentă.',
    },
  },
  collection: {
    sidebar: {
      collections: 'Colecții',
      allCollections: 'Toate colecțiile',
      searchAll: 'Căutare',
      searchIn: 'Caută în',
    },
    collectionTop: {
      sortBy: 'Sortează',
      viewAs: 'Vizualizează ca',
      newButton: 'Adaugă %{collectionLabel}',
      ascending: 'Ascendent',
      descending: 'Descendent',
      searchResults: 'Rezultatele căutării pentru "%{searchTerm}"',
      searchResultsInCollection: 'Rezultatele căutării pentru "%{searchTerm}" în %{collection}',
      filterBy: 'Filtrează după',
      groupBy: 'Grupează după',
    },
    entries: {
      loadingEntries: 'Se încarcă intrările...',
      cachingEntries: 'Se salvează temporar intrările...',
      longerLoading: 'Ar putea dura câteva minute.',
      noEntries: 'Nu există intrări.',
    },
    groups: {
      other: 'Altul',
      negateLabel: 'Nu %{label}',
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
        label: 'Actualizat la',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'opțional',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel}” este obligatoriu.',
        regexPattern: '%{fieldLabel} nu se potrivește după modelul: %{pattern}.',
        processing: '%{fieldLabel} se procesează.',
        range: '%{fieldLabel} poate fi între %{minValue} și %{maxValue}.',
        min: '%{fieldLabel} poate fi mai mare sau egal cu %{minValue}.',
        max: '%{fieldLabel} poate fi mai mic sau egal cu %{maxValue}.',
        rangeCount: '%{fieldLabel} poate avea între %{minCount} și %{maxCount} intrări.',
        rangeCountExact: '%{fieldLabel} trebuie să conțină exact %{count} intrări.',
        rangeMin: '%{fieldLabel} trebuie să conțină cel puțin %{minCount} intrări.',
        rangeMax: '%{fieldLabel} trebuie să conțină cel mult %{maxCount} intrări.',
        invalidPath: "'%{path}' nu este o cale validă.",
        pathExists: "Calea '%{path}' există deja.",
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: 'Scrii în limba %{locale}',
        copyFromLocale: undefined, // English translation: 'Fill in from another locale'
        copyFromLocaleConfirm: undefined, // English translation: 'Do you want to fill in data from %{locale} locale?\nAll existing content will be overwritten.'
      },
    },
    editor: {
      onLeavePage: 'Ești sigur/ă că dorești să părăsești pagina?',
      onUpdatingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onUpdatingWithUnsavedChangesBody:
        'Există modificări nesalvate! Te rugăm salvează înainte de a actualiza statusul.',
      onPublishingNotReadyTitle: undefined, // English translation: 'Not ready to publish'
      onPublishingNotReadyBody: 'Actualizează statusul la „Gata” înainte de publicare.',
      onPublishingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onPublishingWithUnsavedChangesBody:
        'Există modificări nesalvate, salvează-le înainte de publicare.',
      onPublishingTitle: undefined, // English translation: 'Publish entry?'
      onPublishingBody: 'Ești sigur/ă că dorești să publici acest articol?',
      onUnpublishingTitle: undefined, // English translation: 'Unpublish entry?'
      onUnpublishingBody: 'Ești sigur/ă că dorești să anulezi publicarea acestui articol?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Ești sigur/ă că dorești să ștergi această publicare, dar și modificările nesalvate din sesiunea curentă?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Ești sigur/ă că dorești să ștergi această publicare?',
      onDeleteUnpublishedChangesWithUnsavedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        'Se vor șterge toate modificările nepublicate din aceast articol și modificările nesalvate din sesiunea curentă. Continui cu ștergerea?',
      onDeleteUnpublishedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesBody:
        'Toate modificările nepublicate din acest articol vor fi șterse. Continui cu ștergerea?',
      loadingEntry: 'Se încarcă...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: 'Comută limba',
      togglePreview: 'Comută previzualizarea',
      toggleScrollSync: 'Sincronizează scroll-ul',
    },
    editorToolbar: {
      publishing: 'Se publică...',
      publish: 'Publicare',
      published: 'Publicat',
      unpublish: 'Anulează publicarea',
      duplicate: 'Duplifică',
      unpublishing: 'Se anulează publicarea...',
      publishAndCreateNew: 'Publicare apoi crează altul',
      publishAndDuplicate: 'Publicare apoi duplifică',
      deleteUnpublishedChanges: 'Șterge modificări nepublicate',
      deleteUnpublishedEntry: 'Șterge intrarea nepublicată',
      deletePublishedEntry: 'Șterge intrarea publicată',
      deleteEntry: 'Șterge intrare',
      saving: 'Se salvează...',
      save: 'Salvează',
      statusInfoTooltipDraft: undefined, // English translation: 'Entry status is set to draft. To finalize and submit it for review, set the status to �In review�'
      statusInfoTooltipInReview: undefined, // English translation: 'Entry is being reviewed, no further actions are required. However, you can still make additional changes while it is being reviewed.'
      deleting: 'Se șterge...',
      updating: 'Se actualizează...',
      status: 'Status: %{status}',
      backCollection: ' Scrii în colecția „%{collectionLabel}”',
      unsavedChanges: 'Modificări nesalvate',
      changesSaved: 'Modificări salvate',
      draft: 'Ciornă',
      inReview: 'În revizuire',
      ready: 'Gata',
      publishNow: 'Publicare',
      deployPreviewPendingButtonLabel: 'Verifică publicare',
      deployPreviewButtonLabel: 'Previzualizare',
      deployButtonLabel: 'Vezi publicarea',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Bold',
        italic: 'Italic',
        strikethrough: undefined, // English translation: 'Strikethrough'
        code: 'Cod sursă',
        codeBlock: undefined, // English translation: 'Code block'
        insertCodeBlock: undefined, // English translation: 'Insert code block'
        link: 'Link',
        insertLink: undefined, // English translation: 'Insert link'
        paragraph: undefined, // English translation: 'Paragraph'
        headings: 'Titluri',
        quote: 'Citat',
        insertQuote: undefined, // English translation: 'Insert blockquote'
        bulletedList: 'Listă cu puncte',
        numberedList: 'Listă cu numere',
        addComponent: 'Adaugă componentă',
        richText: 'Rich Text',
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
        choose: 'Alege o imagine',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: 'Inserează din URL',
        replaceUrl: 'Schimbă cu URL',
        promptUrl: 'Introdu URL-ul imaginii',
        chooseDifferent: 'Alege altă imagine',
        addMore: undefined, // English translation: 'Add more images'
        remove: 'Șterge imaginea',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: 'Alege un fișier',
        chooseUrl: 'Inserează din URL',
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: 'Schimbă cu URL',
        promptUrl: 'Introdu URL-ul fișierului',
        chooseDifferent: 'Alege alt fișier',
        addMore: undefined, // English translation: 'Add more files'
        remove: 'Șterge fișier',
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
        noControl: 'Widget-ul „%{widget}” nu are configurări valabile.',
      },
      unknownPreview: {
        noPreview: 'Nu există previzualizare pentru widget-ul „%{widget}”.',
      },
      headingOptions: {
        headingOne: 'Titlu 1',
        headingTwo: 'Titlu 2',
        headingThree: 'Titlu 3',
        headingFour: 'Titlu 4',
        headingFive: 'Titlu 5',
        headingSix: 'Titlu 6',
      },
      datetime: {
        now: 'Acum',
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
      draft: 'Ciornă',
      copy: 'Copiază',
      copyUrl: 'Copiază URL',
      copyPath: 'Copiază cale',
      copyName: 'Copiaza nume',
      copied: 'Copiat',
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'Ești sigur/ă că dorești să ștergi fișierul selectat?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody:
        'Fișier prea mare.\nConfigurarea nu permite fișiere mai mari de %{size} KB.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      noResults: 'Nu sunt rezultate.',
      noAssetsFound: 'Nu s-au găsit fișiere.',
      noImagesFound: 'Nu s-au găsit imagini.',
      private: 'Privat ',
      images: 'Imagini',
      mediaAssets: 'Fișiere media',
      search: 'Caută...',
      uploading: 'Se încarcă...',
      upload: 'Încarcă',
      download: 'Descarcă',
      deleting: 'Se șterge...',
      deleteSelected: 'Șterge fișierele selectate',
      chooseSelected: 'Alege fișierele selectate',
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
      goBackToSite: 'Înapoi la site',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'Eroare',
      details: 'A apărut o eroare - te rugăm ',
      reportIt: 'Deschide o problemă pe GitHub.',
      detailsHeading: 'Detalii',
      privacyWarning:
        'Problema deschisă va fi precompletată cu mesajul de eroare și datele de depanare.\nTe rugăm verifică datele să fie corecte și șterge orice fel de date personale.',
      recoveredEntry: {
        heading: 'Document recuperat',
        warning: 'Te rugăm să faci copy/paste la datele acestea undeva înainte de ieșire!',
        copyButtonLabel: 'Copiază în clipboard',
      },
    },
    settingsDropdown: {
      theme: undefined, // English translation: 'Theme'
      logOut: 'Ieșire din cont',
    },
    toast: {
      onFailToLoadEntries: 'A eșuat încărcarea intrării: %{details}',
      onFailToLoadDeployPreview: 'A eșuat încărcarea previzualizării: %{details}',
      onFailToPersist: 'A eșuat persistarea intrării: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'A eșuat ștergerea intrării: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'A eșuat actualizarea status-ului: %{details}',
      missingRequiredField: 'Oops, ai ratat un câmp obligatoriu. Completează-l pentru a salva.',
      entrySaved: 'Intrare salvată',
      entryDeleted: undefined, // English translation: 'Entry delete'
      entryPublished: 'Intrare publicată',
      entryUnpublished: 'Publicare anulată',
      onFailToPublishEntry: 'A eșuat publicarea: %{details}',
      onFailToUnpublishEntry: 'A eșuat anularea publicării: %{details}',
      entryUpdated: 'S-a actualizat status-ul intrării',
      onDeletePublishedEntry: undefined, // English translation: 'Published entry deleted'
      onDeleteUnpublishedChanges: 'Modificări nepublicate șterse',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Ai fost delogat, te rugăm salvează orice date și autentifică-te din nou.',
      onBackendDown: 'Există probleme la server. Vezi %{details} pentru mai multe informații.',
    },
  },
  workflow: {
    workflow: {
      dashboard: undefined, // English translation: 'Dashboard'
      loading: 'Se încarcă intrările din Workflow-ul Editorial',
      workflowHeading: 'Workflow Editorial',
      newPost: 'Postare nouă',
      description:
        '%{smart_count} pregătite de revizuire, %{readyCount} gata de publicare. |||| %{smart_count} pregătite de revizuire, %{readyCount} gata de publicare. ',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date} de %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: 'de %{author}',
      deleteChanges: 'Modificări șterse',
      deleteNewEntry: 'Șterge intrarea nouă',
      publishChanges: 'Publicare modificări',
      publishNewEntry: 'Publicare intrare nouă',
    },
    workflowList: {
      onDeleteEntry: 'Ești sigur/ă că dorești ștergerea intrării?',
      onPublishingNotReadyEntry:
        'Numai intrări cu status-ul „Gata” pot fi publicate. Trage un card în coloana „Gata” pentru a putea publica.',
      onPublishEntry: 'Ești sigur/ă că dorești să faci publicarea?',
      draft: 'Ciorne',
      pending_review: 'În revizuire',
      pending_publish: 'Gata',
      currentEntries: '%{smart_count} intrări |||| %{smart_count} intrări',
    },
    openAuthoring: {
      forkRequired: undefined, // English translation: 'Open Authoring is enabled. We need to use a fork on your github account. (If a fork already exists, we'll use that.)'
      forkRepo: undefined, // English translation: 'Fork the repo'
      markReadyForReview: undefined, // English translation: 'Mark Ready for Review'
    },
  },
};

export default ro;
