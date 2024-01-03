/// <reference types="cypress" />

import type {
  SetupBackendProps,
  SetupBackendTestProps,
  SeedRepoProps,
  TeardownBackendTestProps,
  TeardownBackendProps,
} from './interface';
import type { Config as CMSConfig, DeepPartial } from '@staticcms/core/interface';

interface KeyProps {
  shift?: boolean;
  times?: number;
}

declare global {
  namespace Cypress {
    interface Chainable {
      task(event: 'setupBackend', props: SetupBackendProps): Chainable<SetupBackendResponse>;
      task(event: 'setupBackendTest', props: SetupBackendTestProps): Chainable<Promise<null>>;
      task(event: 'seedRepo', props: SeedRepoProps): Chainable<Promise<null>>;
      task(event: 'teardownBackendTest', props: TeardownBackendTestProps): Chainable<Promise<null>>;
      task(event: 'teardownBackend', props: TeardownBackendProps): Chainable<Promise<null>>;
      task(event: 'updateConfig', props: DeepPartial<CMSConfig>): Chainable<Promise<null>>;

      login(): Chainable;
      loginAndNewPost(): Chainable;

      dragTo(selector: string, options?: { delay?: number }): Chainable;

      getMarkdownEditor(): Chainable;
      confirmMarkdownEditorContent(expected: string): Chainable;
      clearMarkdownEditorContent(): Chainable;
      confirmRawEditorContent(expected: string): Chainable;

      enter(props?: KeyProps): Chainable;
      backspace(props?: KeyProps): Chainable;
      selectAll(props?: KeyProps): Chainable;
      up(props?: KeyProps): Chainable;
      down(props?: KeyProps): Chainable;
      left(props?: KeyProps): Chainable;
      right(props?: KeyProps): Chainable;
      tabkey(props?: KeyProps): Chainable;

      selection(
        fn: (this: Cypress.ObjectLike, currentSubject: JQuery<any>) => Chainable,
      ): Chainable;
      setSelection(
        query:
          | string
          | {
              anchorQuery: string;
              anchorOffset?: number;
              focusQuery: string;
              focusOffset?: number;
            },
        endQuery: string,
      ): Chainable;

      setCursor(query: string, atStart?: boolean): Chainable;
      setCursorBefore(query: string): Chainable;
      setCursorAfter(query: string): Chainable;

      print(message: string): Chainable;

      insertCodeBlock(): Chainable;
      insertEditorComponent(title: string): Chainable;

      clickToolbarButton(title: string, opts: { times: number }): Chainable;
      clickHeadingOneButton(opts: { times: number }): Chainable;
      clickHeadingTwoButton(opts: { times: number }): Chainable;
      clickOrderedListButton(opts: { times: number }): Chainable;
      clickUnorderedListButton(opts: { times: number }): Chainable;
      clickCodeButton(opts: { times: number }): Chainable;
      clickItalicButton(opts: { times: number }): Chainable;
      clickQuoteButton(opts: { times: number }): Chainable;
      clickLinkButton(opts: { times: number }): Chainable;
      clickModeToggle(): Chainable;
    }
  }
}
