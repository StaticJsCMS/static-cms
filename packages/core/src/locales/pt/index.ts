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
      media: 'Mídia',
      quickAdd: 'Adição rápida',
    },
    app: {
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
      },
    },
    editor: {
      onLeavePage: 'Tem certeza que deseja sair desta página?',
      onDeleteWithUnsavedChangesTitle: undefined, // English translation: 'Delete this published entry?'
      onDeleteWithUnsavedChangesBody:
        'Tem certeza de que deseja excluir esta entrada publicada, bem como as alterações não salvas da sessão atual?',
      onDeletePublishedEntryTitle: undefined, // English translation: 'Delete this published entry?'
      onDeletePublishedEntryBody: 'Tem certeza de que deseja excluir esta entrada publicada?',
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
      publish: 'Publicar',
      published: 'Publicado',
      duplicate: 'Duplicado',
      publishAndCreateNew: 'Publicar e criar novo(a)',
      publishAndDuplicate: 'Publicar e duplicar',
      deleteEntry: 'Excluir entrada',
      publishNow: 'Publicar agora',
      discardChanges: undefined, // English translation: 'Discard changes'
      discardChangesTitle: undefined, // English translation: 'Discard changes'
      discardChangesBody: undefined, // English translation: 'Are you sure you want to discard the unsaved changed?'
    },
    editorWidgets: {
      markdown: {
        bold: 'Negrito',
        italic: 'Itálico',
        code: 'Código',
        link: 'Link',
        linkPrompt: 'Insira a URL do link',
        headings: 'Cabeçalho',
        quote: 'Citação',
        bulletedList: 'Lista Pontilhada',
        numberedList: 'Lista Numerada',
        addComponent: 'Adicionar Componente',
        richText: 'Rich Text',
        markdown: 'Markdown',
        type: undefined, // English translation: 'Type...'
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
      loading: 'Carregando...',
      noResults: 'Nenhum resultado.',
      noAssetsFound: 'Nenhum recurso encontrado.',
      noImagesFound: 'Nenhuma imagem encontrada.',
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
      darkMode: undefined, // English translation: 'Dark Mode'
      logOut: 'Sair',
    },
    toast: {
      onFailToLoadEntries: 'Falha ao carregar a entrada: %{details}',
      onFailToPersist: 'Falha ao persistir na entrada: %{details}',
      onFailToPersistMedia: undefined, // English translation: 'Failed to persist media: %{details}'
      onFailToDelete: 'Falha ao excluir a entrada: %{details}',
      onFailToDeleteMedia: undefined, // English translation: 'Failed to delete media: %{details}'
      onFailToUpdateStatus: 'Falha ao atualizar status: %{details}',
      missingRequiredField:
        'Ops, você perdeu um campo obrigatório. Por favor, preencha antes de salvar.',
      entrySaved: 'Entrada salva',
      entryPublished: 'Entrada publicada',
      onFailToPublishEntry: 'Falha ao publicar: %{details}',
      entryUpdated: 'Status da entrada atualizado',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Você foi desconectado. Por favor, salve as alterações e entre novamente',
      onBackendDown: 'O serviço de back-end está fora do ar. Veja %{details} para mais informações',
    },
  },
};

export default pt;
