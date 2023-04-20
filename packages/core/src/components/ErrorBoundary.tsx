import cleanStack from 'clean-stack';
import copyToClipboard from 'copy-text-to-clipboard';
import truncate from 'lodash/truncate';
import React, { Component } from 'react';
import { translate } from 'react-polyglot';
import yaml from 'yaml';

import { localForage } from '@staticcms/core/lib/util';

import type { Config, TranslatedProps } from '@staticcms/core/interface';
import type { ComponentClass, ReactNode } from 'react';

const ISSUE_URL = 'https://github.com/StaticJsCMS/static-cms/issues/new?';

function getIssueTemplate(version: string, provider: string, browser: string, config: string) {
  return `
**Describe the bug**

**To Reproduce**

**Expected behavior**

**Screenshots**

**Applicable Versions:**
 - Static CMS version: \`${version}\`
 - Git provider: \`${provider}\`
 - Browser version: \`${browser}\`

**CMS configuration**
\`\`\`
${config}
\`\`\`

**Additional context**
`;
}

function buildIssueTemplate(config?: Config) {
  let version = '';
  if (typeof STATIC_CMS_CORE_VERSION === 'string') {
    version = `static-cms@${STATIC_CMS_CORE_VERSION}`;
  }
  const template = getIssueTemplate(
    version,
    config?.backend?.name ?? 'Unknown',
    navigator.userAgent,
    yaml.stringify(config),
  );

  return template;
}

function buildIssueUrl(title: string, config?: Config) {
  try {
    const body = buildIssueTemplate(config);

    const params = new URLSearchParams();
    params.append('title', truncate(title, { length: 100 }));
    params.append('body', truncate(body, { length: 4000, omission: '\n...' }));
    params.append('labels', 'type: bug');

    return `${ISSUE_URL}${params.toString()}`;
  } catch (e) {
    console.error(e);
    return `${ISSUE_URL}template=bug_report.md`;
  }
}

interface RecoveredEntryProps {
  entry: string;
}

const RecoveredEntry = ({ entry, t }: TranslatedProps<RecoveredEntryProps>) => {
  console.info('[StaticCMS] Recovered entry', entry);
  return (
    <>
      <hr />
      <h2>{t('ui.errorBoundary.recoveredEntry.heading')}</h2>
      <strong>{t('ui.errorBoundary.recoveredEntry.warning')}</strong>
      <button onClick={() => copyToClipboard(entry)}>
        {t('ui.errorBoundary.recoveredEntry.copyButtonLabel')}
      </button>
      <pre>
        <code>{entry}</code>
      </pre>
    </>
  );
};

interface ErrorBoundaryProps {
  children: ReactNode;
  config?: Config;
  showBackup?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
  errorTitle: string;
  backup: string;
}

class ErrorBoundary extends Component<TranslatedProps<ErrorBoundaryProps>, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    errorMessage: '',
    errorTitle: '',
    backup: '',
  };

  static getDerivedStateFromError(error: Error) {
    console.error(error);
    return {
      hasError: true,
      errorMessage: cleanStack(error.stack, { basePath: window.location.origin || '' }),
      errorTitle: error.toString(),
    };
  }

  shouldComponentUpdate(
    _nextProps: TranslatedProps<ErrorBoundaryProps>,
    nextState: ErrorBoundaryState,
  ) {
    if (this.props.showBackup) {
      return (
        this.state.errorMessage !== nextState.errorMessage || this.state.backup !== nextState.backup
      );
    }
    return true;
  }

  async componentDidUpdate() {
    if (this.props.showBackup) {
      const backup = await localForage.getItem<string>('backup');
      if (backup) {
        console.info('[StaticCMS] Recovered backup', backup);
        this.setState({ backup });
      }
    }
  }

  render() {
    const { hasError, errorMessage, backup, errorTitle } = this.state;
    const { showBackup, t } = this.props;
    if (!hasError) {
      return this.props.children;
    }
    return (
      <div
        key="error-boundary-container"
        className="
          flex
          flex-col
          bg-slate-50
          dark:bg-slate-900
          min-h-screen
          gap-2
        "
      >
        <div
          className="
            flex
            flex-col
            py-2
            px-4
            gap-2
          "
        >
          <h1 className="text-2xl bold">{t('ui.errorBoundary.title')}</h1>
          <p>
            <span>{t('ui.errorBoundary.details')}</span>
            <a
              href={buildIssueUrl(errorTitle, this.props.config)}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="issue-url"
              className="
                text-blue-500
                hover:underline
              "
            >
              {t('ui.errorBoundary.reportIt')}
            </a>
          </p>
          <p>
            {t('ui.errorBoundary.privacyWarning')
              .split('\n')
              .map((item, index) => [
                <span key={`private-warning-${index}`}>{item}</span>,
                <br key={`break-${index}`} />,
              ])}
          </p>
        </div>
        <hr />
        <div
          className="
            flex
            flex-col
            py-2
            px-4
            gap-2
          "
        >
          <h2 className="text-xl bold">{t('ui.errorBoundary.detailsHeading')}</h2>
          <p>
            {errorMessage.split('\n').map((item, index) => [
              <span key={`error-line-${index}`} className="whitespace-pre">
                {item}
              </span>,
              <br key={`error-break-${index}`} />,
            ])}
          </p>
          {backup && showBackup && <RecoveredEntry key="backup" entry={backup} t={t} />}
        </div>
      </div>
    );
  }
}

export default translate()(ErrorBoundary) as ComponentClass<ErrorBoundaryProps>;
