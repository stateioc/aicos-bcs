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
    :class="['transition-all rounded-sm',active ? 'bg-[#FFF3E1]' : '']"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave">
    <div class="flex items-center justify-between text-[12px] mb-[6px] leading-[20px]">
      <span>{{ title }}</span>
      <span class="text-[#979BA5]" v-if="isHover">
        <i class="bcs-icon bcs-icon-close3-shape cursor-pointer ml-[10px]" v-if="deletable" @click="deleteField"></i>
      </span>
    </div>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
defineProps({
  title: {
    type: String,
  },
  top: {
    type: Boolean,
    default: false,
  },
  deletable: {
    type: Boolean,
    default: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['delete']);

const isHover = ref(false);
const handleMouseEnter = () => {
  isHover.value = true;
};
const handleMouseLeave = () => {
  isHover.value = false;
};

const deleteField = () => {
  emits('delete');
};
</script>
<style scoped lang="postcss">
.is-top {
  display: inline-flex;
  transform: rotate(180deg);
}
</style>
