import type { LocalePhrasesRoot } from '../types';

const sv: LocalePhrasesRoot = {
  auth: {
    login: 'Logga in',
    loggingIn: 'Loggar in...',
    loginWithNetlifyIdentity: 'Logga in med Netlify Identity',
    loginWithBitbucket: 'Logga in med Bitbucket',
    loginWithGitHub: 'Logga in med GitHub',
    loginWithGitLab: 'Logga in med GitLab',
    loginWithGitea: 'Logga in med Gitea',
    errors: {
      email: 'Fyll i din epostadress.',
      password: 'Vänligen skriv ditt lösenord.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        'Kan inte hämta inställningar för Identity. Vid användade av git-gateway backend, kontrollera att Identity service och Git Gateway är aktiverade.',
    },
  },
  app: {
    header: {
      content: 'Innehåll',
      workflow: 'Arbetsflöde',
      media: 'Media',
      quickAdd: 'Snabbt tillägg',
    },
    app: {
      loading: 'Hämtar...',
      errorHeader: 'Ett fel uppstod vid hämtning av CMS-konfigurationen',
      configErrors: 'Konfigurationsfel',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'Kontrollera din config.yml-fil.',
      loadingConfig: 'Hämtar konfiguration...',
      waitingBackend: 'Väntar på backend...',
    },
    notFoundPage: {
      header: 'Sidan finns inte',
    },
  },
  collection: {
    sidebar: {
      collections: 'Samlingar',
      allCollections: 'Alla Samlingar',
      searchAll: 'Sök',
      searchIn: 'Sök i',
    },
    collectionTop: {
      sortBy: 'Sortera efter',
      viewAs: 'Visa som',
      newButton: 'Ny %{collectionLabel}',
      ascending: 'Stigande',
      descending: 'Fallande',
      searchResults: 'Sökresultat för "%{searchTerm}"',
      searchResultsInCollection: 'Sökresultat för "%{searchTerm}" i %{collection}',
      filterBy: 'Filtrera efter',
      groupBy: 'Gruppera efter',
    },
    entries: {
      loadingEntries: 'Hämtar inlägg...',
      cachingEntries: 'Sparar inlägg i cache...',
      longerLoading: 'Det här kan ta några minuter',
      noEntries: 'Inga inlägg',
    },
    groups: {
      other: 'Annat',
      negateLabel: 'Inte %{label}',
    },
    table: {
      summary: undefined, // English translation: 'Summary'
      collection: undefined, // English translation: 'Collection'
    },
    defaultFields: {
      author: {
        label: 'Författare',
      },
      updatedOn: {
        label: 'Uppdaterad vid',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'frivillig',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} är obligatoriskt.',
        regexPattern: '%{fieldLabel} matchar inte mönstret: %{pattern}.',
        processing: '%{fieldLabel} bearbetas.',
        range: '%{fieldLabel} måste vara mellan %{minValue} och %{maxValue}.',
        min: '%{fieldLabel} måste vara åtminstone %{minValue}.',
        max: '%{fieldLabel} måste vara %{maxValue} eller mindre.',
        rangeCount: '%{fieldLabel} måste ha mellan %{minCount} och %{maxCount} element.',
        rangeCountExact: '%{fieldLabel} måste ha exakt %{count} element.',
        rangeMin: '%{fieldLabel} måste ha åtminstone %{minCount} element.',
        rangeMax: '%{fieldLabel} måste ha %{maxCount} eller färre element.',
        invalidPath: "'%{path}' är inte en giltig sökväg",
        pathExists: "Sökvägen '%{path}' existerar redan",
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: 'Skriver i %{locale}',
        copyFromLocale: undefined, // English translation: 'Fill in from another locale'
        copyFromLocaleConfirm: undefined, // English translation: 'Do you want to fill in data from %{locale} locale?\nAll existing content will be overwritten.'
      },
    },
    editor: {
      onLeavePage: 'Är du säker på att du vill lämna sidan?',
      onUpdatingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onUpdatingWithUnsavedChangesBody:
        'Du har osparade ändringar, vänligen spara dem innan du uppdaterar status.',
      onPublishingNotReadyTitle: undefined, // English translation: 'Not ready to publish'
      onPublishingNotReadyBody: 'Vänligen uppdatera status till "Redo" innan du publicerar.',
      onPublishingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onPublishingWithUnsavedChangesBody:
        'Du har osparade ändringar, vänligen spara innan du publicerar.',
      onPublishingTitle: undefined, // English translation: 'Publish entry?'
      onPublishingBody: 'Är du säker på att du vill publicera det här inlägget?',
      onUnpublishingTitle: undefined, // English translation: 'Unpublish entry?'
      onUnpublishingBody: 'Är du säker på att du vill avpublicera det här inlägget?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Är du säker på att du vill radera det här publicerade inlägget, inklusive dina osparade ändringar från nuvarande session?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Är du säker på att du vill radera det här publicerade inlägget?',
      onDeleteUnpublishedChangesWithUnsavedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        'Du är på väg att radera alla opublicerade ändringar för det här inlägget, inklusive dina osparade ändringar från nuvarande session. Vill du fortfarande radera?',
      onDeleteUnpublishedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesBody:
        'Alla opublicerade ändringar kommer raderas. Vill du fortfarande radera?',
      loadingEntry: 'Hämtar inlägg...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: 'Slå på/av i18n',
      togglePreview: 'Visa/Dölj förhandsvisning',
      toggleScrollSync: 'Synka scrollning',
    },
    editorToolbar: {
      publishing: 'Publicerar...',
      publish: 'Publicera',
      published: 'Publicerad',
      unpublish: 'Avpublicera',
      duplicate: 'Duplicera',
      unpublishing: 'Avpublicerar...',
      publishAndCreateNew: 'Publicera och skapa ny',
      publishAndDuplicate: 'Publicera och duplicera',
      deleteUnpublishedChanges: 'Radera opublicerade ändringar',
      deleteUnpublishedEntry: 'Radera opublicerat inlägg',
      deletePublishedEntry: 'Radera publicerat inlägg',
      deleteEntry: 'Radera inlägg',
      saving: 'Sparar...',
      save: 'Spara',
      statusInfoTooltipDraft: undefined, // English translation: 'Entry status is set to draft. To finalize and submit it for review, set the status to �In review�'
      statusInfoTooltipInReview: undefined, // English translation: 'Entry is being reviewed, no further actions are required. However, you can still make additional changes while it is being reviewed.'
      deleting: 'Raderar...',
      updating: 'Updaterar...',
      status: 'Status: %{status}',
      backCollection: ' Redigerar i samlingen %{collectionLabel}',
      unsavedChanges: 'Osparade ändringar',
      changesSaved: 'Ändringar sparade',
      draft: 'Utkast',
      inReview: 'Under granskning',
      ready: 'Redo',
      publishNow: 'Publicera nu',
      deployPreviewPendingButtonLabel: 'Kontrollera förhandsvisning',
      deployPreviewButtonLabel: 'Visa förhandsvisning',
      deployButtonLabel: 'Visa Live',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Fetstil',
        italic: 'Kursiv',
        code: 'Kod',
        link: 'Länk',
        linkPrompt: 'Ange en URL för länken',
        headings: 'Rubriker',
        quote: 'Citat',
        bulletedList: 'Punktlista',
        numberedList: 'Numrerad lista',
        addComponent: 'Lägg till komponent',
        richText: 'Rich Text',
        markdown: 'Markdown',
        type: undefined, // English translation: 'Type...'
      },
      image: {
        choose: 'Välj en bild',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: 'Infoga från URL',
        replaceUrl: 'Ersätt med URL',
        promptUrl: 'Ange en URL för bilden',
        chooseDifferent: 'Välj en annan bild',
        addMore: undefined, // English translation: 'Add more images'
        remove: 'Ta bort bild',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: 'Välj en fil',
        chooseUrl: 'Infoga från URL',
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: 'Ersätt med URL',
        promptUrl: 'Ange en URL för filen',
        chooseDifferent: 'Välj en annan fil',
        addMore: undefined, // English translation: 'Add more files'
        remove: 'Ta bort fil',
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
        noControl: "Inget reglage för widget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Ingen förhandsvisning för widget '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Rubrik 1',
        headingTwo: 'Rubrik 2',
        headingThree: 'Rubrik 3',
        headingFour: 'Rubrik 4',
        headingFive: 'Rubrik 5',
        headingSix: 'Rubrik 6',
      },
      datetime: {
        now: 'Nu',
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
      draft: 'Utkast',
      copy: 'Kopiera',
      copyUrl: 'Kopiera URL',
      copyPath: 'Kopiera Sökväg',
      copyName: 'Kopiera Namn',
      copied: 'Kopierad',
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'Är du säker på att du vill radera valt mediaobjekt?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody:
        'Maximal filstorlek överskriden.\nKonfigurerad att inte tillåta filer större än %{size} kB.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      noResults: 'Inga resultat.',
      noAssetsFound: 'Hittade inga mediaobjekt.',
      noImagesFound: 'Hittade inga bilder.',
      private: 'Privat ',
      images: 'Bilder',
      mediaAssets: 'Mediaobjekt',
      search: 'Sök...',
      uploading: 'Laddar upp...',
      upload: 'Ladda upp',
      download: 'Ladda ner',
      deleting: 'Raderar...',
      deleteSelected: 'Radera markerad',
      chooseSelected: 'Välj markerad',
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
      goBackToSite: 'Tillbaka till sida',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'Fel',
      details: 'Ett fel har uppstått - vänligen ',
      reportIt: 'öppna ett ärende på GitHub.',
      detailsHeading: 'Detaljer',
      privacyWarning:
        'När ett ärende öppnas bifogas felsökningsdata automatiskt.\nVänligen kontrollera att informationen är korrekt och ta bort känslig data om det skulle finnas sådan.',
      recoveredEntry: {
        heading: 'Återskapade dokument',
        warning: 'Vänligen kopiera materialet någon annanstans innan du navigerar från sidan!',
        copyButtonLabel: 'Kopiera till urklipp',
      },
    },
    settingsDropdown: {
      theme: undefined, // English translation: 'Theme'
      logOut: 'Logga ut',
    },
    toast: {
      onFailToLoadEntries: 'Kunde inte hämta inlägg: %{details}',
      onFailToLoadDeployPreview: 'Kunde inte ladda förhandsvisning: %{details}',
      onFailToPersist: 'Kunde inte spara inlägg: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Kunde inte radera inlägg: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Kunde inte uppdatera status: %{details}',
      missingRequiredField:
        'Oops, du har missat ett obligatoriskt fält. Vänligen fyll i det innan du sparar.',
      entrySaved: 'Inlägg sparat',
      entryDeleted: undefined, // English translation: 'Entry delete'
      entryPublished: 'Inlägg publicerat',
      entryUnpublished: 'Inlägg avpublicerat',
      onFailToPublishEntry: 'Kunde inte publicera: %{details}',
      onFailToUnpublishEntry: 'Kunde inte avpublicera inlägg: %{details}',
      entryUpdated: 'Inläggsstatus uppdaterad',
      onDeletePublishedEntry: undefined, // English translation: 'Published entry deleted'
      onDeleteUnpublishedChanges: 'Opublicerade ändringar raderade',
      onFailToAuth: '%{details}',
      onLoggedOut:
        'Du har blivit utloggad, vänligen spara en kopia av eventuella ändringar och logga in på nytt',
      onBackendDown: 'Tjänsten är drabbad av en störning. Se %{details} för mer information',
    },
  },
  workflow: {
    workflow: {
      loading: 'Hämtar inlägg för redaktionellt arbetsflöde',
      workflowHeading: 'Redaktionellt arbetsflöde',
      newPost: 'Nytt inlägg',
      description:
        '%{smart_count} inlägg väntar på granskning, %{readyCount} redo att publiceras. |||| %{smart_count} inlägg väntar på granskning, %{readyCount} redo att publiceras. ',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date} av %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: 'av %{author}',
      deleteChanges: 'Radera ändringar',
      deleteNewEntry: 'Radera nytt inlägg',
      publishChanges: 'Publicera ändringar',
      publishNewEntry: 'Publicera nytt inlägg',
    },
    workflowList: {
      onDeleteEntry: 'Är du säker på att du vill radera det här inlägget?',
      onPublishingNotReadyEntry:
        'Bara inlägg med statusen "Redo" kan publiceras. Vänligen dra kortet till "Redo"-kolumnen för att möjliggöra publicering',
      onPublishEntry: 'Är du säker på att du vill publicera det här inlägget?',
      draft: 'Utkast',
      pending_review: 'Under granskning',
      pending_publish: 'Redo',
      currentEntries: '%{smart_count} inlägg |||| %{smart_count} inlägg',
    },
  },
};

export default sv;
