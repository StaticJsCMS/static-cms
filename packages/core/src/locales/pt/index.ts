import type { LocalePhrasesRoot } from '../types';

const pt: LocalePhrasesRoot = {
  auth: {
    login: 'Entrar',
    loggingIn: 'Entrando...',
    loginWithNetlifyIdentity: 'Entrar com o Netlify Identity',
    loginWithBitbucket: 'Entrar com o Bitbucket',
    loginWithGitHub: 'Entrar com o GitHub',
    loginWithGitLab: 'Entrar com o GitLab',
    loginWithGitea: 'Entrar com o Gitea',
    errors: {
      email: 'Certifique-se de inserir seu e-mail.',
      password: 'Por favor, insira sua senha.',
      authTitle: undefined, // English translation: 'Error logging in'
      authBody: '%{details}',
      netlifyIdentityNotFound: undefined, // English translation: 'Netlify Identity plugin not found'
      identitySettings:
        'Não foi possível acessar as configurações de identidade. Ao usar o back-end git-gateway, certifique-se de habilitar o serviço Identity e o Git Gateway.',
    },
  },
  app: {
    header: {
      content: 'Conteúdos',
      workflow: 'Fluxo de Trabalho',
      media: 'Mídia',
      quickAdd: 'Adição rápida',
    },
    app: {
      loading: 'Carregando...',
      errorHeader: 'Erro ao carregar a configuração do CMS',
      configErrors: 'Erros de configuração',
      configNotFound: undefined, // English translation: 'Config not found'
      checkConfigYml: 'Verifique o arquivo config.yml.',
      loadingConfig: 'Carregando configuração...',
      waitingBackend: 'Aguardando o back-end...',
    },
    notFoundPage: {
      header: 'Não Encontrado',
    },
  },
  collection: {
    sidebar: {
      collections: 'Coleções',
      allCollections: 'Todas as Coleções',
      searchAll: 'Pesquisar em todos',
      searchIn: 'Pesquisar em',
    },
    collectionTop: {
      sortBy: 'Ordenar por',
      viewAs: 'Visualizar como',
      newButton: 'Novo(a) %{collectionLabel}',
      ascending: 'Ascendente',
      descending: 'Descendente',
      searchResults: 'Resultados da busca por "%{searchTerm}"',
      searchResultsInCollection: 'Resultados da busca por "%{searchTerm}" em %{collection}',
      filterBy: 'Filtrar por',
      groupBy: 'Agrupar por',
    },
    entries: {
      loadingEntries: 'Carregando Entradas',
      cachingEntries: 'Armazenando Entradas em Cache',
      longerLoading: 'Isso pode levar alguns minutos',
      noEntries: 'Nenhuma Entrada',
    },
    groups: {
      other: 'Outro',
      negateLabel: 'Não %{label}',
    },
    table: {
      summary: undefined, // English translation: 'Summary'
      collection: undefined, // English translation: 'Collection'
    },
    defaultFields: {
      author: {
        label: 'Autor',
      },
      updatedOn: {
        label: 'Atualizado em',
      },
    },
    notFound: undefined, // English translation: 'Collection not found'
  },
  editor: {
    editorControl: {
      field: {
        optional: 'opcional',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} é obrigatório.',
        regexPattern: '%{fieldLabel} não corresponde com o padrão: %{pattern}.',
        processing: '%{fieldLabel} está processando.',
        range: '%{fieldLabel} deve estar entre %{minValue} e %{maxValue}.',
        min: '%{fieldLabel} deve ser, no mínimo, %{minValue}.',
        max: '%{fieldLabel} deve ser igual ou menor que %{maxValue}.',
        rangeCount: '%{fieldLabel} deve ser entre %{minCount} e %{maxCount}.',
        rangeCountExact: '%{fieldLabel} deve ser exatamente %{count}.',
        rangeMin: '%{fieldLabel} deve ter, pelo menos, %{minCount}.',
        rangeMax: '%{fieldLabel} deve ter %{maxCount} ou menos.',
        invalidPath: "'%{path}' não é um caminho válido",
        pathExists: "O caminho '%{path}' já existe",
        invalidColor: undefined, // English translation: 'Color '%{color}' is invalid.'
        invalidHexCode: undefined, // English translation: 'Hex codes must start with a # sign.'
      },
      i18n: {
        writingInLocale: 'Escrevendo em %{locale}',
        copyFromLocale: undefined, // English translation: 'Fill in from another locale'
        copyFromLocaleConfirm: undefined, // English translation: 'Do you want to fill in data from %{locale} locale?\nAll existing content will be overwritten.'
      },
    },
    editor: {
      onLeavePage: 'Tem certeza que deseja sair desta página?',
      onUpdatingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onUpdatingWithUnsavedChangesBody:
        'Há mudanças não salvas. Por favor, salve-as antes de atualizar o status.',
      onPublishingNotReadyTitle: undefined, // English translation: 'Not ready to publish'
      onPublishingNotReadyBody: 'Por favor, altere o status para "Pronto" antes de publicar.',
      onPublishingWithUnsavedChangesTitle: undefined, // English translation: 'Unsaved changes'
      onPublishingWithUnsavedChangesBody:
        'Há mudanças não salvas. Por favor, salve-as antes de publicar.',
      onPublishingTitle: undefined, // English translation: 'Publish entry?'
      onPublishingBody: 'Tem certeza que deseja publicar essa entrada?',
      onUnpublishingTitle: undefined, // English translation: 'Unpublish entry?'
      onUnpublishingBody: 'Tem certeza que deseja cancelar a publicação dessa entrada?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Tem certeza de que deseja excluir esta entrada publicada, bem como as alterações não salvas da sessão atual?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Tem certeza de que deseja excluir esta entrada publicada?',
      onDeleteUnpublishedChangesWithUnsavedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesWithUnsavedChangesBody:
        'Isso excluirá todas as alterações não publicadas nesta entrada, bem como as alterações não salvas da sessão atual. Você ainda deseja excluir?',
      onDeleteUnpublishedChangesTitle: undefined, // English translation: 'Delete unpublished changes?'
      onDeleteUnpublishedChangesBody:
        'Todas as alterações não publicadas nesta entrada serão excluídas. Você ainda deseja excluir?',
      loadingEntry: 'Carregando entrada...',
    },
    editorInterface: {
      sideBySideI18n: undefined, // English translation: 'I18n Side by Side'
      preview: undefined, // English translation: 'Preview'
      toggleI18n: 'Mudar i18n',
      togglePreview: 'Mudar pré-visualização',
      toggleScrollSync: 'Sincronizar rolagem',
    },
    editorToolbar: {
      publishing: 'Publicando...',
      publish: 'Publicar',
      published: 'Publicado',
      unpublish: 'Despublicar',
      duplicate: 'Duplicado',
      unpublishing: 'Despublicando...',
      publishAndCreateNew: 'Publicar e criar novo(a)',
      publishAndDuplicate: 'Publicar e duplicar',
      deleteUnpublishedChanges: 'Excluir alterações não publicadas',
      deleteUnpublishedEntry: 'Excluir entrada não publicada',
      deletePublishedEntry: 'Excluir entrada publicada',
      deleteEntry: 'Excluir entrada',
      saving: 'Salvando...',
      save: 'Salvar',
      statusInfoTooltipDraft:
        "Entrada definida como rascunho. Para finalizar e enviá-la a revisão, mude seu estado para 'Em revisão'",
      statusInfoTooltipInReview:
        'Entrada está sendo revisada, nenhuma ação extra é requirida. Porém, você ainda pode fazer mudanças adicionais enquanto ela está sendo revisada.',
      deleting: 'Excluindo...',
      updating: 'Atualizando...',
      status: 'Status: %{status}',
      backCollection: ' Escrevendo na coleção %{collectionLabel}',
      unsavedChanges: 'Alterações não salvas',
      changesSaved: 'Alterações salvas',
      draft: 'Rascunho',
      inReview: 'Em revisão',
      ready: 'Pronto',
      publishNow: 'Publicar agora',
      deployPreviewPendingButtonLabel: 'Verificar se há Pré-visualização',
      deployPreviewButtonLabel: 'Ver Pré-visualização',
      deployButtonLabel: 'Ver em Produção',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Negrito',
        italic: 'Itálico',
        strikethrough: undefined, // English translation: 'Strikethrough'
        code: 'Código',
        codeBlock: undefined, // English translation: 'Code block'
        insertCodeBlock: undefined, // English translation: 'Insert code block'
        link: 'Link',
        insertLink: undefined, // English translation: 'Insert link'
        paragraph: undefined, // English translation: 'Paragraph'
        headings: 'Cabeçalho',
        quote: 'Citação',
        insertQuote: undefined, // English translation: 'Insert blockquote'
        bulletedList: 'Lista Pontilhada',
        numberedList: 'Lista Numerada',
        addComponent: 'Adicionar Componente',
        richText: 'Rich Text',
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
        choose: 'Escolha uma imagem',
        chooseMultiple: undefined, // English translation: 'Choose images'
        chooseUrl: 'Inserir de uma URL',
        replaceUrl: 'Substituir com uma URL',
        promptUrl: 'Insira a URL da imagem',
        chooseDifferent: 'Escolha uma imagem diferente',
        addMore: undefined, // English translation: 'Add more images'
        remove: 'Remover imagem',
        removeAll: undefined, // English translation: 'Remove all images'
      },
      file: {
        choose: 'Escolha um arquivo',
        chooseUrl: 'Inserir de uma URL',
        chooseMultiple: undefined, // English translation: 'Choose files'
        replaceUrl: 'Substituir com uma URL',
        promptUrl: 'Insira a URL do arquivo',
        chooseDifferent: 'Escolha um arquivo diferente',
        addMore: undefined, // English translation: 'Add more files'
        remove: 'Remover arquivo',
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
        noControl: "Nenhum controle para o widget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Nenhuma pré-visualização para o widget '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Título nível 1',
        headingTwo: 'Título nível 2',
        headingThree: 'Título nível 3',
        headingFour: 'Título nível 4',
        headingFive: 'Título nível 5',
        headingSix: 'Título nível 6',
      },
      datetime: {
        now: 'Agora',
        invalidDateTitle: undefined, // English translation: 'Invalid date'
        invalidDateBody: undefined, // English translation: 'The date you entered is invalid.'
      },
      list: {
        add: 'Adicionar %{item}',
        addType: 'Adicionar %{item} item',
        noValue: undefined, // English translation: 'No value'
      },
      keyvalue: {
        key: undefined, // English translation: 'Key'
        value: undefined, // English translation: 'Value'
        uniqueKeys: undefined, // English translation: '%{keyLabel} must be unique'
      },
      code: {
        language: undefined, // English translation: 'Language'
        selectLanguage: undefined, // English translation: 'Select language'
      },
    },
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: 'Rascunho',
      copy: 'Copiar',
      copyUrl: 'Copiar URL',
      copyPath: 'Copiar Caminho',
      copyName: 'Copiar Nome',
      copied: 'Copiado',
    },
    mediaLibrary: {
      onDeleteTitle: undefined, // English translation: 'Delete selected media?'
      onDeleteBody: 'Tem certeza de que deseja excluir a mídia selecionada?',
      fileTooLargeTitle: undefined, // English translation: 'File too large'
      fileTooLargeBody:
        'Arquivo muito grande.\nConfigurado para não permitir arquivos maiores que %{size} kB.',
      alreadyExistsTitle: undefined, // English translation: 'File already exists'
      alreadyExistsBody: undefined, // English translation: '%{filename} already exists. Do you want to replace it?'
    },
    mediaLibraryModal: {
      noResults: 'Nenhum resultado.',
      noAssetsFound: 'Nenhum recurso encontrado.',
      noImagesFound: 'Nenhuma imagem encontrada.',
      private: 'Privado ',
      images: 'Imagens',
      mediaAssets: 'Recursos de mídia',
      search: 'Pesquisar...',
      uploading: 'Enviando...',
      upload: 'Enviar novo',
      download: 'Download',
      deleting: 'Excluindo...',
      deleteSelected: 'Excluir selecionado',
      chooseSelected: 'Escolher selecionado',
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
      goBackToSite: 'Voltar ao site',
    },
    localBackup: {
      hasLocalBackup: undefined, // English translation: 'Has local backup'
    },
    errorBoundary: {
      title: 'Erro',
      details: 'Ocorreu um erro - por favor ',
      reportIt: 'relatar.',
      detailsHeading: 'Detalhes',
      privacyWarning:
        'Ao abrir uma issue, ela é preenchida com a mensagem de erro e o log de debug.\nPor favor, verifique se a informação está correta e remova dados sensíveis caso existam.',
      recoveredEntry: {
        heading: 'Documento recuperado',
        warning: 'Copie/cole isso em algum lugar antes de sair!',
        copyButtonLabel: 'Copiar para área de transferência',
      },
    },
    settingsDropdown: {
      theme: undefined, // English translation: 'Theme'
      logOut: 'Sair',
    },
    toast: {
      onFailToLoadEntries: 'Falha ao carregar a entrada: %{details}',
      onFailToLoadDeployPreview: 'Falha ao carregar a pré-visualização: %{details}',
      onFailToPersist: 'Falha ao persistir na entrada: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Falha ao excluir a entrada: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Falha ao atualizar status: %{details}',
      missingRequiredField:
        'Ops, você perdeu um campo obrigatório. Por favor, preencha antes de salvar.',
      entrySaved: 'Entrada salva',
      entryDeleted: undefined, // English translation: 'Entry delete'
      entryPublished: 'Entrada publicada',
      entryUnpublished: 'Entrada despublicada',
      onFailToPublishEntry: 'Falha ao publicar: %{details}',
      onFailToUnpublishEntry: 'Falha ao cancelar a publicação da entrada: %{details}',
      entryUpdated: 'Status da entrada atualizado',
      onDeletePublishedEntry: undefined, // English translation: 'Published entry deleted'
      onDeleteUnpublishedChanges: 'Alterações não publicadas excluídas',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Você foi desconectado. Por favor, salve as alterações e entre novamente',
      onBackendDown: 'O serviço de back-end está fora do ar. Veja %{details} para mais informações',
    },
  },
  workflow: {
    workflow: {
      loading: 'Carregando entradas do Fluxo de Trabalho Editorial',
      workflowHeading: 'Fluxo de Trabalho Editorial',
      newPost: 'Nova Publicação',
      description:
        '%{smart_count} entrada aguardando revisão, %{readyCount} pronta para publicação. |||| %{smart_count} entradas aguardando revisão, %{readyCount} pronta para publicação.',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date} por %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: 'por %{author}',
      deleteChanges: 'Excluir alterações',
      deleteNewEntry: 'Excluir nova entrada',
      publishChanges: 'Publicar alterações',
      publishNewEntry: 'Publicar nova entrada',
    },
    workflowList: {
      onDeleteEntry: 'Tem certeza de que deseja excluir esta entrada?',
      onPublishingNotReadyEntry:
        'Somente itens com o status "Pronto" podem ser publicados. Arraste o cartão para a coluna "Pronto" para poder publicar.',
      onPublishEntry: 'Tem certeza de que quer publicar esta entrada?',
      draft: 'Rascunhos',
      pending_review: 'Em Revisão',
      pending_publish: 'Prontos',
      currentEntries: '%{smart_count} entrada |||| %{smart_count} entradas',
    },
  },
};

export default pt;
