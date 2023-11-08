// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import { oneLineTrim } from 'common-tags';
import { rehype } from 'rehype';
import { visit } from 'unist-util-visit';

function runTimes(
  cyInstance: Cypress.Chainable,
  fn: (chain: Cypress.Chainable) => Cypress.Chainable,
  count = 1,
) {
  let chain = cyInstance,
    i = count;
  while (i) {
    i -= 1;
    chain = fn(chain);
  }
  return chain;
}

(
  [
    'enter',
    'backspace',
    ['selectAll', 'selectall'],
    ['up', 'upArrow'],
    ['down', 'downArrow'],
    ['left', 'leftArrow'],
    ['right', 'rightArrow'],
  ] as const
).forEach(key => {
  const [cmd, keyName] = typeof key === 'object' ? key : [key, key];
  Cypress.Commands.add(cmd, { prevSubject: true }, (subject, { shift, times = 1 } = {}) => {
    const fn = (chain: Cypress.Chainable) =>
      chain.type(`${shift ? '{shift}' : ''}{${keyName}}`, { delay: 50 });
    return runTimes(cy.wrap(subject), fn, times);
  });
});

// Convert `tab` command from plugin to a child command with `times` support
Cypress.Commands.add('tabkey', { prevSubject: true }, (subject, { shift, times } = {}) => {
  const fn = (chain: Cypress.Chainable) => chain.tab({ shift });
  cy.wait(100);
  return runTimes(cy, fn, times).wrap(subject);
});

Cypress.Commands.add('selection', { prevSubject: true }, (subject, fn) => {
  cy.wrap(subject).trigger('mousedown').then(fn).trigger('mouseup');

  cy.document().trigger('selectionchange');
  return cy.wrap(subject);
});

Cypress.Commands.add('print', { prevSubject: 'optional' }, (subject, str) => {
  cy.log(str);
  console.info(`cy.log: ${str}`);
  return cy.wrap(subject);
});

Cypress.Commands.add('setSelection', { prevSubject: true }, (subject, query, endQuery) => {
  return cy.wrap(subject).selection($el => {
    if (typeof query === 'string') {
      const anchorNode = getTextNode($el[0], query);
      const focusNode = endQuery ? getTextNode($el[0], endQuery) : anchorNode;
      const anchorOffset = anchorNode?.wholeText.indexOf(query) ?? 0;
      const focusOffset = endQuery
        ? (focusNode?.wholeText ?? '').indexOf(endQuery) + endQuery.length
        : anchorOffset + query.length;
      setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
    } else if (typeof query === 'object') {
      const el = $el[0];
      const anchorNode = getTextNode(el.querySelector(query.anchorQuery));
      const anchorOffset = query.anchorOffset || 0;
      const focusNode = query.focusQuery
        ? getTextNode(el.querySelector(query.focusQuery))
        : anchorNode;
      const focusOffset = query.focusOffset || 0;
      setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
    }
    return cy.wrap(subject);
  });
});

Cypress.Commands.add('setCursor', { prevSubject: true }, (subject, query, atStart) => {
  return cy.wrap(subject).selection($el => {
    const node = getTextNode($el[0], query);
    const offset = (node?.wholeText.indexOf(query) ?? 0) + (atStart ? 0 : query.length);
    const document = node?.ownerDocument;
    document?.getSelection()?.removeAllRanges();
    document?.getSelection()?.collapse(node, offset);

    return cy.wrap(subject);
  });
});

Cypress.Commands.add('setCursorBefore', { prevSubject: true }, (subject, query) => {
  cy.wrap(subject).setCursor(query, true);
});

Cypress.Commands.add('setCursorAfter', { prevSubject: true }, (subject, query) => {
  cy.wrap(subject).setCursor(query);
});

Cypress.Commands.add('login', () => {
  cy.viewport(1200, 1200);
  cy.visit('/');
  cy.contains('button', 'Login').click();
});

Cypress.Commands.add('loginAndNewPost', () => {
  cy.login();
  cy.contains('a', 'New Post').click();
});

Cypress.Commands.add(
  'dragTo',
  {
    prevSubject: 'element',
  },
  (subject, selector, options) => {
    cy.wrap(subject, { log: false }).then(subject => {
      return cy
        .document()
        .its('body')
        .find(selector)
        .then($el => {
          const target = $el[0].getBoundingClientRect();
          const x = Math.floor(target.x + target.width / 2);
          const y = target.y + 200;

          console.log('going to', x, y, target);

          cy.wrap(subject)
            .trigger('pointerdown', { force: true })
            .wait(options?.delay || 100, { log: Boolean(options?.delay) });

          cy.wrap(subject)
            .trigger('pointermove', {
              force: true,
              clientX: x,
              clientY: y,
            })
            .wait(options?.delay || 100, { log: Boolean(options?.delay) });

          cy.wrap(subject)
            .trigger('pointermove', {
              force: true,
              clientX: x,
              clientY: y,
            })
            .wait(options?.delay || 100, { log: Boolean(options?.delay) });

          cy.document().its('body').find(selector).trigger('pointerup', { force: true }).wait(250);
        });
    });
  },
);

