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
  <div class="flex items-center">
    <bk-popover
      class="size-[16px] mr-[4px]"
      :content="sourceTypeMap?.[handleGetExtData(row.metadata.uid, 'createSource')]?.iconText"
      :tippy-options="{ interactive: false }">
      <i
        class="text-[14px] p-[1px]"
        :class="sourceTypeMap?.[handleGetExtData(row.metadata.uid, 'createSource')]?.iconClass"></i>
    </bk-popover>
    <span
      v-bk-overflow-tips="{ interactive: false }"
      class="bcs-ellipsis" v-if="handleGetExtData(row.metadata.uid, 'createSource') === 'Template'">
      {{ `${handleGetExtData(row.metadata.uid, 'templateName') || '--'}:${
        handleGetExtData(row.metadata.uid, 'templateVersion') || '--'}` }}
    </span>
    <span
      v-bk-overflow-tips="{ interactive: false }" class="bcs-ellipsis"
      v-else-if="handleGetExtData(row.metadata.uid, 'createSource') === 'Helm'">
      {{ handleGetExtData(row.metadata.uid, 'chart')
        ?`${handleGetExtData(row.metadata.uid, 'chart') || '--'}`
        : 'Helm' }}
    </span>
    <span
      v-bk-overflow-tips="{ interactive: false }" class="bcs-ellipsis"
      v-else>{{ handleGetExtData(row.metadata.uid, 'createSource') }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'SourceTableCell',
  props: {
    row: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    sourceTypeMap: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    // 接收handleGetExtData方法
    const handleGetExtData = inject('handleGetExtData') as (uid: string, ext?: string, defaultData?: any) => any;

    return {
      handleGetExtData,
    };
  },
});
</script>
