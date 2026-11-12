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

import { computed, defineComponent, reactive, toRef } from 'vue';

import './dashboard-top-actions.css';
import $router from '@/router';

export default defineComponent({
  name: 'DashboardTopActions',
  setup() {
    const $route = computed(() => toRef(reactive($router), 'currentRoute').value);

    const projectId = computed(() => $route.value.params.projectId).value;
    const projectCode = computed(() => $route.value.params.projectCode).value;

    const goBCS = () => {
      $router.push({
        name: 'clusterMain',
        params: {
          projectId,
          projectCode,
        },
      });
    };

    return {
      goBCS,
    };
  },
  render() {
    return (
            <div class="dashboard-top-actions">
                {
                    this.$INTERNAL
                      ? <a href={this.PROJECT_CONFIG.contact} class="bk-text-button" v-bk-tooltips_top={this.$t('blueking.bk')}>{this.$t('blueking.contact')}</a>
                      : null
                }
                <a href={this.PROJECT_CONFIG.help} target="_blank" class="bk-text-button">{this.$t('blueking.help')}</a>
            </div>
    );
  },
});
