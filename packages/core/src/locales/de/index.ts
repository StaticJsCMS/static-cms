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
      authTitle: 'Fehler beim Anmelden',
      authBody: '%{details}',
      netlifyIdentityNotFound: 'Das Netlify Identity Plugin wurde nicht gefunden',
      identitySettings:
        'Identity-Einstellungen konnten nicht abgerufen werden. Stellen Sie bei der Verwendung des Git-Gateway Backends sicher, den Identity Service und das Git Gateway zu aktivieren.',
    },
  },
  app: {
    header: {
      content: 'Inhalt',
      workflow: 'Arbeitsablauf',
      media: 'Medien',
      quickAdd: 'Schnellerstellung',
    },
    app: {
      loading: 'Laden...',
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
      summary: 'Zusammenfassung',
      collection: 'Bereich',
    },
    defaultFields: {
      author: {
        label: 'Autor',
      },
      updatedOn: {
        label: 'Änderungsdatum',
      },
    },
    notFound: 'Bereich nicht gefunden',
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
        copyFromLocale: 'Aus anderer Sprache übernehmen',
        copyFromLocaleConfirm:
          'Wollen Sie wirklich die Daten aus der Sprache %{locale} übernehmen?\nAlle bishergen Inhalte werden überschrieben.',
      },
    },
    editor: {
      onLeavePage: 'Möchten Sie diese Seite wirklich verlassen?',
      onUpdatingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onUpdatingWithUnsavedChangesBody:
        'Es sind noch ungespeicherte Änderungen vorhanden. Bitte speichern Sie diese, bevor Sie den Status aktualisieren.',
      onPublishingNotReadyTitle: undefined, // English translation: 'Not ready to publish'
      onPublishingNotReadyBody:
        'Bitte setzten die den Status vor dem Veröffentlichen auf "Abgeschlossen".',
      onPublishingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onPublishingWithUnsavedChangesBody:
        'Es sind noch ungespeicherte Änderungen vorhanden. Bitte speicheren Sie vor dem Veröffentlichen.',
      onPublishingTitle: undefined, // English translation: 'Publish entry?'
      onPublishingBody: 'Soll dieser Beitrag wirklich veröffentlicht werden?',
      onUnpublishingTitle: undefined, // English translation: 'Unpublish entry?'
      onUnpublishingBody:
        'Soll die Veröffentlichung dieses Beitrags wirklich zurückgezogen werden?',
      onDeleteWithUnsavedChangesTitle: 'Veröffentlichten Beitrag löschen?',
      onDeleteWithUnsavedChangesBody:
        'Möchten Sie diesen veröffentlichten Beitrag, sowie Ihre nicht gespeicherten Änderungen löschen?',
      onDeletePublishedEntryTitle: 'Veröffentlichten Beitrag löschen?',
      onDeletePublishedEntryBody: 'Soll dieser veröffentlichte Beitrag wirklich gelöscht werden?',
      onDeleteUnpublishedChangesWithUnsavedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        'Möchten Sie diesen unveröffentlichten Beitrag, sowie Ihre nicht gespeicherten Änderungen löschen?',
      onDeleteUnpublishedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesBody:
        'Alle unveröffentlichten Änderungen werden gelöscht. Möchten Sie wirklich löschen?',
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
      publishing: 'Veröffentlichen...',
      publish: 'Veröffentlichen',
      published: 'Veröffentlicht',
      unpublish: 'Veröffentlichung zurückziehen',
      duplicate: 'Duplizieren',
      unpublishing: 'Veröffentlichung wird zurückgezogen...',
      publishAndCreateNew: 'Veröffentlichen und neuen Beitrag erstellen',
      publishAndDuplicate: 'Veröffentlichen und Beitrag duplizieren',
      deleteUnpublishedChanges: 'Unveröffentlichte Änderungen verwerfen',
      deleteUnpublishedEntry: 'Lösche unveröffentlichten Beitrag',
      deletePublishedEntry: 'Lösche veröffentlichten Beitrag',
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
      discardChanges: 'Änderungen verwerfen',
      discardChangesTitle: 'Änderungen verwerfen',
      discardChangesBody: 'Sicher, dass Sie ungespeicherte Änderungen verwerfen wollen?',
    },
    editorWidgets: {
      markdown: {
        bold: 'Fett',
        italic: 'Kursiv',
        strikethrough: 'Durchgestrichen',
        code: 'Code',
        codeBlock: 'Codeblock',
        insertCodeBlock: 'Codeblock einfügen',
        link: 'Link',
        insertLink: 'Link einfügen',
        paragraph: 'Paragraph',
        headings: 'Überschriften',
        quote: 'Zitat',
        insertQuote: 'Zitat einfügen',
        bulletedList: 'Aufzählungsliste',
        numberedList: 'Nummerierte Liste',
        addComponent: 'Komponente hinzufügen',
        richText: 'Rich Text',
        markdown: 'Markdown',
        type: 'Tippen...',
        decreaseIndent: 'Weniger einrücken',
        increaseIndent: 'Einrücken',
        image: 'Bild',
        insertImage: 'Bild einfügen',
        table: {
          table: 'Tabelle',
          deleteColumn: 'Spalte entfernen',
          deleteRow: 'Zeile entfernen',
          deleteTable: 'Tabelle entfernen',
          insertColumn: 'Spalte einfügen',
          insertRow: 'Zeile einfügen',
          insertTable: 'Tabelle einfügen',
        },
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
        invalidDateTitle: 'Ungültiges Datum',
        invalidDateBody: 'Das eingegebene Datum ist ungültig.',
      },
      list: {
        add: '%{item} hinzufügen',
        addType: '%{item} hinzufügen',
        noValue: 'Kein Wert',
      },
      keyvalue: {
        key: 'Variable',
        value: 'Wert',
        uniqueKeys: '%{keyLabel} muss einmalig sein',
      },
      code: {
        language: 'Programmiersprache',
        selectLanguage: 'Programmiersprache wählen',
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
      noResults: 'Keine Egebnisse.',
      noAssetsFound: 'Keine Medien gefunden.',
      noImagesFound: 'Keine Bilder gefunden.',
      private: 'Privat ',
      images: 'Bilder',
      mediaAssets: 'Medien',
      search: 'Suchen...',
      uploading: 'Hochladen...',
      upload: 'Hochladen',
      download: 'Download',
      deleting: 'Löschen...',
      deleteSelected: 'Ausgewähltes Element löschen',
      chooseSelected: 'Ausgewähltes Element verwenden',
      dropImages: 'Zum Hochladen Bilder hierher ziehen',
      dropFiles: 'Zum Hochladen Dateien hierher ziehen',
    },
    folderSupport: {
      newFolder: 'Neuer Ordner',
      createNewFolder: 'Neuen Ordner erstellen',
      enterFolderName: 'Ordnernamen eingeben...',
      create: 'Erstellen',
      home: 'Start',
      up: 'Zurück',
      upToFolder: 'Zurück zu %{folder}',
    },
  },
  ui: {
    common: {
      yes: 'Ja',
      no: 'Nein',
      okay: 'OK',
      cancel: 'Abbrechen',
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
      theme: undefined, // English translation: 'Theme'
      logOut: 'Abmelden',
    },
    toast: {
      onFailToLoadEntries: 'Beitrag konnte nicht geladen werden: %{details}',
      onFailToLoadDeployPreview: 'Vorschau konnte nicht geladen werden: %{details}',
      onFailToPersist: 'Beitrag speichern fehlgeschlagen: %{details}',
      onFailToPersistMedia: 'Speichern des Meidums fehlgeschlagen: %{details}',
      onFailToDelete: 'Beitrag löschen fehlgeschlagen: %{details}',
      onFailToDeleteMedia: 'Löschen des Mediums fehlgeschlagen: %{details}',
      onFailToUpdateStatus: 'Status aktualisieren fehlgeschlagen: %{details}',
      missingRequiredField: 'Oops, einige zwingend erforderliche Felder sind nicht ausgefüllt.',
      entrySaved: 'Beitrag gespeichert',
      entryDeleted: undefined, // English translation: 'Entry delete'
      entryPublished: 'Beitrag veröffentlicht',
      entryUnpublished: 'Beitrag nicht mehr öffentlich',
      onFailToPublishEntry: 'Veröffentlichen fehlgeschlagen: %{details}',
      onFailToUnpublishEntry:
        'Veröffentlichung des Beitrags konnte nicht rückgängig gemacht werden: %{details}',
      entryUpdated: 'Beitragsstatus aktualisiert',
      onDeletePublishedEntry: undefined, // English translation: 'Published entry deleted'
      onDeleteUnpublishedChanges: 'Unveröffentlichte Änderungen verworfen',
      onFailToAuth: '%{details}',
      onLoggedOut:
        'Sie wurden ausgeloggt. Bitte sichern Sie Ihre Daten und melden Sie sich erneut an.',
      onBackendDown:
        'Der Server ist aktuell nicht erreichbar. Für weitere Informationen, siehe: %{details}',
    },
  },
  workflow: {
    workflow: {
      dashboard: undefined, // English translation: 'Dashboard'
      loading: 'Arbeitsablauf Beiträge laden',
      workflowHeading: 'Redaktioneller Arbeitsablauf',
      newPost: 'Neuer Beitrag',
      description:
        '%{smart_count} Beitrag zur Überprüfung bereit, %{readyCount} bereit zur Veröffentlichung. |||| %{smart_count} Beiträge zur Überprüfung bereit, %{readyCount} bereit zur Veröffentlichung. ',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date} von %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: 'von %{author}',
      deleteChanges: 'Änderungen verwerfen',
      deleteNewEntry: 'Lösche neuen Beitrag',
      publishChanges: 'Veröffentliche Änderungen',
      publishNewEntry: 'Veröffentliche neuen Beitrag',
    },
    workflowList: {
      onDeleteEntry: 'Soll dieser Beitrag wirklich gelöscht werden?',
      onPublishingNotReadyEntry:
        'Nur Beiträge im Status "Abgeschlossen" können veröffentlicht werden. Bitte ziehen Sie den Beitrag in die "Abgeschlossen" Spalte um die Veröffentlichung zu aktivieren.',
      onPublishEntry: 'Soll dieser Beitrag wirklich veröffentlicht werden soll?',
      draft: 'Entwurf',
      pending_review: 'In Prüfung',
      pending_publish: 'Abgeschlossen',
      currentEntries: '%{smart_count} Beitrag |||| %{smart_count} Beiträge',
    },
    openAuthoring: {
      forkRequired: undefined, // English translation: 'Open Authoring is enabled. We need to use a fork on your github account. (If a fork already exists, we'll use that.)'
      forkRepo: undefined, // English translation: 'Fork the repo'
      markReadyForReview: undefined, // English translation: 'Mark Ready for Review'
    },
  },
};

export default de;
