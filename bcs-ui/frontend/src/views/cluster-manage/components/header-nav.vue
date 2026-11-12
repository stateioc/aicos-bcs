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
  <div class="header-nav">
    <bcs-breadcrumb separator-class="bk-icon icon-angle-right">
      <template slot="prefix">
        <i class="bcs-icon bcs-icon-arrows-left back-icon" @click="goBack"></i>
      </template>
      <bcs-breadcrumb-item
        v-for="(item, index) in list"
        :key="index"
        :to="item.link">
        <span class="bcs-ellipsis" :title="item.title">{{item.title}}</span>
      </bcs-breadcrumb-item>
    </bcs-breadcrumb>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

import $router from '@/router';

export default defineComponent({
  name: 'HeaderNav',
  props: {
    list: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  },
  setup() {
    const goBack = () => {
      $router.back();
    };
    return {
      goBack,
    };
  },
});
</script>

<style lang="postcss" scoped>
.header-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 52px;
    border-bottom: 1px solid #dde4eb;
    background: #fff;
    box-shadow: 4px 0 3px rgb(0 0 0 / 10%);
    padding: 0 24px 0 24px;
    font-size: 16px;
    .back-icon {
        cursor: pointer;
        font-weight: 700;
        font-size: 16px;
        color: #3a84ff;
        margin-right: 4px;
    }
    >>> .bk-breadcrumb-goback {
        margin-right: 0;
    }
    >>> .bk-breadcrumb-item {
        font-size: 16px;
    }
    >>> .bk-breadcrumb-item {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
