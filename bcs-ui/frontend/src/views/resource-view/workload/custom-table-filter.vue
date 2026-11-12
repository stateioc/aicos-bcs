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
  <bcs-popover
    theme="light navigation-message"
    trigger="click"
    placement="bottom"
    :on-hide="onHide"
    :on-show="onShow"
    ref="popoverRef">
    <span class="flex items-center">
      {{ label }}
      <i
        :class="[
          'bk-icon icon-funnel text-[14px]',
          !isShow ? 'text-[#c4c6cc]': '',
          searchValue ? '!text-[#3a84ff]' : ''
        ]">
      </i>
    </span>
    <template #content>
      <div class="p-[10px]">
        <bcs-input :value="searchValue" type="textarea" @change="handleInputChange"></bcs-input>
      </div>
      <div class="flex items-center h-[32px] bcs-border-top">
        <bcs-button
          class="flex-1"
          text
          size="small"
          @click="handleConfirm">{{ $t('generic.button.confirm') }}</bcs-button>
        <bcs-button
          class="flex-1"
          text
          size="small"
          @click="handleReset">{{ $t('dashboard.workload.editor.reset') }}</bcs-button>
      </div>
    </template>
  </bcs-popover>
</template>
<script setup lang="ts">
import { ref } from 'vue';

defineProps({
  label: {
    type: String,
    default: '',
  },
});

const emits = defineEmits(['confirm']);

const popoverRef = ref();
const isShow = ref(false);
const searchValue = ref('');
const tmpValue = ref('');

const handleInputChange = (value: string) => {
  tmpValue.value = value;
};

// const show = () => {
//   popoverRef.value.showHandler();
// };
const hide = () => {
  popoverRef.value.hideHandler();
};

const onHide = () => {
  isShow.value = false;
};

const onShow = () => {
  isShow.value = true;
};

const handleReset = () => {
  searchValue.value = '';
  tmpValue.value = '';
  hide();
  emits('confirm', searchValue.value);
};

const handleConfirm = () => {
  searchValue.value = tmpValue.value;
  hide();
  emits('confirm', searchValue.value);
};
</script>
