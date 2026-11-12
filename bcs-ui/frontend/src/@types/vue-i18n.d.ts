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

// vue-i18n.d.ts

import VueI18n from 'vue-i18n/types';

/**
 * Overloads VueI18n interface to avoid needing to cast return value to string.
 * @see https://github.com/kazupon/vue-i18n/issues/410
 */
declare module 'vue-i18n/types' {
  export default interface VueI18n {
    t(key: Path, locale: Locale, values?: Values): string;
    t(key: Path, values?: Values): string;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $t: typeof VueI18n.prototype.t;
  }

  interface VueConstructor {
    i18n: typeof VueI18n.prototype;
  }
}

export default VueI18n;
