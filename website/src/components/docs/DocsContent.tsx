import { styled } from '@mui/material/styles';

const DocsContent = styled('div')(
  ({ theme }) => `
    color: ${theme.palette.text.primary};
    font-weight: 200;
    width: 100%;
    max-width: 900px;
    padding: 0 40px 0 56px;
    display: flex;
    flex-direction: column;

    ${theme.breakpoints.between('sm', 'lg')} {
      padding: 0 40px;
    }

    ${theme.breakpoints.down('sm')} {
      padding: 0 32px;
    }

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
      margin-top: 8px;
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

    ${theme.breakpoints.up('lg')} {
      & h1 {
        margin-top: 16px;
        margin-bottom: 16px;
      }
    }

    & h1 {
      font-size: 32px;
      line-height: 36px;
    }

    ${theme.breakpoints.between('sm', 'lg')} {
      & h1 {
        font-size: 26px;
      }
    }

    ${theme.breakpoints.down('sm')} {
      & h1 {
        font-size: 24px;
      }
    }

    & h2 {
      color: ${theme.palette.secondary.main};
      font-size: 26px;
      line-height: 26px;
    }

    ${theme.breakpoints.between('sm', 'lg')} {
      & h2 {
        font-size: 20px;
      }
    }

    ${theme.breakpoints.down('sm')} {
      & h2 {
        font-size: 18px;
      }
    }

    & h3 {
      line-height: 22px;
      font-size: 24px;
      line-height: 24px;
    }

    ${theme.breakpoints.between('sm', 'lg')} {
      & h3 {
        font-size: 18px;
      }
    }

    ${theme.breakpoints.down('sm')} {
      & h3 {
        font-size: 17px;
      }
    }

    & h4 {
      font-size: 20px;
      line-height: 20px;
    }

    ${theme.breakpoints.down('lg')} {
      & h4 {
        font-size: 16px;
      }
    }

    & h5 {
      font-size: 18px;
      line-height: 19px;
    }

    ${theme.breakpoints.down('lg')} {
      & h5 {
        font-size: 15px;
      }
    }

    & h6 {
      font-size: 16px;
      line-height: 18px;
    }

    ${theme.breakpoints.down('lg')} {
      & h6 {
        font-size: 14px;
      }
    }

    & h1 + h2 {
      margin-top: 0;
    }

    & table thead tr th,
    & table thead tr td {
      white-space: nowrap;
    }

    & table tbody tr td {
      white-space: nowrap;
    }

    & table tbody tr td:last-child {
      white-space: normal;
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
      color: ${theme.palette.text.primary};
      background-color: ${
        theme.palette.mode === 'light' ? 'rgba(175,184,193,0.2)' : 'rgba(110,118,129,0.75)'
      };
    }

    & blockquote {
      margin: 8px 1rem;
    }

    & blockquote > p {
      margin: 0;
    }

    & blockquote::before {
      border-left: 4px solid ${theme.palette.text.secondary};
      position: absolute;
      content: '';
      font-size: 6em;
      font-family: roboto, serif;
      line-height: 1.5rem;
      margin-left: -0.2em;
      height: 1.5rem;
      z-index: -1;
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

    & ul + p {
      margin-top: 16px;
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

    ${theme.breakpoints.down('md')} {
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

    & hr {
      display: flex;
      width: 100%;
    }
  `,
);

export default DocsContent;
