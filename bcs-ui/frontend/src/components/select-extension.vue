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
  <div
    class="flex items-center justify-center relative text-[12px] h-[40px] bg-[#FAFBFD] cursor-pointer mx-[-16px]"
    @click="openLink">
    <i class="bcs-icon bcs-icon-fenxiang mr-[4px] !text-[12px]"></i>
    {{ linkText }}
    <template v-if="showRefresh">
      <bcs-divider direction="vertical" class="absolute right-[30px]"></bcs-divider>
      <span
        class="absolute right-0 h-[32px] w-[40px] flex items-center justify-center"
        v-bk-tooltips="$t('generic.button.refresh')"
        @click.stop="refresh">
        <i class="bcs-icon bcs-icon-reset !text-[12px] text-[#979BA5]"></i>
      </span>
    </template>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  linkText: {
    type: String,
  },
  link: {
    type: String,
  },
  showRefresh: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(['link', 'refresh']);

const openLink = () => {
  emits('link');
  if (!props.link) return;
  window.open(props.link);
};

const refresh = () => {
  emits('refresh');
};
</script>
