<template>
  <div id="container"></div>
  <el-button type="primary" @click="fetchGridData" class="map-control">
    刷新网格数据
  </el-button>
</template>

<script setup>
import { getGridData } from "@/api/map";
import { ElMessage } from "element-plus";
import { onMounted, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

const fetchGridData = async () => {
  try {
    await getGridData(114.2, 30.5, 10);
    // 可以在这里更新地图上的网格数据显示
  } catch (error) {
    ElMessage.error("网格数据加载失败：" + error.message);
  }
};




let map = null;
let satelliteLayer = null;

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
      map = new AMap.Map("container", {
        viewMode: "3D",
        zoom: 11,
        center: [116.397428, 39.90923],
      });

      // 创建卫星图层
      satelliteLayer = new AMap.TileLayer.Satellite();
      // 添加卫星图层到地图
      map.add(satelliteLayer);

      // 检查图层是否添加成功
      if (map.getLayers().includes(satelliteLayer)) {
        console.log("卫星图层添加成功");
      } else {
        console.log("卫星图层添加失败");
      }
    })
    .catch((e) => {
      console.error("地图加载失败:", e);
    });
});

onUnmounted(() => {
  map?.remove(satelliteLayer);
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
