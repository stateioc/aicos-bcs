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
  <bk-form class="bcs-small-form">
    <!-- 微软云 -->
    <bk-form-item :label="$t('azureCloud.label.clusterType')">
      <span class="text-[#313238]">
        {{ $t('azureCloud.label.managed') }}
      </span>
      <span class="text-[#979BA5]">
        ({{ $t('azureCloud.label.aksDesc') }})
      </span>
    </bk-form-item>
  </bk-form>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';

import { useCluster } from '@/composables/use-app';

export default defineComponent({
  name: 'AzureMaster',
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

    // google cloud locationType
    const locationType = computed(() => curCluster.value?.extraInfo?.locationType);


    return {
      curCluster,
      locationType,
    };
  },
});
</script>
