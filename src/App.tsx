import type { Klass } from 'lexical';

import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { HashtagNode } from '@lexical/hashtag';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { MarkNode } from '@lexical/mark';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { LexicalNode } from 'lexical';

import { Editor } from './Editor';
import { Settings } from './Settings';
import { isDevPlayground } from './appSettings';
import logo from './assets/lexical-logo.svg';
import { SharedHistoryContext, TableContext, ToolbarContext, useSettings } from './context';
import { EquationNode, ImageNode, InlineImageNode, KeywordNode, MentionNode, PageBreakNode } from './editor/nodes';
import { DocsPlugin, PasteLogPlugin, TestRecorderPlugin, TypingPerfPlugin } from './editor/plugins';
import { PlaygroundEditorTheme } from './themes';
import { $prepopulatedRichText, buildImportMap } from './utils';

import styles from './App.module.css';

const PlaygroundNodes: Array<Klass<LexicalNode>> = [
  AutoLinkNode,
  CodeHighlightNode,
  CodeNode,
  EquationNode,
  HashtagNode,
  HeadingNode,
  HorizontalRuleNode,
  ImageNode,
  InlineImageNode,
  KeywordNode,
  LinkNode,
  ListItemNode,
  ListNode,
  MarkNode,
  MentionNode,
  PageBreakNode,
  QuoteNode,
  TableCellNode,
  TableNode,
  TableRowNode,
];

function App() {
  const {
    settings: { emptyEditor, measureTypingPerf },
  } = useSettings();

  const initialConfig = {
    editorState: emptyEditor ? undefined : $prepopulatedRichText,
    html: { import: buildImportMap() },
    namespace: 'Playground',
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  return (
    <div className={styles.app}>
      <LexicalComposer initialConfig={initialConfig}>
        <SharedHistoryContext>
          <TableContext>
            <ToolbarContext>
              <header>
                <a href="https://lexical.dev" target="_blank" rel="noreferrer">
                  <img src={logo} alt="Lexical Logo" />
                </a>
              </header>
              <div className="editor-shell">
                <Editor />
              </div>
              <Settings />
              {isDevPlayground ? <DocsPlugin /> : null}
              {isDevPlayground ? <PasteLogPlugin /> : null}
              {isDevPlayground ? <TestRecorderPlugin /> : null}
              {measureTypingPerf ? <TypingPerfPlugin /> : null}
            </ToolbarContext>
          </TableContext>
        </SharedHistoryContext>
      </LexicalComposer>
    </div>
  );
}

export default App;
