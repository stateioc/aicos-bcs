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
  <bcs-dialog
    theme="primary"
    header-position="left"
    :title="title"
    :width="1200"
    v-model="show"
    @cancel="handleCancel">
    <slot></slot>
  </bcs-dialog>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  isShow: {
    type: Boolean,
    default: false,
  },
});

const $emits = defineEmits(['cancel']);

const show = ref(false);

function handleCancel() {
  $emits('cancel', false);
}

watch(() => props.isShow, () => {
  show.value = props.isShow;
});
</script>
<style scoped lang="postcss">
:deep(.bk-dialog-content) {
  max-height: 80vh;
  .bk-dialog-body {
    overflow: auto;
    max-height: calc(80vh - 116px);
  }
}
</style>
