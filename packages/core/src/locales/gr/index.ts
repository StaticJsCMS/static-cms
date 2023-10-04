import type { LocalePhrasesRoot } from '../types';

const gr: LocalePhrasesRoot = {
  auth: {
    login: 'Σύνδεση',
    loggingIn: 'Σύνδεση στο...',
    loginWithNetlifyIdentity: 'Σύνδεση μέσω Netlify',
    loginWithBitbucket: 'Σύνδεση μέσω Bitbucket',
    loginWithGitHub: 'Σύνδεση μέσω GitHub',
    loginWithGitLab: 'Σύνδεση μέσω GitLab',
    loginWithGitea: 'Σύνδεση μέσω Gitea',
    errors: {
      email: 'Βεβαιωθείτε ότι έχετε εισαγάγει το email σας.',
      password: 'Παρακαλώ εισάγετε τον κωδικό πρόσβασής σας.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        'Δεν είναι δυνατή η πρόσβαση στις ρυθμίσεις ταυτότητας. Όταν χρησιμοποιείτε το παρασκήνιο του git Gateway, φροντίστε να ενεργοποιήσετε την υπηρεσία Identity και το git Gateway.',
    },
  },
  app: {
    header: {
      content: 'Περιεχόμενα',
      workflow: 'Ροής εργασίας',
      media: 'Πολυμέσα',
      quickAdd: 'Γρήγορη προσθήκη',
    },
    app: {
      loading: 'Φόρτωση...',
      errorHeader: 'Σφάλμα κατά τη φόρτωση της ρύθμισης παραμέτρων CMS',
      configErrors: 'Σφάλματα ρύθμισης παραμέτρων',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'Ελέγξτε το αρχείο config.yml.',
      loadingConfig: 'Φόρτωση ρύθμισης παραμέτρων...',
      waitingBackend: 'Αναμονή για παρασκηνιακό...',
    },
    notFoundPage: {
      header: 'Δεν βρέθηκε',
    },
  },
  collection: {
    sidebar: {
      collections: 'Συλλογές',
      allCollections: undefined, // English translation: 'All Collections'
      searchAll: 'Αναζήτηση όλων',
      searchIn: undefined, // English translation: 'Search in'
    },
    collectionTop: {
      sortBy: undefined, // English translation: 'Sort by'
      viewAs: 'Προβολή ως',
      newButton: 'Νέο %{collectionLabel}',
      ascending: undefined, // English translation: 'Ascending'
      descending: undefined, // English translation: 'Descending'
      searchResults: undefined, // English translation: 'Search Results for "%{searchTerm}"'
      searchResultsInCollection: undefined, // English translation: 'Search Results for "%{searchTerm}" in %{collection}'
      filterBy: undefined, // English translation: 'Filter by'
      groupBy: undefined, // English translation: 'Group by'
    },
    entries: {
      loadingEntries: 'Εγγραφές φόρτωσης',
      cachingEntries: 'Εγγραφές προσωρινής αποθήκευσης',
      longerLoading: 'Αυτό μπορεί να διαρκέσει αρκετά λεπτά',
      noEntries: undefined, // English translation: 'No Entries'
    },
    groups: {
      other: undefined, // English translation: 'Other'
      negateLabel: undefined, // English translation: 'Not %{label}'
    },
    table: {
      summary: undefined, // English translation: 'Summary'
      collection: undefined, // English translation: 'Collection'
    },
    defaultFields: {
      author: {
        label: undefined, // English translation: 'Author'
      },
      updatedOn: {
        label: undefined, // English translation: 'Updated On'
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'προαιρετικός',
      },
    },
    editorControlPane: {
      widget: {
        required: 'Το %{fieldLabel} είναι απαραίτητο.',
        regexPattern: 'Το %{fieldLabel} δεν ταιριάζει με το μοτίβο: %{pattern}.',
        processing: 'Το %{fieldLabel} επεξεργάζεται.',
        range: 'Το %{fieldLabel} πρέπει να είναι μεταξύ %{minValue} και %{maxValue}.',
        min: 'Το %{fieldLabel} πρέπει να είναι τουλάχιστον %{minValue}.',
        max: 'Το %{fieldLabel} πρέπει να είναι %{maxValue} ή μικρότερο.',
        rangeCount: undefined, // English translation: '%{fieldLabel} must have between %{minCount} and %{maxCount} item(s).'
        rangeCountExact: undefined, // English translation: '%{fieldLabel} must have exactly %{count} item(s).'
        rangeMin: undefined, // English translation: '%{fieldLabel} must have at least %{minCount} item(s).'
        rangeMax: undefined, // English translation: '%{fieldLabel} must have %{maxCount} or less item(s).'
        invalidPath: undefined, // English translation: ''%{path}' is not a valid path.'
        pathExists: undefined, // English translation: 'Path '%{path}' already exists.'
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: undefined, // English translation: 'Writing in %{locale}'
      },
    },
    editor: {
      onLeavePage: 'Είστε βέβαιοι ότι θέλετε να αφήσετε αυτήν τη σελίδα;',
      onUpdatingWithUnsavedChangesBody:
        'Έχετε μη αποθηκευμένες αλλαγές, αποθηκεύστε πριν να ενημερώσετε την κατάσταση.',
      onPublishingNotReadyBody: 'Ενημερώστε την κατάσταση σε "έτοιμο" πριν από τη δημοσίευση.',
      onPublishingWithUnsavedChangesBody:
        'Έχετε μη αποθηκευμένες αλλαγές, αποθηκεύστε πριν από τη δημοσίευση.',
      onPublishingBody: 'Είστε βέβαιοι ότι θέλετε να δημοσιεύσετε αυτήν την καταχώρηση;',
      onUnpublishingBody:
        'Είστε βέβαιοι ότι θέλετε να καταργήσετε τη δημοσίευση αυτής της καταχώρησης;',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Είστε βέβαιοι ότι θέλετε να διαγράψετε αυτήν τη δημοσιευμένη καταχώρηση, καθώς και τις αλλαγές που δεν αποθηκεύσατε από την τρέχουσα περίοδο λειτουργίας;',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody:
        'Είστε βέβαιοι ότι θέλετε να διαγράψετε αυτήν τη δημοσιευμένη καταχώρηση;',
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        'Αυτό θα διαγράψει όλες τις μη δημοσιευμένες αλλαγές σε αυτήν την καταχώρηση, καθώς και τις αλλαγές που δεν έχετε αποθηκεύσει από την τρέχουσα περίοδο λειτουργίας. Θέλετε ακόμα να διαγράψετε;',
      onDeleteUnpublishedChangesBody:
        'Όλες οι μη δημοσιευμένες αλλαγές σε αυτήν την καταχώρηση θα διαγραφούν. Θέλετε ακόμα να διαγράψετε;',
      loadingEntry: 'Φόρτωση εισόδου...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: undefined, // English translation: 'Toggle i18n'
      togglePreview: undefined, // English translation: 'Toggle preview'
      toggleScrollSync: undefined, // English translation: 'Sync scrolling'
    },
    editorToolbar: {
      publishing: 'Δημοσίευση...',
      publish: 'Δημοσίευση',
      published: 'Δημοσιεύθηκε',
      unpublish: 'Κατάργηση δημοσίευσης',
      duplicate: 'Διπλότυπο',
      unpublishing: 'Κατάργηση δημοσίευσης...',
      publishAndCreateNew: 'Δημοσίευση και δημιουργία νέων',
      publishAndDuplicate: 'Δημοσίευση και αντίγραφο',
      deleteUnpublishedChanges: 'Διαγραφή μη δημοσιευμένων αλλαγών',
      deleteUnpublishedEntry: 'Διαγραφή μη δημοσιευμένης καταχώρησης',
      deletePublishedEntry: 'Διαγραφή δημοσιευμένης καταχώρησης',
      deleteEntry: 'Διαγραφή καταχώρησης',
      saving: 'Εξοικονόμηση...',
      save: 'Αποθήκευση',
      deleting: 'Διαγραφή...',
      updating: 'Ενημέρωση...',
      status: 'Κατάστασης: %{status}',
      backCollection: ' Εγγραφή στη συλλογή %{collectionLabel}',
      unsavedChanges: 'Μη αποθηκευμένες αλλαγές',
      changesSaved: 'Αλλαγές που αποθηκεύτηκαν',
      draft: 'Σχέδιο',
      inReview: 'Σε επανεξέταση',
      ready: 'Έτοιμα',
      publishNow: 'Δημοσίευση τώρα',
      deployPreviewPendingButtonLabel: 'Έλεγχος για προεπισκόπηση',
      deployPreviewButtonLabel: 'Προβολή προεπισκόπησης',
      deployButtonLabel: 'Προβολή Live',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: undefined, // English translation: 'Bold'
        italic: undefined, // English translation: 'Italic'
        code: undefined, // English translation: 'Code'
        link: undefined, // English translation: 'Link'
        linkPrompt: undefined, // English translation: 'Enter the URL of the link'
        headings: undefined, // English translation: 'Headings'
        quote: undefined, // English translation: 'Quote'
        bulletedList: undefined, // English translation: 'Bulleted List'
        numberedList: undefined, // English translation: 'Numbered List'
        addComponent: undefined, // English translation: 'Add Component'
        richText: undefined, // English translation: 'Rich Text'
        markdown: undefined, // English translation: 'Markdown'
        type: undefined, // English translation: 'Type...'
      },
      image: {
        choose: 'Επιλέξτε μια εικόνα',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: undefined, // English translation: 'Insert from URL'
        replaceUrl: undefined, // English translation: 'Replace with URL'
        promptUrl: undefined, // English translation: 'Enter the URL of the image'
        chooseDifferent: 'Επιλέξτε διαφορετική εικόνα',
        addMore: undefined, // English translation: 'Add more images'
        remove: 'Αφαιρέστε την εικόνα',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: 'Επιλέξτε ένα αρχείο',
        chooseUrl: undefined, // English translation: 'Insert from URL'
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: undefined, // English translation: 'Replace with URL'
        promptUrl: undefined, // English translation: 'Enter the URL of the file'
        chooseDifferent: 'Επιλέξτε διαφορετικό αρχείο',
        addMore: undefined, // English translation: 'Add more files'
        remove: 'Αφαιρέστε το αρχείο',
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
        noControl: "Δεν υπάρχει έλεγχος για το widget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Δεν υπάρχει προεπισκόπηση για το widget '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Heading 1',
        headingTwo: 'Heading 2',
        headingThree: 'Heading 3',
        headingFour: 'Heading 4',
        headingFive: 'Heading 5',
        headingSix: 'Heading 6',
      },
      datetime: {
        now: undefined, // English translation: 'Now'
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
      draft: 'Προσχέδιο',
      copy: undefined, // English translation: 'Copy'
      copyUrl: undefined, // English translation: 'Copy URL'
      copyPath: undefined, // English translation: 'Copy Path'
      copyName: undefined, // English translation: 'Copy Name'
      copied: undefined, // English translation: 'Copied'
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'Είστε βέβαιοι ότι θέλετε να διαγράψετε τα επιλεγμένα πολυμέσα;',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody:
        'Το αρχείο είναι πολύ μεγάλο.\nΔεν επιτρέπονται αρχεία μεγαλύτερα από %{size} kB.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      noResults: 'Χωρίς αποτελέσματα.',
      noAssetsFound: 'Δεν βρέθηκαν αρχεία.',
      noImagesFound: 'Δεν βρέθηκαν εικόνες.',
      private: 'Ιδιωτικό',
      images: 'Εικόνες',
      mediaAssets: 'Αρχεία πολυμέσων',
      search: 'Αναζήτηση...',
      uploading: 'Φόρτωμα...',
      upload: 'Ανεβάστε νέα',
      download: undefined, // English translation: 'Download'
      deleting: 'Διαγραφή...',
      deleteSelected: 'Διαγραφή επιλεγμένου',
      chooseSelected: 'Επιλέξτε επιλεγμένο',
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
      goBackToSite: undefined, // English translation: 'Go back to site'
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'Σφάλμα',
      details: 'Υπάρχει ένα λάθος ',
      reportIt: 'παρακαλώ να το αναφέρετε.',
      detailsHeading: 'Λεπτομέρειες',
      privacyWarning: undefined, // English translation: 'Opening an issue pre-populates it with the error message and debugging data.\nPlease verify the information is correct and remove sensitive data if exists.'
      recoveredEntry: {
        heading: 'Ανακτημένο έγγραφο',
        warning: 'Παρακαλώ αντιγράψτε/επικολλήστε αυτό κάπου πριν πλοηγηθείτε μακριά!',
        copyButtonLabel: 'Αντιγραφή στο Πρόχειρο',
      },
    },
    settingsDropdown: {
      darkMode: undefined, // English translation: 'Dark Mode'
      logOut: 'Αποσύνδεση',
    },
    toast: {
      onFailToLoadEntries: 'Απέτυχε η φόρτωση της καταχώρησης: %{details}',
      onFailToLoadDeployPreview: 'Απέτυχε η φόρτωση της προεπισκόπησης: %{details}',
      onFailToPersist: 'Απέτυχε η διατήρηση της καταχώρησης:% {Details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Απέτυχε η διαγραφή της καταχώρησης: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Απέτυχε η ενημέρωση της κατάστασης: %{details}',
      missingRequiredField:
        'Ουπς, ξεχάσατε ένα απαιτούμενο πεδίο. Συμπληρώστε το πριν από την αποθήκευση.',
      entrySaved: 'Η καταχώρηση Αποθηκεύτηκε',
      entryPublished: 'Η καταχώρηση δημοσιεύτηκε',
      entryUnpublished: 'Μη δημοσιευμένη καταχώρηση',
      onFailToPublishEntry: 'Η δημοσίευση απέτυχε: %{details}',
      onFailToUnpublishEntry: 'Απέτυχε η κατάργηση δημοσίευσης καταχώρησης: %{details}',
      entryUpdated: 'Η κατάσταση εισόδου ενημερώθηκε',
      onDeleteUnpublishedChangesBody: 'Οι μη δημοσιευμένες αλλαγές διαγράφηκαν',
      onFailToAuth: '%{details}',
      onLoggedOut: undefined, // English translation: 'You have been logged out, please back up any data and login again'
      onBackendDown: undefined, // English translation: 'The backend service is experiencing an outage. See %{details} for more information'
    },
  },
  workflow: {
    workflow: {
      loading: 'Φόρτωση καταχωρήσεων ροής εργασίας σύνταξης',
      workflowHeading: 'Ροή εργασιών',
      newPost: 'Νέα δημοσίευση',
      description:
        '%{smart_count} καταχώρησεις σε αναμονή για αναθεώρηση, %{readyCount} έτοιμες για Live μετάβαση. |||| %{smart_count} καταχωρήσεις σε αναμονή για αναθεώρηση, %{readyCount} έτοιμες για Live μετάβαση. ',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date} από %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: 'από %{author}',
      deleteChanges: 'Διαγραφή αλλαγών',
      deleteNewEntry: 'Διαγραφή νέας καταχώρησης',
      publishChanges: 'Δημοσίευση αλλαγών',
      publishNewEntry: 'Δημοσίευση νέας καταχώρησης',
    },
    workflowList: {
      onDeleteEntry: 'Είστε βέβαιοι ότι θέλετε να διαγράψετε αυτήν την καταχώρηση;',
      onPublishingNotReadyEntry:
        'Μόνο τα στοιχεία με κατάσταση "Ready" μπορούν να δημοσιευτούν. Σύρετε την κάρτα στη στήλη "έτοιμο" για να ενεργοποιήσετε τη δημοσίευση.',
      onPublishEntry: 'Είστε βέβαιοι ότι θέλετε να δημοσιεύσετε αυτήν την καταχώρηση;',
      draft: 'Προσχέδια',
      pending_review: 'Σε ανασκόπηση',
      pending_publish: 'Έτοιμα',
      currentEntries: '%{smart_count} καταχωρηση |||| %{smart_count} καταχωρησεις',
    },
  },
};

export default gr;
