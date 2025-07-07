/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { JSX } from 'react';

import './ContentEditable.css';

import { ContentEditable as LexicalContentEditable } from '@lexical/react/LexicalContentEditable';

type Props = {
  className?: string;
  placeholderClassName?: string;
  placeholder: string;
};

export function ContentEditable({ className, placeholder, placeholderClassName }: Props): JSX.Element {
  return (
    <LexicalContentEditable
      className={className ?? 'ContentEditable__root'}
      aria-placeholder={placeholder}
      placeholder={<div className={placeholderClassName ?? 'ContentEditable__placeholder'}>{placeholder}</div>}
    />
  );
}
