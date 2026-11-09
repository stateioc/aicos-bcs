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
export default {
  name: 'bk-tab',
  props: {
    activeName: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'border-card',
      validator(val) {
        return ['card', 'border-card', 'unborder-card', 'vertical-card', 'fill', 'card-tab'].includes(val);
      },
    },
  },

  render(h) {
    const slots = Object.keys(this.$slots)
      .reduce((arr, key) => arr.concat(this.$slots[key]), [])
      .map((vnode) => {
        vnode.context = this._self;
        return vnode;
      });
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (this.$listeners && this.$listeners['tab-changed']) {
      this.$listeners['tab-change'] = this.$listeners['tab-changed'];
    }

    return h('bcs-tab', {
      on: this.$listeners, // 透传事件
      props: Object.assign({}, {
        ...this.$props,
        active: this.$props.activeName,
        type: this.$props.type === 'fill' ? 'border-card' : this.$props.type,
      }, this.$attrs), // 透传props
      scopedSlots: this.$scopedSlots, // 透传scopedSlots
      attrs: this.$attrs, // 透传属性，非props
    }, slots);
  },
};
