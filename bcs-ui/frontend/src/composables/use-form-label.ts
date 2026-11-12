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

export default function useFormLabel() {
  const minFormLabelWidth = ref(100);
  const labelWidth = ref(100);
  const initFormLabelWidth = (formRef) => {
    const el = formRef ? formRef.$el : null;
    if (!el) return;
    let max = 0;
    const leftPadding = 28;
    const safePadding = 8;
    const $labelEleList = el.querySelectorAll('.bk-label');
    $labelEleList.forEach((item) => {
      const spanEle = item.querySelector('span');
      spanEle.style = `${spanEle.style};white-space: nowrap`;
      if (spanEle) {
        const { width } = spanEle.getBoundingClientRect();
        max = Math.max(minFormLabelWidth.value, max, width);
      }
    });
    const width = Math.ceil(max + leftPadding + safePadding);
    $labelEleList.forEach((item) => {
      item.style.width = `${width}px`;
    });
    el.querySelectorAll('.bk-form-content').forEach((item) => {
      item.style.marginLeft = `${width}px`;
    });
    labelWidth.value = width || minFormLabelWidth.value;
    return labelWidth.value;
  };
  return {
    labelWidth,
    initFormLabelWidth,
  };
}
