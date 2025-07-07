/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { ShowFlashMessage } from '../context';

import { useFlashMessageContext } from '../context';

export function useFlashMessage(): ShowFlashMessage {
  return useFlashMessageContext();
}
