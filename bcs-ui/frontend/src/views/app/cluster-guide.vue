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
  <bcs-exception type="empty" scene="page">
    <div class="flex justify-center text-[24px]">{{ $t('cluster.msg.emptyCluster') }}</div>
    <div class="mt-[16px] text-[14px] text-[#979BA5]">{{ $t('cluster.msg.emptyClusterGuide') }}</div>
    <div class="flex justify-center mt-[24px]">
      <bk-button
        class="min-w-[116px]"
        theme="primary"
        :disabled="!hasSharedCluster"
        v-if="hasSharedCluster"
        @click="handleGotoResourceView">{{ $t('cluster.button.useSharedCluster') }}</bk-button>
      <bk-button
        class="min-w-[116px]"
        v-authority="{
          actionId: 'cluster_create',
          resourceName: curProject.project_name,
          permCtx: {
            resource_type: 'project',
            project_id: curProject.project_id
          }
        }"
        @click="handleCreateCluster">{{ $t('cluster.button.addCluster') }}</bk-button>
    </div>
    <div class="flex justify-center mt-[16px]">
      <bk-button text @click="handleGotoDoc">
        <span class="relative top-[-1px]">
          <i class="bcs-icon bcs-icon-question-circle"></i>
        </span>
        {{ $t('generic.button.gameGuide') }}
      </bk-button>
    </div>
  </bcs-exception>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';

import { useCluster, useProject } from '@/composables/use-app';
import $router from '@/router';

export default defineComponent({
  name: 'ClusterGuide',
  setup() {
    const { curProject } = useProject();
    const { clusterList } = useCluster();
    const hasSharedCluster = computed(() => clusterList.value.some(item => item.is_shared));
    const handleGotoResourceView = () => {
      $router.push({ name: 'dashboardNamespace' });
    };
    const handleCreateCluster = () => {
      $router.push({ name: 'clusterCreate' });
    };
    const handleGotoDoc = () => {
      window.open(window.BCS_CONFIG?.help);
    };

    return {
      handleGotoResourceView,
      handleCreateCluster,
      handleGotoDoc,
      hasSharedCluster,
      curProject,
    };
  },
});
</script>
