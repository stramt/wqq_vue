<!--  -->
<template>
  <div>
    <Chart :option="chartOption" style="height: 400px" />
  </div>
</template>

<script>
import Chart from "../../components/Charts";
// import request from "../../utils/request";
export default {
  components: {
    Chart,
  },
  data() {
    return {
      chartOption: {},
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getChartData();
    this.interval = setInterval(() => {
      this.getChartData();
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    getChartData() {
      this.$request({
        url: "/api/dashboard/getChart",
        method: "get",
        params: { id: 12343 },
      }).then((response) => {
        this.chartOption = {
          // 绘制图表

          title: {
            text: "ECharts 入门示例",
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: response.data,
            },
          ],
        };
      });
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>
