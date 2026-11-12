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

export default class BCSWebSocket {
  timeout = 6000;
  timeoutObj: any = null;
  lockReconnect = false;
  lockTimeoutObj: any = null;
  ws!: WebSocket;

  constructor(url: string) {
    this.createWebSocket(url);
  }

  createWebSocket(url: string) {
    this.ws = new WebSocket(url);
    this.ws.addEventListener('open', () => {
      console.log('WebSocket Open');
    });
    this.ws.addEventListener('close', () => {
      console.log('WebSocket close');
    });
    this.ws.addEventListener('message', () => {
      console.log('WebSocket message');
    });
    this.ws.addEventListener('error', () => {
      console.log('WebSocket error');
    });
  }

  reconnect(url: string) {
    if (this.lockReconnect) return;

    this.lockReconnect = true;

    this.lockTimeoutObj && clearTimeout(this.lockTimeoutObj);

    this.lockTimeoutObj = setTimeout(() => {
      this.createWebSocket(url);
      this.lockReconnect = false;
    }, 2000);
  }

  reset() {
    clearTimeout(this.timeoutObj);
    this.start();
  }

  start() {
    this.timeoutObj = setTimeout(() => {
      this.ws.send('heart beat');
    }, this.timeout);
  }
}
