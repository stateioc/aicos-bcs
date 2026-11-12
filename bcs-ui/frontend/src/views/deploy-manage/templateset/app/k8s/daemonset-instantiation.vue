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

<template src="./tmpl-instantiation.html"></template>

<script>
import mixinBaseInstantiation from '../mixins/mixin-base-instantiation';

import BcsContent from '@/components/layout/Content.vue';
import Row from '@/components/layout/Row.vue';

export default {
  components: { BcsContent, Row },
  mixins: [mixinBaseInstantiation],
  data() {
    return {
      CATEGORY: 'daemonset',
    };
  },
  methods: {
    /**
             * 返回模板集列表
             *
             * @param {boolean} needConfirm 是否需要 confirm 提示
             */
    goTemplateset(needConfirm) {
      const params = {
        projectId: this.projectId,
        projectCode: this.projectCode,
        tplsetId: this.templateId,
        searchParamsList: this.searchParamsList,
      };
      if (needConfirm) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const me = this;
        const h = me.$createElement;
        me.$bkInfo({
          title: '',
          content: h('p', this.$t('deploy.templateset.confirmTemplate', { tmplAppName: me.tmplAppName })),
          async confirmFn() {
            me.$router.push({
              name: 'daemonset',
              params,
            });
          },
        });
      } else {
        this.$router.push({
          name: 'daemonset',
          params,
        });
      }
    },
  },
};
</script>

<style scoped>
    @import '../instantiation.css';
</style>
