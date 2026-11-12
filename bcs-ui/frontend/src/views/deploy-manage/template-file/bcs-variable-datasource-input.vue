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
  <PopoverSelector
    class="w-full"
    offset="0,6"
    trigger="manual"
    placement="bottom-start"
    :disabled="disableVarList"
    ref="popoverRef">
    <bcs-input v-bind="$attrs" :value="value" @input="handleInput"></bcs-input>
    <template #content>
      <ul class="max-h-[360px] overflow-auto">
        <li
          class="bcs-dropdown-item"
          v-for="item in newDatasource"
          :key="item.id"
          @click="handleSetVar(item.key)">
          <span>{{ `\{\{ ${item.key} \}\}` }}</span>
          <span class="text-[#979BA5]">{{ item.name }}</span>
        </li>
      </ul>
    </template>
  </PopoverSelector>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

import { store as fileStore } from './use-store';

import PopoverSelector from '@/components/popover-selector.vue';
type DataSourceItem = {
  label: string;
  value: string;
};
interface Props {
  value?: string | number
  disableVarList?: boolean
  type?: string
  datasource?: DataSourceItem[]
}
type Emits = (e: 'input', v: string|number) => void;

const props = withDefaults(defineProps<Props>(), {
  value: () => '',
  disableVarList: () => false,
  type: () => 'text',
  datasource: () => [],
});
const emits = defineEmits<Emits>();

const popoverRef = ref();
function handleInput(v: string) {
  let value: string|number = v;
  if (props.type === 'number' && !isNaN(Number(v))) {
    value = Number(v);
  }
  emits('input', value);
  if (typeof v === 'string' && v.indexOf('{{') === 0) {
    popoverRef.value?.show();
  }
}
const newDatasource = computed(() => (props.datasource?.length
  ? props.datasource.map(item => ({
    key: item.value,
    name: item.label,
  }))
  : fileStore.varList));

function handleSetVar(key: string) {
  emits('input', `{{ ${key} }}`);
  popoverRef.value?.hide();
}
</script>
<style scoped lang="postcss">
>>> .bk-tooltip-ref {
  width: 100%;
}
</style>
