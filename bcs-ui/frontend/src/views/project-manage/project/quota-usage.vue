<!--
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
-->

<template>
  <div class="p-[20px]">
    <bk-table :data="data.nodeGroups || []" :outer-border="false">
      <bk-table-column :label="$t('generic.label.cluster')" prop="clusterId">
        <template #default="{ row }">
          <bk-button :disabled="!projectCode" text @click="handleCluster(row.clusterId)">
            {{ row.clusterId }}
          </bk-button>
        </template>
      </bk-table-column>
      <bk-table-column :label="$t('cluster.ca.nodePool.label.ID')" prop="nodeGroupId" />
      <bk-table-column :label="$t('cluster.ca.nodePool.label.nodeQuota')" prop="quotaNum" />
      <bk-table-column :label="$t('cluster.ca.nodePool.label.nodeCounts')" prop="quotaUsed" />
    </bk-table>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import $store from '@/store';

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const projectCode = computed(() => $store.getters.curProjectCode);

function handleCluster(clusterId: string) {
  const url = new URL(`${SITE_URL}/projects/${projectCode.value}/clusters/${clusterId}/workloads/deployments`, window.location.origin);
  window.open(url.toString(), '_blank');
}
</script>
