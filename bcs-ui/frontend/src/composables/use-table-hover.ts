/*
 * SPACE-AICOS is pleased to support the open source community by making
 * SPACE-AICOS available.
 * Copyright (C) 2026 China Academy of Information and Communications Technology (CAICT).
 * All rights reserved.
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://opensource.org/licenses/MIT
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import { ref } from 'vue';

import $bkMessage from '@/common/bkmagic';
import { copyText } from '@/common/util';
import $i18n from '@/i18n/i18n-setup';

export default function useTableHover() {
  const ativeIndex = ref(-1);
  const handleMouseEnter = (index) => {
    ativeIndex.value = index;
  };
  const handleMouseLeave = () => {
    ativeIndex.value = -1;
  };
  const handleCopyContent = (value) => {
    copyText(value);
    $bkMessage({
      theme: 'success',
      message: $i18n.t('generic.msg.success.copy'),
    });
  };

  return {
    ativeIndex,
    handleMouseEnter,
    handleMouseLeave,
    handleCopyContent,
  };
}
