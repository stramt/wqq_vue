<!--  -->
<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrappedCol"
      >
        {{ step.payAccount }}
      </a-form-item>
      <a-form-item
        label="密码"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrappedCol"
      >
        <a-input
          type="password"
          placeholder="请输入密码"
          v-decorator="[
            'password',
            {
              initialValue: step.payAccount,
              rules: [{ required: true, message: '请输入密码' }],
            },
          ]"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
        <a-button type="margin-left: 8px" @click="onPrev">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
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
    step() {
      return this.$store.state.form.step;
    },
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    handleSubmit() {
      console.log("提交");
      const { form, $store, step } = this;
      console.log(this.form);
      form.validateFields((err, values) => {
        console.log(1);
        if (!err) {
          console.log(2);

          $store.dispatch({
            type: "form/submitStepForm",
            payload: { ...step, ...values },
          });
        }
      });
    },
    onPrev() {
      this.$router.push("/form/step-form/info");
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>
