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
      media: 'מדיה',
      quickAdd: 'הוספה מהירה',
    },
    app: {
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
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'האם ברצונך למחוק את האייטם הזה לפני פרסומו, וכן את השינויים שבוצעו כעת וטרם נשמרו?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'האם ברצונך למחוק את האייטם הזה לאחר פרסומו?',
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
      publish: 'פרסום',
      published: 'פורסם',
      duplicate: 'שכפול',
      publishAndCreateNew: 'פרסום ויצירת אייטם חדש',
      publishAndDuplicate: 'פרסום ושכפול',
      deleteEntry: 'מחיקת האייטם',
      publishNow: 'פרסום מיידי',
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
      loading: 'טעינה...',
      noResults: 'לא נמצאו תוצאות.',
      noAssetsFound: 'לא נמצאו קבצים.',
      noImagesFound: 'לא נמצאו תמונות.',
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
      onFailToPersist: 'אחסון האייטם %{details} נכשל',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'מחיקת האייטם %{details} נכשלה',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'עדכון מצב האייטם %{details} נכשל',
      missingRequiredField: 'אופס, שכחת למלא שדה חובה. נא להשלים את המידע החסר לפני השמירה',
      entrySaved: 'האייטם נשמר',
      entryPublished: 'האייטם פורסם',
      onFailToPublishEntry: 'פרסום האייטם %{details} נכשל',
      entryUpdated: 'מצב האייטם עודכן',
      onFailToAuth: '%{details}',
      onLoggedOut: 'נותקת מהמערכת. יש לגבות מידע לא שמור ולהתחבר שוב',
      onBackendDown: 'ה-backend המוגדר אינו זמין. ראו %{details} למידע נוסף',
    },
  },
};

export default he;
