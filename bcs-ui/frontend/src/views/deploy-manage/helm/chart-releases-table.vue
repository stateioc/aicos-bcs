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
  <div>
    <bcs-alert type="warning" :title="$t('deploy.helm.deleteWarning')" class="mb-[10px]"></bcs-alert>
    <bcs-table :data="data">
      <bcs-table-column :label="$t('generic.label.cluster1')" prop="clusterID"></bcs-table-column>
      <bcs-table-column :label="$t('k8s.namespace')" prop="namespace"></bcs-table-column>
      <bcs-table-column :label="$t('generic.label.name')" prop="name"></bcs-table-column>
      <!-- <bcs-table-column :label="$t('generic.label.action')" width="80">
        <template #default="{ row }">
          <bcs-button text @click="handleGotoChartRelease(row)">{{$t('generic.button.view')}}</bcs-button>
        </template>
      </bcs-table-column> -->
    </bcs-table>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import $router from '@/router';

export default defineComponent({
  name: 'ChartReleasesTable',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const handleGotoChartRelease = (row) => {
      const { href } = $router.resolve({
        name: 'releaseList',
        query: {
          name: row.name,
          namespace: row.namespace,
        },
      });
      window.open(href);
    };

    return {
      handleGotoChartRelease,
    };
  },
});
</script>
