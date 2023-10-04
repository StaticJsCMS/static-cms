import type { LocalePhrasesRoot } from '../types';

const he: LocalePhrasesRoot = {
  auth: {
    login: 'התחברות',
    loggingIn: 'התחברות...',
    loginWithNetlifyIdentity: 'התחברות עם Netlify Identity',
    loginWithBitbucket: 'התחברות עם Bitbucket',
    loginWithGitHub: 'התחברות עם GitHub',
    loginWithGitLab: 'התחברות עם GitLab',
    loginWithGitea: 'התחברות עם Gitea',
    errors: {
      email: 'נא  לא לשכוח להקליד את כתובת המייל',
      password: 'נא להקליד את הסיסמה.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        'הגדרות אימות הזהות אינן נגישות. כאשר משתמשים ב-git-gateway כשירות ה-backend יש לוודא ששירות אימות הזהות ו-Git Gateway הופעלו.',
    },
  },
  app: {
    header: {
      content: 'תוכן',
      workflow: 'ניהול אייטמים לפני הפרסום',
      media: 'מדיה',
      quickAdd: 'הוספה מהירה',
    },
    app: {
      loading: 'טעינה...',
      errorHeader: 'אירעה שגיאה בטעינת הגדרות מערכת ניהול התוכן',
      configErrors: 'שגיאות בהגדרות',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'יש לבדוק את הקובץ config.yml.',
      loadingConfig: 'טעינת הגדרות...',
      waitingBackend: 'ממתין לטעינת ה-backend...',
    },
    notFoundPage: {
      header: 'לא נמצא',
    },
  },
  collection: {
    sidebar: {
      collections: 'קטגוריות',
      allCollections: 'כל הקטגוריות',
      searchAll: 'חיפוש כללי',
      searchIn: 'חיפוש בקטגוריית',
    },
    collectionTop: {
      sortBy: 'מיון לפי',
      viewAs: 'תצוגה לפי',
      newButton: 'חדש %{collectionLabel}',
      ascending: 'בסדר עולה',
      descending: 'בסדר יורד',
      searchResults: 'תוצאות חיפוש עבור "%{searchTerm}"',
      searchResultsInCollection: 'תוצאות חיפוש עבור "%{searchTerm}" ב%{collection}',
      filterBy: 'סינון לפי',
      groupBy: 'ארגון לפי',
    },
    entries: {
      loadingEntries: 'טעינת אייטמים...',
      cachingEntries: 'שמירת אייטמים בזכרון המטמון',
      longerLoading: 'התהליך עשוי להימשך כמה דקות',
      noEntries: 'לא נמצאו אייטמים',
    },
    groups: {
      other: 'אחר',
      negateLabel: 'לא %{label}',
    },
    table: {
      summary: undefined, // English translation: 'Summary'
      collection: undefined, // English translation: 'Collection'
    },
    defaultFields: {
      author: {
        label: 'מאת',
      },
      updatedOn: {
        label: 'עודכן בתאריך',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'רשות',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} הוא שדה חובה.',
        regexPattern: '%{fieldLabel} לא תואם לדפוס %{pattern}.',
        processing: '%{fieldLabel} מעובד.',
        range: '%{fieldLabel} חייב להיות בין %{minValue} לבין %{maxValue}.',
        min: '%{fieldLabel} חייב להיות לפחות %{minValue}.',
        max: '%{fieldLabel} חייב להיות %{maxValue} או פחות.',
        rangeCount: '%{fieldLabel} חייב לכלול בין %{minCount} לבין %{maxCount} אייטמים.',
        rangeCountExact: '%{fieldLabel} חייב לכלול בדיוק %{count} אייטמים.',
        rangeMin: '%{fieldLabel} חייב לכלול לפחות %{minCount} אייטמים',
        rangeMax: '%{fieldLabel} חייב לכלול %{maxCount} אייטמים לכל היותר.',
        invalidPath: "'%{path}' אינו URL תקין",
        pathExists: "'%{path}' כבר קיים",
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: 'כתיבה בשפה ה%{locale}',
      },
    },
    editor: {
      onLeavePage: 'האם ברצונך לעבור לעמוד אחר ללא שמירה?',
      onUpdatingWithUnsavedChangesBody:
        'בוצעו שינויים שלא נשמרו. יש לבצע שמירה לפני עדכון מצב האייטם.',
      onPublishingNotReadyBody: 'נא לשנות את מצב האייטם ל״מוכן לפרסום״ לפני הפרסום.',
      onPublishingWithUnsavedChangesBody: 'בוצעו שינויים שלא נשמרו. יש לבצע שמירה לפני הפרסום.',
      onPublishingBody: 'האם ברצונך לפרסם את האייטם?',
      onUnpublishingBody: 'האם ברצונך לבטל את פרסום האייטם?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'האם ברצונך למחוק את האייטם הזה לפני פרסומו, וכן את השינויים שבוצעו כעת וטרם נשמרו?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'האם ברצונך למחוק את האייטם הזה לאחר פרסומו?',
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        'פעולה זו תמחק את כל השינויים שבוצעו באייטם זה ולא פורסמו, וכן את השינויים שבוצעו כעת וטרם נשמרו. האם ברצונך למחוק?',
      onDeleteUnpublishedChangesBody:
        'כל השינויים שבוצעו באייטם זה ולא פורסמו יימחקו. האם ברצונך למחוק אותו?',
      loadingEntry: 'טעינת אייטם...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: 'החלפת שפות',
      togglePreview: 'הפעלת תצוגה מקדימה',
      toggleScrollSync: 'סנכרון הגלילה',
    },
    editorToolbar: {
      publishing: 'פרסום...',
      publish: 'פרסום',
      published: 'פורסם',
      unpublish: 'ביטול הפרסום',
      duplicate: 'שכפול',
      unpublishing: 'ביטול הפרסום...',
      publishAndCreateNew: 'פרסום ויצירת אייטם חדש',
      publishAndDuplicate: 'פרסום ושכפול',
      deleteUnpublishedChanges: 'מחיקת השינויים שלא פורסמו',
      deleteUnpublishedEntry: 'מחיקת אייטם שטרם פורסם',
      deletePublishedEntry: 'מחיקת אייטם שפורסם',
      deleteEntry: 'מחיקת האייטם',
      saving: 'שמירה...',
      save: 'שמירה',
      statusInfoTooltipDraft:
        'האייטם מוגדר כטיוטה. כדי להשלים את הפעולה ולהעביר אותו למצב ״ממתין לאישור״ יש להעביר אותו למצב ״ממתין לאישור״',
      statusInfoTooltipInReview:
        'האייטם ממתין לאישור - לא נדרשת פעולה נוספת. ניתן עדיין לבצע שינויים בעת שהאייטם ממתין לאישור.',
      deleting: 'מחיקה...',
      updating: 'עדכון...',
      status: 'מצב: %{status}',
      backCollection: 'כתיבה בקטגוריית %{collectionLabel}',
      unsavedChanges: 'שינויים לא שמורים',
      changesSaved: 'השינויים נשמרו',
      draft: 'טיוטה',
      inReview: 'ממתין לאישור',
      ready: 'מוכן לפרסום',
      publishNow: 'פרסום מיידי',
      deployPreviewPendingButtonLabel: 'בדיקת תצוגה מקדימה',
      deployPreviewButtonLabel: 'צפייה בתצוגה מקדימה',
      deployButtonLabel: 'צפייה באתר',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'מודגש',
        italic: 'נטוי',
        code: 'קוד',
        link: 'קישור',
        linkPrompt: 'נא להקליד את הכתובת לקישור',
        headings: 'כותרת',
        quote: 'ציטוט',
        bulletedList: 'רשימה לא-ממוספרת',
        numberedList: 'רשימה ממוספרת',
        addComponent: 'הוספת רכיב',
        richText: 'טקסט עשיר',
        markdown: 'Markdown',
        type: undefined, // English translation: 'Type...'
      },
      image: {
        choose: 'בחירת תמונה',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: 'הוספה מכתובת אינטרנט',
        replaceUrl: 'החלפת תמונה מכתובת אינטרנט',
        promptUrl: 'נא להכניס את ה-URL של התמונה',
        chooseDifferent: 'בחירת תמונה אחרת',
        addMore: undefined, // English translation: 'Add more images'
        remove: 'הסרת תמונה',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: 'בחירת קובץ',
        chooseUrl: 'הוספה מכתובת אינטרנט',
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: 'החלפת קובץ מכתובת אינטרנט',
        promptUrl: 'נא להכניס את ה-URL של הקובץ',
        chooseDifferent: 'בחירת קובץ אחר',
        addMore: undefined, // English translation: 'Add more files'
        remove: 'הסרת קובץ',
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
        noControl: "לא הוגדרו פעולות ל'%{widget}'.",
      },
      unknownPreview: {
        noPreview: "אין תצוגה מקדימה ל'%{widget}'.",
      },
      headingOptions: {
        headingOne: 'כותרת 1',
        headingTwo: 'כותרת 2',
        headingThree: 'כותרת 3',
        headingFour: 'כותרת 4',
        headingFive: 'כותרת 5',
        headingSix: 'כותרת 6',
      },
      datetime: {
        now: 'עכשיו',
        invalidDateTitle: undefined, // English translation: 'Invalid date'
        invalidDateBody: undefined, // English translation: 'The date you entered is invalid.'
      },
      list: {
        add: 'הוספת %{item}',
        addType: 'הוספת אייטם מסוג %{item}',
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
      draft: 'טיוטה',
      copy: 'העתקה',
      copyUrl: 'העתקת ה-URL',
      copyPath: 'העתקת הנתיב',
      copyName: 'העתקת השם',
      copied: 'העתקה הושלמה',
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'האם ברצונך למחוק את פריט המדיה הזה?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody: 'הקובץ גדול מדי.\nמוגדר לא לאפשר העלאת קבצים גדולים מ-%{size} קילובייט.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      noResults: 'לא נמצאו תוצאות.',
      noAssetsFound: 'לא נמצאו קבצים.',
      noImagesFound: 'לא נמצאו תמונות.',
      private: 'פרטי ',
      images: 'תמונות',
      mediaAssets: 'קבצי מדיה',
      search: 'חיפוש...',
      uploading: 'העלאה...',
      upload: 'העלאה',
      download: 'הורדה',
      deleting: 'מחיקה...',
      deleteSelected: 'למחוק את הקובץ המסומן',
      chooseSelected: 'לבחור את הקובץ המסומן',
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
      goBackToSite: 'בחזרה לאתר',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'שגיאה',
      details: 'אירעה שגיאה. נא ',
      reportIt: 'דווחו על הבעיה ב-GitHub.',
      detailsHeading: 'פרטים',
      privacyWarning:
        'פתיחת Issue מעתיקה את הודעת השגיאה ונתונים רלוונטיים לאיתור הבעיה (debugging).\nיש לוודא שהמידע מדויק ולמחוק נתונים אישיים כלשהם.',
      recoveredEntry: {
        heading: 'מסמך משוחזר',
        warning: 'נא להעתיק ולהדביק את זה לפני ניווט לחלון אחר!',
        copyButtonLabel: 'העתקה',
      },
    },
    settingsDropdown: {
      darkMode: undefined, // English translation: 'Dark Mode'
      logOut: 'התנתקות',
    },
    toast: {
      onFailToLoadEntries: 'טעינת האייטם %{details} נכשלה',
      onFailToLoadDeployPreview: 'טעינת התצוגה המקדימה של האייטם %{details} נכשלה',
      onFailToPersist: 'אחסון האייטם %{details} נכשל',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'מחיקת האייטם %{details} נכשלה',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'עדכון מצב האייטם %{details} נכשל',
      missingRequiredField: 'אופס, שכחת למלא שדה חובה. נא להשלים את המידע החסר לפני השמירה',
      entrySaved: 'האייטם נשמר',
      entryPublished: 'האייטם פורסם',
      entryUnpublished: 'האייטם הועבר לטיוטות',
      onFailToPublishEntry: 'פרסום האייטם %{details} נכשל',
      onFailToUnpublishEntry: 'ביטול פרסום האייטם %{details} נכשל',
      entryUpdated: 'מצב האייטם עודכן',
      onDeleteUnpublishedChangesBody: 'השינויים שלא פורסמו נמחקו',
      onFailToAuth: '%{details}',
      onLoggedOut: 'נותקת מהמערכת. יש לגבות מידע לא שמור ולהתחבר שוב',
      onBackendDown: 'ה-backend המוגדר אינו זמין. ראו %{details} למידע נוסף',
    },
  },
  workflow: {
    workflow: {
      loading: 'טעינת אייטמים',
      workflowHeading: 'ניהול אייטמים לפני הפרסום',
      newPost: 'אייטם חדש',
      description:
        '%אייטם {smart_count} ממתין לאישור, אייטם %{readyCount} מוכן לפרסום |||| %{smart_count} אייטמים ממתינים לאישור, %{readyCount} מוכנים לפרסום',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date} מאת %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: 'מאת %{author}',
      deleteChanges: 'למחוק את השינויים',
      deleteNewEntry: 'למחוק אייטם חדש',
      publishChanges: 'פרסום השינויים',
      publishNewEntry: 'פרסום אייטם חדש',
    },
    workflowList: {
      onDeleteEntry: 'האם ברצונך למחוק אייטם זה?',
      onPublishingNotReadyEntry:
        'ניתן לפרסם רק אייטמים שנמצאים במצב ״מוכן לפרסום״. נא לגרור את האייטם לטור ״מוכן לפרסום״ כדי לפרסם.',
      onPublishEntry: 'האם ברצונך לפרסם אייטם זה?',
      draft: 'טיוטות',
      pending_review: 'ממתין לאישור',
      pending_publish: 'מוכן לפרסום',
      currentEntries: 'אייטם %{smart_count} |||| %{smart_count} אייטמים',
    },
  },
};

export default he;
