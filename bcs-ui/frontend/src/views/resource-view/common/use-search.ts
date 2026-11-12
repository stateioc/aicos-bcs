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

import { cloneDeep } from 'lodash';
import { computed, ref } from 'vue';

import useViewConfig from '../view-manage/use-view-config';

import { ISearchSelectValue } from '@/@types/bkui-vue';
import $i18n from '@/i18n/i18n-setup';
import $store from '@/store';

export default function useSearch() {
  const { curViewData } = useViewConfig();
  // search select数据
  const searchSelectKey = ref('');
  const searchSelectValue = computed<ISearchSelectValue[]>(() => {
    const data: ISearchSelectValue[] = [];
    if (curViewData.value?.name) {
      data.push({
        id: 'name',
        name: $i18n.t('view.labels.resourceName'),
        values: [{ name: curViewData.value?.name }],
      });
    }
    if (curViewData.value?.creator?.length) {
      data.push({
        id: 'creator',
        name: $i18n.t('view.labels.creator'),
        values: curViewData.value?.creator?.map(name => ({ name })),
      });
    }
    return data;
  });
  const searchSelectDataSource = ref([
    {
      name: $i18n.t('view.labels.resourceName'),
      id: 'name',
    },
    {
      name: $i18n.t('view.labels.creator'),
      id: 'creator',
    },
  ]);
  const searchSelectData = computed(() => {
    const ids = searchSelectValue.value.map(item => item.id);
    return searchSelectDataSource.value.filter(item => !ids.includes(item.id));
  });
  const searchSelectChange = (v: any[] = []) => {
    const data = v.reduce((pre, item) => {
      let newItem = cloneDeep(item);
      // 没有选择字段时默认搜索名称
      if (newItem.values === undefined) {
        newItem = {
          id: 'name',
          values: [item],
        };
      }
      if (newItem.id === 'name') { // 名称API只能给字符串类型
        pre[newItem.id] = newItem.values?.map(item => item.name)?.join('');
      } else {
        pre[newItem.id] = newItem.values?.map(item => item.name);
      }
      return pre;
    }, {});
    $store.commit('updateTmpViewData', {
      filter: data,
    });
    // hack 修复search select搜索完后还展示的BUG
    setTimeout(() => {
      searchSelectKey.value = new Date().getTime()
        .toString();
    });
  };

  return {
    searchSelectDataSource,
    searchSelectData,
    searchSelectValue,
    searchSelectKey,
    searchSelectChange,
  };
}
