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

import { ref } from 'vue';

import { dashbordList } from '@/api/modules/cluster-resource';
import {
  batchDeleteServiceMonitor,
  createServiceMonitor,
  deleteServiceMonitor,
  getServiceMonitor,
  getServiceMonitorDetail,
  updateServiceMonitor,
} from '@/api/modules/monitor';
import $bkMessage from '@/common/bkmagic';
import $i18n from '@/i18n/i18n-setup';

export interface IMetricData {
  'service_name': string
  'path': string // 路径
  'selector': Record<string, string> // 关联label
  'interval': string // 采集周期
  'port': string // portName
  'sample_limit': Number// 允许最大Sample数
  'name': string // 名称
  'params': Record<string, string> // 参数
}

export default function useMetric() {
  const handleGetServiceMonitor = async (clusterID: string) => {
    const data = await getServiceMonitor({
      $clusterId: clusterID,
    }).catch(() => []);
    return data;
  };
  const handleGetServiceMonitorDetail = async (params: {
    $clusterId: string
    $namespaceId: string
    $name: string
  }) => {
    const data = await getServiceMonitorDetail(params).catch(() => ({}));
    return data;
  };
  const handleCreateServiceMonitor = async (params: IMetricData & {
    $namespaceId: string
    $clusterId: string
  }) => {
    const result = await createServiceMonitor(params).then(() => true)
      .catch(() => false);
    result && $bkMessage({
      theme: 'success',
      message: $i18n.t('generic.msg.success.create'),
    });
    return result;
  };
  const handleUpdateServiceMonitor = async (params: IMetricData & {
    $namespaceId: string
    $name: string
    $clusterId: string
  }) => {
    const result = await updateServiceMonitor(params).then(() => true)
      .catch(() => false);
    result && $bkMessage({
      theme: 'success',
      message: $i18n.t('generic.msg.success.modify'),
    });
    return result;
  };
  const handleDeleteServiceMonitor = async (params: {
    $namespaceId: string
    $name: string
    $clusterId: string
  }) => {
    const result = await deleteServiceMonitor(params).then(() => true)
      .catch(() => false);
    result && $bkMessage({
      theme: 'success',
      message: $i18n.t('generic.msg.success.delete'),
    });
    return result;
  };
  const handleBatchDeleteServiceMonitor = async (params: {
    $clusterId: string
    service_monitors: Array<{
      namespace: string
      name: string
    }>
  }) => {
    const result = await batchDeleteServiceMonitor(params).then(() => true)
      .catch(() => false);
    result && $bkMessage({
      theme: 'success',
      message: $i18n.t('generic.msg.success.delete'),
    });
    return result;
  };
  const serviceList = ref<any[]>([]);
  const serviceLoading = ref(false);
  const handleGetServiceList = async ($namespaceId: string, $clusterId: string) => {
    if (!$namespaceId || !$clusterId) return;
    serviceLoading.value = true;
    const data = await dashbordList({
      $namespaceId,
      $clusterId,
      $type: 'networks',
      $category: 'services',
    }).catch(() => ({ manifest: { items: [] } }));
    serviceList.value = data?.manifest?.items || [];
    serviceLoading.value = false;
    return data;
  };

  return {
    handleGetServiceMonitor,
    handleGetServiceMonitorDetail,
    handleCreateServiceMonitor,
    handleUpdateServiceMonitor,
    handleDeleteServiceMonitor,
    handleBatchDeleteServiceMonitor,
    serviceLoading,
    serviceList,
    handleGetServiceList,
  };
}
