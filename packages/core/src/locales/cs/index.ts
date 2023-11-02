import type { LocalePhrasesRoot } from '../types';

const cs: LocalePhrasesRoot = {
  auth: {
    login: 'Přihlásit',
    loggingIn: 'Přihlašování…',
    loginWithNetlifyIdentity: 'Přihlásit pomocí Netlify Identity',
    loginWithBitbucket: 'Přihlásit pomocí Bitbucket',
    loginWithGitHub: 'Přihlásit pomocí GitHub',
    loginWithGitLab: 'Přihlásit pomocí GitLab',
    loginWithGitea: 'Přihlásit pomocí Gitea',
    errors: {
      email: 'Vyplňte e-mailovou adresu.',
      password: 'Vyplňte heslo.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        'Nastavení identity nenalezeno. Používáte-li git-gateway server nezapomeňte aktivovat službu Identity a Git Gateway.',
    },
  },
  app: {
    header: {
      content: 'Obsah',
      workflow: 'Workflow',
      media: 'Média',
      quickAdd: 'Přidat',
    },
    app: {
      loading: 'Načítání…',
      errorHeader: 'Chyba při načítání CMS konfigurace',
      configErrors: 'Chyba konfigurace',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'Zkontrolujte soubor config.yml.',
      loadingConfig: 'Načítání konfigurace…',
      waitingBackend: 'Čekání na server…',
    },
    notFoundPage: {
      header: 'Nenalezeno',
    },
  },
  collection: {
    sidebar: {
      collections: 'Kolekce',
      allCollections: 'Všechny kolekce',
      searchAll: 'Hledat',
      searchIn: 'Hledat v',
    },
    collectionTop: {
      sortBy: 'Seřadit podle',
      viewAs: 'Zobrazit jako',
      newButton: 'Nový %{collectionLabel}',
      ascending: 'Vzestupné',
      descending: 'Sestupné',
      searchResults: 'Výsledky vyhledávání pro "%{searchTerm}"',
      searchResultsInCollection: 'Výsledky vyhledávání pro "%{searchTerm}" v kolekci %{collection}',
      filterBy: 'Filtrovat podle',
      groupBy: 'Seskupit podle',
    },
    entries: {
      loadingEntries: 'Načítání záznamů',
      cachingEntries: 'Úkládání záznamů do mezipaměti',
      longerLoading: 'Načítání může trvat několik minut',
      noEntries: 'Žádné záznamy',
    },
    groups: {
      other: 'Ostatní',
      negateLabel: 'Není %{label}',
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
        label: 'Poslední aktualizace',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'volitelný',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} je povinný.',
        regexPattern: '%{fieldLabel} nesouhlasí s předepsaným vzorem: %{pattern}.',
        processing: '%{fieldLabel} se zpracovává.',
        range: '%{fieldLabel} musí být mezi %{minValue} a %{maxValue}.',
        min: '%{fieldLabel} musí být alespoň %{minValue}.',
        max: '%{fieldLabel} musí být %{maxValue} nebo méně.',
        rangeCount: '%{fieldLabel} musí mít %{minCount} až %{maxCount} položek.',
        rangeCountExact: '%{fieldLabel} musí mít přesně %{count} položek.',
        rangeMin: '%{fieldLabel} musí mít nejméně %{minCount} položky.',
        rangeMax: '%{fieldLabel} musí mít %{maxCount} nebo méně položek.',
        invalidPath: "'%{path}' není platnou cestou.",
        pathExists: "Cesta '%{path}' už existuje.",
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: 'Psát v %{locale}',
        copyFromLocale: undefined, // English translation: 'Fill in from another locale'
        copyFromLocaleConfirm: undefined, // English translation: 'Do you want to fill in data from %{locale} locale?\nAll existing content will be overwritten.'
      },
    },
    editor: {
      onLeavePage: 'Chcete opravdu opustit tuto stránku?',
      onUpdatingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onUpdatingWithUnsavedChangesBody:
        'Máte neuložené změny. Uložte je prosím před změnou statusu.',
      onPublishingNotReadyTitle: undefined, // English translation: 'Not ready to publish'
      onPublishingNotReadyBody: 'Změňte stav na „Připraveno“ před publikováním.',
      onPublishingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onPublishingWithUnsavedChangesBody:
        'Máte neuložené změny, prosím uložte je před publikováním.',
      onPublishingTitle: undefined, // English translation: 'Publish entry?'
      onPublishingBody: 'Chcete opravdu publikovat tento záznam?',
      onUnpublishingTitle: undefined, // English translation: 'Unpublish entry?'
      onUnpublishingBody: 'Chcete opravdu zrušit publikování tohoto záznamu?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Chcete opravdu vymazat tento publikovaný záznam a všechny neuložené změny z této relace?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Chcete opravdu smazat tento publikovaný záznam?',
      onDeleteUnpublishedChangesWithUnsavedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        'Tato akce vymaže všechny nepublikované změny v tomto záznamu a také všechny neuložené změny z této relace. Chcete záznam skutečně vymazat?',
      onDeleteUnpublishedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesBody:
        'Všechny nepublivkoané změny v tomto záznamu budou vymazány. Chcete ho skuteně vymazat?',
      loadingEntry: 'Načítání záznamu…',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: 'Přepnout lokalizaci',
      togglePreview: 'Přepnout náhled',
      toggleScrollSync: 'Sladit skrolování',
    },
    editorToolbar: {
      publishing: 'Publikování…',
      publish: 'Publikovat',
      published: 'Publikovaný',
      unpublish: 'Zrušit publikování',
      duplicate: 'Duplikovat',
      unpublishing: 'Rušení publikování…',
      publishAndCreateNew: 'Publikovat a vytvořit nový',
      publishAndDuplicate: 'Publikovat a duplikovat',
      deleteUnpublishedChanges: 'Vymazat nepublikované změny',
      deleteUnpublishedEntry: 'Vymazat nepublikovaný záznam',
      deletePublishedEntry: 'Vymazat publikovaný záznam',
      deleteEntry: 'Vymazat záznam',
      saving: 'Ukládání…',
      save: 'Uložit',
      statusInfoTooltipDraft: undefined, // English translation: 'Entry status is set to draft. To finalize and submit it for review, set the status to �In review�'
      statusInfoTooltipInReview: undefined, // English translation: 'Entry is being reviewed, no further actions are required. However, you can still make additional changes while it is being reviewed.'
      deleting: 'Vymazávání…',
      updating: 'Aktualizace…',
      status: 'Status: %{status}',
      backCollection: ' Píšete v kolekci %{collectionLabel}',
      unsavedChanges: 'Neuložené změny',
      changesSaved: 'Změny uloženy',
      draft: 'Koncept',
      inReview: 'V revizi',
      ready: 'Připraveno',
      publishNow: 'Publikovat teď',
      deployPreviewPendingButtonLabel: 'Zkontrolovat náhled',
      deployPreviewButtonLabel: 'Zobrazit náhled',
      deployButtonLabel: 'Zobrazit na webu',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Tučně',
        italic: 'Kurzíva',
        strikethrough: undefined, // English translation: 'Strikethrough'
        code: 'Kód',
        codeBlock: undefined, // English translation: 'Code block'
        insertCodeBlock: undefined, // English translation: 'Insert code block'
        link: 'Odkaz',
        insertLink: undefined, // English translation: 'Insert link'
        paragraph: undefined, // English translation: 'Paragraph'
        headings: 'Nadpisy',
        quote: 'Citovat',
        insertQuote: undefined, // English translation: 'Insert blockquote'
        bulletedList: 'Odrážkový seznam',
        numberedList: 'Číslovaný seznam',
        addComponent: 'Přidat součástku',
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
        choose: 'Vyberte obrázek',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: 'Přidat z URL',
        replaceUrl: 'Nahradit z URL',
        promptUrl: 'Zadejte URL obrázku',
        chooseDifferent: 'Vyberte jiný obrázek',
        addMore: undefined, // English translation: 'Add more images'
        remove: 'Odstranit obrázek',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: 'Vyberte soubor',
        chooseUrl: 'Přidat z URL',
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: 'Nahradit z URL',
        promptUrl: 'Zadejte URL souboru',
        chooseDifferent: 'Vyberte jiný soubor',
        addMore: undefined, // English translation: 'Add more files'
        remove: 'Odebrat soubor',
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
        noControl: "Žádné ovládání pro widget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Žádný náhled pro widget '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Nadpis 1',
        headingTwo: 'Nadpis 2',
        headingThree: 'Nadpis 3',
        headingFour: 'Nadpis 4',
        headingFive: 'Nadpis 5',
        headingSix: 'Nadpis 6',
      },
      datetime: {
        now: 'Teď',
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
      draft: 'Koncept',
      copy: 'Kopírovat',
      copyUrl: 'Kopírovat URL',
      copyPath: 'Kopírovat cestu',
      copyName: 'Kopírovat název',
      copied: 'Zkopírováno',
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'Chcete skutečně vymazat označená média?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody: 'Soubor je příliš velký.\nSoubor musí být menší než %{size} kB.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      noResults: 'Nic nenalezeno.',
      noAssetsFound: 'Média nenalezena.',
      noImagesFound: 'Obrázky nenalezeny.',
      private: 'Soukromé ',
      images: 'Obrázky',
      mediaAssets: 'Média',
      search: 'Hledat…',
      uploading: 'Nahrávání…',
      upload: 'Nahrát nový',
      download: 'Stáhnout',
      deleting: 'Vymazávání…',
      deleteSelected: 'Smazat označené',
      chooseSelected: 'Vybrat označené',
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
      goBackToSite: 'Vrátit se na stránku',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'Chyba',
      details: 'Nastala chyba – prosím ',
      reportIt: 'nahlašte ji.',
      detailsHeading: 'Detaily',
      privacyWarning:
        'Při otevření problému budou předvyplněny ladící data a chybová zpráva.\nProsím zkontrolujte, jestli jsou informace správné, a případně odstraňte citlivé údaje.',
      recoveredEntry: {
        heading: 'Nalezený dokument',
        warning: 'Prosím zkopírujte dokument do schránky před tím než odejte z této stránky!',
        copyButtonLabel: 'Zkopírovat do schránky',
      },
    },
    settingsDropdown: {
      theme: undefined, // English translation: 'Theme'
      logOut: 'Odhlásit',
    },
    toast: {
      onFailToLoadEntries: 'Chyba při načítání záznamu: %{details}',
      onFailToLoadDeployPreview: 'Chyba při načítání náhledu: %{details}',
      onFailToPersist: 'Chyba při ukládání záznamu: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Chyba při vymazávání záznamu: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Chyba při změně stavu záznamu: %{details}',
      missingRequiredField: 'Vynechali jste povinné pole. Prosím vyplňte ho.',
      entrySaved: 'Záznam uložen',
      entryDeleted: undefined, // English translation: 'Entry delete'
      entryPublished: 'Záznam publikován',
      entryUnpublished: 'Publikování záznamu zrušeno',
      onFailToPublishEntry: 'Chyba při publikování záznamu: %{details}',
      onFailToUnpublishEntry: 'Chyba při rušení publikování záznamu: %{details}',
      entryUpdated: 'Stav záznamu byl změněn',
      onDeletePublishedEntry: undefined, // English translation: 'Published entry deleted'
      onDeleteUnpublishedChanges: 'Nepublikované změny byly smazány',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Byli jste odhlášeni, prosím zálohujte všechna data a znova se přihlašte',
      onBackendDown: 'Backend zaznamenal výpadek. Podívejte se do %{details} pro více informací.',
    },
  },
  workflow: {
    workflow: {
      dashboard: undefined, // English translation: 'Dashboard'
      loading: 'Načítání workflow záznamů',
      workflowHeading: 'Schvalovací Workflow',
      newPost: 'Nový post',
      description:
        '%{smart_count} záznam čeká na schválení, %{readyCount} připraven k publikaci. |||| %{smart_count} čeká na schválení, %{readyCount} připraveno k publikaci. ',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date} (%{author})',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: '%{author}',
      deleteChanges: 'Vymazat změny',
      deleteNewEntry: 'Vymazat nový záznam',
      publishChanges: 'Publikovat změny',
      publishNewEntry: 'Publikovat nový záznam',
    },
    workflowList: {
      onDeleteEntry: 'Opravdu chcete smazat tento záznam?',
      onPublishingNotReadyEntry:
        'Pouze položky se statusem "Připraveno" mohou být publikováno. Pro umožnění publikace musíte přetáhnout kartu do sloupce "Připraveno"',
      onPublishEntry: 'Opravdu chcete publikovat tento záznam?',
      draft: 'Koncepty',
      pending_review: 'V revizi',
      pending_publish: 'Připraveno',
      currentEntries: '%{smart_count} záznam |||| %{smart_count} záznamů',
    },
    openAuthoring: {
      forkRequired: undefined, // English translation: 'Open Authoring is enabled. We need to use a fork on your github account. (If a fork already exists, we'll use that.)'
      forkRepo: undefined, // English translation: 'Fork the repo'
      markReadyForReview: undefined, // English translation: 'Mark Ready for Review'
    },
  },
};

export default cs;
