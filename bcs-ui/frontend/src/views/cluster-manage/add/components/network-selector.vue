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
  <bk-radio-group
    v-model="clusterConnectSetting.ITNType"
    @change="handleChange"
  >
    <div
      v-for="item in valueList"
      :key="item.value"
      class="flex items-center mb-[8px] h-[32px]">
      <bk-radio :value="item.value">
        {{ item.label }}
      </bk-radio>
    </div>
    <!-- 公网cidr -->
    <combination-input
      v-show="clusterConnectSetting?.isExtranet"
      :list="clusterConnectSetting.cidrs"
      @data-change="updateSecurityGroup"
      :ref="el => combinationInputRef = el"
      key-required
      :key-rules="keyRules" />
  </bk-radio-group>
</template>
<script setup lang="ts">
import { PropType, ref, watch } from 'vue';

import combinationInput from '@/components/combination-input.vue';
import $i18n from '@/i18n/i18n-setup';

const props = defineProps({
  value: {
    type: Object,
    default: [],
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
  valueList: {
    required: true,
    type: Array as PropType<{
      label: string;
      value: string | number;
    }[]>,
    default: () => [],
  },
});
const emits = defineEmits(['change']);

const clusterConnectSetting = ref({
  ITNType: 'intranet',
  isExtranet: false,
  internet: {
    publicIPAssigned: false,
    publicAccessCidrs: [], // 真正传给后端的ip数组
  },
  cidrs: [], // ip对象数组
});

// ip校验规则
const keyRules = [
  {
    message: $i18n.t('cluster.create.aws.cidrTips.tips1'),
    validator: '^(?!0.0.0.0/0$).*$',
  },
  {
    message: $i18n.t('cluster.create.aws.cidrTips.tips2'),
    validator: '^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]).){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])/([0-9]|[12][0-9]|3[0-2])$',
  },
];

const combinationInputRef = ref<any>(null);
// 将ip对象数组转为ip字符串数组
function updateSecurityGroup(value) {
  clusterConnectSetting.value.cidrs = value;
  clusterConnectSetting.value.internet.publicAccessCidrs = value.map(item => item.key);
}

function handleChange(value) {
  clusterConnectSetting.value.isExtranet = !!['internetAndIntranet', 'internet'].includes(value);
}

// 检验ip合法性
async function validate() {
  return await combinationInputRef.value?.validateAll();
};

// 回显
watch(() => props.value, () => {
  if (JSON.stringify(props.value) === JSON.stringify(clusterConnectSetting.value)) return;

  clusterConnectSetting.value = JSON.parse(JSON.stringify(props.value));
}, { immediate: true });

watch(clusterConnectSetting, () => {
  emits('change', clusterConnectSetting.value);
}, { deep: true });

defineExpose({ validate });
</script>
