/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { JSX } from 'react';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { SelectionAlwaysOnDisplay } from '@lexical/react/LexicalSelectionAlwaysOnDisplay';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { useLexicalEditable } from '@lexical/react/useLexicalEditable';
import { CAN_USE_DOM } from '@lexical/utils';
import cn from 'classnames';
import { useEffect, useState } from 'react';

import { useSettings, useSharedHistoryContext } from './context';
import {
  ActionsPlugin,
  AutoEmojiPlugin,
  AutoLinkPlugin,
  CodeHighlightPlugin,
  ComponentPickerPlugin,
  DraggableBlockPlugin,
  EmojiPlugin,
  EquationPlugin,
  FloatingLinkEditorPlugin,
  FloatingTextFormatPlugin,
  ImagePlugin,
  InlineImagePlugin,
  LinkPlugin,
  MentionPlugin,
  PageBreakPlugin,
  ShortcutsPlugin,
  TabFocusPlugin,
  TableActionsPlugin,
  TableCellResizerPlugin,
  TableHoverActionsPlugin,
  TableOfContentsPlugin,
  ToolbarPlugin,
} from './editor/plugins';
import { PLAYGROUND_TRANSFORMERS } from './editor/plugins/markdown';
import { ContentEditable } from './ui';

export function Editor(): JSX.Element {
  const { historyState } = useSharedHistoryContext();

  const {
    settings: {
      isCharLimit,
      hasLinkAttributes,
      isCharLimitUtf8,
      isRichText,
      showTreeView,
      showTableOfContents,
      shouldPreserveNewLinesInMarkdown,
      tableCellMerge,
      tableCellBackgroundColor,
      tableHorizontalScroll,
      selectionAlwaysOnDisplay,
      listStrictIndent,
    },
  } = useSettings();

  const isEditable = useLexicalEditable();

  const placeholder = isRichText ? 'Enter some rich text...' : 'Enter some plain text...';

  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] = useState<boolean>(false);
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport = CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener('resize', updateViewPortWidth);

    return () => {
      window.removeEventListener('resize', updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  return (
    <>
      {isRichText && (
        <>
          <ToolbarPlugin
            editor={editor}
            activeEditor={activeEditor}
            setActiveEditor={setActiveEditor}
            setIsLinkEditMode={setIsLinkEditMode}
          />
          <ShortcutsPlugin editor={activeEditor} setIsLinkEditMode={setIsLinkEditMode} />
        </>
      )}
      <div
        className={cn('editor-container', {
          'tree-view': showTreeView,
          'plain-text': !isRichText,
        })}
      >
        <ActionsPlugin isRichText={isRichText} shouldPreserveNewLinesInMarkdown={shouldPreserveNewLinesInMarkdown} />
        <AutoFocusPlugin />
        <AutoLinkPlugin />
        <ClearEditorPlugin />
        <ComponentPickerPlugin />
        <EmojiPlugin />
        <AutoEmojiPlugin />
        <HashtagPlugin />
        <MentionPlugin />
        {isRichText ? (
          <>
            <RichTextPlugin
              contentEditable={
                <div className="editor-scroller">
                  <div className="editor" ref={onRef}>
                    <ContentEditable placeholder={placeholder} />
                  </div>
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <CheckListPlugin />
            <ClickableLinkPlugin disabled={isEditable} />
            <CodeHighlightPlugin />
            <EquationPlugin />
            <HistoryPlugin externalHistoryState={historyState} />
            <HorizontalRulePlugin />
            <ImagePlugin />
            <InlineImagePlugin />
            <LinkPlugin hasLinkAttributes={hasLinkAttributes} />
            <ListPlugin hasStrictIndent={listStrictIndent} />
            <MarkdownShortcutPlugin transformers={PLAYGROUND_TRANSFORMERS} />
            <PageBreakPlugin />
            <TabFocusPlugin />
            <TabIndentationPlugin maxIndent={7} />
            <TableCellResizerPlugin />
            <TablePlugin
              hasCellMerge={tableCellMerge}
              hasCellBackgroundColor={tableCellBackgroundColor}
              hasHorizontalScroll={tableHorizontalScroll}
            />
            {floatingAnchorElem && (
              <>
                <FloatingLinkEditorPlugin
                  anchorElem={floatingAnchorElem}
                  isLinkEditMode={isLinkEditMode}
                  setIsLinkEditMode={setIsLinkEditMode}
                />
                <TableActionsPlugin anchorElem={floatingAnchorElem} cellMerge={true} />
                {!isSmallWidthViewport && (
                  <>
                    <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
                    <FloatingTextFormatPlugin anchorElem={floatingAnchorElem} setIsLinkEditMode={setIsLinkEditMode} />
                    <TableHoverActionsPlugin anchorElem={floatingAnchorElem} />
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <PlainTextPlugin
              contentEditable={<ContentEditable placeholder={placeholder} />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin externalHistoryState={historyState} />
          </>
        )}
        {selectionAlwaysOnDisplay && <SelectionAlwaysOnDisplay />}
        {(isCharLimit || isCharLimitUtf8) && (
          <CharacterLimitPlugin charset={isCharLimit ? 'UTF-16' : 'UTF-8'} maxLength={5} />
        )}
        <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
      </div>
    </>
  );
}
