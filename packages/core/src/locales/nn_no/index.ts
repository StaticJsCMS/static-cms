import type { LocalePhrasesRoot } from '@staticcms/core/interface';

const nn_no: LocalePhrasesRoot = {
  auth: {
    login: 'Logg inn',
    loggingIn: 'Loggar inn..',
    loginWithNetlifyIdentity: 'Logg på med Netlify Identity',
    loginWithBitbucket: 'Logg på med Bitbucket',
    loginWithGitHub: 'Logg på med GitHub',
    loginWithGitLab: 'Logg på med GitLab',
    loginWithGitea: 'Logg på med Gitea',
    errors: {
      email: 'Du må skriva inn e-posten din.',
      password: 'Du må skriva inn passordet ditt.',
      identitySettings:
        'Fann ingen innstillingar for Identity. Om du ynskjer å nytte git-gateway må du hugse å skru på Identity service og Git Gateway',
    },
  },
  app: {
    header: {
      content: 'Innhald',
      media: 'Media',
      quickAdd: 'Hurtiginnlegg',
    },
    app: {
      errorHeader: 'Noko gjekk gale under lastinga av CMS konfigurasjonen',
      configErrors: 'Konfigurasjonsfeil',
      checkConfigYml: 'Sjå over config.yml fila.',
      loadingConfig: 'Lastar konfigurasjon...',
      waitingBackend: 'Ventar på backend...',
    },
    notFoundPage: {
      header: 'Ikkje funnen',
    },
  },
  collection: {
    sidebar: {
      collections: 'Samlingar',
      searchAll: 'Søk i alle',
    },
    collectionTop: {
      sortBy: 'Sorter etter',
      viewAs: 'Vis som',
      newButton: 'Ny %{collectionLabel}',
      ascending: 'Stigande',
      descending: 'Synkande',
    },
    entries: {
      loadingEntries: 'Laster innlegg...',
      cachingEntries: 'Mellomlagrar innlegg...',
      longerLoading: 'Dette kan ta fleire minutt',
      noEntries: 'Ingen innlegg',
    },
    defaultFields: {
      author: {
        label: 'Forfatter',
      },
      updatedOn: {
        label: 'Oppdatert',
      },
    },
  },
  editor: {
    editorControl: {
      field: {
        optional: 'valfritt',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} krevast.',
        regexPattern: '%{fieldLabel} samsvarar ikkje med mønsteret: %{pattern}.',
        processing: '%{fieldLabel} vart prosessert.',
        range: '%{fieldLabel} må vera mellom %{minValue} og %{maxValue}.',
        min: '%{fieldLabel} må minst vera %{minValue}.',
        max: '%{fieldLabel} må vera %{maxValue} eller mindre.',
        rangeCount: '%{fieldLabel} må ha mellom %{minCount} og %{maxCount} element.',
        rangeCountExact: '%{fieldLabel} må ha nøyaktig %{count} element.',
        rangeMin: '%{fieldLabel} må minst ha %{minCount} element.',
        rangeMax: '%{fieldLabel} må ha %{maxCount} eller færre element.',
      },
    },
    editor: {
      onLeavePage: 'Er du sikker på at du vil navigere bort frå denne sida?',
      onUpdatingWithUnsavedChangesBody: 'Du må lagra endringane dine før du endrar status',
      onPublishingNotReadyBody: 'Du må endre status til "Klar" før du publiserer',
      onPublishingWithUnsavedChangesBody: 'Du må laga endringane dine før du kan publisere.',
      onPublishingBody: 'Er du sikker på at vil publisere?',
      onUnpublishing: 'Er du sikker på at du vil avpublisere innlegget?',
      onDeleteWithUnsavedChangesBody:
        'Er du sikkert på at du vil slette eit publisert innlegg med tilhøyrande ulagra endringar?',
      onDeletePublishedEntryBody: 'Er du sikker på at du vil slette dette publiserte innlegget?',
      loadingEntry: 'Lastar innlegg...',
    },
    editorToolbar: {
      publishing: 'Publiserer...',
      publish: 'Publiser',
      published: 'Publisert',
      unpublish: 'Avpubliser',
      duplicate: 'Dupliser',
      unpublishing: 'Avpubliserer...',
      publishAndCreateNew: 'Publiser og lag nytt',
      publishAndDuplicate: 'Publiser og dupliser',
      deleteEntry: 'Slettar innlegg',
      saving: 'Lagrar...',
      save: 'Lagre',
      deleting: 'Slettar...',
      updating: 'Oppdaterer...',
      status: 'Status: %{status}',
      backCollection: ' Skriv i samlinga %{collectionLabel}',
      unsavedChanges: 'Ulagra endringar',
      changesSaved: 'Endringar lagret',
      draft: 'Kladd',
      inReview: 'Til godkjenning',
      ready: 'Klar',
      publishNow: 'Publiser no',
      deployPreviewPendingButtonLabel: 'Kontroller førehandsvisning',
      deployPreviewButtonLabel: 'Sjå førehandsvisning',
      deployButtonLabel: 'Sjå i produksjon',
    },
    editorWidgets: {
      markdown: {
        richText: 'Rik-tekst',
        markdown: 'Markdown',
      },
      image: {
        choose: 'Vel bilete',
        chooseDifferent: 'Vel eit anna bilete',
        remove: 'Fjern bilete',
      },
      file: {
        choose: 'Vel fil',
        chooseDifferent: 'Vel ei anna fil',
        remove: 'Fjern fil',
      },
      unknownControl: {
        noControl: "Ingen konfigurasjon for widget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Ingen førehandsvisning tilgjengeleg for '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Overskrift 1',
        headingTwo: 'Overskrift 2',
        headingThree: 'Overskrift 3',
        headingFour: 'Overskrift 4',
        headingFive: 'Overskrift 5',
        headingSix: 'Overskrift 6',
      },
      datetime: {
        now: 'No',
      },
    },
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: 'Kladd',
    },
    mediaLibrary: {
      onDeleteBody: 'Er du sikker på at du vil slette markert element?',
      fileTooLargeBody: 'Fila er for stor.\nMaksimal konfiguert filstorleik er %{size} kB.',
    },
    mediaLibraryModal: {
      loading: 'Lastar...',
      noResults: 'Ingen resultat.',
      noAssetsFound: 'Ingen elementer funne.',
      noImagesFound: 'Ingen bilete funne.',
      images: 'Bileter',
      mediaAssets: 'Mediebibliotek',
      search: 'Søk...',
      uploading: 'Lastar opp...',
      upload: 'Last opp',
      download: 'Last ned',
      deleting: 'Slettar...',
      deleteSelected: 'Slett markert',
      chooseSelected: 'Vel markert',
    },
  },
  ui: {
    default: {
      goBackToSite: 'Attende til sida',
    },
    errorBoundary: {
      title: 'Feil',
      details: 'Ein feil har oppstått. Det er fint om du ',
      reportIt: 'opnar eit issue på GitHub.',
      detailsHeading: 'Detaljer',
      privacyWarning:
        'Når du opnar eit issue vart feil og feilsøkingsdata automatisk fylt ut. Hugs å sjå over at alt ser greitt ut, og ikkje inneheld sensitive data.',
      recoveredEntry: {
        heading: 'Gjenopprettet dokument',
        warning: 'Det kan vere lurt å ta kopi av innhaldet før du navigerer bort frå denne sida!',
        copyButtonLabel: 'Kopier til utklippstavle',
      },
    },
    settingsDropdown: {
      logOut: 'Logg ut',
    },
    toast: {
      onFailToLoadEntries: 'Kunne ikkje laste innlegg: %{details}',
      onFailToLoadDeployPreview: 'Kunne ikkje laste førehandsvisning: %{details}',
      onFailToPersist: 'Kunne ikkje lagre: %{details}',
      onFailToDelete: 'Kunne ikkje slette: %{details}',
      onFailToUpdateStatus: 'Kunne ikkje laste opp: %{details}',
      missingRequiredField:
        'Oisann, gløymte du noko? Alle påkrevde felt må fyllast ut før du kan halde fram',
      entrySaved: 'Innlegg lagra',
      entryPublished: 'Innlegg publisert',
      onFailToPublishEntry: 'Kunne ikkje publisere: %{details}',
      entryUpdated: 'Innleggsstatus oppdatert',
      onFailToAuth: '%{details}',
    },
  },
};

export default nn_no;
