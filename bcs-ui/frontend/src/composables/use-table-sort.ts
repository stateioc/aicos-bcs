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

import { computed, Ref, ref } from 'vue';

import { sort } from '@/common/util';

export default function useTableSort(data: Ref<any[]>, extraDataFn?) {
  const sortData = ref({
    prop: '',
    order: '',
  });
  const handleSortChange = (data) => {
    sortData.value = {
      prop: data.prop,
      order: data.order,
    };
  };
  const sortTableData = computed<any[]>(() => {
    const { prop, order } = sortData.value;
    return prop ? sort(data.value, prop, order, extraDataFn) : data.value;
  });

  return {
    sortData,
    sortTableData,
    handleSortChange,
  };
}
