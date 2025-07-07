import { editorStateFromSerializedDocument } from '@lexical/file';
import { CLEAR_HISTORY_COMMAND, LexicalEditor } from 'lexical';

export type ContentValue = '10k' | '20k' | '40k';

export function loadArchive(editor: LexicalEditor, value: ContentValue): void {
  const url = `/archives/${value}-nodes-document.lexical`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch archive: ${response.statusText}`);
      }
      return response.blob();
    })
    .then((blob) => {
      const reader = new FileReader();
      reader.readAsText(blob, 'UTF-8');

      reader.onload = (readerEvent) => {
        if (readerEvent.target?.result) {
          const content = readerEvent.target.result as string;

          editor.setEditorState(editorStateFromSerializedDocument(editor, content));
          editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
        }
      };
    })
    .catch((error) => {
      console.error('Failed to load archive:', error);
    });
}
