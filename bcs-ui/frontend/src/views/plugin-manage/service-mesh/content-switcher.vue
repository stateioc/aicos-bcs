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
    <div class="bg-[#F0F1F5] px-[8px] py-[4px] rounded-sm flex items-center">
      <slot name="label">
        <span class="text-[12px]">{{ label }}</span>
      </slot>
      <bcs-popconfirm
        :title="$t('serviceMesh.tips.cancelTitle')"
        :content="$t('serviceMesh.tips.cancelSubTitle')"
        width="280"
        trigger="manual"
        placement="bottom-start"
        ref="popoverRef"
        @confirm="handleConfirm">
        <span class="ml-[10px]" v-bk-tooltips="{ content: disabledDesc, disabled: !disabled }">
          <bcs-switcher
            v-if="!readonly"
            :value="active"
            :disabled="disabled"
            size="small"
            :pre-check="handlePreCheck"
            @change="handleChange">
          </bcs-switcher>
        </span>
      </bcs-popconfirm>
    </div>
    <div class="border border-t-0 p-[16px]" v-show="active || readonly">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'ContentSwitcher',
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    beforeClose: {
      type: Function,
      required: false,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    disabledDesc: {
      type: String,
      default: '',
    },
  },
  setup(props, ctx) {
    const active = ref<boolean>(props.modelValue);
    const popoverRef = ref<any>(null);
    const popoverInstance = computed(() => (popoverRef.value?.$children?.[0] || null));
    function handleChange(value: boolean) {
      ctx.emit('update:modelValue', value);
      ctx.emit('change', value);
    };

    function handleConfirm() {
      if (typeof props.beforeClose === 'function') {
        props.beforeClose();
        popoverInstance.value?.hideHandler?.();
      }
      handleChange(false);
    }
    function handlePreCheck() {
      if (props.modelValue && typeof props.beforeClose === 'function') {
        popoverInstance.value?.showHandler?.();
        return false;
      };
      return true;
    }

    watch(() => props.modelValue, () => {
      active.value = props.modelValue;
    });

    return {
      active,
      popoverRef,
      handleChange,
      handleConfirm,
      handlePreCheck,
    };
  },
});
</script>
