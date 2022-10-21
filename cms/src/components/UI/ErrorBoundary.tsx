import { styled } from '@mui/material/styles';
import cleanStack from 'clean-stack';
import copyToClipboard from 'copy-text-to-clipboard';
import truncate from 'lodash/truncate';
import React from 'react';
import { translate } from 'react-polyglot';
import yaml from 'yaml';

import { localForage } from '../../lib/util';
import { buttons, colors } from '../../components/UI/styles';

import type { ReactNode } from 'react';
import type { Config, TranslatedProps } from '../../interface';

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

function buildIssueTemplate(config: Config) {
  let version = '';
  if (typeof STATIC_CMS_CORE_VERSION === 'string') {
    version = `static-cms@${STATIC_CMS_CORE_VERSION}`;
  }
  const template = getIssueTemplate(
    version,
    config.backend.name,
    navigator.userAgent,
    yaml.stringify(config),
  );

  return template;
}

function buildIssueUrl(title: string, config: Config) {
  try {
    const body = buildIssueTemplate(config);

    const params = new URLSearchParams();
    params.append('title', truncate(title, { length: 100 }));
    params.append('body', truncate(body, { length: 4000, omission: '\n...' }));
    params.append('labels', 'type: bug');

    return `${ISSUE_URL}${params.toString()}`;
  } catch (e) {
    console.info(e);
    return `${ISSUE_URL}template=bug_report.md`;
  }
}

const ErrorBoundaryContainer = styled('div')`
  padding: 40px;

  h1 {
    font-size: 28px;
    color: ${colors.text};
  }

  h2 {
    font-size: 20px;
  }

  strong {
    color: ${colors.textLead};
    font-weight: 500;
  }

  hr {
    width: 200px;
    margin: 30px 0;
    border: 0;
    height: 1px;
    background-color: ${colors.text};
  }

  a {
    color: ${colors.active};
  }
`;

const PrivacyWarning = styled('span')`
  color: ${colors.text};
`;

const CopyButton = styled('button')`
  ${buttons.button};
  ${buttons.default};
  ${buttons.gray};
  display: block;
  margin: 12px 0;
`;

interface RecoveredEntryProps {
  entry: string;
}

const RecoveredEntry = ({ entry, t }: TranslatedProps<RecoveredEntryProps>) => {
  console.info(entry);
  return (
    <>
      <hr />
      <h2>{t('ui.errorBoundary.recoveredEntry.heading')}</h2>
      <strong>{t('ui.errorBoundary.recoveredEntry.warning')}</strong>
      <CopyButton onClick={() => copyToClipboard(entry)}>
        {t('ui.errorBoundary.recoveredEntry.copyButtonLabel')}
      </CopyButton>
      <pre>
        <code>{entry}</code>
      </pre>
    </>
  );
};

interface ErrorBoundaryProps {
  children: ReactNode;
  config: Config;
  showBackup?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
  errorTitle: string;
  backup: string;
}

export class ErrorBoundary extends React.Component<
  TranslatedProps<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
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
        console.info(backup);
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
      <ErrorBoundaryContainer key="error-boundary-container">
        <h1>{t('ui.errorBoundary.title')}</h1>
        <p>
          <span>{t('ui.errorBoundary.details')}</span>
          <a
            href={buildIssueUrl(errorTitle, this.props.config)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="issue-url"
          >
            {t('ui.errorBoundary.reportIt')}
          </a>
        </p>
        <p>
          {t('ui.errorBoundary.privacyWarning')
            .split('\n')
            .map((item, index) => [
              <PrivacyWarning key={`private-warning-${index}`}>{item}</PrivacyWarning>,
              <br key={`break-${index}`} />,
            ])}
        </p>
        <hr />
        <h2>{t('ui.errorBoundary.detailsHeading')}</h2>
        <p>{errorMessage}</p>
        {backup && showBackup && <RecoveredEntry key="backup" entry={backup} t={t} />}
      </ErrorBoundaryContainer>
    );
  }
}

export default translate()(ErrorBoundary);
