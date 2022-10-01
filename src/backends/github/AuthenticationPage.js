import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { AuthenticationPage, Icon } from '../../ui';
import { NetlifyAuthenticator } from '../../lib/auth';

const LoginButtonIcon = styled(Icon)`
  margin-right: 18px;
`;

export default class GitHubAuthenticationPage extends React.Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    inProgress: PropTypes.bool,
    base_url: PropTypes.string,
    siteId: PropTypes.string,
    authEndpoint: PropTypes.string,
    config: PropTypes.object.isRequired,
    clearHash: PropTypes.func,
    t: PropTypes.func.isRequired,
  };

  state = {};

  handleLogin = e => {
    e.preventDefault();
    const cfg = {
      base_url: this.props.base_url,
      site_id:
        document.location.host.split(':')[0] === 'localhost'
          ? 'cms.netlify.com'
          : this.props.siteId,
      auth_endpoint: this.props.authEndpoint,
    };
    const auth = new NetlifyAuthenticator(cfg);

    const { auth_scope: authScope = '' } =
      this.props.config.backend;

    const scope = authScope || 'repo';
    auth.authenticate({ provider: 'github', scope }, (err, data) => {
      if (err) {
        this.setState({ loginError: err.toString() });
        return;
      }
      this.props.onLogin(data);
    });
  };

  renderLoginButton = () => {
    const { inProgress, t } = this.props;
    return inProgress ? (
      t('auth.loggingIn')
    ) : (
      <React.Fragment>
        <LoginButtonIcon type="github" />
        {t('auth.loginWithGitHub')}
      </React.Fragment>
    );
  };

  getAuthenticationPageRenderArgs() {
    return {
      renderButtonContent: this.renderLoginButton,
    };
  }

  render() {
    const { inProgress, config, t } = this.props;
    const { loginError } = this.state;

    return (
      <AuthenticationPage
        onLogin={this.handleLogin}
        loginDisabled={inProgress}
        loginErrorMessage={loginError}
        logoUrl={config.logo_url}
        siteUrl={config.site_url}
        {...this.getAuthenticationPageRenderArgs()}
        t={t}
      />
    );
  }
}
