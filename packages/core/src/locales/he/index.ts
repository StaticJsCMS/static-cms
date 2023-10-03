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
    defaultFields: {
      author: {
        label: 'מאת',
      },
      updatedOn: {
        label: 'עודכן בתאריך',
      },
    },
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
        invalidPath: `'%{path}' אינו URL תקין`,
        pathExists: `'%{path}' כבר קיים`,
      },
      i18n: {
        writingInLocale: 'כתיבה בשפה ה%{locale}',
      },
    },
    editor: {
      onLeavePage: 'האם ברצונך לעבור לעמוד אחר ללא שמירה?',
      onDeleteWithUnsavedChangesBody:
        'האם ברצונך למחוק את האייטם הזה לפני פרסומו, וכן את השינויים שבוצעו כעת וטרם נשמרו?',
      onDeletePublishedEntryBody: 'האם ברצונך למחוק את האייטם הזה לאחר פרסומו?',
      loadingEntry: 'טעינת אייטם...',
    },
    editorInterface: {
      toggleI18n: 'החלפת שפות',
      togglePreview: 'הפעלת תצוגה מקדימה',
      toggleScrollSync: 'סנכרון הגלילה',
    },
    editorToolbar: {
      publish: 'פרסום',
      published: 'פורסם',
      unpublish: 'ביטול הפרסום',
      duplicate: 'שכפול',
      publishAndCreateNew: 'פרסום ויצירת אייטם חדש',
      publishAndDuplicate: 'פרסום ושכפול',
      deleteEntry: 'מחיקת האייטם',
      publishNow: 'פרסום מיידי',
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
      },
      image: {
        choose: 'בחירת תמונה',
        chooseUrl: 'הוספה מכתובת אינטרנט',
        replaceUrl: 'החלפת תמונה מכתובת אינטרנט',
        promptUrl: 'נא להכניס את ה-URL של התמונה',
        chooseDifferent: 'בחירת תמונה אחרת',
        remove: 'הסרת תמונה',
      },
      file: {
        choose: 'בחירת קובץ',
        chooseUrl: 'הוספה מכתובת אינטרנט',
        replaceUrl: 'החלפת קובץ מכתובת אינטרנט',
        promptUrl: 'נא להכניס את ה-URL של הקובץ',
        chooseDifferent: 'בחירת קובץ אחר',
        remove: 'הסרת קובץ',
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
      },
      list: {
        add: 'הוספת %{item}',
        addType: 'הוספת אייטם מסוג %{item}',
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
      onDeleteBody: 'האם ברצונך למחוק את פריט המדיה הזה?',
      fileTooLargeBody: 'הקובץ גדול מדי.\nמוגדר לא לאפשר העלאת קבצים גדולים מ-%{size} קילובייט.',
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
    },
  },
  ui: {
    default: {
      goBackToSite: 'בחזרה לאתר',
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
      logOut: 'התנתקות',
    },
    toast: {
      onFailToLoadEntries: 'טעינת האייטם %{details} נכשלה',
      onFailToLoadDeployPreview: 'טעינת התצוגה המקדימה של האייטם %{details} נכשלה',
      onFailToPersist: 'אחסון האייטם %{details} נכשל',
      onFailToDelete: 'מחיקת האייטם %{details} נכשלה',
      onFailToUpdateStatus: 'עדכון מצב האייטם %{details} נכשל',
      missingRequiredField: 'אופס, שכחת למלא שדה חובה. נא להשלים את המידע החסר לפני השמירה',
      entrySaved: 'האייטם נשמר',
      entryPublished: 'האייטם פורסם',
      onFailToPublishEntry: 'פרסום האייטם %{details} נכשל',
      onFailToUnpublishEntry: 'ביטול פרסום האייטם %{details} נכשל',
      entryUpdated: 'מצב האייטם עודכן',
      onFailToAuth: '%{details}',
      onLoggedOut: 'נותקת מהמערכת. יש לגבות מידע לא שמור ולהתחבר שוב',
      onBackendDown: 'ה-backend המוגדר אינו זמין. ראו %{details} למידע נוסף',
    },
  },
};

export default he;
