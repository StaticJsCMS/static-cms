import type { LocalePhrasesRoot } from '../types';

const fr: LocalePhrasesRoot = {
  auth: {
    login: 'Se connecter',
    loggingIn: 'Connexion en cours...',
    loginWithNetlifyIdentity: 'Se connecter avec Netlify Identity',
    loginWithBitbucket: 'Se connecter avec Bitbucket',
    loginWithGitHub: 'Se connecter avec GitHub',
    loginWithGitLab: 'Se connecter avec GitLab',
    loginWithGitea: 'Se connecter avec Gitea',
    errors: {
      email: "Assurez-vous d'avoir entré votre email.",
      password: 'Merci de saisir votre mot de passe.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        "Impsosible d'accéder aux paramètres d'identité. Si vous utilisez le backend git-gateway, merci de vous assurer que vous avez bien activé le service Identity et la passerelle Git.",
    },
  },
  app: {
    header: {
      content: 'Contenus',
      media: 'Media',
      quickAdd: 'Ajout rapide',
    },
    app: {
      errorHeader: 'Erreur au chargement de la configuration du CMS',
      configErrors: 'Erreurs de configuration',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'Vérifiez votre fichier config.yml.',
      loadingConfig: 'Chargement de la configuration...',
      waitingBackend: 'En attente du serveur...',
    },
    notFoundPage: {
      header: 'Introuvable',
    },
  },
  collection: {
    sidebar: {
      collections: 'Collections',
      allCollections: 'Toutes les collections',
      searchAll: 'Tout rechercher',
      searchIn: 'Rechercher dans',
    },
    collectionTop: {
      sortBy: 'Trier par',
      viewAs: 'Voir comme',
      newButton: 'Créer une entrée de type %{collectionLabel}',
      ascending: 'Croissant',
      descending: 'Décroissant',
      searchResults: 'Résultats de la recherche pour "%{searchTerm}"',
      searchResultsInCollection:
        'Résultats de la recherche pour "%{searchTerm}" dans %{collection}',
      filterBy: 'Filtrer par',
      groupBy: 'Grouper par',
    },
    entries: {
      loadingEntries: 'Chargement des entrées',
      cachingEntries: 'Mise en cache des entrées',
      longerLoading: 'Cela peut prendre quelques minutes',
      noEntries: 'Aucune entrée',
    },
    groups: {
      other: 'Autre',
      negateLabel: 'Non %{label}',
    },
    table: {
      summary: undefined, // English translation: 'Summary'
      collection: undefined, // English translation: 'Collection'
    },
    defaultFields: {
      author: {
        label: 'Auteur',
      },
      updatedOn: {
        label: 'Mis à jour le',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'optionnel',
      },
    },
    editorControlPane: {
      widget: {
        required: 'Le champ %{fieldLabel} est requis.',
        regexPattern: 'Le champ %{fieldLabel} ne correspond pas au schéma: %{pattern}.',
        processing: 'Le champ %{fieldLabel} est en cours de traitement.',
        range: 'Le champ %{fieldLabel} doit être compris entre %{minValue} et %{maxValue}.',
        min: 'Le champ %{fieldLabel} doit avoir une valeur de %{minValue} ou plus.',
        max: 'Le champ %{fieldLabel} doit avoir une valeur de %{maxValue} ou moins.',
        rangeCount: '%{fieldLabel} doit avoir entre %{minCount} et %{maxCount} élément(s).',
        rangeCountExact: '%{fieldLabel} doit avoir exactement %{count} éléments(s).',
        rangeMin: '%{fieldLabel} doit avoir au moins %{minCount} éléments(s).',
        rangeMax: '%{fieldLabel} doit avoir %{maxCount} éléments(s) ou moins.',
        invalidPath: "'%{path}' n'est pas un chemin valide",
        pathExists: "Le chemin '%{path}' existe déjà",
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: 'Écrire en %{locale}',
      },
    },
    editor: {
      onLeavePage: 'Voulez-vous vraiment quitter cette page ?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Voulez-vous vraiment supprimer cette entrée publiée ainsi que vos modifications non enregistrées de cette session ?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Voulez-vous vraiment supprimer cette entrée publiée ?',
      loadingEntry: "Chargement de l'entrée...",
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: 'Édition multilingue',
      togglePreview: 'Aperçu',
      toggleScrollSync: 'Défilement synchronisé',
    },
    editorToolbar: {
      publish: 'Publier',
      published: 'Publiée',
      duplicate: 'Dupliquer',
      publishAndCreateNew: 'Publier et créer une nouvelle entrée',
      publishAndDuplicate: 'Publier et dupliquer',
      deleteEntry: "Supprimer l'entrée",
      publishNow: 'Publier maintenant',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Gras',
        italic: 'Italique',
        code: 'Code',
        link: 'Lien',
        linkPrompt: "Entrer l'adresse web du lien",
        headings: 'Titres',
        quote: 'Citation',
        bulletedList: 'Liste à puces',
        numberedList: 'Liste numérotée',
        addComponent: 'Ajouter un composant',
        richText: 'Texte enrichi',
        markdown: 'Markdown',
        type: undefined, // English translation: 'Type...'
      },
      image: {
        choose: 'Choisir une image',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: 'Insérer depuis une adresse web',
        replaceUrl: 'Remplacer depuis une adresse web',
        promptUrl: "Entrer l'adresse web de l'image",
        chooseDifferent: 'Choisir une image différente',
        addMore: undefined, // English translation: 'Add more images'
        remove: "Supprimer l'image",
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: 'Choisir un fichier',
        chooseUrl: 'Insérer depuis une adresse web',
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: 'Remplacer depuis une adresse web',
        promptUrl: "Entrer l'adresse web du fichier",
        chooseDifferent: 'Choisir un fichier différent',
        addMore: undefined, // English translation: 'Add more files'
        remove: 'Effacer le fichier',
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
        noControl: "Pas de contrôle pour le gadget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Pas d'aperçu pour le gadget '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Titre 1',
        headingTwo: 'Titre 2',
        headingThree: 'Titre 3',
        headingFour: 'Titre 4',
        headingFive: 'Titre 5',
        headingSix: 'Titre 6',
      },
      datetime: {
        now: 'Maintenant',
        invalidDateTitle: undefined, // English translation: 'Invalid date'
        invalidDateBody: undefined, // English translation: 'The date you entered is invalid.'
      },
      list: {
        add: 'Ajouter %{item}',
        addType: 'Ajouter une entrée de type %{item}',
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
      draft: 'Brouillon',
      copy: 'Copier',
      copyUrl: "Copier l'adresse web",
      copyPath: "Copier le chemin d'accès",
      copyName: 'Copier le nom',
      copied: 'Copié',
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'Voulez-vous vraiment supprimer la ressource sélectionné ?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody:
        "Le fichier est trop volumineux.\nL'instance est configurée pour bloquer les envois de plus de %{size} kB.",
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      loading: 'Chargement...',
      noResults: 'Aucun résultat.',
      noAssetsFound: 'Aucune ressource trouvée.',
      noImagesFound: 'Aucune image trouvée.',
      images: 'Images',
      mediaAssets: 'Ressources',
      search: 'Recherche...',
      uploading: 'Téléversement...',
      upload: 'Téléverser une nouvelle ressource',
      download: 'Télécharger',
      deleting: 'Suppression...',
      deleteSelected: 'Supprimer les éléments sélectionnés',
      chooseSelected: 'Choisir les éléments sélectionnés',
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
      goBackToSite: 'Retourner sur le site',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'Erreur',
      details: 'Une erreur est survenue, veuillez ',
      reportIt: 'la signaler sur GitHub.',
      detailsHeading: 'Détails',
      privacyWarning:
        "Ouvrir une issue la préremplie avec le message d'erreur et des données de déboggage.\nMerci de vérifier l'exactitude des informations et de supprimer toute donnée sensible si nécessaire.",
      recoveredEntry: {
        heading: 'Document récupéré',
        warning: 'Veuillez copier/coller ceci quelque part avant de naviguer ailleurs!',
        copyButtonLabel: 'Copier dans le presse-papier',
      },
    },
    settingsDropdown: {
      darkMode: undefined, // English translation: 'Dark Mode'
      logOut: 'Déconnexion',
    },
    toast: {
      onFailToLoadEntries: "Échec du chargement de l'entrée : %{details}",
      onFailToPersist: "Échec de l'enregistrement de l'entrée : %{details}",
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: "Échec de la suppression de l'entrée : %{details}",
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Échec de la mise à jour du statut : %{details}',
      missingRequiredField:
        'Oops, il manque un champ requis. Veuillez le renseigner avant de soumettre.',
      entrySaved: 'Entrée enregistrée',
      entryPublished: 'Entrée publiée',
      onFailToPublishEntry: 'Échec de la publication : %{details}',
      entryUpdated: "Statut de l'entrée mis à jour",
      onFailToAuth: '%{details}',
      onLoggedOut: 'Vous avez été déconnecté, merci de sauvegarder les données et vous reconnecter',
      onBackendDown:
        "Le serveur est actuellement hors-service. Pour plus d'informations : %{details}",
    },
  },
};

export default fr;
