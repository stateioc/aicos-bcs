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

import { throttle } from 'lodash';
import { onBeforeUnmount, onMounted, Ref, ref } from 'vue';;

interface IRange {
  min: number
  max: number
  cols: number
}
// 自适应布局
export default function useAutoCols(el: Ref<any>, range: IRange[]) {
  const cols = ref(1);
  const setCols = throttle(() => {
    const width = el.value?.clientWidth || 0;
    const item = range.find(item => width <= item.max && width > item.min);
    cols.value = item?.cols || 1;
  }, 200);
  const observer = new ResizeObserver(() => {
    window.requestAnimationFrame(() => {
      setCols();
    });
  });

  onMounted(() => {
    observer.observe(el.value);
  });

  onBeforeUnmount(() => {
    observer.disconnect();
  });

  return {
    cols,
  };
}
