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
  <div :class="['editor-status bcs-ellipsis', theme]">
    <i :class="['bcs-icon', `bcs-icon-${icon}`]"></i>
    <span class="message">{{ message }}</span>
  </div>
</template>
<script>
import { computed, defineComponent, toRefs } from 'vue';

export default defineComponent({
  name: 'EditorStatus',
  props: {
    theme: {
      type: String,
      default: 'error',
    },
    message: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { theme } = toRefs(props);
    const icon = computed(() => {
      const iconMap = {
        error: 'close-circle-shape',
        default: 'info-circle-shape',
      };
      return iconMap[theme.value] || 'info-circle-shape';
    });

    return {
      icon,
    };
  },
});
</script>
<style lang="postcss" scoped>
.editor-status {
    height: 100%;
    border-left: 4px solid;
    padding: 8px 16px;
    background: #212121;
    border-radius: 0px 0px 2px 2px;
    display: flex;
    align-items: flex-start;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    i {
        font-size: 12px;
        margin-top: 6px;
    }
    &.error {
        border-left-color: #b34747;
        i {
            color: #b34747;
        }
    }
    .message {
        margin-left: 8px;
        color: #dcdee5;
        line-height: 20px;
        font-size: 12px;
    }
}
</style>
