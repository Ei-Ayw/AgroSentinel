<template>
  <div class="agriculture-system">
    <header class="system-header">
      <h1>苍穹智鉴・农业病虫害多模态联邦决策天穹系统</h1>
    </header>

    <div class="main-container">
      <!-- 左侧信息面板 -->
      <div class="info-panel">
        <div class="panel-header">
          <h2>农业数据监测中心</h2>
          <div class="date-display">
            <span style="margin-right: 2px">{{ currentDate }}</span>
            <span>{{ currentTime }}</span>
          </div>
        </div>

        <div class="info-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="['tab-button', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.name }}
          </button>
        </div>

        <div class="tab-content">
          <component
            :is="currentTabComponent"
            :data="currentTabData"
            @update-data="handleUpdateData"
          />
        </div>
      </div>

      <!-- 右侧地图组件 -->
      <div class="map-container">
        <map-vue />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import RegionInfo from "@/views/map/RegionInfo.vue";
import AgricultureInfo from "@/views/map/AgricultureInfo.vue";
import PestInfo from "@/views/map/PestInfo.vue";
import MapVue from "@/views/map/mapVue.vue";

// 当前日期和时间
const currentDate = ref(new Date().toLocaleDateString());
const currentTime = ref(new Date().toLocaleTimeString());

// 定时更新时间
setInterval(() => {
  currentTime.value = new Date().toLocaleTimeString();
}, 1000);

// 标签页数据
const tabs = [
  { id: "regions", name: "地区信息" },
  { id: "agriculture", name: "农业信息" },
  { id: "pest", name: "病虫害数据" },
];

const activeTab = ref("regions");

// 标签页与组件的映射关系
const componentMap = {
  regions: RegionInfo,
  agriculture: AgricultureInfo,
  pest: PestInfo,
};

// 当前显示的组件
const currentTabComponent = computed(() => componentMap[activeTab.value]);

// 标签页数据
const tabData = reactive({
  region: {
    regions: [
      {
        id: "bj",
        name: "北京市",
        area: "16410 km²",
        population: "2154万",
        mainCrops: ["小麦", "玉米", "蔬菜"],
      },
      {
        id: "sh",
        name: "上海市",
        area: "6340 km²",
        population: "2489万",
        mainCrops: ["稻米", "蔬菜", "水果"],
      },
      {
        id: "hb",
        name: "河北省",
        area: "188800 km²",
        population: "7461万",
        mainCrops: ["小麦", "玉米", "棉花", "花生"],
      },
    ],
  },
  agriculture: {
    data: [
      { name: "小麦种植面积", value: "3.46亿亩", trend: "↑2.3%" },
      { name: "玉米种植面积", value: "6.35亿亩", trend: "↑1.7%" },
      { name: "水稻种植面积", value: "4.49亿亩", trend: "↓0.5%" },
      { name: "病虫害发生率", value: "12.8%", trend: "↑0.3%" },
    ],
  },
  pest: {
    data: [
      {
        name: "草地贪夜蛾",
        status: "高风险",
        regions: ["河北", "河南", "山东"],
      },
      {
        name: "小麦赤霉病",
        status: "中风险",
        regions: ["安徽", "江苏", "湖北"],
      },
      { name: "水稻螟虫", status: "低风险", regions: ["湖南", "江西", "浙江"] },
    ],
  },
  statistics: {
    charts: [
      {
        type: "pie",
        title: "病虫害发生率分布",
        data: { pest1: 35, pest2: 25, pest3: 20, pest4: 20 },
      },
      {
        type: "line",
        title: "近一年病虫害趋势",
        data: [2.1, 2.5, 3.2, 3.8, 4.2, 4.7, 5.1, 5.4, 5.6, 5.8, 6.0, 6.2],
      },
    ],
  },
});

// 当前标签页的数据
const currentTabData = computed(() => tabData[activeTab.value]);

// 事件处理函数
const handleUpdateData = (newData) => {
  // 更新对应标签页的数据
  tabData[activeTab.value] = { ...tabData[activeTab.value], ...newData };
};
</script>

<style scoped>
.agriculture-system {
  font-family: "Microsoft YaHei", sans-serif;
  background-color: #0a1128;
  color: #e6f1ff;
  min-height: 100vh;
}

.system-header {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.system-header h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #333;
  letter-spacing: 2px;
}

.main-container {
  display: flex;
  height: calc(100vh - 80px);
}

.info-panel {
  width: 28%;
  background-color: rgba(13, 71, 161, 0.3);
  border-right: 1px solid rgba(27, 94, 32, 0.5);
  padding: 15px;
  overflow-y: auto;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(27, 94, 32, 0.5);
}

.panel-header h2 {
  margin: 0;
  font-size: 1.3rem;
  color: #4fc3f7;
}

.date-display {
  font-size: 0.9rem;
  color: #81d4fa;
}

.info-tabs {
  display: flex;
  margin-bottom: 15px;
}

.tab-button {
  flex: 1;
  padding: 8px;
  background-color: rgba(27, 94, 32, 0.5);
  border: none;
  color: #a7ffeb;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-button.active {
  background-color: rgba(79, 195, 247, 0.7);
  color: #0a1128;
  font-weight: bold;
}

.tab-button:hover {
  background-color: rgba(79, 195, 247, 0.5);
}

.tab-content {
  background-color: rgba(13, 71, 161, 0.5);
  border-radius: 4px;
  padding: 15px;
  height: calc(100% - 70px);
  overflow-y: auto;
}

.map-container {
  width: 72%;
  height: 100%;
  background-color: rgba(13, 71, 161, 0.3);
  overflow: hidden;
  position: relative;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .main-container {
    flex-direction: column;
  }

  .info-panel {
    width: 100%;
    height: 30%;
    border-right: none;
    border-bottom: 1px solid rgba(27, 94, 32, 0.5);
  }

  .map-container {
    width: 100%;
    height: 70%;
  }
}
</style>
