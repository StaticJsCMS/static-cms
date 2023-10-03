import type { LocalePhrasesRoot } from '../types';

const de: LocalePhrasesRoot = {
  auth: {
    login: 'Login',
    loggingIn: 'Sie werden eingeloggt...',
    loginWithNetlifyIdentity: 'Mit Netlify Identity einloggen',
    loginWithBitbucket: 'Mit Bitbucket einloggen',
    loginWithGitHub: 'Mit GitHub einloggen',
    loginWithGitLab: 'Mit GitLab einloggen',
    loginWithGitea: 'Mit Gitea einloggen',
    errors: {
      email: 'Stellen Sie sicher, Ihre E-Mail-Adresse einzugeben.',
      password: 'Bitte geben Sie Ihr Passwort ein.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: 'Fehler beim Anmelden',
      netlifyIdentityNotFound: 'Das Netlify Identity Plugin wurde nicht gefunden',
      identitySettings:
        'Identity-Einstellungen konnten nicht abgerufen werden. Stellen Sie bei der Verwendung des Git-Gateway Backends sicher, den Identity Service und das Git Gateway zu aktivieren.',
    },
  },
  app: {
    header: {
      content: 'Inhalt',
      media: 'Medien',
      quickAdd: 'Schnellerstellung',
    },
    app: {
      errorHeader: 'Fehler beim Laden der CMS-Konfiguration.',
      configErrors: 'Konfigurationsfehler',
      configNotFound: 'KOnfiguration nicht gefunden',
      checkConfigYml: 'Überprüfen Sie die config.yml Konfigurationsdatei.',
      loadingConfig: 'Konfiguration laden...',
      waitingBackend: 'Auf Server warten...',
    },
    notFoundPage: {
      header: 'Nicht gefunden',
    },
  },
  collection: {
    sidebar: {
      collections: 'Bereiche',
      allCollections: 'Allen Bereichen',
      searchAll: 'Alles durchsuchen',
      searchIn: 'Suchen in',
    },
    collectionTop: {
      sortBy: 'Sortieren nach',
      viewAs: 'Anzeigen als',
      newButton: 'Neue(r/s) %{collectionLabel}',
      ascending: 'Aufsteigend',
      descending: 'Absteigend',
      searchResults: 'Suchergebnisse für "%{searchTerm}"',
      searchResultsInCollection: 'Suchergebnisse für "%{searchTerm}" in %{collection}',
      filterBy: 'Filtern nach',
      groupBy: 'Gruppieren nach',
    },
    entries: {
      loadingEntries: 'Beiträge werden geladen...',
      cachingEntries: 'Beiträge werden zwischengespeichert...',
      longerLoading: 'Diese Aktion kann einige Minuten in Anspruch nehmen',
      noEntries: 'Keine Beiträge',
    },
    groups: {
      other: 'Andere',
      negateLabel: 'Nicht %{label}',
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
        label: 'Änderungsdatum',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'optional',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} ist erforderlich.',
        regexPattern: '%{fieldLabel} entspricht nicht dem Muster: %{pattern}.',
        processing: '%{fieldLabel} wird verarbeitet.',
        range: '%{fieldLabel} muss zwischen %{minValue} und %{maxValue} liegen.',
        min: '%{fieldLabel} muss größer als %{minValue} sein.',
        max: '%{fieldLabel} darf nicht größer als %{maxValue} sein.',
        rangeCount: '%{fieldLabel} muss %{minCount} bis %{maxCount} Element(e) enthalten.',
        rangeCountExact: '%{fieldLabel} muss exakt %{count} Element(e) enthalten.',
        rangeMin: '%{fieldLabel} muss mindestens %{minCount} Element(e) enthalten.',
        rangeMax: '%{fieldLabel} darf maximal %{maxCount} Element(e) enthalten.',
        invalidPath: "'%{path}' ist kein gültiger Pfad",
        pathExists: "Pfad '%{path}' existiert bereits",
        invalidColor: "Farbe '%{color}' is ungültig",
        invalidHexCode: 'Hex Codes müssen mit einem #-Zeichen anfangen',
      },
      i18n: {
        writingInLocale: 'Aktuelle Sprache: %{locale}',
      },
    },
    editor: {
      onLeavePage: 'Möchten Sie diese Seite wirklich verlassen?',
      onDeleteWithUnsavedChangesTitle: 'Veröffentlichten Beitrag löschen?',
      onDeleteWithUnsavedChangesBody:
        'Möchten Sie diesen veröffentlichten Beitrag, sowie Ihre nicht gespeicherten Änderungen löschen?',
      onDeletePublishedEntryTitle: 'Veröffentlichten Beitrag löschen?',
      onDeletePublishedEntryBody: 'Soll dieser veröffentlichte Beitrag wirklich gelöscht werden?',
      loadingEntry: 'Beitrag laden...',
    },
    editorInterface: {
      sideBySideI18n: 'Parallele Übersetzungen',
      preview: 'Vorschau',
      toggleI18n: 'Übersetzungen',
      togglePreview: 'Vorschau',
      toggleScrollSync: 'Synchron scrollen',
    },
    editorToolbar: {
      publish: 'Veröffentlichen',
      published: 'Veröffentlicht',
      duplicate: 'Duplizieren',
      publishAndCreateNew: 'Veröffentlichen und neuen Beitrag erstellen',
      publishAndDuplicate: 'Veröffentlichen und Beitrag duplizieren',
      deleteEntry: 'Lösche Beitrag',
      publishNow: 'Jetzt veröffentlichen',
      discardChanges: 'Änderungen verwerfen',
      discardChangesTitle: 'Änderungen verwerfen',
      discardChangesBody: 'Sicher, dass Sie ungespeicherte Änderungen verwerfen wollen?',
    },
    editorWidgets: {
      markdown: {
        bold: 'Fett',
        italic: 'Kursiv',
        code: 'Code',
        link: 'Link',
        linkPrompt: 'Link-URL eingeben',
        headings: 'Überschriften',
        quote: 'Zitat',
        bulletedList: 'Aufzählungsliste',
        numberedList: 'Nummerierte Liste',
        addComponent: 'Komponente hinzufügen',
        richText: 'Rich Text',
        markdown: 'Markdown',
        type: undefined, // English translation: 'Type...'
      },
      image: {
        choose: 'Bild wählen',
        chooseMultiple: 'Bilder wählen',
        chooseUrl: 'Von URL hinzufügen',
        replaceUrl: 'Mit URL ersetzen',
        promptUrl: 'Bild-URL eingeben',
        chooseDifferent: 'Anderes Bild wählen',
        addMore: 'Bilder hinzufügen',
        remove: 'Bild entfernen',
        removeAll: 'Alle Bilder entfernen',
      },
      file: {
        choose: 'Datei wählen',
        chooseUrl: 'Von URL hinzufügen',
        chooseMultiple: 'Dateien wählen',
        replaceUrl: 'Mit URL ersetzen',
        promptUrl: 'Datei-URL eingeben',
        chooseDifferent: 'Andere Datei wählen',
        addMore: 'Dateien hinzufügen',
        remove: 'Datei entfernen',
        removeAll: 'Alle Dateien entfernen',
      },
      folder: {
        choose: 'Ordner wählen',
        chooseUrl: 'Ordner-Pfad eingeben',
        chooseMultiple: 'Ordner wählen',
        replaceUrl: 'Mit Pfad ersetzen',
        promptUrl: 'Ordner-Pfad eingeben',
        chooseDifferent: 'Anderen Ordner wählen',
        addMore: 'Ordner hinzufügen',
        remove: 'Ordner entfernen',
        removeAll: 'Alle Ordner entfernen',
      },
      unknownControl: {
        noControl: "Kein Bedienelement für Widget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Keine Vorschau für Widget '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Überschrift 1',
        headingTwo: 'Überschrift 2',
        headingThree: 'Überschrift 3',
        headingFour: 'Überschrift 4',
        headingFive: 'Überschrift 5',
        headingSix: 'Überschrift 6',
      },
      datetime: {
        now: 'Jetzt',
        invalidDateTitle: undefined, // English translation: 'Invalid date'
        invalidDateBody: 'Das eingegebene Datum ist ungültig.',
      },
      list: {
        add: '%{item} hinzufügen',
        addType: '%{item} hinzufügen',
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
      draft: 'Entwurf',
      copy: 'Kopieren',
      copyUrl: 'URL kopieren',
      copyPath: 'Pfad kopieren',
      copyName: 'Name kopieren',
      copied: 'Kopiert',
    },
    mediaLibrary: {
      onDeleteTitle: 'Ausgewähltes Medium löschen?',
      onDeleteBody: 'Soll das ausgewählte Medium wirklich gelöscht werden?',
      fileTooLargeTitle: 'Datei zu groß',
      fileTooLargeBody: 'Datei zu groß.\nErlaubt sind nur Dateien bis %{size} kB.',
      alreadyExistsTitle: 'Datei existiert bereits',
      alreadyExistsBody: '%{filename} existiert bereits. Soll sie überschrieben werden?',
    },
    mediaLibraryModal: {
      loading: 'Laden...',
      noResults: 'Keine Egebnisse.',
      noAssetsFound: 'Keine Medien gefunden.',
      noImagesFound: 'Keine Bilder gefunden.',
      images: 'Bilder',
      mediaAssets: 'Medien',
      search: 'Suchen...',
      uploading: 'Hochladen...',
      upload: 'Hochladen',
      download: 'Download',
      deleting: 'Löschen...',
      deleteSelected: 'Ausgewähltes Element löschen',
      chooseSelected: 'Ausgewähltes Element verwenden',
      dropImages: undefined, // English translation: 'Drop images to upload'
      dropFiles: undefined, // English translation: 'Drop files to upload'
    },
    folderSupport: {
      newFolder: 'Neuer Ordner',
      createNewFolder: 'Neuen Ordner erstellen',
      enterFolderName: 'Ordnernamen eingeben...',
      home: 'Start',
      up: 'Zurück',
      upToFolder: 'Zurück zu %{folder}',
    },
  },
  ui: {
    common: {
      yes: 'Ja',
      no: 'Nein',
      okay: undefined, // English translation: 'OK'
    },
    default: {
      goBackToSite: 'Zurück zur Seite',
    },
    localBackup: {
      hasLocalBackup: 'Lokales Backup verfügbar',
    },
    errorBoundary: {
      title: 'Fehler',
      details: 'Ein Fehler ist aufgetreten - bitte ',
      reportIt: 'berichte ihn.',
      detailsHeading: 'Details',
      privacyWarning:
        'Beim Eröffnen eines Fehlerberichts werden automatisch die Fehlermeldung und Debugdaten eingefügt.\nBitte überprüfen Sie, ob die Informationen korrrekt sind und entfernen Sie ggfs. sensible Daten.',
      recoveredEntry: {
        heading: 'Wiederhergestellter Beitrag',
        warning: 'Bitte sichern Sie sich diese Informationen, bevor Sie die Seite verlassen!',
        copyButtonLabel: 'In Zwischenablage speichern',
      },
    },
    settingsDropdown: {
      darkMode: 'Dunkler Modus',
      logOut: 'Abmelden',
    },
    toast: {
      onFailToLoadEntries: 'Beitrag konnte nicht geladen werden: %{details}',
      onFailToPersist: 'Beitrag speichern fehlgeschlagen: %{details}',
      onFailToPersistMedia: 'Speichern des Meidums fehlgeschlagen: %{details}',
      onFailToDelete: 'Beitrag löschen fehlgeschlagen: %{details}',
      onFailToDeleteMedia: 'Löschen des Mediums fehlgeschlagen: %{details}',
      onFailToUpdateStatus: 'Status aktualisieren fehlgeschlagen: %{details}',
      missingRequiredField: 'Oops, einige zwingend erforderliche Felder sind nicht ausgefüllt.',
      entrySaved: 'Beitrag gespeichert',
      entryPublished: 'Beitrag veröffentlicht',
      onFailToPublishEntry: 'Veröffentlichen fehlgeschlagen: %{details}',
      entryUpdated: 'Beitragsstatus aktualisiert',
      onFailToAuth: '%{details}',
      onLoggedOut:
        'Sie wurden ausgeloggt. Bitte sichern Sie Ihre Daten und melden Sie sich erneut an.',
      onBackendDown:
        'Der Server ist aktuell nicht erreichbar. Für weitere Informationen, siehe: %{details}',
    },
  },
};

export default de;
