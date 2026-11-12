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
  <Ring
    :percent="percent"
    :size="size"
    :ext-cls="extCls"
    :text="text"
    :text-style="textStyle"
    :stroke-width="strokeWidth"
    :fill-width="fillWidth"
    :fill-color="fillColor">
  </Ring>
</template>

<script>
import Ring from '@/components/ring';

export default {
  components: {
    Ring,
  },
  props: {
    percent: {
      type: [Number, String],
      default: 0,
    },
    size: {
      type: Number,
      default: 45,
    },
    extCls: {
      type: String,
      default: 'node-ring',
    },
    text: {
      type: String,
      default: 'always',
    },
    textStyle: {
      type: Object,
      default: () => ({
        fontSize: '9px',
        color: '#737987',
        fontWeight: '700',
      }),
    },
    strokeWidth: {
      type: Number,
      default: 4,
    },
    fillWidth: {
      type: Number,
      default: 4,
    },
    fillColor: {
      type: String,
      default: '#3a84ff',
    },
  },
};
</script>
