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

import { computed, ComputedRef, Ref, ref } from 'vue';

import { padIPv6, validateIPv6 } from '@/common/util';

export interface ITableSeachResult {
  searchValue: Ref<string>;
  tableDataMatchSearch: ComputedRef<any[]>;
}

/**
 * 搜索
 * @param data
 * @param keys
 * @returns
 */
export default function useTableSearch(data: Ref<any[]>, keys: Ref<string[]>): ITableSeachResult {
  const searchValue = ref('');
  const tableDataMatchSearch = computed(() => {
    if (!searchValue.value) return data.value;

    return data.value.filter(item => keys.value.some((key) => {
      const tmpKey = String(key).split('.');
      const str = tmpKey.reduce((pre, key) => {
        if (typeof pre === 'object') {
          return pre[key];
        }
        return pre;
      }, item);
      if (validateIPv6(str)) {
        return padIPv6(str).includes(padIPv6(searchValue.value));
      }
      return String(str).toLowerCase()
        .includes(searchValue.value.toLowerCase());
    }));
  });

  return {
    searchValue,
    tableDataMatchSearch,
  };
}
