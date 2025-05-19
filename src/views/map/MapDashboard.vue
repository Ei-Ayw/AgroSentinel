<template>
  <div id="container"></div>
  <el-button type="primary" @click="fetchGridData" class="map-control"
    >刷新网格数据</el-button
  >
  <div id="container"></div>
</template>

<script setup>
import { getGridData } from "@/api/map";
//import MapComponent from "@/components/MapComponent.vue";
import { ElMessage } from "element-plus";
const fetchGridData = async () => {
  try {
    await getGridData(114.2, 30.5, 10);
    // 可以在这里更新地图上的网格数据显示
  } catch (error) {
    ElMessage.error("网格数据加载失败：" + error.message);
  }
};
import { onMounted, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

let map = null;

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: "84a54301cf6666f0aa5902821112c007",
  };
  AMapLoader.load({
    key: "ab9878869e4426f79d2a27546629ddf4",
    version: "2.0",
    plugins: ["AMap.Scale"],
  })
    .then((AMap) => {
      this.map = new AMap.Map("container", {
        viewMode: "3D",
        zooms: [4, 18],
        zoom: 6,
        center: [116.397428, 39.90923],
      });
      var weixing = new AMap.TileLayer.Satellite({
        zIndex: 10,
      });
      this.map.add(weixing);
    })
    .catch((e) => {
      console.log(e);
    });
});

onUnmounted(() => {
  map?.destroy();
});
</script>

<style scoped>
.map-control {
  margin-top: 10px;
}
#container {
  width: 100%;
  height: 800px;
}
</style>
