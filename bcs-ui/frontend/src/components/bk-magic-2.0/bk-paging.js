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
  name: 'bk-paging',
  props: {
    curPage: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: Number,
      default: 1,
    },
    count: {
      type: Number,
      default: 1,
    },
    showLimit: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Boolean,
      default: 10,
    },
  },
  render(h) {
    const slots = Object.keys(this.$slots)
      .reduce((arr, key) => arr.concat(this.$slots[key]), [])
      .map((vnode) => {
        vnode.context = this._self;
        return vnode;
      });
    if (this.$props.curPage) {
      this.$props.current = this.$props.curPage;
    }

    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (this.$listeners && this.$listeners['page-change']) {
      this.$listeners.change = this.$listeners['page-change'];
    }

    return h('bcs-pagination', {
      on: this.$listeners, // 透传事件
      props: Object.assign({}, this.$props, this.$attrs), // 透传props
      scopedSlots: this.$scopedSlots, // 透传scopedSlots
      attrs: this.$attrs, // 透传属性，非props
    }, slots);
  },
};
