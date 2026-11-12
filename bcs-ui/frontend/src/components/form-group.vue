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
  <section class="form-group">
    <div class="form-group-title" @click="toggleActive">
      <span class="left">
        <span
          class="icon"
          :style="!active ? 'transform: rotate(-90deg);' : 'transform: rotate(0deg);'"
          v-if="allowToggle">
          <i class="bcs-icon bcs-icon-down-shape"></i>
        </span>
        <span class="label">{{ title }}</span>
        <span class="desc">{{ desc }}</span>
      </span>
      <slot name="title"></slot>
    </div>
    <div class="form-group-content" v-show="active">
      <slot></slot>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FormGroup',
  props: {
    title: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
    defaultActive: {
      type: Boolean,
      default: true,
    },
    allowToggle: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx) {
    const { emit } = ctx;
    const active = ref(props.defaultActive);
    const toggleActive = () => {
      if (!props.allowToggle) return;
      active.value = !active.value;
      emit('toggle', active.value);
    };
    return {
      active,
      toggleActive,
    };
  },
});
</script>
<style lang="postcss" scoped>
.form-group {
    background: #fff;
    border-radius: 2px;
    font-size: 12px;
    padding: 20px 16px;
    &-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        .left {
            display: flex;
            align-items: center;
        }
        .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            transition: all 0.2s ease;
        }
        .label {
            font-size: 14px;
            font-weight: 700;
            line-height: 22px;
        }
        .desc {
            margin-left: 16px;

        }
    }
    &-content {
        padding-top: 32px;
    }
}
</style>
