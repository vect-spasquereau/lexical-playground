import type { LexicalCommand } from 'lexical';

import { createCommand } from 'lexical';

export const INSERT_EQUATION_COMMAND: LexicalCommand<{
  equation: string;
  inline: boolean;
}> = createCommand('INSERT_EQUATION_COMMAND');
