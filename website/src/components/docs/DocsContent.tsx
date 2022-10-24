import { styled } from '@mui/material/styles';

const DocsContent = styled('div')(
  ({ theme }) => `
    color: ${theme.palette.text.primary};
    font-weight: 200;
    width: 100%;
    padding: 0 40px 0 56px;

    & time {
      color: #9b9b9b;
    }

    & div,
    & p {
      line-height: 1.5rem;
      margin: 0 0 16px;
      font-size: 16px;
      word-break: break-word;
    }

    & div,
    & p:not(:first-of-type) {
      margin-top: 16px;
    }

    & :not(h1,h2,h3,h4,h5,h6) a {
      color: ${theme.palette.secondary.main};
      text-decoration: none;
      font-weight: 500;
    }

    & a:hover {
      text-decoration: underline;
    }

    & h2,
    & h3,
    & h4,
    & h5,
    & h6 {
      font-weight: 500;
      margin-top: 28px;
      margin-bottom: 12px;
    }

    & h3,
    & h4,
    & h5,
    & h6 {
      color: ${theme.palette.text.primary};
    }

    @media (min-width: 1200px) {
      & h1 {
        margin-top: 16px;
        margin-bottom: 16px;
      }
    }

    & h1 {
      font-size: 32px;
      line-height: 36px;
    }

    @media (min-width: 600px) and (max-width: 1200px) {
      & h1 {
        font-size: 26px;
      }
    }

    @media (max-width: 600px) {
      & h1 {
        font-size: 24px;
      }
    }

    & h2 {
      color: ${theme.palette.secondary.main};
      font-size: 26px;
      line-height: 26px;
    }

    @media (min-width: 600px) and (max-width: 1200px) {
      & h2 {
        font-size: 20px;
      }
    }

    @media (max-width: 600px) {
      & h2 {
        font-size: 18px;
      }
    }

    & h3 {
      line-height: 22px;
      font-size: 24px;
      line-height: 24px;
    }

    @media (min-width: 600px) and (max-width: 1200px) {
      & h3 {
        font-size: 18px;
      }
    }

    @media (max-width: 600px) {
      & h3 {
        font-size: 17px;
      }
    }

    & h4 {
      font-size: 20px;
      line-height: 20px;
    }

    @media (max-width: 1200px) {
      & h4 {
        font-size: 16px;
      }
    }

    & h5 {
      font-size: 18px;
      line-height: 19px;
    }

    @media (max-width: 1200px) {
      & h5 {
        font-size: 15px;
      }
    }

    & h6 {
      font-size: 16px;
      line-height: 18px;
    }

    @media (max-width: 1200px) {
      & h6 {
        font-size: 14px;
      }
    }

    & pre {
      display: block;
      line-height: 1.25rem;
      padding: 1rem;
      overflow: auto;
      margin: 1.75rem 0 0 0;
    }

    & pre code {
      background-color: transparent;
      font-size: 100%;
      padding: 0;
    }

    & code[class*=language-],
    & pre[class*=language-] {
      text-shadow: none;
      border: none;
      box-shadow: none;
    }

    .light & code[class*=language-],
    .light & pre[class*=language-] {
      background-color: #EDEEEE;
      text-shadow: none;
      border: none;
      box-shadow: none;
    }

    .dark & code[class*=language-],
    .dark & pre[class*=language-] {
      background-color: #1E1E1E;
      text-shadow: none;
      border: none;
      box-shadow: none;
    }

    & code {
      font-size: 85%;
      padding: 0.2em 0.4em;
      margin: 0;
      border-radius: 3px;
      background-color: ${
        theme.palette.mode === 'light' ? 'rgba(175,184,193,0.2)' : 'rgba(110,118,129,0.4)'
      };
    }

    & blockquote {
      margin: 0 1rem;
    }

    & blockquote::before {
      position: absolute;
      content: '\\201C';
      font-size: 6em;
      font-family: roboto, serif;
      line-height: 1.5rem;
      margin-top: 0.1em;
      margin-left: -0.2em;
      z-index: -1;
      color: ${theme.palette.text.secondary};
    }

    & table {
      width: 100%;
      max-width: 100%;
      border-spacing: 0;
      margin: 24px 0;
      border: 1px solid ${theme.palette.text.secondary};
      border-radius: 4px;
      overflow: hidden;
    }

    &.editor table {
      border: none;
      border-radius: 0;
      overflow: visible;
    }

    & table thead {
      background: ${theme.palette.background.paper};
    }

    & table th,
    & table thead td {
      font-weight: 700;
      height: 56px;
      box-sizing: border-box;
      text-align: left;
    }

    & table th,
    & table thead td,
    & table td {
      padding: 8px 16px;
    }

    & table tr:not(:first-of-type) th,
    & table tr:not(:first-of-type) thead td,
    & table tbody tr td {
      border-top: 1px solid ${theme.palette.text.secondary};
    }

    & table tr td {
      background-color: ${theme.palette.background.paper};
    }

    & table tbody tr td {
      height: 52px;
      box-sizing: border-box;
    }

    & table tbody tr:hover td {
      background-color: ${theme.palette.background.paper};
    }

    & ol,
    & ul {
      padding: 0 0 0 1.5rem;
      margin: 8px 0;
    }

    & ol li,
    & ul li {
      line-height: 1.5rem;
    }

    & li ol,
    & li ul {
      margin: 0;
    }

    & abbr[title] {
      text-decoration: underline double;
    }

    & kbd {
      font-family: 'Oswald', 'Ubuntu Mono', monospace;
    }

    & img {
      max-width: 100%;
    }

    @media (min-width: 800px) {
      & h2,
      & h3,
      & h4,
      & h5 {
        position: relative;
      }

      & h2::before {
        display: block;
      }
    }

    & b,
    & strong {
      font-weight: 700;
    }
  `,
);

export default DocsContent;
