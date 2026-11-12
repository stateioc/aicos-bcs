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
  <div class="status-loading">
    <div class="loading mr5" :style="verticalAlign">
      <svg class="round">
        <use xlink:href="#bcs-icon-color-jiazai"></use>
      </svg>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'LoadingIcon',
  props: {
    color: {
      type: String,
      default: '#3A84FF',
    },
    vertical: {
      type: String,
      default: 'middle',
    },
  },

  setup(props) {
    const verticalAlign = computed(() => ({ verticalAlign: props.vertical }));
    const bgColor = computed(() => ({ background: props.color }));
    return {
      verticalAlign,
      bgColor,
    };
  },
});
</script>
<style lang="postcss" scoped>
.status-loading {
  display: flex;
  align-items: center;
}
.loading {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-right: 2px;
  .loading-origin {
    position: absolute;
    top: 6px;
    left: 7px;
    width: 2px;
    height: 3px;
    animation: loading 1s linear infinite;
  }
  .loading-ball {
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 3px;
    border-radius: 2px;
    &:nth-child(1) {
      top: -6px;
    }
    &:nth-child(2) {
      top: -4px;
      left: 4px;
      transform: rotateZ(45deg);
      opacity: .9;
    }
    &:nth-child(3) {
      left: 6px;
      transform: rotateZ(90deg);
      opacity: .8;
    }
    &:nth-child(4) {
      top: 4px;
      left: 4px;
      transform: rotateZ(-45deg);
      opacity: .7;
    }
    &:nth-child(5) {
      top: 6px;
      opacity: .6;
    }
    &:nth-child(6) {
      top: 4px;
      left: -4px;
      transform: rotateZ(45deg);
      opacity: .5;
    }
    &:nth-child(7) {
      left: -6px;
      transform: rotateZ(90deg);
      opacity: .4;
    }
    &:nth-child(8) {
      top: -4px;
      left: -4px;
      transform: rotateZ(-45deg);
      opacity: .3;
    }
  }
}

.round {
  width: 16px;
  height: 16px;
  animation: loading 1s linear infinite;
}
</style>
