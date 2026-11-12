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
    :loading="regionLoading"
    :disabled="disabled"
    @change="handleRegionChange">
    <bk-option
      v-for="item in regionList"
      :key="item.region"
      :id="item.region"
      :name="item.regionName">
    </bk-option>
  </bk-select>
</template>
<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';

import { cloudRegionByAccount } from '@/api/modules/cluster-manager';
import $store from '@/store';
import { ICloudRegion } from '@/views/cluster-manage/types/types';

const props = defineProps({
  value: {
    type: String,
  },
  cloudAccountID: {
    type: String,
    default: '',
  },
  cloudID: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  initData: {
    type: Boolean,
    default: false,
  },
  filter: {
    type: Function,
    default: null,
  },
});
const emits = defineEmits(['input', 'change']);
// 区域列表
const regionLoading = ref(false);
const regionList = ref<Array<ICloudRegion>>($store.state.cloudMetadata.regionList);
const handleGetRegionList = async () => {
  if (!props.cloudAccountID || !props.cloudID) return;

  regionLoading.value = true;
  const data = await cloudRegionByAccount({
    $cloudId: props.cloudID,
    accountID: props.cloudAccountID,
  }).catch(() => []);
  $store.commit('cloudMetadata/updateRegionList', data);
  regionList.value = data.filter(item => item.regionState === 'AVAILABLE');
  if (props.filter) {
    regionList.value = props.filter(regionList.value, handleGetRegionList);
  }
  regionLoading.value = false;
};

const handleRegionChange = (region: string) => {
  emits('change', region);
  emits('input', region);
};


watch(() => props.cloudAccountID, () => {
  handleGetRegionList();
});

onBeforeMount(() => {
  props.initData && handleGetRegionList();
});
</script>
