import router from "../../router";
import request from "../../utils/request";

const state = {
  login: {
    username: "",
    password: "",
  },
};
const actions = {
  async userLogin({ userInfo }) {
    console.log("请求" + userInfo);
    await request({
      url: "/api/login",
      method: "GET",
      data: userInfo,
    });
    router.push("/dashboard/analysis");
  },
};

const mutations = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
