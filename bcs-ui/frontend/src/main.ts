/*
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
 */
import VeeValidate from 'vee-validate';
import Vue from 'vue';

import BkTrace from '@blueking/bk-trace-core';
import { BkXssFilterDirective } from '@blueking/xss-filter';

import '@/common/bkmagic';
import '@/fonts/svg-icon/iconcool';
import '@/fonts/font-icon/iconcool';
import '@blueking/bkui-library';
import App from '@/App.vue';
import { bus } from '@/common/bus';
import { BCS_UI_PREFIX } from '@/common/constant';
import { chainable } from '@/common/util';
import bkCombox from '@/components/bk-input/combox.vue';
import bkbcsInput from '@/components/bk-input/index.vue';
import bkmagic2 from '@/components/bk-magic-2.0';
import BcsEmptyTableStatus from '@/components/empty-table-status.vue';
import bkSelector from '@/components/selector/index.vue';
import Authority from '@/directives/authority';
import focus from '@/directives/focus/index';
import i18n from '@/i18n/i18n-setup';
import config from '@/mixins/config';
import router from '@/router';
import store from '@/store';
import BcsErrorPlugin from '@/views/app/bcs-error';
import k8sIngress from '@/views/deploy-manage/templateset/ingress/k8s-ingress.vue';

Vue.config.devtools = process.env.NODE_ENV === 'development';
Vue.prototype.$chainable = chainable;

Vue.use(BcsErrorPlugin);
Vue.use(Authority);
Vue.use(focus);
Vue.use(bkmagic2);
Vue.use(VeeValidate, {
  fieldsBagName: '_veeFields',
});
Vue.use(BkXssFilterDirective);
// 数据上报插件
Vue.use(BkTrace, {
  url: `${BCS_UI_PREFIX}/report`,
  appCode: 'bk_bcs',
  appVersion: BK_BCS_VERSION,
  // 空间类型
  spaceType: 'project',
  // 当前项目 ID
  spaceID: () => {
    try {
      return store.getters?.curProjectCode;
    } catch (e) {
      console.error(e);
      return '';
    }
  },
});
Vue.mixin(config);
Vue.component('BkbcsInput', bkbcsInput);
Vue.component('BkCombox', bkCombox);
Vue.component('BkSelector', bkSelector);
Vue.component('K8sIngress', k8sIngress);
Vue.component('BcsEmptyTableStatus', BcsEmptyTableStatus);

window.bus = bus;
window.mainComponent = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  i18n,
  template: '<App/>',
});

console.log(
  `%c${BK_BCS_WELCOME} \n %c版本信息%c${BK_BCS_VERSION}%c>> ${new Date().toString()
    .slice(0, 16)}<<`,
  'color: #2DCB56',
  'padding: 2px 5px; background: #ea3636; color: #fff; border-radius: 3px 0 0 3px;',
  'padding: 2px 5px; background: #42c02e; color: #fff; border-radius: 0 3px 3px 0; font-weight: bold;',
  'background-color: #3A84FF; color: #fff; padding: 2px 5px; border-radius: 3px; font-weight: bold;margin-left: 16px;',
);
