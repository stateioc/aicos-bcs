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

import { computed, onActivated, onBeforeUnmount, onDeactivated, onUnmounted, ref } from 'vue';

import { getFederalCluster } from '@/api/modules/cluster-manager';
import { ICluster } from '@/composables/use-app';
import $store from '@/store';

// 添加子集群过程为异步，需要前端记录当前是否在添加子集群，然后轮询
export const isAdding = ref(false);

export function useFederation() {
  const clusterList = computed<ICluster[]>(() => $store.state.cluster.clusterList);
  const curPageData = ref<any[]>([]);
  const loading = ref(false);
  const curClusterId = ref('');
  const timer = ref<any>(null);

  async function getFederationCluster() {
    if (timer.value) clearTimeout(timer.value);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { sub_clusters = [] } = await getFederalCluster({
      $federationClusterId: curClusterId.value,
    }).catch(() => []);
    // 如果存在添加中的集群，则说明添加子集群已完成
    if (runningClusterIds.value.length) {
      isAdding.value = false;
    }
    curPageData.value = sub_clusters.reduce((pre, cur) => {
      const { sub_cluster_id: clusterId } = cur;
      const cluster = clusterList.value.find(item => item.cluster_id === clusterId);
      pre.push({
        ...cluster,
        ...cur,
        status: cur.status === 'Running' ? 'RUNNING' : cur.status,
      });
      return pre;
    }, []);
    // 开启轮询
    if (runningClusterIds.value.length || isAdding.value) {
      timer.value = setTimeout(() => {
        getFederationCluster();
      }, isAdding.value ? 1000 : 5000);
    }
  }

  const runningClusterIds = computed(() => curPageData.value.filter(item => ['Creating', 'Deleting']
    .includes(item.status)).map(item => item.cluster_id));

  function stop() {
    if (timer.value) clearTimeout(timer.value);
  }

  onActivated(async () => {
    // 重新获取列表
    loading.value = true;
    await getFederationCluster();
    loading.value = false;
  });

  onBeforeUnmount(stop);
  onUnmounted(stop);
  onDeactivated(stop);

  return {
    loading,
    curPageData,
    curClusterId,
    runningClusterIds,
    getFederationCluster,
  };
}
