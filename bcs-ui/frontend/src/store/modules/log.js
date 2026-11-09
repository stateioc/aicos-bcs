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
import { podContainersList, podLogs, podLogsStreamURL } from '@/api/base';
import { podLogsDownloadURL } from '@/api/modules/monitor';
import request, { parseUrl } from '@/api/request';

export default {
  namespaced: true,
  actions: {
    async podContainersList(context, params) {
      const data = await podContainersList(params).catch(() => []);
      return data;
    },
    // 获取POD日志
    async podLogs(context, params) {
      const data = await podLogs(params).catch(() => ({ logs: [] }));
      return data;
    },
    // 下载日志
    async downloadLogs(context, params) {
      const { url } = parseUrl('get', podLogsDownloadURL, params);
      window.open(url);
    },
    // 实时日志
    async realTimeLogStream(context, params) {
      const { url } = parseUrl('get', podLogsStreamURL, params);
      const source = new EventSource(url, { withCredentials: true });
      return source;
    },
    async previousLogList(context, url) {
      const data = await request('get', `${url}`)().catch(() => ({ logs: [] }));
      return data;
    },
  },
};
