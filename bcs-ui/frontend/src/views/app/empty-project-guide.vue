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
  <div class="flex justify-center relative top-[20%]">
    <div class="bg-[#fff] px-[76px] pt-[64px] pb-[40px] max-w-[640px]" v-if="$INTERNAL">
      <div class="text-[#313238] text-[28px] font-bold flex justify-center">{{ $t('bcs.TKEx.welcome') }}</div>
      <div class="text-[16px] mt-[24px] leading-[24px]">
        {{ $t('bcs.TKEx.article1') }}
        <br />
        {{ $t('bcs.TKEx.article2') }}
      </div>
      <div class="flex justify-center mt-[32px]">
        <bk-button
          theme="primary"
          v-authority="{
            actionId: 'project_create',
            permCtx: {}
          }"
          @click="handleGotoProjectManage">{{ $t('projects.project.create') }}</bk-button>
        <bk-button @click="handleGotoIAM">{{ $t('projects.project.join') }}</bk-button>
      </div>
      <div class="flex justify-center mt-[16px]">
        <bk-button text @click="handleGotoDoc">
          <span class="relative top-[-1px]">
            <i class="bcs-icon bcs-icon-question-circle"></i>
          </span>
          {{ $t('generic.button.gameGuide') }}
        </bk-button>
      </div>
    </div>
    <div class="bg-[#fff] px-[76px] pt-[64px] pb-[40px] max-w-[640px]" v-else>
      <div class="text-[#313238] text-[28px] font-bold flex justify-center">
        {{ $t('bcs.intro.welcome') }}
      </div>
      <div class="text-[16px] mt-[24px] leading-[24px]">
        {{ $t('bcs.intro.article1') }}
        <br />
        {{ $t('bcs.intro.article2') }}
        <br />
        {{ $t('bcs.intro.article3') }}
      </div>
      <div class="flex justify-center mt-[32px]">
        <bk-button
          theme="primary"
          v-authority="{
            actionId: 'project_create',
            permCtx: {}
          }"
          @click="handleGotoProjectManage">{{ $t('projects.project.create') }}</bk-button>
        <bk-button @click="handleGotoIAM">{{ $t('projects.project.join') }}</bk-button>
      </div>
      <div class="flex justify-center mt-[16px]">
        <bk-button text @click="handleGotoDoc">
          <span class="relative top-[-1px]">
            <i class="bcs-icon bcs-icon-question-circle"></i>
          </span>
          {{ $t('generic.button.gameGuide') }}
        </bk-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRef } from 'vue';

import $router from '@/router';

export default defineComponent({
  name: 'ProjectGuide',
  setup() {
    const $route = computed(() => toRef(reactive($router), 'currentRoute').value);

    function handleGotoIAM() {
      window.open(`${window.BK_IAM_HOST}/apply-join-user-group?system_id=bk_bcs_app`);
    }
    function handleGotoProjectManage() {
      if (window.REGION === 'ieod') {
        window.open(`${window.DEVOPS_HOST}/console/pm`);
      } else {
        if ($route.value.name === 'projectManage') return;
        $router.push({
          name: 'projectManage',
        });
      }
    }
    function handleGotoDoc() {
      window.open(window.BCS_CONFIG?.help);
    }

    return {
      handleGotoIAM,
      handleGotoProjectManage,
      handleGotoDoc,
    };
  },
});
</script>
