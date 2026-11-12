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

import { ref, watch } from 'vue';

export function usePage(pageOrLimitChange?: Function) {
  const pagination = ref({
    current: 1,
    count: 0,
    limit: 20,
  });

  watch(() => [pagination.value.current, pagination.value.limit], () => {
    pageOrLimitChange?.();
  });

  function handlePageChange(page: number) {
    pagination.value.current = page;
  }
  function handlePageLimitChange(limit: number) {
    pagination.value.current = 1;
    pagination.value.limit = limit;
  }
  return {
    pagination,
    handlePageChange,
    handlePageLimitChange,
  };
}
