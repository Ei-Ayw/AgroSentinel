<template>
  <div style="position: relative; height: 100%; margin-bottom: 5px">
    <div
      id="mapchart"
      style="position: relative; margin-bottom: 5px"
      :style="{ height: height - 20 + 20 + 'px' }"
    ></div>
  </div>
</template>

<script>
import $ from "jquery";
import config from "/public/config.js";
import utils from "/public/utils.js";
import api from "/public/api.js";
import VChart, { THEME_KEY } from "vue-echarts";
import "echarts-extension-amap";
import "echarts-wordcloud";

export default {
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "dark",
  },
  data() {
    return {
      height: $(window).height(),
      size: (Math.random(100) * 1000).toFixed(0),
      count: (Math.random(100) * 1000).toFixed(0),
      category: (Math.random(100) * 1000).toFixed(0),
      cost: (Math.random(100) * 1000).toFixed(0),
      devicecount: (Math.random(100) * 1000).toFixed(0),
      deviceonlinecount: (Math.random(100) * 100).toFixed(0),
      charts: {},
      timer: null,
    };
  },
  mounted: function () {
    this.loadData();
    this.startRefreshChart();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount: function () {
    window.removeEventListener("resize", this.handleResize);
  },
  unmounted: function () {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    startRefreshChart: function () {
      if (this.timer) {
        clearInterval(this.timer);
      }
      var that = this;
      var refreshtime = 60 * 1000;
      config.getConfig().forEach(function (item, index) {
        if (item.key == "refreshtime") {
          refreshtime = item.value;
        }
      });
      this.timer = setInterval(function () {
        that.size = (Math.random(100) * 1000).toFixed(0);
        that.count = (Math.random(100) * 1000).toFixed(0);
        that.category = (Math.random(100) * 1000).toFixed(0);
        that.cost = (Math.random(100) * 1000).toFixed(0);
        that.devicecount = (Math.random(100) * 1000).toFixed(0);
        that.deviceonlinecount = (Math.random(100) * 100).toFixed(0);
      }, refreshtime);
    },
    loadData: function () {
      var that = this;
      api.loadMapData(function (res) {
        if (!res || res.status != 200) {
          utils.showerror("数据加载失败！");
          return;
        }
        that.initMapChart(res);
      });
    },
    initMapChart: function (res) {
      var mapchart = this.$echarts.init(document.getElementById("mapchart"));
      var values = [];
      const cities = [
        "丰台镇",
        "昌平镇",
        "通州镇",
        "大兴镇",
        "房山镇",
        "延庆镇",
        "怀柔镇",
        "密云镇",
        "顺义镇",
        "平谷镇",
        "门头沟镇",
        "石景山镇",
        "海淀区镇",
        "朝阳区镇",
        "西城区镇",
        "东城区镇",
        "汶川镇",
        "理县镇",
        "茂县镇",
        "松潘县镇",
        "九寨沟县镇",
        "金川县镇",
        "小金县镇",
        "黑水县镇",
        "马尔康市镇",
        "若尔盖县镇",
        "红原县镇",
      ];
      const crops = [
        "小麦",
        "水稻",
        "玉米",
        "大豆",
        "棉花",
        "蔬菜",
        "水果",
        "茶叶",
      ];
      const statuses = ["正常", "预警", "关注", "正常", "正常"];
      for (var i = 0; i < res.data.geoCoordMap.length; i++) {
        values.push({
          name: cities[i % cities.length], // 地点名称
          value: [res.data.geoCoordMap[i][0], res.data.geoCoordMap[i][1]],
          crop: crops[i % crops.length], // 主要种植作物
          status: statuses[Math.floor(Math.random() * statuses.length)], // 随机种植状态
          service: "已部署", // 信息服务是否已部署
        });
      }

      var option = {
        geoCoordMap: res.data.geoCoordMap,
        title: utils.createChartTitle("产区概览"),
        amap: {
          rotateEnable: true,
          pitchEnable: true,
          pitch: 45,
          viewMode: "3D",
          center: [116.436561, 39.897346],
          zoom: 12,
          resizeEnable: true,
          mapStyle: "amap://styles/darkblue",
          renderOnMoving: true,
          echartsLayerZIndex: 2019,
          echartsLayerInteractive: true,
          layers: [new AMap.TileLayer.Satellite()],
          largeMode: false,
        },
        series: [
          {
            type: "effectScatter",
            coordinateSystem: "amap",
            symbol: "pin",
            symbolSize: [30, 30],
            itemStyle: {
              normal: {
                color: "#FF5252",
              },
            },
            data: values,
            rippleEffect: {
              scale: 6,
              brushType: "stroke",
            },
            hoverAnimation: true,
          },
        ],
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
          formatter: function (params) {
            if (params.data) {
              return `<div style="font-size: 24px; font-weight: bold; margin-bottom: 5px;">${params.data.name}</div>
                     <div style="font-size: 20px; margin-bottom: 3px;">主要种植作物：${params.data.crop}</div>
                     <div style="font-size: 20px; margin-bottom: 3px;">种植状态：${params.data.status}</div>
                     <div style="font-size: 20px;">信息服务：${params.data.service}</div>`;
            }
            return "";
          },
          backgroundColor: "#0c1318",
          borderColor: "#333",
          borderWidth: 1,
          padding: 15,
          textStyle: {
            color: "#fff",
          },
        },
      };
      mapchart.setOption(option);

      var amapComponent = mapchart.getModel().getComponent("amap");
      var amap = amapComponent.getAMap();
      amap.addControl(new AMap.Scale());
      amap.addControl(new AMap.ToolBar());
      amap.addControl(
        new AMap.ControlBar({
          position: {
            left: "10px",
            top: "10px",
          },
          showControlButton: true,
        })
      );
      amap.addControl(
        new AMap.MapType({
          defaultType: 1,
          position: {
            right: "30px",
            top: "10px",
          },
        })
      );
      amapComponent.setEChartsLayerInteractive(true);

      var disProvince = new AMap.DistrictLayer.Province({
        zIndex: 1000,
        adcode: [110000],
        depth: 2,
        styles: {
          fill: function (properties) {
            var colors = [
              "#fac858",
              "#ee6666",
              "#91cc75",
              "#38cafb",
              "#4caff9",
              "#4adeca",
              "#2aa7ee",
              "#0270f2",
              "#488cf7",
            ];
            return colors[properties.adcode % colors.length] + "aa";
          },
          "province-stroke": "cornflowerblue",
          "city-stroke": "white",
          "county-stroke": "rgba(255,255,255,0.5)",
        },
      });
      disProvince.setMap(amap);

      this.charts["mapchart"] = mapchart;
    },
  },
};
</script>

<style scoped>
.status-training .model-status {
  color: #1890ff;
}

.status-completed .model-status {
  color: #52c41a;
}

.status-error .model-status {
  color: #f5222d;
}
</style>
