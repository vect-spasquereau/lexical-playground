import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

import { useModal } from '../../../hooks';
import { Button, DialogButtonsList } from '../../../ui';
import { ContentValue, loadArchive } from './utils';

type ContentOption = Record<string, { value: ContentValue; text: string }>;

const options: ContentOption = {
  '10k': { value: '10k', text: '10k document' },
  '20k': { value: '20k', text: '20k document' },
  '40k': { value: '40k', text: '40k document' },
};

const ContentLoaderDialog = ({
  onClose,
}: {
  onClose: () => void;
}): JSX.Element => {
  const onClick = (value: ContentValue) => {
    location.search = `?document-size=${value}`;
    onClose();
  };

  return (
    <DialogButtonsList>
      {Object.values(options).map((option) => (
        <Button
          key={option.value}
          data-test-id={`content-loader-option-${option.value}`}
          onClick={() => onClick(option.value)}
        >
          {option.text}
        </Button>
      ))}
    </DialogButtonsList>
  );
};

export const ContentLoaderPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const [modal, showModal] = useModal();

  const { search } = window.location;

  useEffect(() => {
    const params = new URLSearchParams(search);
    const content = params.get('document-size');

    if (content && Object.keys(options).includes(content)) {
      loadArchive(editor, content as ContentValue);
    }
  }, [search]);

  return (
    <>
      <button
        id="content-loader-button"
        className="content-loader-button"
        title="Content Loader"
        onClick={() => showModal('Load large document', (onClose) => <ContentLoaderDialog onClose={onClose} />)}
      />
      {modal}
    </>
  );
};
