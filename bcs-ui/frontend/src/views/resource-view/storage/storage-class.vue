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
  <BaseLayout
    title="StorageClasses"
    kind="StorageClass" category="storage_classes" type="storages" :show-create="false">
    <template
      #default="{
        curPageData,
        pageConf,
        handlePageChange,
        handlePageSizeChange,
        handleGetExtData,
        handleSortChange,
        handleShowViewConfig,
        clusterNameMap,
        isClusterMode,
        sourceTypeMap
      }">
      <bk-table
        :data="curPageData"
        :pagination="pageConf"
        @page-change="handlePageChange"
        @page-limit-change="handlePageSizeChange"
        @sort-change="handleSortChange">
        <bk-table-column :label="$t('generic.label.name')" prop="metadata.name" sortable></bk-table-column>
        <bk-table-column :label="$t('cluster.labels.nameAndId')" v-if="!isClusterMode">
          <template #default="{ row }">
            <div class="flex flex-col py-[6px] h-[50px]">
              <span class="bcs-ellipsis">{{ clusterNameMap[handleGetExtData(row.metadata.uid, 'clusterID')] }}</span>
              <span class="bcs-ellipsis mt-[6px]">{{ handleGetExtData(row.metadata.uid, 'clusterID') }}</span>
            </div>
          </template>
        </bk-table-column>
        <bk-table-column label="Provisioner">
          <template #default="{ row }">
            <span>{{ row.provisioner || '--' }}</span>
          </template>
        </bk-table-column>
        <bk-table-column label="Reclaim policy">
          <template #default="{ row }">
            <span>{{ row.reclaimPolicy || 'Delete' }}</span>
          </template>
        </bk-table-column>
        <bk-table-column label="VolumeBindingMode">
          <template #default="{ row }">
            <span>{{ row.volumeBindingMode || 'Immediate' }}</span>
          </template>
        </bk-table-column>
        <bk-table-column label="Parameters">
          <template #default="{ row }">
            <span>{{ handleParseObjToArr(row, 'parameters') || '--' }}</span>
          </template>
        </bk-table-column>
        <bk-table-column label="MountOptions">
          <template #default="{ row }">
            <span>{{ (row.mountOptions || []).join(', ') || '--' }}</span>
          </template>
        </bk-table-column>
        <bk-table-column label="AllowVolumeExpansion">
          <template #default="{ row }">
            <span>{{ row.allowVolumeExpansion || 'false' }}</span>
          </template>
        </bk-table-column>
        <bk-table-column label="IsDefaultClass">
          <template #default="{ row }">
            <span>{{ handleGetExtData(row.metadata.uid, 'isDefault') }}</span>
          </template>
        </bk-table-column>
        <bk-table-column label="Age" sortable="custom" prop="createTime" :show-overflow-tooltip="false">
          <template #default="{ row }">
            <span
              v-bk-tooltips="{
                content: handleGetExtData(row.metadata.uid, 'createTime') }">
              {{ handleGetExtData(row.metadata.uid, 'age') }}</span>
          </template>
        </bk-table-column>
        <bk-table-column :label="$t('generic.label.source')" :show-overflow-tooltip="false">
          <template #default="{ row }">
            <sourceTableCell
              :row="row"
              :source-type-map="sourceTypeMap" />
          </template>
        </bk-table-column>
        <bk-table-column :label="$t('generic.label.editMode.text')" width="100">
          <template slot-scope="{ row }">
            <span>
              {{handleGetExtData(row.metadata.uid, 'editMode') === 'form'
                ? $t('generic.label.editMode.form') : 'YAML'}}
            </span>
          </template>
        </bk-table-column>
        <template #empty>
          <BcsEmptyTableStatus
            :button-text="$t('generic.button.resetSearch')"
            type="search-empty"
            @clear="handleShowViewConfig" />
        </template>
      </bk-table>
    </template>
  </BaseLayout>
</template>
<script>
import { defineComponent } from 'vue';

import sourceTableCell from '../common/source-table-cell.vue';

import BaseLayout from '@/views/resource-view/common/base-layout';

export default defineComponent({
  components: { BaseLayout, sourceTableCell },
  setup() {
    const handleParseObjToArr = (row, prop) => Object.keys(row[prop] || {}).map(key => `${key}=${row[prop][key]}`)
      .join(', ');
    return {
      handleParseObjToArr,
    };
  },
});
</script>
