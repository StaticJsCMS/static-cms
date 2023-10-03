import type { LocalePhrasesRoot } from '../types';

const hr: LocalePhrasesRoot = {
  auth: {
    login: 'Prijava',
    loggingIn: 'Prijava u tijeku...',
    loginWithNetlifyIdentity: 'Prijava sa Netlify računom',
    loginWithBitbucket: 'Prijava sa Bitbucket računom',
    loginWithGitHub: 'Prijava sa GitHub računom',
    loginWithGitLab: 'Prijava sa GitLab računom',
    loginWithGitea: 'Prijava sa Gitea računom',
    errors: {
      email: 'Unesite email.',
      password: 'Molimo unisite lozinku.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        'Nemoguće pristupiti postavkama identita. Kod korištenja git-gateway backenda morate uključiti "Identity service" te "Git Gateway"',
    },
  },
  app: {
    header: {
      content: 'Sadržaj',
      media: 'Mediji',
      quickAdd: 'Dodaj',
    },
    app: {
      errorHeader: 'Greška pri učitavanju CMS konfiguracije',
      configErrors: 'Greška u konfiguraciji',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'Provjeri config.yml datoteku.',
      loadingConfig: 'Učitavanje konfiguracije...',
      waitingBackend: 'Čekanje na backend...',
    },
    notFoundPage: {
      header: 'Stranica nije pronađena',
    },
  },
  collection: {
    sidebar: {
      collections: 'Zbirke',
      allCollections: 'Sve zbirke',
      searchAll: 'Pretraži sve',
      searchIn: 'Pretraži u',
    },
    collectionTop: {
      sortBy: 'Sortiraj',
      viewAs: 'Pogledaj kao',
      newButton: 'Nova %{collectionLabel}',
      ascending: 'Uzlazno',
      descending: 'Silzano',
      searchResults: 'Rezulatati pretraživanja za "%{searchTerm}"',
      searchResultsInCollection: 'Rezulatati pretraživanja za "%{searchTerm}" u %{collection}',
      filterBy: 'Filtriraj po',
      groupBy: 'Grupiraj po',
    },
    entries: {
      loadingEntries: 'Učitavanje unosa...',
      cachingEntries: 'Predmemoriranje unosa...',
      longerLoading: 'Ovo bi moglo potrajati par minuta',
      noEntries: 'Nema unosa',
    },
    groups: {
      other: 'Ostalo',
      negateLabel: 'Nije %{label}',
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
        label: 'Ažurirano na',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'opcionalno',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} je obvezan.',
        regexPattern: '%{fieldLabel} se ne podudara sa uzorkom: %{pattern}.',
        processing: '%{fieldLabel} se procesira.',
        range: '%{fieldLabel} mora biti između %{minValue} i %{maxValue}.',
        min: '%{fieldLabel} mora biti najmanje %{minValue}.',
        max: '%{fieldLabel} mora biti %{maxValue} ili manje.',
        rangeCount: '%{fieldLabel} mora imati između %{minCount} i %{maxCount} predmeta.',
        rangeCountExact: '%{fieldLabel} mora imati točno %{count} predmeta.',
        rangeMin: '%{fieldLabel} mora imati najmanje %{minCount} predmet(a).',
        rangeMax: '%{fieldLabel} mora imate %{maxCount} ili manje predmeta.',
        invalidPath: "'%{path}' nije valjana putanja",
        pathExists: "Putanja '%{path}' već postoji",
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: 'Pisanje na %{locale}',
      },
    },
    editor: {
      onLeavePage: 'Jeste li sigurni da želite napustiti stranicu?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Jeste li sigurni da želite obrisati objavljeni unos, te nespremljene promjene u trenutnoj sesiji?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Jeste li sigurni da želite obrisati ovaj objavljeni unos?',
      loadingEntry: 'Učitavanje unosa...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: undefined, // English translation: 'Toggle i18n'
      togglePreview: undefined, // English translation: 'Toggle preview'
      toggleScrollSync: undefined, // English translation: 'Sync scrolling'
    },
    editorToolbar: {
      publish: 'Objavi',
      published: 'Objavljeno',
      duplicate: 'Dupliciraj',
      publishAndCreateNew: 'Objavi i kreiraj novo',
      publishAndDuplicate: 'Objavi i dupliciraj',
      deleteEntry: 'Obriši unos',
      publishNow: 'Objavi sad',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Podebljano',
        italic: 'Kurziv',
        code: 'Kod',
        link: 'Link',
        linkPrompt: 'Unesi URL linka',
        headings: 'Naslovi',
        quote: 'Citat',
        bulletedList: 'Nabrajan popis',
        numberedList: 'Numeriran popis',
        addComponent: 'Dodaj komponentu',
        richText: 'Bogati tekst',
        markdown: 'Markdown',
        type: undefined, // English translation: 'Type...'
      },
      image: {
        choose: 'Odaberi sliku',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: undefined, // English translation: 'Insert from URL'
        replaceUrl: undefined, // English translation: 'Replace with URL'
        promptUrl: undefined, // English translation: 'Enter the URL of the image'
        chooseDifferent: 'Odaberi drugu sliku',
        addMore: undefined, // English translation: 'Add more images'
        remove: 'Izbriši sliku',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: 'Odaberi datoteku',
        chooseUrl: undefined, // English translation: 'Insert from URL'
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: undefined, // English translation: 'Replace with URL'
        promptUrl: undefined, // English translation: 'Enter the URL of the file'
        chooseDifferent: 'Odaberi drugu datoteku',
        addMore: undefined, // English translation: 'Add more files'
        remove: 'Obriši datoteku',
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
        noControl: "Kontrola nije pronađena za widget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Prikaz nije pronađen za widget '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Naslov 1',
        headingTwo: 'Naslov 2',
        headingThree: 'Naslov 3',
        headingFour: 'Naslov 4',
        headingFive: 'Naslov 5',
        headingSix: 'Naslov 6',
      },
      datetime: {
        now: 'Sad',
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
      draft: 'Skica',
      copy: undefined, // English translation: 'Copy'
      copyUrl: undefined, // English translation: 'Copy URL'
      copyPath: undefined, // English translation: 'Copy Path'
      copyName: undefined, // English translation: 'Copy Name'
      copied: undefined, // English translation: 'Copied'
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'Jeste li sigurni da želite obrisati odabrane medijske datoteke?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody:
        'Datoteka prevelika.\nKonfigurirano da ne podržava datoteke veće od %{size} kB.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      loading: 'Učitavanje...',
      noResults: 'Nema rezultata.',
      noAssetsFound: 'Sredstva nisu pronađena.',
      noImagesFound: 'Slike nisu pronađene.',
      images: 'Slike',
      mediaAssets: 'Medijska sredstva',
      search: 'Pretraži...',
      uploading: 'Učitavanje...',
      upload: 'Učitaj',
      download: 'Preuzmi',
      deleting: 'Brisanje...',
      deleteSelected: 'Obriši označeno',
      chooseSelected: 'Odaberi označeno',
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
      goBackToSite: 'Povratak na stranicu',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'Greška',
      details: 'Dogodila se greška - molimo ',
      reportIt: 'otvori issue (problem) na GitHubu.',
      detailsHeading: 'Detalji',
      privacyWarning:
        'Otvaranje issue-a (problema) populira ga sa porukom od greške i debug podacima.\nProvjerite jesu li infomacije točne i obrišite osjetljive podatke ako postoje.',
      recoveredEntry: {
        heading: 'Obnovljen dokument',
        warning: 'Molimo kopiraj/zalijepi ovo negdje prije odlaska dalje!',
        copyButtonLabel: 'Kopiraj u međuspremnik',
      },
    },
    settingsDropdown: {
      darkMode: undefined, // English translation: 'Dark Mode'
      logOut: 'Odjava',
    },
    toast: {
      onFailToLoadEntries: 'Neuspjelo dohvaćanje unosa: %{details}',
      onFailToPersist: 'Neuspjelo spremanje unosa: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Neuspjelo brisanje unosa: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Neuspjelo ažuriranje statusa: %{details}',
      missingRequiredField: 'Uups, preskočili ste obvezno polje. Molimo popunite prije spremanja.',
      entrySaved: 'Unos spremljen',
      entryPublished: 'Unos objavljen',
      onFailToPublishEntry: 'Neuspjelo objavljivanje unosa: %{details}',
      entryUpdated: 'Status unosa ažuriran',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Odjavljeni ste, molimo spremite sve podatke i prijavite se ponovno',
      onBackendDown: 'Backend servis ima prekid rada. Pogledaj %{details} za više informacija',
    },
  },
};

export default hr;
