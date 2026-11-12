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
  <bk-sideslider
    :is-show.sync="isVisible"
    :title="title"
    :width="width"
    :quick-close="true"
    class="gamestatefulset-sideslider"
    @hidden="hide">
    <div slot="content">
      <div class="wrapper" v-bkloading="{ isLoading: isLoading, opacity: 0.8 }">
        <monaco-editor
          v-if="!isLoading"
          ref="yamlEditor"
          class="editor"
          theme="monokai"
          language="yaml"
          :style="{ 'height': editorHeight, 'width': '100%' }"
          v-model="editorContent"
          :options="yamlEditorOptions"
          @mounted="handleEditorMount">
        </monaco-editor>
      </div>
    </div>
  </bk-sideslider>
</template>

<script>
import yamljs from 'js-yaml';

import MonacoEditor from '@/components/monaco-editor/editor.vue';

export default {
  name: 'GamestatefulsetSideslider',
  components: {
    MonacoEditor,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
    clusterId: {
      type: String,
    },
    namespaceName: {
      type: String,
    },
    crd: {
      type: String,
    },
  },
  data() {
    return {
      bkMessageInstance: null,
      title: '',
      width: 740,
      isVisible: false,
      isLoading: false,
      editorInstance: null,
      editorContent: '',
      yamlEditorOptions: {
        readOnly: true,
        fontSize: 14,
      },
      editorHeight: `${window.innerHeight - 60}px`,
    };
  },
  computed: {
    projectId() {
      return this.$route.params.projectId;
    },
    projectCode() {
      return this.$route.params.projectCode;
    },
    isEn() {
      return this.$store.state.isEn;
    },
  },
  watch: {
    isShow: {
      async handler(newVal) {
        this.isVisible = newVal;
        if (this.isVisible) {
          this.title = this.name;
          this.isLoading = true;
          await this.fetchData();
        }
      },
      immediate: true,
    },
  },
  mounted() {
  },
  destroyed() {
    this.bkMessageInstance?.close();
  },
  methods: {
    /**
             * 获取 yaml 数据
             */
    async fetchData() {
      try {
        const res = await this.$store.dispatch('app/getGameStatefulsetInfo', {
          projectId: this.projectId,
          clusterId: this.clusterId,
          gamestatefulsets: this.crd || 'gamedeployments.tkex.tencent.com',
          name: this.name,
          data: {
            namespace: this.namespaceName,
          },
        });
        const data = res.data || {};
        this.editorContent = yamljs.dump(data || {});
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },

    handleEditorMount(editorInstance) {
      this.editorInstance = editorInstance;
    },

    /**
             * 隐藏 sideslider
             */
    hide() {
      this.$emit('hide-sideslider', false);
    },
  },
};
</script>

<style scoped>
    @import '../gamestatefulset-sideslider.css';
</style>
