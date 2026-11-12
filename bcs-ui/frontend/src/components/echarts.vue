<!--
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
-->

<template>
  <div class="echarts" />
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    options: Object,
    autoResize: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    options: {
      handler(newValue) {
        this.chart?.setOption(newValue);
      },
      deep: true,
    },
  },
  mounted() {
    this.init();
  },
  activated() {
    if (this.autoResize) {
      this.chart?.resize();
    }
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    showLoading(type, options) {
      this.chart?.showLoading(type, options);
    },
    hideLoading() {
      this.chart?.hideLoading();
    },
    init() {
      if (this.chart) {
        return;
      }

      const chart = echarts.init(this.$el);

      chart.setOption(this.options || {}, true);

      if (this.autoResize) {
        this.resizeObserver = new ResizeObserver((entries) => {
          window.requestAnimationFrame(() => {
            for (const entry of entries) {
              if (entry.target === this.$el) {
                this.chart?.resize();
              }
            }
          });
        });
        this.resizeObserver.observe(this.$el);
      }
      this.chart = chart;
    },
    resize() {
      this.chart?.resize();
    },
    destroy() {
      this.resizeObserver?.disconnect();
      this.resizeObserver?.unobserve(this.$el);
      this.resizeObserver = null;
      this.chart?.dispose();
      this.chart = null;
    },
    refresh() {
      if (this.chart) {
        this.destroy();
        this.init();
      }
    },
    setOption(option) {
      this.chart?.setOption(option);
    },
  },
};
</script>

<style scoped>
.echarts {
  width: 600px;
  height: 400px;
}
</style>

