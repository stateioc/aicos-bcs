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
  <BcsContent :title="$t('projects.eventQuery.title')" hide-back>
    <EventQueryTable :namespace="namespace" :cluster-id="clusterId" ns-clearable :ns-required="false"></EventQueryTable>
  </BcsContent>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

import EventQueryTable from './event-query-table.vue';

import BcsContent from '@/components/layout/Content.vue';
import $store from '@/store';

export default defineComponent({
  name: 'EventQuery',
  components: { BcsContent, EventQueryTable },
  setup() {
    const namespace = ref($store.state.curNamespace);
    const clusterId = ref($store.state.curCluster?.clusterID);

    return {
      namespace,
      clusterId,
    };
  },
});
</script>
