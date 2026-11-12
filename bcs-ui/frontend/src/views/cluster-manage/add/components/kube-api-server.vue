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
  <div class="bcs-border text-[12px] w-[280px]">
    <div class="h-[32px] bg-[#F5F7FA] px-[16px] leading-[32px]">
      {{ $t('cluster.create.label.highAvailabilityScheme.text') }}
    </div>
    <div class="min-h-[42px] px-[16px] flex items-center">
      <span v-if="enabled">
        bcs-apiserver-proxy
        <i
          class="bk-icon icon-info-circle ml-[5px] text-[16px] text-[#979ba5]"
          v-bk-tooltips="$t('cluster.create.label.highAvailabilityScheme.bcsApiServerProxy')"></i>
      </span>
      <span class="text-[#979BA5] leading-[20px]" v-else>
        {{ $t('cluster.create.label.highAvailabilityScheme.notSupport') }}
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  enabled: {
    type: Boolean,
    default: false,
  },
});
</script>
