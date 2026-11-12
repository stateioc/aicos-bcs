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
  <div
    class="flex items-center cursor-pointer text-[#979ba5] h-[32px]"
    @click="handleClick">
    <span
      class="ml-[-6px] transition-all relative top-[-1px]"
      :style="collapse ? 'transform: rotate(-90deg);' : 'transform: rotate(0deg);'">
      <i class="bcs-icon bcs-icon-down-shape"></i>
    </span>
    <span class="ml-[8px]">{{ title }}</span>
  </div>
</template>
<script lang="ts" setup>

defineProps({
  title: {
    type: String,
    default: '',
  },
  collapse: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['click']);

const handleClick = () => {
  emits('click');
};
</script>
