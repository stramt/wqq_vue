<!--  -->
<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        v-model="collapsed"
        collapsible
        width="256px"
      >
        <div class="logo">Ant Design Vue Pro</div>
        <SideMenu :theme="navTheme"></SideMenu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            v-auth="['admin']"
            class="trigger"
            :type="collapsed ? 'menu-fold' : 'menu-unfold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header></Header>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer></Footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>

    <Authorized :authority="['user']">
      <SettingDrawer />
    </Authorized>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SideMenu from "./SideMenu";
import SettingDrawer from "../components/SettingDrawer";
export default {
  components: {
    Header,
    SideMenu,
    Footer,
    SettingDrawer,
  },
  data() {
    return {
      collapsed: false,
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.trigger {
  line-height: 64px;
  font-size: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
.trigger:hover {
  background: #eeeeee;
}
.nav-theme-dark >>> .logo {
  color: #ffffff;
}
.logo {
  height: auto;
  text-align: center;
  overflow: hidden;
}
</style>
