import type { LocalePhrasesRoot } from '../types';

const tr: LocalePhrasesRoot = {
  auth: {
    login: 'Giriş',
    loggingIn: 'Giriş yapılıyor..',
    loginWithNetlifyIdentity: 'Netlify Identity ile Giriş',
    loginWithBitbucket: 'Bitbucket ile Giriş',
    loginWithGitHub: 'GitHub ile Giriş',
    loginWithGitLab: 'GitLab ile Giriş',
    loginWithGitea: 'Gitea ile Giriş',
    errors: {
      email: 'E-postanızı girdiğinizden emin olun.',
      password: 'Lütfen şifrenizi girin.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        "Identity ayarlarına erişilemiyor. Git-gateway sunucusunu kullanmak için Identity servisi ve Git Gateway'in etkin olduğundan emin olun.",
    },
  },
  app: {
    header: {
      content: 'İçerikler',
      workflow: 'İş Akışı',
      media: 'Medya',
      quickAdd: 'Hızlı ekle',
    },
    app: {
      loading: 'Yükleniyor...',
      errorHeader: 'CMS yapılandırması yüklenirken hata oluştu',
      configErrors: 'Yapılandırma Hataları',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'config.yml dosyanızı kontrol edin.',
      loadingConfig: 'Yapılandırma yükleniyor...',
      waitingBackend: 'Arka uç bekleniyor...',
    },
    notFoundPage: {
      header: 'Bulunamadı',
    },
  },
  collection: {
    sidebar: {
      collections: 'Koleksiyonlar',
      allCollections: 'Bütün Koleksiyonlar',
      searchAll: 'Tümünü ara',
      searchIn: 'İçinde ara',
    },
    collectionTop: {
      sortBy: 'Sırala ...',
      viewAs: 'Görüntüle',
      newButton: 'Yeni %{collectionLabel}',
      ascending: 'Artan',
      descending: 'Azalan',
      searchResults: '"%{searchTerm}" için Arama Sonuçları',
      searchResultsInCollection:
        '%{collection} koleksiyonunda, "%{searchTerm}" için Arama Sonuçları',
      filterBy: 'Filtrele',
      groupBy: 'Grupla',
    },
    entries: {
      loadingEntries: 'Girdiler yükleniyor...',
      cachingEntries: 'Girdi önbelleği...',
      longerLoading: 'Bu birkaç dakika sürebilir',
      noEntries: 'Hiç Girdi Yok',
    },
    groups: {
      other: 'Diğer',
      negateLabel: '%{label} hariç',
    },
    table: {
      summary: undefined, // English translation: 'Summary'
      collection: undefined, // English translation: 'Collection'
    },
    defaultFields: {
      author: {
        label: 'Yazar',
      },
      updatedOn: {
        label: 'Güncellenme Tarihi',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'isteğe bağlı',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} gerekli.',
        regexPattern: '%{fieldLabel} eşleşmeyen kalıp: %{pattern}.',
        processing: '%{fieldLabel} işleniyor.',
        range: '%{fieldLabel} %{minValue} ve %{maxValue} arasında olmalı.',
        min: '%{fieldLabel} en az %{minValue} olmalı.',
        max: '%{fieldLabel}, %{maxValue} veya daha az olmalı.',
        rangeCount: '%{fieldLabel}, %{minCount} ve %{maxCount} öğeleri arasında olmalı.',
        rangeCountExact: '%{fieldLabel}, %{count} öğe olmalıdır.',
        rangeMin: '%{fieldLabel}, en az %{minCount} öğe olmalıdır.',
        rangeMax: '%{fieldLabel}, %{maxCount} veya daha az öğe olmalıdır.',
        invalidPath: "'%{path}' geçerli bir yol değil",
        pathExists: "'%{path}' yolu zaten var",
        invalidColor: undefined, // English translation: 'undefined'
        invalidHexCode: undefined, // English translation: 'undefined'
      },
      i18n: {
        writingInLocale: '%{locale} için yazılıyor',
        copyFromLocale: 'Başka bir dilden doldurun',
        copyFromLocaleConfirm:
          'Verileri %{locale} dilinden mi doldurmak istiyorsun?\nVarolan bütün verilerin üzerine yazılacak.',
      },
    },
    editor: {
      onLeavePage: 'Bu sayfadan ayrılmak istediğinize emin misiniz?',
      onUpdatingWithUnsavedChangesTitle: undefined, // English translation: 'undefined'
      onUpdatingWithUnsavedChangesBody:
        'Kaydedilmemiş değişiklikleriniz var, lütfen içeriği güncellemeden önce kaydedin.',
      onPublishingNotReadyTitle: undefined, // English translation: 'undefined'
      onPublishingNotReadyBody: 'Lütfen yayınlamadan önce içeriği "Hazır" olarak güncelleyin.',
      onPublishingWithUnsavedChangesTitle: undefined, // English translation: 'undefined'
      onPublishingWithUnsavedChangesBody:
        'Kaydedilmemiş değişiklikleriniz var, lütfen yayınlamadan önce kaydedin.',
      onPublishingTitle: undefined, // English translation: 'undefined'
      onPublishingBody: 'Bu girdiyi yayınlamak istediğinize emin misiniz?',
      onUnpublishingTitle: undefined, // English translation: 'undefined'
      onUnpublishingBody: 'Bu girdiyi yayından kaldırmak istediğinizden emin misiniz?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'undefined'
      onDeleteWithUnsavedChangesBody:
        'Bu oturumda kaydedilmiş değişikliklerin yanı sıra geçerli oturumdaki kaydedilmemiş değişikliklerinizi silmek istediğinize emin misiniz?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'undefined'
      onDeletePublishedEntryBody: 'Bu yayınlanmış girdiyi silmek istediğinize emin misiniz?',
      onDeleteUnpublishedChangesWithUnsavedChangesTitle: undefined, // English translation: 'undefined'
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        'Bu girdide yayınlanmamış tüm değişiklikleri ve geçerli oturumdaki kaydedilmemiş değişikliklerinizi siler. Hala silmek istiyor musun?',
      onDeleteUnpublishedChangesTitle: undefined, // English translation: 'undefined'
      onDeleteUnpublishedChangesBody:
        'Bu girdide yayınlanmamış tüm değişiklikler silinecek. Hala silmek istiyor musun?',
      loadingEntry: 'Girdiler yükleniyor...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'undefined'
      preview: undefined, // English translation: 'undefined'
      toggleI18n: 'i18n değiştir',
      togglePreview: 'Önizlemeyi değiştir',
      toggleScrollSync: 'Kaydırmayı senkronize et',
    },
    editorToolbar: {
      publishing: 'Yayınlanıyor...',
      publish: 'Yayınla',
      published: 'Yayınlanan',
      unpublish: 'Yayından Kaldır',
      duplicate: 'Kopyala',
      unpublishing: 'Yayından kaldırılıyor...',
      publishAndCreateNew: 'Yayınla ve yeni oluştur',
      publishAndDuplicate: 'Yayınla ve kopya oluştur',
      deleteUnpublishedChanges: 'Yayımlanmamış değişiklikleri sil',
      deleteUnpublishedEntry: 'Yayımlanmamış girdiyi sil',
      deletePublishedEntry: 'Yayınlanan girdiyi sil',
      deleteEntry: 'Girdiyi sil',
      saving: 'Kaydediliyor...',
      save: 'Kaydet',
      statusInfoTooltipDraft:
        'Giriş durumu taslak olarak ayarlandı. Girişi bitirmek ve incelemeye göndermek için giriş durumunu ‘İncelemede’ olarak ayarlayın',
      statusInfoTooltipInReview:
        'Giriş gözden geçiriliyor, başka bir işlem yapılmasına gerek yok. Ancak, incelenirken yine de ek değişiklikler yapabilirsiniz.',
      deleting: 'Siliniyor...',
      updating: 'Güncelleniyor...',
      status: 'Durumu: %{status}',
      backCollection: ' %{collectionLabel} koleksiyonunda yazılı',
      unsavedChanges: 'Kaydedilmemiş Değişiklikler',
      changesSaved: 'Değişiklikler kaydedildi',
      draft: 'Taslak',
      inReview: 'İncelemede',
      ready: 'Hazır',
      publishNow: 'Şimdi yayımla',
      deployPreviewPendingButtonLabel: 'Önizlemeyi Denetle',
      deployPreviewButtonLabel: 'Önizlemeyi Görüntüle',
      deployButtonLabel: 'Canlı Görüntüle',
      discardChanges: undefined, // English translation: 'undefined'
      discardChangesTitle: undefined, // English translation: 'undefined'
      discardChangesBody: undefined, // English translation: 'undefined'
    },
    editorWidgets: {
      markdown: {
        bold: 'Kalın',
        italic: 'İtalik',
        strikethrough: undefined, // English translation: 'undefined'
        code: 'Kod',
        codeBlock: undefined, // English translation: 'undefined'
        insertCodeBlock: undefined, // English translation: 'undefined'
        link: 'Bağlantı',
        insertLink: undefined, // English translation: 'undefined'
        paragraph: undefined, // English translation: 'undefined'
        headings: 'Başlıklar',
        quote: 'Alıntı',
        insertQuote: undefined, // English translation: 'undefined'
        bulletedList: 'Maddeli Liste',
        numberedList: 'Numaralı Liste',
        addComponent: 'Bileşen Ekle',
        richText: 'Zengin Metin',
        markdown: 'Markdown',
        type: undefined, // English translation: 'undefined'
        decreaseIndent: undefined, // English translation: 'undefined'
        increaseIndent: undefined, // English translation: 'undefined'
        image: undefined, // English translation: 'undefined'
        insertImage: undefined, // English translation: 'undefined'
        table: {
          table: undefined, // English translation: 'undefined'
          deleteColumn: undefined, // English translation: 'undefined'
          deleteRow: undefined, // English translation: 'undefined'
          deleteTable: undefined, // English translation: 'undefined'
          insertColumn: undefined, // English translation: 'undefined'
          insertRow: undefined, // English translation: 'undefined'
          insertTable: undefined, // English translation: 'undefined'
        },
      },
      image: {
        choose: 'Bir resim seçin',
        chooseMultiple: undefined, // English translation: 'undefined'
        chooseUrl: "URL'den ekle",
        replaceUrl: 'URL ile değiştir',
        promptUrl: "Resmin URL'sini girin",
        chooseDifferent: 'Farklı bir resim seçin',
        addMore: undefined, // English translation: 'undefined'
        remove: 'Resmi kaldır',
        removeAll: undefined, // English translation: 'undefined'
      },
      file: {
        choose: 'Bir dosya seçin',
        chooseUrl: "URL'den ekle",
        chooseMultiple: undefined, // English translation: 'undefined'
        replaceUrl: 'URL ile değiştir',
        promptUrl: "Dosyanın URL'sini girin",
        chooseDifferent: 'Farklı bir dosya seçin',
        addMore: undefined, // English translation: 'undefined'
        remove: 'Dosyayı kaldır',
        removeAll: undefined, // English translation: 'undefined'
      },
      folder: {
        choose: undefined, // English translation: 'undefined'
        chooseUrl: undefined, // English translation: 'undefined'
        chooseMultiple: undefined, // English translation: 'undefined'
        replaceUrl: undefined, // English translation: 'undefined'
        promptUrl: undefined, // English translation: 'undefined'
        chooseDifferent: undefined, // English translation: 'undefined'
        addMore: undefined, // English translation: 'undefined'
        remove: undefined, // English translation: 'undefined'
        removeAll: undefined, // English translation: 'undefined'
      },
      unknownControl: {
        noControl: "'%{widget}' bileşeni için kontrol yok.",
      },
      unknownPreview: {
        noPreview: "'%{widget}' bileşeni için önizleme yok.",
      },
      headingOptions: {
        headingOne: 'Başlık 1',
        headingTwo: 'Başlık 2',
        headingThree: 'Başlık 3',
        headingFour: 'Başlık 4',
        headingFive: 'Başlık 5',
        headingSix: 'Başlık 6',
      },
      datetime: {
        now: 'Şimdi',
        invalidDateTitle: undefined, // English translation: 'undefined'
        invalidDateBody: undefined, // English translation: 'undefined'
      },
      list: {
        add: '%{item} Ekle',
        addType: '%{item} Ekle',
        noValue: undefined, // English translation: 'undefined'
      },
      keyvalue: {
        key: undefined, // English translation: 'undefined'
        value: undefined, // English translation: 'undefined'
        uniqueKeys: undefined, // English translation: 'undefined'
      },
      code: {
        language: undefined, // English translation: 'undefined'
        selectLanguage: undefined, // English translation: 'undefined'
      },
    },
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: 'Taslak',
      copy: 'Kopyala',
      copyUrl: 'URLyi Kopyala',
      copyPath: 'Dosya Yolunu Kopyala',
      copyName: 'Adını Kopyala',
      copied: 'Kopyalandı',
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'Seçilen medyayı silmek istediğinize emin misiniz?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody:
        'Dosya çok büyük.\n%{size} kilobaytdan daha büyük dosyaların yüklenmemesi için ayarlanmış.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      noResults: 'Sonuç yok.',
      noAssetsFound: 'Hiçbir dosya bulunamadı.',
      noImagesFound: 'Resim bulunamadı.',
      private: 'Özel ',
      images: 'Görseller',
      mediaAssets: 'Medya dosyaları',
      search: 'Ara...',
      uploading: 'Yükleniyor...',
      upload: 'Yükle',
      download: 'İndir',
      deleting: 'Siliniyor...',
      deleteSelected: 'Seçileni sil',
      chooseSelected: 'Seçileni kullan',
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
      goBackToSite: 'Siteye geri git',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'Hata',
      details: 'Bir hata oluştu - lütfen ',
      reportIt: 'GitHub üzerinde hata raporu aç.',
      detailsHeading: 'Ayrıntılar',
      privacyWarning:
        'Bir hata raporu oluşturmak için gereken form otomatik olarak hata mesajı ve hata ayıklama verileriyle doldurulur.\nLütfen bilgilerin doğru olduğunu doğrulayın ve varsa hassas verileri kaldırın.',
      recoveredEntry: {
        heading: 'Kurtarılan belge',
        warning: 'Lütfen gitmeden önce bunu bir yere kopyalayın / yapıştırın!',
        copyButtonLabel: 'Panoya kopyala',
      },
    },
    settingsDropdown: {
      theme: undefined, // English translation: 'Theme'
      logOut: 'Çıkış Yap',
    },
    toast: {
      onFailToLoadEntries: 'Girdi yüklenemedi: %{details}',
      onFailToLoadDeployPreview: 'Önizleme yüklenemedi: %{details}',
      onFailToPersist: 'Girdi devam ettirilemedi: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Girdi silinemedi: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Durum güncellenemedi: %{details}',
      missingRequiredField: 'Gerekli bir alan eksik. Lütfen kaydetmeden önce tamamlayın.',
      entrySaved: 'Girdi kaydedildi',
      entryDeleted: undefined, // English translation: 'Entry delete'
      entryPublished: 'Girdi yayınlandı',
      entryUnpublished: 'Girdi yayınlanmamış',
      onFailToPublishEntry: 'Yayınlanamadı: %{details}',
      onFailToUnpublishEntry: 'Girdi yayından kaldırılamadı: %{details}',
      entryUpdated: 'Girdi durumu güncellendi',
      onDeletePublishedEntry: undefined, // English translation: 'Published entry deleted'
      onDeleteUnpublishedChanges: 'Yayımlanmamış değişiklikler silindi',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Çıkış yaptınız, lütfen tüm verileri yedekleyin ve tekrar giriş yapın',
      onBackendDown:
        'Arka uç hizmetinde bir kesinti yaşanıyor. Daha fazla bilgi için %{details} gör',
    },
  },
  workflow: {
    workflow: {
      loading: 'İş Akışı Girdileri Yükleniyor',
      workflowHeading: 'Editoryal İş Akışı',
      newPost: 'Yeni Mesaj',
      description:
        '%{smart_count} girdi incelemeyi bekliyor, %{readyCount} yayına hazır. |||| %{smart_count} girdi incelemeyi bekliyor, %{readyCount} yayınlanmaya hazır. ',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date} tarafından %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: '%{author} tarafından',
      deleteChanges: 'Değişiklikleri sil',
      deleteNewEntry: 'Yeni girdiyi sil',
      publishChanges: 'Değişiklikleri yayınla',
      publishNewEntry: 'Yeni girdi yayınla',
    },
    workflowList: {
      onDeleteEntry: 'Bu girdiyi silmek istediğinize emin misiniz?',
      onPublishingNotReadyEntry:
        'Yalnızca "Hazır" durumu olan öğeler yayınlanabilir. Lütfen yayınlamayı etkinleştirmek için kartı "Hazır" sütununa sürükleyin.',
      onPublishEntry: 'Bu girdiyi yayınlamak istediğinize emin misiniz?',
      draft: 'Taslaklar',
      pending_review: 'İncelemede',
      pending_publish: 'Hazır',
      currentEntries: '%{smart_count} girdi |||| %{smart_count} girdiler',
    },
  },
};

export default tr;
