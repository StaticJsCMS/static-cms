import type { BaseLocalePhrasesRoot } from '../types';

const en: BaseLocalePhrasesRoot = {
  auth: {
    login: 'Login',
    loggingIn: 'Logging in...',
    loginWithNetlifyIdentity: 'Login with Netlify Identity',
    loginWithBitbucket: 'Login with Bitbucket',
    loginWithGitHub: 'Login with GitHub',
    loginWithGitLab: 'Login with GitLab',
    loginWithGitea: 'Login with Gitea',
    errors: {
      email: 'Make sure to enter your email.',
      password: 'Please enter your password.',
      authTitle: 'Error logging in',
      authBody: '%{details}',
      netlifyIdentityNotFound: 'Netlify Identity plugin not found',
      identitySettings:
        'Unable to access identity settings. When using git-gateway backend make sure to enable Identity service and Git Gateway.',
    },
  },
  app: {
    header: {
      content: 'Contents',
      workflow: 'Workflow',
      media: 'Media',
      quickAdd: 'Quick add',
    },
    app: {
      loading: 'Loading...',
      errorHeader: 'Error loading the CMS configuration',
      configErrors: 'Config Errors',
      configNotFound: 'Config not found',
      checkConfigYml: 'Check your config.yml file.',
      loadingConfig: 'Loading configuration...',
      waitingBackend: 'Waiting for backend...',
    },
    notFoundPage: {
      header: 'Not Found',
    },
  },
  collection: {
    sidebar: {
      collections: 'Collections',
      allCollections: 'All Collections',
      searchAll: 'Search all',
      searchIn: 'Search in',
    },
    collectionTop: {
      sortBy: 'Sort by',
      viewAs: 'View as',
      newButton: 'New %{collectionLabel}',
      ascending: 'Ascending',
      descending: 'Descending',
      searchResults: 'Search Results for "%{searchTerm}"',
      searchResultsInCollection: 'Search Results for "%{searchTerm}" in %{collection}',
      filterBy: 'Filter by',
      groupBy: 'Group by',
    },
    entries: {
      loadingEntries: 'Loading Entries...',
      cachingEntries: 'Caching Entries...',
      longerLoading: 'This might take several minutes',
      noEntries: 'No Entries',
    },
    groups: {
      other: 'Other',
      negateLabel: 'Not %{label}',
    },
    table: {
      summary: 'Summary',
      collection: 'Collection',
    },
    defaultFields: {
      author: {
        label: 'Author',
      },
      updatedOn: {
        label: 'Updated On',
      },
    },
    notFound: 'Collection not found',
  },
  editor: {
    editorControl: {
      field: {
        optional: 'optional',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} is required.',
        regexPattern: "%{fieldLabel} didn't match the pattern: %{pattern}.",
        processing: '%{fieldLabel} is processing.',
        range: '%{fieldLabel} must be between %{minValue} and %{maxValue}.',
        min: '%{fieldLabel} must be at least %{minValue}.',
        max: '%{fieldLabel} must be %{maxValue} or less.',
        rangeCount: '%{fieldLabel} must have between %{minCount} and %{maxCount} item(s).',
        rangeCountExact: '%{fieldLabel} must have exactly %{count} item(s).',
        rangeMin: '%{fieldLabel} must have at least %{minCount} item(s).',
        rangeMax: '%{fieldLabel} must have %{maxCount} or less item(s).',
        invalidPath: `'%{path}' is not a valid path.`,
        pathExists: `Path '%{path}' already exists.`,
        invalidColor: `Color '%{color}' is invalid.`,
        invalidHexCode: `Hex codes must start with a # sign.`,
      },
      i18n: {
        writingInLocale: 'Writing in %{locale}',
        copyFromLocale: 'Fill in from another locale',
        copyFromLocaleConfirm:
          'Do you want to fill in data from %{locale} locale?\nAll existing content will be overwritten.',
      },
    },
    editor: {
      onLeavePage: 'Are you sure you want to leave this page?',
      onUpdatingWithUnsavedChangesTitle: 'Unsaved changes',
      onUpdatingWithUnsavedChangesBody:
        'You have unsaved changes, please save before updating status.',
      onPublishingNotReadyTitle: 'Not ready to publish',
      onPublishingNotReadyBody: 'Please update status to "Ready" before publishing.',
      onPublishingWithUnsavedChangesTitle: 'Unsaved changes',
      onPublishingWithUnsavedChangesBody:
        'You have unsaved changes, please save before publishing.',
      onPublishingTitle: 'Publish entry?',
      onPublishingBody: 'Are you sure you want to publish this entry?',
      onUnpublishingTitle: 'Unpublish entry?',
      onUnpublishingBody: 'Are you sure you want to unpublish this entry?',
      onDeleteWithUnsavedChangesTitle: 'Delete this published entry?',
      onDeleteWithUnsavedChangesBody:
        'Are you sure you want to delete this published entry, as well as your unsaved changes from the current session?',
      onDeletePublishedEntryTitle: 'Delete this published entry?',
      onDeletePublishedEntryBody: 'Are you sure you want to delete this published entry?',
      onDeleteUnpublishedChangesWithUnsavedChangesTitle: 'Delete unpublished changes?',
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        'This will delete all unpublished changes to this entry, as well as your unsaved changes from the current session. Do you still want to delete?',
      onDeleteUnpublishedChangesTitle: 'Delete unpublished changes?',
      onDeleteUnpublishedChangesBody:
        'All unpublished changes to this entry will be deleted. Do you still want to delete?',
      loadingEntry: 'Loading entry...',
    },
    editorInterface: {
      sideBySideI18n: 'I18n Side by Side',
      preview: 'Preview',
      toggleI18n: 'Toggle i18n',
      togglePreview: 'Toggle preview',
      toggleScrollSync: 'Sync scrolling',
    },
    editorToolbar: {
      publishing: 'Publishing...',
      publish: 'Publish',
      published: 'Published',
      unpublish: 'Unpublish',
      duplicate: 'Duplicate',
      unpublishing: 'Unpublishing...',
      publishAndCreateNew: 'Publish and create new',
      publishAndDuplicate: 'Publish and duplicate',
      deleteUnpublishedChanges: 'Delete unpublished changes',
      deleteUnpublishedEntry: 'Delete unpublished entry',
      deletePublishedEntry: 'Delete published entry',
      deleteEntry: 'Delete entry',
      saving: 'Saving...',
      save: 'Save',
      statusInfoTooltipDraft:
        'Entry status is set to draft. To finalize and submit it for review, set the status to �In review�',
      statusInfoTooltipInReview:
        'Entry is being reviewed, no further actions are required. However, you can still make additional changes while it is being reviewed.',
      deleting: 'Deleting...',
      updating: 'Updating...',
      status: 'Status: %{status}',
      backCollection: ' Writing in %{collectionLabel} collection',
      unsavedChanges: 'Unsaved Changes',
      changesSaved: 'Changes saved',
      draft: 'Draft',
      inReview: 'In review',
      ready: 'Ready',
      publishNow: 'Publish now',
      deployPreviewPendingButtonLabel: 'Check for Preview',
      deployPreviewButtonLabel: 'View Preview',
      deployButtonLabel: 'View Live',
      discardChanges: 'Discard changes',
      discardChangesTitle: 'Discard changes',
      discardChangesBody: 'Are you sure you want to discard the unsaved changed?',
    },
    editorWidgets: {
      markdown: {
        bold: 'Bold',
        italic: 'Italic',
        strikethrough: 'Strikethrough',
        code: 'Code',
        codeBlock: 'Code block',
        insertCodeBlock: 'Insert code block',
        link: 'Link',
        insertLink: 'Insert link',
        linkPrompt: 'Enter the URL of the link',
        paragraph: 'Paragraph',
        headings: 'Headings',
        quote: 'Quote',
        insertQuote: 'Insert blockquote',
        bulletedList: 'Bulleted List',
        numberedList: 'Numbered List',
        addComponent: 'Add Component',
        richText: 'Rich Text',
        markdown: 'Markdown',
        type: 'Type...',
        decreaseIndent: 'Decrease indent',
        increaseIndent: 'Increase indent',
        image: 'Image',
        insertImage: 'Insert image',
        table: {
          table: 'Table',
          deleteColumn: 'Delete column',
          deleteRow: 'Delete row',
          deleteTable: 'Delete table',
          insertColumn: 'Insert column',
          insertRow: 'Insert row',
          insertTable: 'Insert table',
        }
      },
      image: {
        choose: 'Choose an image',
        chooseMultiple: 'Choose images',
        chooseUrl: 'Insert from URL',
        replaceUrl: 'Replace with URL',
        promptUrl: 'Enter the URL of the image',
        chooseDifferent: 'Choose different image',
        addMore: 'Add more images',
        remove: 'Remove image',
        removeAll: 'Remove all images',
      },
      file: {
        choose: 'Choose a file',
        chooseUrl: 'Insert from URL',
        chooseMultiple: 'Choose files',
        replaceUrl: 'Replace with URL',
        promptUrl: 'Enter the URL of the file',
        chooseDifferent: 'Choose different file',
        addMore: 'Add more files',
        remove: 'Remove file',
        removeAll: 'Remove all files',
      },
      folder: {
        choose: 'Choose a folder',
        chooseUrl: 'Insert folder path',
        chooseMultiple: 'Choose folders',
        replaceUrl: 'Replace with path',
        promptUrl: 'Enter path of the folder',
        chooseDifferent: 'Choose different folder',
        addMore: 'Add more folders',
        remove: 'Remove folder',
        removeAll: 'Remove all folders',
      },
      unknownControl: {
        noControl: "No control for widget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "No preview for widget '%{widget}'.",
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
        now: 'Now',
        invalidDateTitle: 'Invalid date',
        invalidDateBody: 'The date you entered is invalid.',
      },
      list: {
        add: 'Add %{item}',
        addType: 'Add %{item}',
        noValue: 'No value',
      },
      keyvalue: {
        key: 'Key',
        value: 'Value',
        uniqueKeys: '%{keyLabel} must be unique',
      },
      code: {
        language: 'Language',
        selectLanguage: 'Select language',
      }
    },
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: 'Draft',
      copy: 'Copy',
      copyUrl: 'Copy URL',
      copyPath: 'Copy Path',
      copyName: 'Copy Name',
      copied: 'Copied',
    },
    mediaLibrary: {
      onDeleteTitle: 'Delete selected media?',
      onDeleteBody: 'Are you sure you want to delete selected media?',
      fileTooLargeTitle: 'File too large',
      fileTooLargeBody: 'File too large.\nConfigured to not allow files greater than %{size} kB.',
      alreadyExistsTitle: 'File already exists',
      alreadyExistsBody: `%{filename} already exists. Do you want to replace it?`,
    },
    mediaLibraryModal: {
      noResults: 'No results.',
      noAssetsFound: 'No assets found.',
      noImagesFound: 'No images found.',
      private: 'Private ',
      images: 'Images',
      mediaAssets: 'Media assets',
      search: 'Search...',
      uploading: 'Uploading...',
      upload: 'Upload',
      download: 'Download',
      deleting: 'Deleting...',
      deleteSelected: 'Delete selected',
      chooseSelected: 'Choose selected',
      dropImages: 'Drop images to upload',
      dropFiles: 'Drop files to upload',
    },
    folderSupport: {
      newFolder: 'New folder',
      createNewFolder: 'Create new folder',
      enterFolderName: 'Enter folder name...',
      create: 'Create',
      home: 'Home',
      up: 'Up',
      upToFolder: 'Up to %{folder}',
    },
  },
  ui: {
    common: {
      yes: 'Yes',
      no: 'No',
      okay: 'OK',
      cancel: 'Cancel',
    },
    default: {
      goBackToSite: 'Go back to site',
    },
    localBackup: {
      hasLocalBackup: 'Has local backup',
    },
    errorBoundary: {
      title: 'Error',
      details: "There's been an error - please ",
      reportIt: 'open an issue on GitHub.',
      detailsHeading: 'Details',
      privacyWarning:
        'Opening an issue pre-populates it with the error message and debugging data.\nPlease verify the information is correct and remove sensitive data if exists.',
      recoveredEntry: {
        heading: 'Recovered document',
        warning: 'Please copy/paste this somewhere before navigating away!',
        copyButtonLabel: 'Copy to clipboard',
      },
    },
    settingsDropdown: {
      theme: 'Theme',
      logOut: 'Log Out',
    },
    toast: {
      onFailToLoadEntries: 'Failed to load entry: %{details}',
      onFailToLoadDeployPreview: 'Failed to load preview: %{details}',
      onFailToPersist: 'Failed to persist entry: %{details}',
      onFailToPersistMedia: 'Failed to persist media: %{details}',
      onFailToDelete: 'Failed to delete entry: %{details}',
      onFailToDeleteMedia: 'Failed to delete media: %{details}',
      onFailToUpdateStatus: 'Failed to update status: %{details}',
      missingRequiredField: "Oops, you've missed a required field. Please complete before saving.",
      entrySaved: 'Entry saved',
      entryDeleted: 'Entry delete',
      entryPublished: 'Entry published',
      entryUnpublished: 'Entry unpublished',
      onFailToPublishEntry: 'Failed to publish: %{details}',
      onFailToUnpublishEntry: 'Failed to unpublish entry: %{details}',
      entryUpdated: 'Entry status updated',
      onDeletePublishedEntry: 'Published entry deleted',
      onDeleteUnpublishedChanges: 'Unpublished changes deleted',
      onFailToAuth: '%{details}',
      onLoggedOut: 'You have been logged out, please back up any data and login again',
      onBackendDown:
        'The backend service is experiencing an outage. See %{details} for more information',
    },
  },
  workflow: {
    workflow: {
      loading: 'Loading Editorial Workflow Entries',
      workflowHeading: 'Editorial Workflow',
      newPost: 'New Post',
      description:
        '%{smart_count} entry waiting for review, %{readyCount} ready to go live. |||| %{smart_count} entries waiting for review, %{readyCount} ready to go live. ',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date} by %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: 'by %{author}',
      deleteChanges: 'Delete changes',
      deleteNewEntry: 'Delete new entry',
      publishChanges: 'Publish changes',
      publishNewEntry: 'Publish new entry',
    },
    workflowList: {
      onDeleteEntry: 'Are you sure you want to delete this entry?',
      onPublishingNotReadyEntry:
        'Only items with a "Ready" status can be published. Please drag the card to the "Ready" column to enable publishing.',
      onPublishEntry: 'Are you sure you want to publish this entry?',
      draft: 'Drafts',
      pending_review: 'In Review',
      pending_publish: 'Ready',
      currentEntries: '%{smart_count} entry |||| %{smart_count} entries',
    },
  },
};

export default en;
