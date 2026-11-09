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
import hljs from 'highlight.js';
import yaml from 'highlight.js/lib/languages/yaml';

import 'highlight.js/styles/vs2015.css';
// const registerLanguages = [
//     // { name: 'css', path: require('highlight.js/lib/languages/css') },
//     // { name: 'javascript', path: require('highlight.js/lib/languages/javascript') },
//     // { name: 'bash', path: require('highlight.js/lib/languages/bash') },
//     // { name: 'python', path: require('highlight.js/lib/languages/python') },
//     // { name: 'yaml', path: require('highlight.js/lib/languages/yaml') }
// ]
// registerLanguages.forEach(lang => hljs.registerLanguage(lang.name, lang.path))

hljs.registerLanguage('yaml', yaml);
export default hljs;
