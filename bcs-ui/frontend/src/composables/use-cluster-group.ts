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

import { computed, ref } from 'vue';

import { ICluster, useCluster } from './use-app';

import { ClusterType } from '@/components/cluster-selector/use-cluster-selector';
import $i18n from '@/i18n/i18n-setup';

export default function useClusterGroup() {
  const { clusterList, clusterNameMap } = useCluster();
  const collapseList = ref<Array<ClusterType>>([]);
  const keyword = ref('');
  // 集群分类数据
  const clusterListByType = computed(() => clusterList.value
    .filter((item) => {
      const clusterID = item?.clusterID?.toLocaleLowerCase();
      const clusterName = item?.clusterName?.toLocaleLowerCase();
      const searchKey = keyword.value?.toLocaleLowerCase();
      return (clusterID?.includes(searchKey) || clusterName?.includes(searchKey));
    })
    .reduce<Array<{
    type: ClusterType
    list: Array<Partial<ICluster>>
    title: string
  }>>((list, item) => {
    if (item.clusterType === 'virtual') {
      const data = list.find(item => item.type === 'virtual');
      // 虚拟集群属于共享集群中的一种
      data?.list.push(item);
    } else if (item.is_shared) {
      // 共享集群
      const data = list.find(item => item.type === 'shared');
      data?.list.push(item);
    } else if (item.manageType === 'MANAGED_CLUSTER') {
      // 托管集群
      const data = list.find(item => item.type === 'managed');
      data?.list.push(item);
    } else {
      // 独立集群
      const data = list.find(item => item.type === 'independent');
      data?.list.push(item);
    }
    return list;
  }, [
    {
      type: 'virtual',
      list: [],
      title: 'vCluster',
    },
    {
      type: 'managed',
      list: [],
      title: $i18n.t('bcs.cluster.managed'),
    },
    {
      type: 'independent',
      list: [],
      title: $i18n.t('bcs.cluster.selfDeployed'),
    },
    {
      type: 'shared',
      list: [],
      title: $i18n.t('bcs.cluster.share'),
    },
  ])
    .filter(item => !!item.list.length));

  const handleToggleCollapse = (type: ClusterType) => {
    const index = collapseList.value.findIndex(item => item === type);
    if (index > -1) {
      collapseList.value.splice(index, 1);
    } else {
      collapseList.value.push(type);
    }
  };
  return {
    clusterList,
    collapseList,
    clusterListByType,
    clusterNameMap,
    handleToggleCollapse,
  };
}
