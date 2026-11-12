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
  <bk-form class="bcs-small-form px-[60px] py-[24px]">
    <bk-form-item :label="$t('cluster.labels.cpuQuota')">
      {{ quota.cpuLimits ? `${quota.cpuLimits}${$t('units.suffix.cores')}` : '--' }}
    </bk-form-item>
    <bk-form-item :label="$t('cluster.labels.memQuota')">
      {{ quota.memoryLimits ? `${quota.memoryLimits}B` : '--' }}
    </bk-form-item>
    <bk-form-item :label="$t('cluster.labels.maxNodePodNum')">
      {{ networkSettings.maxNodePodNum || '--' }}
    </bk-form-item>
    <bk-form-item :label="$t('cluster.create.label.networkSetting1.maxServiceNum')">
      {{ networkSettings.maxServiceNum || '--' }}
    </bk-form-item>
  </bk-form>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import { useClusterList } from '../cluster/use-cluster';

const props = defineProps({
  clusterId: {
    type: String,
    default: '',
    required: true,
  },
});

const {  clusterList } = useClusterList();
const curCluster = computed(() => clusterList.value.find(item => item.clusterID === props.clusterId));
const networkSettings = computed(() => curCluster.value?.networkSettings || {
  maxNodePodNum: '',
  maxServiceNum: '',
});
const quota = computed<{
  cpuLimits: string
  memoryLimits: string
}>(() => {
  let data = {
    cpuLimits: '',
    memoryLimits: '',
  };
  try {
    data = JSON.parse(curCluster.value?.extraInfo?.namespaceInfo || {})?.quota || {};
  } catch (_) {
    data = {
      cpuLimits: '',
      memoryLimits: '',
    };
  }
  return data;
});

</script>
