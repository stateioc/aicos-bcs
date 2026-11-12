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
    :class="[
      'mt-[10px] rounded-sm px-[12px] py-[8px] relative',
      {
        'bg-[#FAFBFD]': showDelete && !disabled
      }
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave">
    <slot name="title">
      <div class="flex items-center h-[32px]">
        <span
          :class="[
            'leading-[18px]',
            { 'bcs-border-tips': !!desc }
          ]"
          v-bk-tooltips="{
            disabled: !desc,
            content: desc
          }">
          {{ title }}
        </span>
      </div>
    </slot>
    <slot></slot>
    <span
      class="absolute right-[4px] top-[-4px] text-[#EA3636] text-[14px] cursor-pointer"
      v-show="showDelete && !disabled"
      @click="handleDelete">
      <i class="bk-icon icon-close3-shape"></i>
    </span>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

defineProps({
  title: String,
  disabled: Boolean,
  desc: String,
});

const emits = defineEmits(['delete']);

const showDelete = ref(false);
const handleMouseEnter = () => {
  showDelete.value = true;
};
const handleMouseLeave = () => {
  showDelete.value = false;
};
const handleDelete = () => {
  emits('delete');
};
</script>
