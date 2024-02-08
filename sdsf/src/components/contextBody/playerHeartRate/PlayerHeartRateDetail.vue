<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "PlayerHeartRateDetail",
  data() {
    return {
      plId: Number,
      playerName: String,
      playerHeartRateList: {
        message: String,
        code: Number,
        total: Number,
        responseData: [],
      },

    }
  },
  methods: {
    getPlayerHeartRateList() {
      this.$http.post("/sdsb/playerheartrate/queryPlayerHeartRateDetail", {plId: this.plId}).then(response => {
        const res = response.data;
        this.playerHeartRateList.responseData = res.data;
        this.playerHeartRateList.code = res.code;
        this.playerHeartRateList.total = res.total;
        this.playerHeartRateList.message = res.message;
        // console.log(this.playerHeartRateList.responseData)

        // 数据加载完成后，初始化图表
        this.initChart();
      })
    },
    initChart() {
      this.$nextTick(() => {
        if (!this.chart) {
          this.chart = this.$echarts.init(document.getElementById('chart'));
        }

        const dates = this.playerHeartRateList.responseData.map(item => item.createDate);
        // console.log(this.playerHeartRateList.responseData)
        const heartRates = this.playerHeartRateList.responseData.map(item => item.plCurrentHeartRate);
        // console.log(heartRates)
        const option = {
          title: {
            text: this.playerName + ' 心率变化图',
            left: '1%'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '5%',
            right: '15%',
            bottom: '10%'
          },
          xAxis: {
            data: dates
          },
          yAxis: {
            scale: true,
            // data: heartRates,
            // type: 'value' // 确保Y轴被视为数值轴
          },
          toolbox: {
            right: 10,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          dataZoom: [
            {
              type: 'slider',
              start: 50,
              end: 100
            },
            {
              type: 'inside'
            }
          ],
          visualMap: {
            top: 50,
            right: 10,
            pieces: [
              {
                gt: 50,
                lte: 60,
                color: '#93CE07'
              },
              {
                gt: 60,
                lte: 70,
                color: '#FBDB0F'
              },
              {
                gt: 80,
                lte: 90,
                color: '#FC7D02'
              },
              {
                gt: 90,
                lte: 120,
                color: '#FD0100'
              },
              {
                gt: 110,
                lte: 120,
                color: '#AA069F'
              },
              {
                gt: 120,
                color: '#AC3B2A'
              }],
            outOfRange: {
              color: '#999'
            }
          },
          series: {
            name: 'Heart Rate',
            type: 'line',
            data: heartRates,
            markLine: {
              silent: true,
              lineStyle: {
                color: '#333'
              },
              data: [
                {
                  yAxis: 60
                },
                {
                  yAxis: 70
                },
                {
                  yAxis: 80
                },
                {
                  yAxis: 90
                },
                {
                  yAxis: 100
                }
              ]
            }
          }
        };
        this.chart.setOption(option);
      })
    },
  },
  created() {
    this.plId = this.$route.params.plId;
    this.playerName = this.$route.query.playerName;
    this.getPlayerHeartRateList();
    // console.log(this.plId, this.playerName);
  },
  mounted() {
    // this.initChart();
  }

})
</script>

<template>
  <div>
    <div id="chart" style="width: 1200px;height:600px;"></div>
  </div>
</template>

<style scoped>

</style>