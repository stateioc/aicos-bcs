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

// 项目管理
const OperateAudit = () => import(/* webpackChunkName: 'project' */'@/views/project-manage/operate-audit/operate-audit.vue');
const EventQuery = () => import(/* webpackChunkName: 'project' */'@/views/project-manage/event-query/new-event-query.vue');
const ProjectInfo = () => import(/* webpackChunkName: 'project' */'@/views/project-manage/project/project-info.vue');

// 云凭证
const tencentCloud = () => import(/* webpackChunkName: 'project' */'@/views/project-manage/cloudtoken/tencentCloud.vue');
const tencentPublicCloud = () => import(/* webpackChunkName: 'project' */'@/views/project-manage/cloudtoken/tencentPublicCloud.vue');
const googleCloud = () => import(/* webpackChunkName: 'project' */'@/views/project-manage/cloudtoken/googleCloud.vue');
const azureCloud = () => import(/* webpackChunkName: 'project' */'@/views/project-manage/cloudtoken/azureCloud.vue');
// 华为云
const huaweiCloud = () => import(/* webpackChunkName: 'project' */'@/views/project-manage/cloudtoken/huaweiCloud.vue');
// 亚马逊云
const amazonCloud = () => import(/* webpackChunkName: 'project' */'@/views/project-manage/cloudtoken/amazonCloud.vue');

// 项目配额
const ProjectQuotas = () => import(/* webpackChunkName: 'project' */'@/views/project-manage/project/project-quotas.vue');

export default [
  {
    path: 'operate-audit',
    component: OperateAudit,
    name: 'operateAudit',
    meta: {
      resource: window.i18n.t('nav.record'),
    },
  },
  {
    path: 'event-query',
    name: 'eventQuery',
    component: EventQuery,
    meta: {
      resource: window.i18n.t('nav.event'),
    },
  },
  {
    path: 'project-info',
    name: 'projectInfo',
    component: ProjectInfo,
    meta: {
      resource: window.i18n.t('nav.projectInfo'),
    },
  },
  {
    path: 'project-quotas',
    name: 'projectQuotas',
    component: ProjectQuotas,
    meta: {
      resource: window.i18n.t('nav.projectQuotas'),
    },
  },
  {
    path: 'tencent-cloud',
    name: 'tencentCloud',
    component: tencentCloud,
    meta: {
      title: 'Tencent Cloud',
      hideBack: true,
    },
  },
  {
    path: 'tencent-public-cloud',
    name: 'tencentPublicCloud',
    component: tencentPublicCloud,
    meta: {
      title: 'Tencent Cloud',
      hideBack: true,
    },
  },
  {
    path: 'google-cloud',
    name: 'googleCloud',
    component: googleCloud,
    meta: {
      title: 'Google Cloud',
      hideBack: true,
    },
  },
  {
    path: 'azure-cloud',
    name: 'azureCloud',
    component: azureCloud,
    meta: {
      title: 'Azure Cloud',
      hideBack: true,
    },
  },
  // 华为云
  {
    path: 'huawei-cloud',
    name: 'huaweiCloud',
    component: huaweiCloud,
    meta: {
      title: 'Huawei Cloud',
      hideBack: true,
    },
  },
  // aws
  {
    path: 'amazon-cloud',
    name: 'amazonCloud',
    component: amazonCloud,
    meta: {
      title: 'Aws Cloud',
      hideBack: true,
    },
  },
];
