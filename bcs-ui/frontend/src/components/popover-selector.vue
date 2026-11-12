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
    :theme="`light ${theme}`"
    :offset="offset"
    :placement="placement"
    :arrow="false"
    :trigger="trigger"
    :tippy-options="tippyOptions"
    :always="always"
    :on-hide="onHide"
    :on-show="onShow"
    :disabled="disabled"
    ref="popoverRef">
    <slot></slot>
    <template slot="content">
      <div class="py-[4px] bg-[#fff]">
        <slot name="content"></slot>
      </div>
    </template>
  </bcs-popover>
</template>
<script lang="ts">
import { defineComponent, onUnmounted, ref } from 'vue';

export default defineComponent({
  name: 'PopoverSelector',
  props: {
    trigger: {
      type: String,
      default: 'click',
    },
    offset: {
      type: String,
      default: '0, 20',
    },
    placement: {
      type: String,
      default: 'bottom',
    },
    always: {
      type: Boolean,
      default: false,
    },
    tippyOptions: {
      type: Object,
      default: () => ({}),
    },
    onHide: Function,
    onShow: Function,
    disabled: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: 'navigation-message',
    },
  },
  setup() {
    const popoverRef = ref<any>(null);
    const show = () => {
      popoverRef.value?.showHandler();
    };
    const hide = () => {
      popoverRef.value?.hideHandler();
    };
    onUnmounted(() => {
      hide();
    });
    return {
      popoverRef,
      show,
      hide,
    };
  },
});
</script>
