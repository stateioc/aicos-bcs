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
import { messageInfo } from '@/common/bkmagic';
import { copyText } from '@/common/util';

export default {
  inserted(el, bind) {
    const tools = bind.value?.tools || ['fullscreen'];
    if (!tools?.length) return;

    el.handleExitFullScreen = (event) => {
      if (event.code === 'Escape' && el.fullscreen) {
        el.fullscreen.className = 'bcs-icon bcs-icon-full-screen';
        tools.forEach((tool) => {
          el[tool].style.position = 'absolute';
        });
        el.classList.remove('bcs-full-screen');
      }
    };
    el.addEventListener('mouseenter', () => {
      document.addEventListener('keyup', el.handleExitFullScreen);
    });
    el.addEventListener('mouseleave', () => {
      document.removeEventListener('keyup', el.handleExitFullScreen);
    });

    el.defaultConfig = {
      fullscreen: {
        icon: 'bcs-icon bcs-icon-full-screen',
        handler: (e) => {
          const { target } = e;
          if (target.className === 'bcs-icon bcs-icon-full-screen') {
            target.className = 'bcs-icon bcs-icon-un-full-screen';
            tools.forEach((tool) => {
              el[tool].style.position = 'fixed';
            });
            el.classList.add('bcs-full-screen');
            messageInfo(window.i18n.t('generic.button.fullScreen.msg'));
          } else {
            target.className = 'bcs-icon bcs-icon-full-screen';
            tools.forEach((tool) => {
              el[tool].style.position = 'absolute';
            });
            el.classList.remove('bcs-full-screen');
          }
        },
      },
      copy: {
        icon: 'bcs-icon bcs-icon-copy',
        handler: () => {
          copyText(bind.value?.content);
          messageInfo(window.i18n.t('generic.msg.success.copy'));
        },
      },
    };
    el.style.position = 'relative';

    const css = bind.value?.css || '';
    tools.forEach((tool, index) => {
      const icon = document.createElement('i');
      icon.className = el.defaultConfig[tool]?.icon;
      icon.style.cssText = `position: absolute;right: ${(index + 1) * 20}px;top: 15px;cursor: pointer;z-index: 200;margin-right: ${index * 10}px;color: #fff;${css}`;
      el[tool] = icon;
      icon.addEventListener('click', el.defaultConfig[tool]?.handler);
      el.append(icon);
    });
  },
  unbind(el, bind) {
    const tools = bind.value?.tools || ['fullscreen', 'copy'];
    document.removeEventListener('keyup', el.handleExitFullScreen);
    tools.forEach((tool) => {
      el[tool]?.removeEventListener('click', el.defaultConfig[tool]?.handler);
      el[tool]?.remove();
    });
  },
};
