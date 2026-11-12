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
  <bcs-tag
    :class="[
      'flex items-center text-[#fff] h-[26px] cursor-pointer !px-[0px] !m-0'
    ]"
    v-bk-tooltips="{
      allowHTML: true,
      placement: 'bottom',
      content: '#viewTagTooltips'
    }"
    @click="handleTagClick">
    <span class="flex items-center">
      <span class="leading-[26px] px-[6px] bg-[#6478a0a6] break-keep">
        <slot name="label">{{ label }}</slot>
      </span>
      <span
        :class="[
          'leading-[26px] flex-1 px-[6px] bg-[#6478A0] bcs-ellipsis',
          invalid ? '!text-[#979BA5] line-through': ''
        ]">
        <slot name="value">
          <span v-for="item, index in parseValue" :key="index">
            <span :class="isValueInvalid(item) ? '!text-[#979BA5] line-through': ''">
              {{ getValue(item) }}
            </span>
            <bcs-divider
              direction="vertical"
              color="#3A4661"
              class="relative top-[2px]"
              v-if="index < (parseValue.length - 1)" />
          </span>
        </slot>
      </span>
    </span>
    <div id="viewTagTooltips">
      <slot name="tooltips">
        <div
          v-for="item, index in parseValue"
          :key="index"
          :class="index < (parseValue.length - 1) ? 'mb-[6px]' : ''">
          {{ filterXss(getValue(item)) }}
        </div>
      </slot>
    </div>
  </bcs-tag>
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue';

import { filterXss } from '@blueking/xss-filter';
const props = defineProps({
  invalid: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  value: {
    type: [String, Array] as PropType<string | string[] | {
      value: string
      invalid: boolean
    }[]>,
    default: '',
  },
});
const parseValue = computed(() => (Array.isArray(props.value) ? props.value : [props.value]));
const emits = defineEmits(['click']);

const handleTagClick = () => {
  emits('click');
};

const isValueInvalid = (item) => {
  if (typeof item === 'object') return !!item.invalid;

  return false;
};

const getValue = (item) => {
  if (typeof item === 'object') return item.value;

  return item;
};
</script>
