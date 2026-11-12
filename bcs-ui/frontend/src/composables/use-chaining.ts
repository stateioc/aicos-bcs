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

import { customRef } from 'vue';

const handlerFactory = configs => ({
  get(target, property, receiver) {
    if (!(property in target) && (property in configs)) {
      target[property] = Object.prototype.toString.call(configs[property]) === '[object Object]'
        ? proxify({}, configs)
        : configs[property];
    }

    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    if (({}).toString.call(value) === '[object Object]') value = deepApply(value, configs);

    return Reflect.set(target, property, value, receiver);
  },
});

const deepApply = function (data, configs) {
  const proxy = proxify({}, configs);
  Object.keys(data).forEach((property) => {
    proxy[property] = data[property];
  });
  return proxy;
};

function proxify(defprop = {}, configs) {
  return new Proxy(defprop, handlerFactory(configs));
};

export type IChainingConfig =  {
  path: string;
  type: 'string' | 'number' | 'object' | 'null' | 'undefined' | 'array'
} | string;

export default function useChainingRef<T>(value, config: IChainingConfig[]) {
  const valueMap = {
    string: '',
    number: 0,
    object: {},
    null: null,
    undefined,
    array: [],
  };
  const _config = config.reduce<Record<string, any>>((pre, current) => {
    if (typeof current === 'string') {
      current.split('.').forEach((key) => {
        pre[key] = {};
      });
    } else {
      const paths = current.path.split('.');
      paths.forEach((key, index) => {
        pre[key] = index < (paths.length - 1) ? {} : valueMap[current.type];
      });
    }

    return pre;
  }, {});

  let innerValue = proxify(value, _config);

  return customRef<T>((track, trigger) => ({
    get() {
      track();
      return innerValue;
    },
    set(newValue: any) {
      innerValue = newValue;
      trigger();
    },
  }));
}