Cypress.Commands.add('clickToolbarButton', (title, { times } = {}) => {
  const isHeading = title.startsWith('Heading');
  if (isHeading) {
    cy.get('button[title="Headings"]').click();
  }
  const instance = isHeading ? cy.contains('div', title) : cy.get(`button[title="${title}"]`);
  const fn = (chain: Cypress.Chainable) => chain.click();
  // this seems to be the only thing that makes cypress stable(ish)
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(100);
  return runTimes(instance, fn, times).focused();
});

Cypress.Commands.add('insertEditorComponent', (title: string) => {
  cy.get('button[title="Add Component"]').click();
  cy.contains('div', title).click().focused();
});

(
  [
    ['clickHeadingOneButton', 'Heading 1'],
    ['clickHeadingTwoButton', 'Heading 2'],
    ['clickOrderedListButton', 'Numbered List'],
    ['clickUnorderedListButton', 'Bulleted List'],
    ['clickCodeButton', 'Code'],
    ['clickItalicButton', 'Italic'],
    ['clickQuoteButton', 'Quote'],
    ['clickLinkButton', 'Link'],
  ] as const
).forEach(([commandName, toolbarButtonName]) => {
  Cypress.Commands.add(commandName, opts => {
    return cy.clickToolbarButton(toolbarButtonName, opts);
  });
});

Cypress.Commands.add('clickModeToggle', () => {
  cy.get('.cms-editor-visual').within(() => {
    cy.get('button[role="switch"]').click().focused();
  });
});

([['insertCodeBlock', 'Code Block']] as const).forEach(([commandName, componentTitle]) => {
  Cypress.Commands.add(commandName, () => {
    return cy.insertEditorComponent(componentTitle);
  });
});

Cypress.Commands.add('getMarkdownEditor', () => {
  return cy.get('[data-slate-editor="true"]');
});

Cypress.Commands.add('confirmMarkdownEditorContent', (expectedDomString: string) => {
  return cy.getMarkdownEditor().should(([element]) => {
    // Slate makes the following representations:
    // - blank line: 2 BOM's + <br>
    // - blank element (placed inside empty elements): 1 BOM + <br>
    // - inline element (e.g. link tag <a>) are wrapped with BOM characters (https://github.com/ianstormtaylor/slate/issues/2722)
    // We replace to represent a blank line as a single <br>, remove the
    // contents of elements that are actually empty, and remove BOM characters wrapping <a> tags
    const actualDomString = toPlainTree(element.innerHTML)
      .replace(/\uFEFF\uFEFF<br>/g, '<br>')
      .replace(/\uFEFF<br>/g, '')
      .replace(/\uFEFF<a>/g, '<a>')
      .replace(/<\/a>\uFEFF/g, '</a>');
    expect(actualDomString).equals(oneLineTrim(expectedDomString));
  });
});

Cypress.Commands.add('clearMarkdownEditorContent', () => {
  return cy.getMarkdownEditor().selectAll().backspace({ times: 2 });
});

Cypress.Commands.add('confirmRawEditorContent', expectedDomString => {
  cy.get('.cms-editor-raw').within(() => {
    cy.contains('span', expectedDomString);
  });
});

function toPlainTree(domString: string) {
  return rehype()
    .use(removeSlateArtifacts)
    .data('settings', { fragment: true })
    .processSync(domString)
    .toString();
}

function getActualBlockChildren(node: any) {
  if (node.tagName === 'span') {
    return node.children.flatMap(getActualBlockChildren);
  }
  if (node.children) {
    return {
      ...node,
      children: node.children.flatMap(getActualBlockChildren),
    };
  }
  return node;
}

function removeSlateArtifacts() {
  return function transform(tree: any) {
    visit(tree, 'element', node => {
      // remove all element attributes
      delete node.properties;

      // remove slate padding spans to simplify test cases
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'].includes(node.tagName)) {
        node.children = node.children.flatMap(getActualBlockChildren);
      }
    });
  };
}

function getTextNode(el: Node, match?: string): Text | null {
  const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
  if (!match) {
    return walk.nextNode() as Text;
  }

  let node: Text;
  while ((node = walk.nextNode() as Text)) {
    if (node.wholeText.includes(match)) {
      return node;
    }
  }

  return null;
}

function setBaseAndExtent(
  anchorNode: Node | null,
  anchorOffset: number,
  focusNode: Node | null,
  focusOffset: number,
) {
  if (!anchorNode || !focusNode) {
    return;
  }

  const document = anchorNode?.ownerDocument;
  document?.getSelection()?.removeAllRanges();
  document?.getSelection()?.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
}
