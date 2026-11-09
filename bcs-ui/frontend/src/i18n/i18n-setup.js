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
import { lang, locale } from 'bk-magic-vue';
import cookie from 'cookie';
import yamljs from 'js-yaml';
import enUS from 'text-loader?modules!./en-US.yaml';
import zhCN from 'text-loader?modules!./zh-CN.yaml';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const validateTranslation = (data, lang) => {
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'object') {
      validateTranslation(data[key], lang);
    } else if (!data[key] && process.env.NODE_ENV !== 'production') {
      console.warn(`un-translation '${key}', ${lang}`);
    }
  });
  return data;
};

const modules = {
  'en-US': validateTranslation(yamljs.load(enUS), 'en-US'),
  'zh-CN': validateTranslation(yamljs.load(zhCN), 'zh-CN'),
};

const messages = {
  'en-US': Object.assign(lang.enUS, modules['en-US']),
  'zh-CN': Object.assign(lang.zhCN, modules['zh-CN']),
};

// 1. 从cookie获取 2.获取不到默认用浏览器语言 3. 默认中文
let curLang = cookie.parse(document.cookie).blueking_language || navigator.language || navigator.userLanguage || 'zh-cn';
// 转换成标准格式
if (['en-US', 'enUS', 'enus', 'en-us', 'en'].includes(curLang)) {
  curLang = 'en-US';
} else {
  curLang = 'zh-CN';
}

// 代码中获取当前语言 this.$i18n.locale
const i18n = new VueI18n({
  locale: curLang,
  fallbackLocale: 'zh-CN',
  messages,
});

locale.i18n((key, value) => i18n.t(key, value));
locale.getCurLang().bk.lang = curLang;

global.i18n = i18n;

export default i18n;
