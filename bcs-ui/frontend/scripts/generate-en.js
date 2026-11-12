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

const yamljs = require('js-yaml')
const fs = require('fs')
const Dot = require('dot-object');
const dot = new Dot('.');

const enMap = yamljs.load(fs.readFileSync('./src/i18n/en-US.yaml'))
const chData = yamljs.load(fs.readFileSync('./src/i18n/zh-CN.yaml'))

const data = dot.dot(chData)
Object.keys(data).forEach(path => {
  const k = data[path]
  dot.str(path, enMap[k], chData)
})
// console.log(chData)
fs.writeFileSync('./src/i18n/en-US.yaml', yamljs.dump(chData))