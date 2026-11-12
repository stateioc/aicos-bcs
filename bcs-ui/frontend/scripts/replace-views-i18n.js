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

const { resolve } = require('path');
const fs = require('fs');
const yamljs = require('js-yaml')
const { extractI18NReport, readVueFiles, extractI18NItemsFromVueFiles, readLanguageFiles } = require('vue-i18n-extract');
const Dot = require('dot-object');

const dot = new Dot('.');
const config = {
  filePath: './src/**/*.?(js|vue|ts|tsx|jsx|html)',
  i18nPath: './src/i18n/zh-CN.yaml'
}

const vueFiles = readVueFiles(resolve(process.cwd(), config.filePath));
const I18NItems = extractI18NItemsFromVueFiles(vueFiles);

const languageFiles = readLanguageFiles(resolve(process.cwd(), config.i18nPath));

const content = JSON.parse(languageFiles[0].content)
const flatContent = dot.dot(content);
const replaceData = Object.keys(flatContent).filter(key => flatContent[key] !== key).map(key => ({
  path: flatContent[key],
  key
})).reduce((pre, item) => {
  pre[item.path] = item.key
  return pre
}, {})

I18NItems.filter(item => replaceData[item.path]).forEach((item) => {
  const fileData = fs.readFileSync(item.file)
  let str = fileData.toString()
  str = str.replace(item.path, replaceData[item.path])
  fs.writeFileSync(item.file, str)
})