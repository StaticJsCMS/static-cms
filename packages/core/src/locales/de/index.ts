import type { LocalePhrasesRoot } from '@staticcms/core/interface';

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
      identitySettings:
        'Identity-Einstellungen konnten nicht abgerufen werden. Stellen Sie bei der Verwendung des Git-Gateway Backends sicher, den Identity Service und das Git Gateway zu aktivieren.',
    },
  },
  app: {
    header: {
      content: 'Inhalt',
      quickAdd: 'Schnellerstellung',
    },
    app: {
      errorHeader: 'Fehler beim Laden der CMS-Konfiguration.',
      configErrors: 'Konfigurationsfehler',
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
      loadingEntries: 'Beiträge werden geladen....',
      cachingEntries: 'Beiträge werden zwischengespeichert...',
      longerLoading: 'Diese Aktion kann einige Minuten in Anspruch nehmen',
      noEntries: 'Keine Beiträge',
    },
    groups: {
      other: 'Andere',
      negateLabel: 'Nicht %{label}',
    },
    defaultFields: {
      author: {
        label: 'Autor',
      },
      updatedOn: {
        label: 'Änderungsdatum',
      },
    },
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
        invalidPath: `'%{path}' ist kein gültiger Pfad`,
        pathExists: `Pfad '%{path}' existiert bereits`,
      },
      i18n: {
        writingInLocale: 'Aktuelle Sprache: %{locale}',
      },
    },
    editor: {
      onLeavePage: 'Möchten Sie diese Seite wirklich verlassen?',
      onUpdatingWithUnsavedChangesBody:
        'Es sind noch ungespeicherte Änderungen vorhanden. Bitte speichern Sie diese, bevor Sie den Status aktualisieren.',
      onPublishingNotReadyBody:
        'Bitte setzten die den Status vor dem Veröffentlichen auf "Abgeschlossen".',
      onPublishingWithUnsavedChangesBody:
        'Es sind noch ungespeicherte Änderungen vorhanden. Bitte speicheren Sie vor dem Veröffentlichen.',
      onPublishingBody: 'Soll dieser Beitrag wirklich veröffentlicht werden?',
      onDeleteWithUnsavedChangesTitle: 'Veröffentlichten Beitrag löschen?',
      onDeleteWithUnsavedChangesBody:
        'Möchten Sie diesen veröffentlichten Beitrag, sowie Ihre nicht gespeicherten Änderungen löschen?',
      onDeletePublishedEntryTitle: 'Veröffentlichten Beitrag löschen?',
      onDeletePublishedEntryBody: 'Soll dieser veröffentlichte Beitrag wirklich gelöscht werden?',
      loadingEntry: 'Beitrag laden...',
    },
    editorInterface: {
      toggleI18n: 'Übersetzungen',
      togglePreview: 'Vorschau',
      toggleScrollSync: 'Synchron scrollen',
    },
    editorToolbar: {
      publishing: 'Veröffentlichen...',
      publish: 'Veröffentlichen',
      published: 'Veröffentlicht',
      duplicate: 'Duplizieren',
      publishAndCreateNew: 'Veröffentlichen und neuen Beitrag erstellen',
      publishAndDuplicate: 'Veröffentlichen und Beitrag duplizieren',
      deleteEntry: 'Lösche Beitrag',
      saving: 'Speichern...',
      save: 'Speichern',
      statusInfoTooltipDraft:
        'Beitrag ist im Entwurfsstatus. Um ihn fertigzustellen und zur Überprüfung freizugeben, setzen Sie den Status auf ‘Zur Überprüfung‘.',
      statusInfoTooltipInReview:
        'Beitrag wird überprüft, keine weitere Aktion erforderlich. Sie können weitere Änderungen vornehmen, während die Überprüfung läuft.',
      deleting: 'Löschen...',
      updating: 'Aktualisieren...',
      status: 'Status: %{status}',
      backCollection: 'Zurück zu allen %{collectionLabel}',
      unsavedChanges: 'Ungespeicherte Änderungen',
      changesSaved: 'Änderungen gespeichert',
      draft: 'Entwurf',
      inReview: 'Zur Überprüfung',
      ready: 'Abgeschlossen',
      publishNow: 'Jetzt veröffentlichen',
      deployPreviewPendingButtonLabel: 'Überprüfen ob eine Vorschau vorhanden ist',
      deployPreviewButtonLabel: 'Vorschau anzeigen',
      deployButtonLabel: 'Live ansehen',
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
      },
      image: {
        choose: 'Bild wählen',
        chooseUrl: 'Von URL hinzufügen',
        replaceUrl: 'Mit URL ersetzen',
        promptUrl: 'Bild-URL eingeben',
        chooseDifferent: 'Anderes Bild wählen',
        remove: 'Bild entfernen',
      },
      file: {
        choose: 'Datei wählen',
        chooseUrl: 'Von URL hinzufügen',
        replaceUrl: 'Mit URL ersetzen',
        promptUrl: 'Datei-URL eingeben',
        chooseDifferent: 'Andere Datei wählen',
        remove: 'Datei entfernen',
      },
      folder: {
        choose: 'Ordner wählen',
        chooseUrl: 'Ordner-Pfad eingeben',
        replaceUrl: 'Mit Pfad ersetzen',
        promptUrl: 'Ordner-Pfad eingeben',
        chooseDifferent: 'Anderen Ordner wählen',
        remove: 'Ordner entfernen',
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
      },
      list: {
        add: '%{item} hinzufügen',
        addType: '%{item} hinzufügen',
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
    },
    default: {
      goBackToSite: 'Zurück zur Seite',
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
      logOut: 'Abmelden',
    },
    toast: {
      onFailToLoadEntries: 'Beitrag konnte nicht geladen werden: %{details}',
      onFailToLoadDeployPreview: 'Vorschau konnte nicht geladen werden: %{details}',
      onFailToPersist: 'Beitrag speichern fehlgeschlagen: %{details}',
      onFailToDelete: 'Beitrag löschen fehlgeschlagen: %{details}',
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
