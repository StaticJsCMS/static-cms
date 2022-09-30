import React, { PureComponent } from 'react';

class GitHubStarButton extends PureComponent {
  render() {
    return (
      <a
        href="https://github.com/SimpleCMS/simple-cms"
        aria-label="Star SimpleCMS/simple-cms on GitHub"
      >
        <img alt="Star SimpleCMS/simple-cms on GitHub" src="https://img.shields.io/github/stars/SimpleCMS/simple-cms?style=social" />
      </a>
    );
  }
}

export default GitHubStarButton;
