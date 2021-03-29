<template>
  <div ref="chartDom"></div>
</template>

<script>
import * as echarts from "echarts";
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";
export default {
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  watch: {
    option(val) {
      this.chart.setOption(val);
    },
    // option: {
    //   handler(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true,
    // },
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    //防抖效果
    this.resize = debounce(this.resize, 300);
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      console.log("resize");
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例

      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.option);
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>
