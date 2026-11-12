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
    searchable
    :multiple="multiple"
    :disabled="disabled"
    :clearable="clearable"
    :value="value"
    :loading="securityGroupLoading"
    @change="handleSecurityGroupsChange">
    <bk-option
      v-for="item in securityGroups"
      :key="item.securityGroupID"
      :id="item.securityGroupID"
      :name="`${item.securityGroupName}(${item.securityGroupID})`">
    </bk-option>
    <SelectExtension
      v-if="showExtension"
      slot="extension"
      :link-text="$t('tke.link.securityGroup')"
      link="https://console.cloud.tencent.com/vpc/security-group"
      @refresh="handleGetSecurityGroups" />
  </bk-select>
</template>
<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';

import { cloudSecurityGroups } from '@/api/modules/cluster-manager';
import SelectExtension from '@/components/select-extension.vue';
import $store from '@/store';
import { ISecurityGroup } from '@/views/cluster-manage/types/types';;

const props = defineProps({
  value: {
    type: [String, Array],
    default: '',
  },
  region: {
    type: String,
    default: '',
  },
  cloudAccountID: {
    type: String,
    default: '',
  },
  cloudID: {
    type: String,
    default: '',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  initData: {
    type: Boolean,
    default: false,
  },
  resourceGroupName: {
    type: String,
    default: '',
  },
  showExtension: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(['input', 'change']);

// 安全组
const securityGroupLoading = ref(false);
const securityGroups = ref<Array<ISecurityGroup>>($store.state.cloudMetadata.securityGroupsList);
const handleGetSecurityGroups = async () => {
  if (!props.region || !props.cloudAccountID || !props.cloudID) return;
  // Azure云组要resourceGroupName
  if (props.cloudID === 'azureCloud' && !props.resourceGroupName) return;
  securityGroupLoading.value = true;
  securityGroups.value = await cloudSecurityGroups({
    $cloudId: props.cloudID,
    accountID: props.cloudAccountID,
    region: props.region,
    ...(props.cloudID === 'azureCloud' ? { resourceGroupName: props.resourceGroupName } : {}),
  }).catch(() => []);
  $store.commit('cloudMetadata/updateSecurityGroupsList', securityGroups.value);
  securityGroupLoading.value = false;
};

watch([
  () => props.region,
  () => props.cloudAccountID,
], () => {
  handleGetSecurityGroups();
});

const handleSecurityGroupsChange = (value) => {
  emits('input', value);
  emits('change', value);
};

onBeforeMount(() => {
  props.initData && handleGetSecurityGroups();
});
</script>
