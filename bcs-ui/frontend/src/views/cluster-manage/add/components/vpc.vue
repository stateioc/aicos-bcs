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
    :loading="vpcLoading"
    searchable
    :clearable="false"
    :disabled="disabled"
    @change="handleVpcChange">
    <!-- VPC可用容器网络IP数量最低限制 -->
    <bk-option
      v-for="item in vpcList"
      :key="item.vpcId"
      :id="item[valueKey]"
      :name="`${item.name}(${item.vpcId})`">
      <div class="flex items-center place-content-between">
        <span>
          {{item.name}}
          <span class="vpc-id">{{`(${item.vpcId})`}}</span>
        </span>
      </div>
    </bk-option>
    <SelectExtension
      v-if="showLink"
      slot="extension"
      :link-text="$t('tke.link.vpc')"
      link="https://console.cloud.tencent.com/vpc/vpc"
      @refresh="handleGetVPCList" />
  </bk-select>
</template>
<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';

import { cloudVPC } from '@/api/modules/cluster-manager';
import SelectExtension from '@/components/select-extension.vue';
import $store from '@/store';
import { IVpcItem } from '@/views/cluster-manage/types/types';

const props = defineProps({
  value: {
    type: String,
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
  disabled: {
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
  showLink: {
    type: Boolean,
    default: true,
  },
  valueKey: {
    type: String,
    default: 'vpcId',
  },
});
const emits = defineEmits(['input', 'change']);

// vpc列表
const vpcLoading = ref(false);
const vpcList = ref<Array<IVpcItem>>($store.state.cloudMetadata.vpcList);
const handleGetVPCList = async () => {
  if (!props.region || !props.cloudAccountID || !props.cloudID) return;
  // Azure云组要resourceGroupName
  if (props.cloudID === 'azureCloud' && !props.resourceGroupName) return;
  vpcLoading.value = true;
  vpcList.value = await cloudVPC({
    $cloudId: props.cloudID,
    accountID: props.cloudAccountID,
    region: props.region,
    ...(props.cloudID === 'azureCloud' ? { resourceGroupName: props.resourceGroupName } : {}),
  }).catch(() => []);
  $store.commit('cloudMetadata/updateVpcList', vpcList.value);
  vpcLoading.value = false;
};
const handleVpcChange = (vpc: string) => {
  emits('change', vpc);
  emits('input', vpc);
};


watch([
  () => props.region,
  () => props.cloudAccountID,
  () => props.resourceGroupName,
], () => {
  handleGetVPCList();
});

onBeforeMount(() => {
  props.initData &&  handleGetVPCList();
});
</script>
