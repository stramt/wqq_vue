import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
} from "ant-design-vue";
import Authorized from "./components/Authorized";
import Auth from "./directives/auth";
import axios from "axios";
import Request from "./utils/request";
Vue.prototype.$request = Request;
Vue.prototype.$ajax = axios;
// 设置全局变量
import global_ from "./Base.vue";
Vue.prototype.GLOBAL = global_;
axios.defaults.baseURL = global_.BASE_URL;

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.component("Authorized", Authorized);
Vue.use(Auth);
Vue.use(Request);
Vue.use(Form);
Vue.use(Input);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
