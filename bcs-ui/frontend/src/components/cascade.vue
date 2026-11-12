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
  <bcs-dropdown-menu trigger="click" @hide="handleHideDropDown" @show="handleShowDropDown">
    <template #dropdown-trigger>
      <slot></slot>
    </template>
    <template #dropdown-content>
      <BcsCascadeItem ref="cascadeRef" :list="list" @click="handleClickItem" />
    </template>
  </bcs-dropdown-menu>
</template>
<script lang="ts">
import {  defineComponent, PropType, ref } from 'vue';

import BcsCascadeItem from './cascade-item.vue';

export interface IData {
  id: string
  label: string
  children?: IData[]
}

export default defineComponent({
  name: 'BcsCascade',
  components: { BcsCascadeItem },
  props: {
    list: {
      type: Array as PropType<IData[]>,
      default: () => ([]),
    },
  },
  setup(props, ctx) {
    const cascadeRef = ref<any>(null);
    const handleClickItem = (item: IData) => {
      ctx.emit('click', item);
      cascadeRef.value?.hide();
    };
    const handleShowDropDown = () => {
      ctx.emit('show');
    };
    const handleHideDropDown = () => {
      cascadeRef.value?.hide();
      ctx.emit('hide');
    };
    return {
      cascadeRef,
      handleClickItem,
      handleShowDropDown,
      handleHideDropDown,
    };
  },
});
</script>
