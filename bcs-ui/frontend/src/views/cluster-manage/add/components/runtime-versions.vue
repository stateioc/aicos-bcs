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
  <bk-select
    :value="value"
    searchable
    :clearable="false"
    :loading="moduleLoading"
    :disabled="disabled"
    @change="handleRegionChange">
    <bcs-option v-for="item in runtimeVersionList" :key="item" :id="item" :name="item"></bcs-option>
  </bk-select>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue';

import { cloudVersionModules } from '@/api/modules/cluster-manager';

const props = defineProps({
  value: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  initData: {
    type: Boolean,
    default: false,
  },
  version: {
    type: String,
  },
  containerRuntime: {
    type: String,
  },
  cloudId: {
    type: String,
  },
});
const emits = defineEmits(['input', 'change', 'data-change']);
// 运行时组件参数
const moduleLoading = ref(false);
const runtimeModuleParams = ref<IRuntimeModuleParams[]>([]);
const runtimeModuleParamsMap = ref<Record<string, IRuntimeModuleParams>>({});
const runtimeVersionList = computed(() => {
  // 运行时版本
  const params = runtimeModuleParams.value
    .find(item => item.flagName === props.containerRuntime);
  return params?.flagValueList;
});
const getRuntimeModuleParams = async () => {
  if (!props.version) return;
  moduleLoading.value = true;
  const data = await cloudVersionModules({
    $cloudId: props.cloudId,
    $version: props.version,
    $module: 'runtime',
  });
  runtimeModuleParams.value = data.filter(item => item.enable);
  runtimeModuleParamsMap.value = runtimeModuleParams.value.reduce((pre, item) => {
    // eslint-disable-next-line no-param-reassign
    pre[item.flagName] = item;
    return pre;
  }, {});
  emits('data-change', runtimeModuleParams.value, runtimeModuleParamsMap.value);
  moduleLoading.value = false;
};

const handleRegionChange = (region: string) => {
  emits('change', region);
  emits('input', region);
};


watch(() => props.version, () => {
  getRuntimeModuleParams();
});

onBeforeMount(() => {
  props.initData && getRuntimeModuleParams();
});
</script>
