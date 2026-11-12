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
    <Row
      :class="[
        'h-[28px] text-[#313238] bg-[#F5F7FA] flex items-center px-[16px]',
        {
          'text-[12px]': size === 'small',
          'text-[14px]': size === 'middle'
        }
      ]">
      <template #left>{{ title }}</template>
      <template #right><slot name="title-right"></slot></template>
    </Row>
    <div
      :class="[
        'mt-[16px]',
        {
          'text-[12px]': size === 'small',
          'text-[14px]': size === 'middle'
        }
      ]">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import Row from './layout/Row.vue';
defineProps({
  title: String,
  size: {
    type: String,
    default: 'small',
  },
});
</script>
