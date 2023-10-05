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
      authTitle: 'Erreur de connexion',
      authBody: '%{details}',
      netlifyIdentityNotFound: 'plugin Netlify Identity non trouvé', // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        "Impossible d'accéder aux paramètres d'identité. Si vous utilisez le backend git-gateway, merci de vous assurer que vous avez bien activé le service Identity et la passerelle Git.",
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
      configNotFound: 'Configuration non trouvée',
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
      summary: 'Résumé',
      collection: 'Collection',
    },
    defaultFields: {
      author: {
        label: 'Auteur',
      },
      updatedOn: {
        label: 'Mis à jour le',
      },
    },
    notFound: 'Collection non trouvée',
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
        invalidColor: "La couleur '%{color}' n'est pas valide.",
        invalidHexCode: 'Les codes hexadécimaux doivent être préfixés par un signe #.',
      },
      i18n: {
        writingInLocale: 'Écrire en %{locale}',
      },
    },
    editor: {
      onLeavePage: 'Voulez-vous vraiment quitter cette page ?',
      onDeleteWithUnsavedChangesTitle: 'Supprimer cette entrée publiée ?',
      onDeleteWithUnsavedChangesBody:
        'Voulez-vous vraiment supprimer cette entrée publiée ainsi que vos modifications non enregistrées de cette session ?',
      onDeletePublishedEntryTitle: 'Supprimer cette entrée publiée ?',
      onDeletePublishedEntryBody: 'Voulez-vous vraiment supprimer cette entrée publiée ?',
      loadingEntry: "Chargement de l'entrée...",
    },
    editorInterface: {
      sideBySideI18n: 'I18n Côte à Côte',
      preview: 'Aperçu',
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
      discardChanges: 'Abandonner les modifications',
      discardChangesTitle: 'Abandonner les modifications',
      discardChangesBody: 'Voulez-vous vraiment supprimer vos modifications non enregistrées ?',
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
        chooseMultiple: 'Choisir des images',
        chooseUrl: 'Insérer depuis une adresse web',
        replaceUrl: 'Remplacer depuis une adresse web',
        promptUrl: "Entrer l'adresse web de l'image",
        chooseDifferent: 'Choisir une image différente',
        addMore: "Ajouter plus d'images",
        remove: "Supprimer l'image",
        removeAll: 'Supprimer toutes les images',
      },
      file: {
        choose: 'Choisir un fichier',
        chooseUrl: 'Insérer depuis une adresse web',
        chooseMultiple: 'Choisir des fichiers',
        replaceUrl: 'Remplacer depuis une adresse web',
        promptUrl: "Entrer l'adresse web du fichier",
        chooseDifferent: 'Choisir un fichier différent',
        addMore: 'Ajouter plus de fichiers',
        remove: 'Effacer le fichier',
        removeAll: 'Effacer tous les fichiers',
      },
      folder: {
        choose: 'Choisir un dossier',
        chooseUrl: 'Insérer le chemin du dossier',
        chooseMultiple: 'Choisir des dossiers',
        replaceUrl: 'Remplacer par un chemin',
        promptUrl: 'Entrer le chemin du dossier',
        chooseDifferent: 'Choisir un dossier différent',
        addMore: 'Ajouter plus de dossiers',
        remove: 'Supprimer le dossier',
        removeAll: 'Supprimer tous les dossiers',
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
        invalidDateTitle: 'Date invalide',
        invalidDateBody: 'La date que vous avez saisi est invalide.',
      },
      list: {
        add: 'Ajouter %{item}',
        addType: 'Ajouter une entrée de type %{item}',
        noValue: 'Pas de valeur',
      },
      keyvalue: {
        key: 'Clé',
        value: 'Valeur',
        uniqueKeys: '%{keyLabel} doit être unique',
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
      onDeleteTitle: 'Supprimer la ressource sélectionné ?',
      onDeleteBody: 'Voulez-vous vraiment supprimer la ressource sélectionné ?',
      fileTooLargeTitle: 'Fichier trop volumineux',
      fileTooLargeBody:
        "Le fichier est trop volumineux.\nL'instance est configurée pour bloquer les envois de plus de %{size} kB.",
      alreadyExistsTitle: 'Fichier déjà existant',
      alreadyExistsBody: '%{filename} existe déjà. Voulez-vous le remplacer ?',
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
      dropImages: 'Déposer les images à téléverser',
      dropFiles: 'Déposer les fichiers à téléverser',
    },
    folderSupport: {
      newFolder: 'Nouveau dossier',
      createNewFolder: 'Créer un nouveau dossier',
      enterFolderName: 'Entrer le nom du dossier',
      home: 'Accueil',
      up: 'Remonter',
      upToFolder: 'Remonter vers %{folder}',
    },
  },
  ui: {
    common: {
      yes: 'Oui',
      no: 'Non',
      okay: 'OK',
    },
    default: {
      goBackToSite: 'Retourner sur le site',
    },
    localBackup: {
      hasLocalBackup: 'A une sauvegarde locale',
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
      darkMode: 'Mode Sombre',
      logOut: 'Déconnexion',
    },
    toast: {
      onFailToLoadEntries: "Échec du chargement de l'entrée : %{details}",
      onFailToPersist: "Échec de l'enregistrement de l'entrée : %{details}",
      onFailToPersistMedia: "Échec de l'enregistrement de la ressource : %{details}",
      onFailToDelete: "Échec de la suppression de l'entrée : %{details}",
      onFailToDeleteMedia: 'Échec de la suppression de la ressource : %{details}',
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
