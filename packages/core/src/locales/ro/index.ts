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
      media: 'Fișiere',
      quickAdd: 'Adaugă',
    },
    app: {
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
        rangeMin: undefined, // English translation: '%{fieldLabel} must have at least %{minCount} item(s).'
        rangeMax: undefined, // English translation: '%{fieldLabel} must have %{maxCount} or less item(s).'
        invalidPath: "'%{path}' nu este o cale validă.",
        pathExists: "Calea '%{path}' există deja.",
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: 'Scrii în limba %{locale}',
      },
    },
    editor: {
      onLeavePage: 'Ești sigur/ă că dorești să părăsești pagina?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Ești sigur/ă că dorești să ștergi această publicare, dar și modificările nesalvate din sesiunea curentă?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Ești sigur/ă că dorești să ștergi această publicare?',
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
      publish: 'Publicare',
      published: 'Publicat',
      duplicate: 'Duplifică',
      publishAndCreateNew: 'Publicare apoi crează altul',
      publishAndDuplicate: 'Publicare apoi duplifică',
      deleteEntry: 'Șterge intrare',
      publishNow: 'Publicare',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Bold',
        italic: 'Italic',
        code: 'Cod sursă',
        link: 'Link',
        linkPrompt: 'Scrie URL-ul',
        headings: 'Titluri',
        quote: 'Citat',
        bulletedList: 'Listă cu puncte',
        numberedList: 'Listă cu numere',
        addComponent: 'Adaugă componentă',
        richText: 'Rich Text',
        markdown: 'Markdown',
        type: undefined, // English translation: 'Type...'
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
      loading: 'Se încarcă...',
      noResults: 'Nu sunt rezultate.',
      noAssetsFound: 'Nu s-au găsit fișiere.',
      noImagesFound: 'Nu s-au găsit imagini.',
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
      darkMode: undefined, // English translation: 'Dark Mode'
      logOut: 'Ieșire din cont',
    },
    toast: {
      onFailToLoadEntries: 'A eșuat încărcarea intrării: %{details}',
      onFailToPersist: 'A eșuat persistarea intrării: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'A eșuat ștergerea intrării: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'A eșuat actualizarea status-ului: %{details}',
      missingRequiredField: 'Oops, ai ratat un câmp obligatoriu. Completează-l pentru a salva.',
      entrySaved: 'Intrare salvată',
      entryPublished: 'Intrare publicată',
      onFailToPublishEntry: 'A eșuat publicarea: %{details}',
      entryUpdated: 'S-a actualizat status-ul intrării',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Ai fost delogat, te rugăm salvează orice date și autentifică-te din nou.',
      onBackendDown: 'Există probleme la server. Vezi %{details} pentru mai multe informații.',
    },
  },
};

export default ro;
