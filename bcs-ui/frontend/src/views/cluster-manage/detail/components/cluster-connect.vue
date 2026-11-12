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
    <template v-if="clusterConnectSetting && clusterConnectSetting.isExtranet">
      <div class="flex h-[42px] max-w-[360px] bcs-border">
        <div class="flex items-center pl-[16px] w-[80px] bg-[#FAFBFD] bcs-border-right">
          {{ $t('tke.label.securityGroup.text') }}
        </div>
        <div class="flex items-center flex-1 px-[16px] bcs-ellipsis">
          <span class="bcs-ellipsis" v-bk-overflow-tips>{{ securityGroupName
            ?`${securityGroupName}(${clusterConnectSetting.securityGroup})`
            : clusterConnectSetting.securityGroup }}</span>
        </div>
      </div>
      <div class="flex h-[42px] max-w-[360px] bcs-border mt-[-1px]">
        <div class="flex items-center pl-[16px] w-[80px] bg-[#FAFBFD] bcs-border-right">
          {{ $t('tke.label.ipAndPort') }}
        </div>
        <div class="flex items-center flex-1 px-[16px] bcs-ellipsis">{{ apiServer || '--' }}</div>
      </div>
    </template>
    <span v-else>--</span>
  </div>
</template>
<script setup lang="ts">
defineProps({
  clusterConnectSetting: {
    type: Object,
    default: () => ({}),
  },
  securityGroupName: {
    type: String,
    default: '',
  },
  apiServer: {
    type: String,
    default: '',
  },
});
</script>
