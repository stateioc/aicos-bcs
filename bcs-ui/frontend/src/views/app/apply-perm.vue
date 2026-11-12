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
  <bk-dialog
    :is-show.sync="dialogConf.isShow"
    :width="dialogConf.width"
    :quick-close="false"
    :title="dialogConf.title"
    @cancel="hide">
    <div class="permission-modal">
      <div class="permission-header">
        <span class="title-icon">
          <img :src="lockSvg" alt="permission-lock" class="lock-img" />
        </span>
        <h3>{{ $t('iam.title.perms') }}</h3>
      </div>
      <div v-bkloading="{ isLoading }">
        <bk-table :data="actionList">
          <bk-table-column :label="$t('iam.label.system')" prop="system" min-width="150">
            {{ siteName }}
          </bk-table-column>
          <bk-table-column :label="$t('iam.label.action')" prop="auth" min-width="220">
            <template #default="{ row }">
              {{ actionsMap[row.action_id] || '--' }}
            </template>
          </bk-table-column>
          <bk-table-column :label="$t('iam.label.resource')" prop="resource" min-width="220">
            <template #default="{ row }">
              {{ row.resource_name || '--' }}
            </template>
          </bk-table-column>
        </bk-table>
      </div>
    </div>
    <div class="permission-footer" slot="footer">
      <div class="button-group">
        <div
          v-bk-tooltips="{
            content: $t('iam.tips.emptyApplyUrl'),
            disabled: !!applyUrl
          }"
        >
          <bk-button theme="primary" :disabled="!applyUrl" @click="goApplyUrl">
            {{ hasApplied ? $t('iam.button.applied') : $t('iam.button.apply') }}
          </bk-button>
        </div>
        <bk-button theme="default" @click="hide">{{ $t('generic.button.cancel') }}</bk-button>
      </div>
    </div>
  </bk-dialog>
</template>

<script>
import actionsMap from './actions-map';

import usePlatform from '@/composables/use-platform';
import lockSvg from '@/images/lock-radius.svg';
export default {
  name: 'ApplyPerm',
  data() {
    return {
      dialogConf: {
        isShow: false,
        width: 640,
      },
      applyUrl: '',
      actionList: [{}],
      lockSvg,
      actionsMap,
      isLoading: false,
      config: null,
      hasApplied: false, // 是否已申请
    };
  },
  computed: {
    siteName() {
      return this.config.i18n?.name;
    },
  },
  created() {
    const { config } = usePlatform();
    this.config = config;
  },
  destroyed() {
    this.applyUrl = '';
  },
  methods: {
    hide() {
      this.isLoading = false;
      this.dialogConf.isShow = false;
      this.applyUrl = '';
      this.actionList = [{}];
      this.hasApplied = false;
    },
    async show(callbackData = {}) {
      this.dialogConf.isShow = true;
      let data = {};
      if (typeof callbackData === 'function') {
        this.isLoading = true;
        data = await callbackData();
        this.isLoading = false;
      } else {
        data = callbackData;
      }
      const { apply_url, action_list = [] } = data?.perms;

      this.applyUrl = apply_url;
      this.actionList = action_list;
    },
    goApplyUrl() {
      if (this.hasApplied) {
        // 刷新页面
        window.location.reload();
        return;
      }
      window.open(this.applyUrl);
      this.hasApplied = true;
    },
  },
};
</script>

<style lang="postcss" scoped>
:deep(.bk-dialog-wrapper .bk-dialog) {
  top: 50%;

  .bk-dialog-content.bk-dialog-content-drag {
    transform: translateY(-50%);
  }
}

.permission-modal {
  .permission-header {
    text-align: center;
    .title-icon {
      display: inline-block;
    }
    .lock-img {
      width: 120px;
    }
    h3 {
      margin: 6px 0 24px;
      color: #63656e;
      font-size: 20px;
      font-weight: normal;
      line-height: 1;
    }
  }
}
.button-group {
    display: flex;
    justify-content: flex-end;
    .bk-button {
        margin-left: 7px;
    }
}
</style>
