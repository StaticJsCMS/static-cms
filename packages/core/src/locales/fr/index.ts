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
      netlifyIdentityNotFound: 'plugin Netlify Identity non trouvé',
      identitySettings:
        "Impossible d'accéder aux paramètres d'identité. Si vous utilisez le backend git-gateway, merci de vous assurer que vous avez bien activé le service Identity et la passerelle Git.",
    },
  },
  app: {
    header: {
      content: 'Contenus',
      workflow: 'Flux',
      media: 'Media',
      quickAdd: 'Ajout rapide',
    },
    app: {
      loading: 'Chargement...',
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
        copyFromLocale: undefined, // English translation: 'Fill in from another locale'
        copyFromLocaleConfirm: undefined, // English translation: 'Do you want to fill in data from %{locale} locale?\nAll existing content will be overwritten.'
      },
    },
    editor: {
      onLeavePage: 'Voulez-vous vraiment quitter cette page ?',
      onUpdatingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onUpdatingWithUnsavedChangesBody:
        'Veuillez enregistrer vos modifications avant de mettre à jour le statut.',
      onPublishingNotReadyTitle: undefined, // English translation: 'Not ready to publish'
      onPublishingNotReadyBody: 'Veuillez mettre à jour le statut à "Prêt" avant de publier.',
      onPublishingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onPublishingWithUnsavedChangesBody:
        'Veuillez enregistrer vos modifications avant de publier.',
      onPublishingTitle: undefined, // English translation: 'Publish entry?'
      onPublishingBody: 'Voulez-vous vraiment publier cette entrée ?',
      onUnpublishingTitle: undefined, // English translation: 'Unpublish entry?'
      onUnpublishingBody: 'Voulez-vous vraiment dépublier cette entrée ?',
      onDeleteWithUnsavedChangesTitle: 'Supprimer cette entrée publiée ?',
      onDeleteWithUnsavedChangesBody:
        'Voulez-vous vraiment supprimer cette entrée publiée ainsi que vos modifications non enregistrées de cette session ?',
      onDeletePublishedEntryTitle: 'Supprimer cette entrée publiée ?',
      onDeletePublishedEntryBody: 'Voulez-vous vraiment supprimer cette entrée publiée ?',
      onDeleteUnpublishedChangesWithUnsavedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        'Ceci supprimera toutes les modifications non publiées de cette entrée ainsi que vos modifications non enregistrées de cette session. Voulez-vous toujours supprimer ?',
      onDeleteUnpublishedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesBody:
        'Toutes les modifications non publiées de cette entrée seront supprimées. Voulez-vous toujours supprimer ?',
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
      publishing: 'Publication...',
      publish: 'Publier',
      published: 'Publiée',
      unpublish: 'Dépublier',
      duplicate: 'Dupliquer',
      unpublishing: 'Dépublication...',
      publishAndCreateNew: 'Publier et créer une nouvelle entrée',
      publishAndDuplicate: 'Publier et dupliquer',
      deleteUnpublishedChanges: 'Supprimer les modications non publiées',
      deleteUnpublishedEntry: "Supprimer l'entrée non publiée",
      deletePublishedEntry: "Supprimer l'entrée publiée",
      deleteEntry: "Supprimer l'entrée",
      saving: 'Enregistrement...',
      save: 'Enregistrer',
      statusInfoTooltipDraft: undefined, // English translation: 'Entry status is set to draft. To finalize and submit it for review, set the status to �In review�'
      statusInfoTooltipInReview: undefined, // English translation: 'Entry is being reviewed, no further actions are required. However, you can still make additional changes while it is being reviewed.'
      deleting: 'Suppression...',
      updating: 'Mise à jour...',
      status: 'Statut: %{status}',
      backCollection: ' Écriture dans la collection %{collectionLabel}',
      unsavedChanges: 'Modifications non enregistrées',
      changesSaved: 'Modifications enregistrées',
      draft: 'Brouillon',
      inReview: 'En cours de révision',
      ready: 'Prêt',
      publishNow: 'Publier maintenant',
      deployPreviewPendingButtonLabel: "Vérifier l'aperçu",
      deployPreviewButtonLabel: "Voir l'aperçu",
      deployButtonLabel: 'Voir en direct',
      discardChanges: 'Abandonner les modifications',
      discardChangesTitle: 'Abandonner les modifications',
      discardChangesBody: 'Voulez-vous vraiment supprimer vos modifications non enregistrées ?',
    },
    editorWidgets: {
      markdown: {
        bold: 'Gras',
        italic: 'Italique',
        strikethrough: undefined, // English translation: 'Strikethrough'
        code: 'Code',
        codeBlock: undefined, // English translation: 'Code block'
        insertCodeBlock: undefined, // English translation: 'Insert code block'
        link: 'Lien',
        insertLink: undefined, // English translation: 'Insert link'
        paragraph: undefined, // English translation: 'Paragraph'
        headings: 'Titres',
        quote: 'Citation',
        insertQuote: undefined, // English translation: 'Insert blockquote'
        bulletedList: 'Liste à puces',
        numberedList: 'Liste numérotée',
        addComponent: 'Ajouter un composant',
        richText: 'Texte enrichi',
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
      code: {
        language: undefined, // English translation: 'Language'
        selectLanguage: undefined, // English translation: 'Select language'
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
      noResults: 'Aucun résultat.',
      noAssetsFound: 'Aucune ressource trouvée.',
      noImagesFound: 'Aucune image trouvée.',
      private: 'Privé ',
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
      create: undefined, // English translation: 'Create'
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
      cancel: undefined, // English translation: 'Cancel'
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
      theme: undefined, // English translation: 'Theme'
      logOut: 'Déconnexion',
    },
    toast: {
      onFailToLoadEntries: "Échec du chargement de l'entrée : %{details}",
      onFailToLoadDeployPreview: "Échec du chargement de l'aperçu : %{details}",
      onFailToPersist: "Échec de l'enregistrement de l'entrée : %{details}",
      onFailToPersistMedia: "Échec de l'enregistrement de la ressource : %{details}",
      onFailToDelete: "Échec de la suppression de l'entrée : %{details}",
      onFailToDeleteMedia: 'Échec de la suppression de la ressource : %{details}',
      onFailToUpdateStatus: 'Échec de la mise à jour du statut : %{details}',
      missingRequiredField:
        'Oops, il manque un champ requis. Veuillez le renseigner avant de soumettre.',
      entrySaved: 'Entrée enregistrée',
      entryDeleted: undefined, // English translation: 'Entry delete'
      entryPublished: 'Entrée publiée',
      entryUnpublished: 'Entrée dépubliée',
      onFailToPublishEntry: 'Échec de la publication : %{details}',
      onFailToUnpublishEntry: "Impossible de dépublier l'entrée : %{details}",
      entryUpdated: "Statut de l'entrée mis à jour",
      onDeletePublishedEntry: undefined, // English translation: 'Published entry deleted'
      onDeleteUnpublishedChanges: 'Modifications non publiées supprimées',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Vous avez été déconnecté, merci de sauvegarder les données et vous reconnecter',
      onBackendDown:
        "Le serveur est actuellement hors-service. Pour plus d'informations : %{details}",
    },
  },
  workflow: {
    workflow: {
      loading: 'Chargement des entrées du flux éditorial',
      workflowHeading: 'Flux éditorial',
      newPost: 'Nouvel article',
      description:
        '%{smart_count} entrée(s) en attente de revue, %{readyCount} prête(s) à être publiée(s). |||| %{smart_count} entrée(s) en attente de revue, %{readyCount} prête(s) à être publiée(s). ',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date} par %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: 'par %{author}',
      deleteChanges: 'Supprimer les mofications',
      deleteNewEntry: 'Supprimer la nouvelle entrée',
      publishChanges: 'Publier les modifications',
      publishNewEntry: 'Publier la nouvelle entrée',
    },
    workflowList: {
      onDeleteEntry: 'Voulez-vous vraiment supprimer cette entrée ?',
      onPublishingNotReadyEntry:
        'Seuls les éléments ayant le statut "Prêt" peuvent être publiés. Veuillez glisser/déposer la carte dans la colonne "Prêt" pour activer la publication',
      onPublishEntry: 'Voulez-vous vraiment publier cette entrée ?',
      draft: 'Brouillons',
      pending_review: 'En cours de révision',
      pending_publish: 'Prêt',
      currentEntries: '%{smart_count} entrée |||| %{smart_count} entrées',
    },
    openAuthoring: {
      forkRequired: undefined, // English translation: 'Open Authoring is enabled. We need to use a fork on your github account. (If a fork already exists, we'll use that.)'
      forkRepo: undefined, // English translation: 'Fork the repo'
      markReadyForReview: undefined, // English translation: 'Mark Ready for Review'
    },
  },
};

export default fr;
