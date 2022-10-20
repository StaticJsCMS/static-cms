import React, { PureComponent } from 'react';

class GitHubStarButton extends PureComponent {
  render() {
    return (
      <a
        href="https://github.com/StaticJsCMS/static-cms"
        aria-label="Star StaticJsCMS/static-cms on GitHub"
      >
        <img
          alt="Star StaticJsCMS/static-cms on GitHub"
          src="https://img.shields.io/github/stars/StaticJsCMS/static-cms?style=social"
        />
      </a>
    );
  }
}

export default GitHubStarButton;
