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
  <div :class="['layout-group', size, { collapsible }]">
    <div class="title" @click="handleToggleActive">
      <span
        class="icon"
        :style="!active ? 'transform: rotate(-90deg);' : 'transform: rotate(0deg);'"
        v-if="collapsible">
        <i class="bcs-icon bcs-icon-down-shape"></i>
      </span>
      <span class="name">
        <slot name="title">{{title}}</slot>
      </span>
    </div>
    <div class="content" v-show="active">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, watch } from 'vue';

export default defineComponent({
  name: 'LayoutGroup',
  props: {
    size: {
      type: String,
      default: 'default',
    },
    collapsible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    expanded: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { expanded, collapsible } = toRefs(props);
    const active = ref(expanded.value);

    watch(expanded, () => {
      active.value = expanded.value;
    });
    function handleToggleActive() {
      if (!collapsible.value) return;
      active.value = !active.value;
    }
    return {
      active,
      handleToggleActive,
    };
  },
});
</script>
<style lang="postcss" scoped>
.layout-group {
  .title {
    position: relative;
    display: flex;
    align-items: center;
    background: #F0F1F5;
    color: #313238;
    border-radius: 2px;
    .icon {
      color: #979BA5;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      transition: all linear .2s;
    }
  }
  .content {
    padding: 10px 24px;
  }
  &.collapsible .title {
    cursor: pointer;
  }
  &.default {
    .title {
      padding: 0 24px;
      height: 32px;
      font-size: 12px;
      .icon {
        font-size: 14px;
        width: 28px;
        height: 28px;
        left: 0;
      }
    }
  }
}
</style>
