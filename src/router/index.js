import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { notification } from "ant-design-vue";
import NotFound from "../views/404.vue";
import Forbidden from "../views/403.vue";
import findLast from "lodash/findLast";
import { check, isLogin } from "../utils/auth";

// import RenderRouterView from '../components/RenderRouterView';
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      // component: RenderRouterView,
      // component: { render: h => h("router-view") },
      component: () =>
        import(/* webpackChunkName: "layout" */ "../layouts/UserLayout"),
      children: [
        {
          path: "/user",
          hideInMenu: true,
          redirect: "/user/login",
        },
        {
          path: "/user/login",
          name: "login",
          hideInMenu: true,
          component: () =>
            import(/* webpackChunkName: "user" */ "../views/User/Login"),
        },
        {
          path: "/user/register",
          name: "register",
          hideInMenu: true,
          component: () =>
            import(/* webpackChunkName: "user" */ "../views/User/Register"),
        },
      ],
    },
    {
      path: "/",
      meta: { authority: ["user", "admin"] },
      component: () => import("../layouts/BasicLayout"),
      children: [
        //dashboard
        {
          path: "/",
          redirect: "/dashboard/analysis",
        },
        {
          path: "/dashboard",
          name: "dashboard",
          meta: { icon: "dashboard", title: "仪表盘" },
          component: { render: (h) => h("router-view") },
          children: [
            {
              path: "/dashboard/analysis",
              name: "anslysis",
              meta: { title: "分析页" },
              component: () =>
                import(
                  /* webpackChunkName: "user" */ "../views/Dashboard/Analysis"
                ),
            },
          ],
        },
        //form
        {
          path: "/form",
          name: "form",
          component: { render: (h) => h("router-view") },
          meta: { icon: "form", title: "表单", authority: ["admin"] },
          children: [
            {
              path: "/form/basic-form",
              name: "basic-form",
              meta: { title: "基础表单" },
              component: () =>
                import(
                  /* webpackChunkName: "user" */ "../views/Forms/BasicForm"
                ),
            },
            {
              path: "/form/step-form",
              name: "stepform",
              hideChildrenInMenu: true,
              meta: { title: "分步表单" },
              component: () => import("../views/Forms/StepForms"),
              children: [
                {
                  path: "/form/step-form",
                  redirect: "/form/step-form/info",
                },
                {
                  path: "/form/step-form/info",
                  name: "info",
                  component: () => import("../views/Forms/StepForms/Step1"),
                },
                {
                  path: "/form/step-form/confirm",
                  name: "confirm",
                  component: () => import("../views/Forms/StepForms/Step2"),
                },
                {
                  path: "/form/step-form/result",
                  name: "result",
                  component: () => import("../views/Forms/StepForms/Step3"),
                },
              ],
            },
          ],
        },
        {
          path: "/sys",
          name: "system-admin",
          component: { render: (h) => h("router-view") },
          meta: { icon: "audit", title: "系统管理", authority: ["admin"] },
          children: [
            {
              path: "/sys/user",
              name: "user-info",
              meta: { title: "用户管理" },
              component: () => import("../views/Sys/UserAdmin"),
            },
          ],
        },
      ],
    },
    {
      path: "*",
      name: "404",
      hideInMenu: true,
      component: NotFound,
    },
    {
      path: "/403",
      name: "403",
      hideInMenu: true,
      component: Forbidden,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  const record = findLast(to.matched, (record) => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    //没有权限
    if (!isLogin && to.path !== "/user/login") {
      next({
        path: "/user/login",
      });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "你没有权限访问，请联系管理员咨询。",
      });
      next({
        path: "/403",
      });
    }
    NProgress.done();
  }
  next();
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
