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
import Vue from 'vue';
import VueRouter from 'vue-router';

import ClusterManage from './cluster-manage';
import DeployManage from './deployment-manage';
import PlatformManage from './platform-manage';
import PluginManage from './plugin-manage';
import ProjectManage from './project-manage';
import ResourceView from './resource-view';// todo 有循环依赖

import { clusterDetail } from '@/api/modules/cluster-manager';
import cancelRequest from '@/common/cancel-request';
import usePlatform from '@/composables/use-platform';
import $store from '@/store';
import useMenu from '@/views/app/use-menu';

Vue.use(VueRouter);

const Entry = () => import(/* webpackChunkName: 'entry' */'@/views/index.vue');
const DefaultSideMenu = () => import(/* webpackChunkName: 'entry' */'@/views/app/side-menu.vue');
const NotFound = () => import(/* webpackChunkName: 'entry' */'@/views/app/404.vue');
const Forbidden = () => import(/* webpackChunkName: 'entry' */'@/views/app/403.vue');
const Token = () => import(/* webpackChunkName: 'entry' */'@/views/user-token/token.vue');
const ProjectList = () => import(/* webpackChunkName: 'project' */'@/views/project-manage/project/project.vue');

const { config, setDocumentTitle } = usePlatform();
let name;
let brandName;

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: `${SITE_URL}`,
      name: 'home',
      redirect: {
        name: 'dashboardHome',
        params: {
          projectCode: $store.getters.curProjectCode,
        },
      },
    },
    // 403和user-token路由优先级比 ${SITE_URL}/:projectCode 高
    {
      path: `${SITE_URL}/:projectCode/403`,
      name: '403',
      props: route => ({ ...route.params, ...route.query }),
      component: Forbidden,
    },
    {
      path: `${SITE_URL}/projects`,
      name: 'projectManage',
      component: ProjectList,
      meta: {
        menuId: 'PROJECT_LIST',
      },
    },
    {
      path: `${SITE_URL}/:projectCode`,
      redirect: {
        name: 'dashboardHome',
      },
    },
    {
      path: `${SITE_URL}/projects/:projectCode`,
      components: {
        default: Entry,
        sideMenu: DefaultSideMenu,
      },
      redirect: {
        name: 'clusterMain',
      },
      children: [
        {
          path: 'user-token',
          name: 'token',
          component: Token,
        },
        ...ClusterManage,
        ...DeployManage,
        ...PlatformManage,
        ...ProjectManage,
        ...PluginManage,
      ],
    },
    // 资源视图
    {
      path: `${SITE_URL}/projects/:projectCode`,
      name: 'dashboardIndex',
      component: Entry,
      meta: {
        hideMenu: true,
      },
      children: [
        ...ResourceView,
      ],
    },
    // 404
    {
      path: '*',
      name: '404',
      component: NotFound,
    },
  ],
});

// 自定义back逻辑
VueRouter.prototype.back = () => {
  if (window.history.length <= 2) {
    router.push({
      name: $store.state.curNav?.route || 'home',
    });
  } else {
    router.go(-1);
  }
};

const clusterPathPattern = new RegExp(`^${SITE_URL}/clusters/([^/]+)`); // 匹配 ${SITE_URL}/clusters/:clusterId

router.beforeEach(async (to, from, next) => {
  const redirectPath = typeof to?.redirectedFrom === 'string' ? to?.redirectedFrom : '';
  // 兼容无projectCode的路径
  if (!to.name || to.name === '404' || redirectPath) {
    const match = to.fullPath?.match(clusterPathPattern);
    const clusterId = match?.[1] || to?.query?.clusterId; // 从匹配结果或者query中获取 clusterId
    if (clusterId && clusterId !== '-') {
      // 查找clusterId对应的项目
      const data = await clusterDetail({
        $clusterId: clusterId,
      }).catch(() => ({ extraInfo: {} }));
      const projectCode = data?.extraInfo?.projectCode;

      if (projectCode) {
        // 如果路径匹配 ${SITE_URL}/clusters/:clusterId
        let newPath = `${SITE_URL}/projects/${projectCode}${to.fullPath?.replace(SITE_URL, '')}`;
        if (redirectPath) {
          // 如果发生了重定向
          newPath = `${SITE_URL}/projects/${projectCode}${redirectPath?.replace(SITE_URL, '')}`;
        }
        let name;
        let newPathRoute;
        try {
          newPathRoute = router.resolve(newPath);
          name = newPathRoute.route.matched?.[newPathRoute.route.matched.length - 1]?.name;
        } catch (err) {
          console.warn(err);
          name = '404';
        }

        // 重定向到新路径
        next({
          name,
          params: { // 防止被路由规则的 params 覆盖
            ...(newPathRoute?.route?.params || {}),
            projectCode,
            clusterId,
          },
          query: {
            ...(to.query || {}),
          },
        });
        return;
      }
    }
  }

  // 设置必填路由参数
  if (!to.params.projectId && $store.getters.curProjectId) {
    to.params.projectId = $store.getters.curProjectId;
  }
  if (!to.params.projectCode && $store.getters.curProjectCode) {
    to.params.projectCode = $store.getters.curProjectCode;
  }
  // 取消上一个页面的请求
  await cancelRequest();
  // 校验路由是否开启
  const { validateRouteEnable } = useMenu();
  const result = await validateRouteEnable(to);
  if (!result) {
    // 未开启菜单项
    next({ name: '404' });
  } else {
    next();
  }
});

router.afterEach((to) => {
  if (config.i18n?.name && !name) {
    name = config.i18n.name;
    brandName = config.i18n.brandName;
  }
  if (to.meta?.resource) {
    const temp = {
      name: to.meta.resource,
      brandName: name,
    };
    setDocumentTitle(temp, [brandName]);
  } else {
    setDocumentTitle(config.i18n);
  }
});

export default router;
