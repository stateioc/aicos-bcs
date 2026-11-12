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
  <!-- AI小鲸按钮 -->
  <bcs-popover
    v-if="flagsMap.BKAI"
    theme="ai-assistant light"
    placement="bottom"
    trigger="manual"
    offset="0, 10"
    ref="popoverRef">
    <span
      class="relative top-[2px] flex items-center justify-center w-[18px] h-[18px] text-[14px] cursor-pointer"
      v-bk-tooltips="$t('blueking.aiScriptsAssistant.desc')"
      @click="handleShowAssistant">
      <img :src="AssistantSmallIcon" />
    </span>
    <template #content>
      <div
        :class="[
          'bg-[#fff] px-[16px]',
          'flex items-center h-[40px]  rounded-[20px]',
          'shadow-[0_2px_6px_0_rgba(0,0,0,0.16)] hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.2)]'
        ]">
        <img :src="AssistantIcon" />
        {{ $t('blueking.aiScriptsAssistant.errTips') }}
      </div>
    </template>
  </bcs-popover>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import useAssistantStore from '@/components/assistant/use-assistant-store';
import { useAppData } from '@/composables/use-app';
import AssistantIcon from '@/images/assistant.png';
import AssistantSmallIcon from '@/images/assistant-small.svg';


// 特性开关
const { flagsMap } = useAppData();

// 显示对话框
const { toggleAssistant } = useAssistantStore();
const handleShowAssistant = () => {
  toggleAssistant(true);
};

// 消息提示
const popoverRef = ref();
const showAITips = () => {
  if (!flagsMap.value.BKAI) return;
  popoverRef.value?.showHandler();
};

defineExpose({
  showAITips,
});
</script>
