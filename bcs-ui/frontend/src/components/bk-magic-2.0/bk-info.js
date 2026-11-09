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
import Vue from 'vue';

const bkInfo = Vue.prototype.$bkInfo;

const Info = function (opts = {}) {
  if (opts.content) {
    if (typeof opts.content === 'string') {
      opts.subTitle = opts.content;
    }
    opts.subHeader = opts.content;
  }

  if (opts.defaultInfo) {
    opts.extCls = 'default-info';
  }

  if (opts.clsName) {
    opts.extCls = `${opts.extCls} ${opts.clsName}`;
  }

  opts.closeIcon = true;
  opts.confirmLoading = true;

  if (!opts.width) {
    opts.width = 400;
  }
  bkInfo(opts);
};

Vue.prototype.$bkInfo = Info;

export default Info;
