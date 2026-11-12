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
  <component :is="masterProviderMap[provider]" :cluster-id="clusterId" v-if="provider"></component>
</template>
<script lang="ts">
import { Component, computed, defineComponent } from 'vue';

import AwsMaster from './master-aws.vue';
import AzureMaster from './master-azure.vue';
import BluekingMaster from './master-blueking.vue';
import GcpMaster from './master-gcp.vue';
import HuaweiMaster from './master-huawei.vue';
import TkeMaster from './master-tke.vue';

import { useCluster } from '@/composables/use-app';

export default defineComponent({
  name: 'ClusterMaster',
  components: {
    TkeMaster,
    GcpMaster,
    BluekingMaster,
    AzureMaster,
    AwsMaster,
    HuaweiMaster,
  },
  props: {
    clusterId: {
      type: String,
      default: '',
      required: true,
    },
  },
  setup(props) {
    const { clusterList } = useCluster();
    const curCluster = computed(() => clusterList.value.find(item => item.clusterID === props.clusterId));
    const provider = computed(() => curCluster.value?.provider);

    const masterProviderMap: Record<CloudID, Component> = {
      tencentCloud: TkeMaster,
      tencentPublicCloud: TkeMaster,
      gcpCloud: GcpMaster,
      bluekingCloud: BluekingMaster,
      azureCloud: AzureMaster,
      huaweiCloud: HuaweiMaster,
      awsCloud: AwsMaster,
    };
    return {
      provider,
      masterProviderMap,
    };
  },
});
</script>
