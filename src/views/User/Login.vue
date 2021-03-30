<template>
  <a-layout class="loginLayout">
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <h1 style="margin-left: 4%; margin-top: -14%; margin-bottom: 53px">
        登录 | Login
      </h1>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrappedCol"
      >
        <a-input
          v-decorator="[
            'username',
            {
              rules: [
                { required: true, message: 'Please input your username!' },
              ],
            },
          ]"
          placeholder="Username"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrappedCol"
      >
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            },
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button">
          Log in
        </a-button>
      </a-form-item>
    </a-form>
  </a-layout>
</template>

<script>
import router from "../../router";
import { notification } from "ant-design-vue";
export default {
  data() {
    this.form = this.$form.createForm(this);
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrappedCol: { span: 14 },
      },
    };
  },
  computed: {
    login() {
      return this.$store.form.login;
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(2222);
          this.$request({
            url: "/api/login",
            method: "get",
            params: { ...values },
          }).then((res) => {
            console.log(res.data);
            if (res.data === "success") {
              router.push("/dashboard/analysis");
            } else {
              notification.error({
                // eslint-disable-next-line no-unused-vars
                message: "登录失败",
                description: res.data,
              });
            }
          });
        }
      });
    },
  },
};
</script>
<style scoped>
/* #components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
} */
/* #components-form-demo-normal-login .login-form-button {
  width: 100%;
} */
/* #components-form-demo-normal-login {
  text-align: center;
} */
.loginLayout {
  background: url("../../assets/login.jpg");
  background-size: 100% 100%;
  height: 100%;
}
.login-form {
  width: 571px;
  position: relative;
  margin: 357px auto;
  padding: 80px 0 80px 80px;
  top: 50%;
}
</style>
