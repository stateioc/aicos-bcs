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

import { Ref, ref, watch } from 'vue';

import $bkInfo from '@/components/bk-magic-2.0/bk-info';
import $i18n from '@/i18n/i18n-setup';

export interface IConfig {
  watchOnce?: boolean
}
export default function useSideslider(data: Ref<any> = ref(''), config: IConfig = { watchOnce: false }) {
  const isChanged = ref(false);

  const watchOnce = watch(data, () => {
    isChanged.value = true;
    config.watchOnce && watchOnce();
  }, { deep: true });

  const handleBeforeClose = () => new Promise((resolve, reject) => {
    if (!isChanged.value) {
      resolve(true);
      return;
    };
    $bkInfo({
      title: $i18n.t('generic.msg.info.exitTips.text'),
      subTitle: $i18n.t('generic.msg.info.exitTips.subTitle'),
      clsName: 'custom-info-confirm default-info',
      okText: $i18n.t('generic.button.exit'),
      cancelText: $i18n.t('generic.button.cancel'),
      confirmFn() {
        resolve(true);
      },
      cancelFn() {
        reject(false);
      },
    });
  });

  const reset = () => {
    setTimeout(() => {
      isChanged.value = false;
    });
  };

  const setChanged = (v: boolean) => {
    isChanged.value = v;
  };

  return {
    isChanged,
    reset,
    setChanged,
    handleBeforeClose,
  };
}
