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

import { createRequest } from '../request';

// 集群管理，节点管理
const request = createRequest({
  domain: window.BCS_API_HOST,
  prefix: '/bcsapi/v4/meshmanager/v1/mesh',
});

export const meshList = request('get', '/istio/list');
export const meshConfig = request('get', '/istio/config');
export const meshCreate = request('post', '/istio/install');
export const meshDelete = request('delete', '/istio/$meshID');
export const meshUpdate = request('put', '/istio/$meshID');
export const meshDetail = request('get', '/istio/detail/$meshID');
export const meshClusters = request('get', '/clusters');
