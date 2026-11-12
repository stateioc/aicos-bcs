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

import { computed, ComputedRef, reactive, Ref } from 'vue';

import $store from '@/store';

export interface IPageConf {
  current: number;
  limit: number;
}

export interface IPagination extends IPageConf {
  count: number;
  showTotalCount: boolean;
}

export interface IOptions extends IPageConf {
  onPageChange?: (page: number) => any;
  onPageSizeChange?: (pageSize: number) => any;
}

export interface IPageConfResult {
  curPageData: ComputedRef<any[]>;
  pageChange: (page: number) => void;
  pageSizeChange: (size: number) => void;
  pageConf: IPageConf;
  pagination: ComputedRef<IPagination>;
  handleResetPage: Function;
}

/**
 * 前端分页
 * @param data 全量数据
 * @param options 配置数据
 */
export default function usePageConf<T>(data: Ref<T[]>, options: IOptions = {
  current: 1,
  limit: $store.state.globalPageSize || 10,
}): IPageConfResult {
  const pageConf = reactive<IPageConf>({
    current: options.current,
    limit: options.limit,
  });

  const curPageData = computed<T[]>(() => {
    const { limit, current } = pageConf;
    return data.value.slice(limit * (current - 1), limit * current);
  });

  const pageChange = (page = 1) => {
    pageConf.current = page;
    const { onPageChange = null } = options;
    onPageChange && typeof onPageChange === 'function' && onPageChange(page);
  };

  const pageSizeChange = (pageSize = 10) => {
    pageConf.limit = pageSize;
    $store.commit('updatePageSize', pageSize);
    pageConf.current = 1;
    const { onPageSizeChange = null } = options;
    onPageSizeChange && typeof onPageSizeChange === 'function' && onPageSizeChange(pageSize);
  };

  const pagination = computed<IPagination>(() => ({
    ...pageConf,
    showTotalCount: true,
    count: data.value.length,
  }));

  const handleResetPage = () => {
    pageConf.current = 1;
  };

  return {
    pageConf,
    pagination,
    curPageData,
    pageChange,
    pageSizeChange,
    handleResetPage,
  };
}
