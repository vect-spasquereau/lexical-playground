/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { HistoryState } from '@lexical/react/LexicalHistoryPlugin';
import type { Context, JSX } from 'react';

import { createEmptyHistoryState } from '@lexical/react/LexicalHistoryPlugin';
import { createContext, ReactNode, useContext, useMemo } from 'react';

type ContextShape = {
  historyState?: HistoryState;
};

const Context: Context<ContextShape> = createContext({});

export const SharedHistoryContext = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const historyContext = useMemo(() => ({ historyState: createEmptyHistoryState() }), []);
  return <Context.Provider value={historyContext}>{children}</Context.Provider>;
};

export const useSharedHistoryContext = (): ContextShape => {
  return useContext(Context);
};
