<template>
  <div class="region-info">
    <div class="info-card" v-for="region in regions" :key="region.id">
      <div class="card-header">
        <h3>{{ region.name }}</h3>
      </div>
      <div class="card-content">
        <div class="info-item">
          <span class="info-label">面积:</span>
          <span class="info-value">{{ region.area }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">人口:</span>
          <span class="info-value">{{ region.population }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">主要作物:</span>
          <span class="info-value crops">{{
            region.mainCrops.join(", ")
          }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">监测站点:</span>
          <span class="info-value">{{ region.monitorStations }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">病虫害发生率:</span>
          <span
            :class="['info-value', 'pest-rate', getRiskClass(region.pestRate)]"
          >
            {{ region.pestRate }}%
          </span>
        </div>
      </div>
      <div class="card-footer"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 区域数据
const regions = ref([
  {
    id: 1,
    name: "华北地区",
    selected: false,
    area: "120万平方公里",
    population: "2.3亿",
    mainCrops: ["小麦", "玉米", "花生"],
    monitorStations: 320,
    pestRate: 12.5,
  },
  {
    id: 2,
    name: "华东地区",
    selected: false,
    area: "100万平方公里",
    population: "3.5亿",
    mainCrops: ["水稻", "小麦", "油菜"],
    monitorStations: 450,
    pestRate: 8.7,
  },
  {
    id: 3,
    name: "华南地区",
    selected: false,
    area: "80万平方公里",
    population: "2.8亿",
    mainCrops: ["水稻", "甘蔗", "香蕉"],
    monitorStations: 380,
    pestRate: 15.2,
  },
  {
    id: 4,
    name: "东北地区",
    selected: false,
    area: "130万平方公里",
    population: "1.1亿",
    mainCrops: ["大豆", "玉米", "水稻"],
    monitorStations: 290,
    pestRate: 7.3,
  },
]);

// 切换区域选择状态
const toggleSelection = (regionId) => {
  const region = regions.value.find((r) => r.id === regionId);
  if (region) {
    region.selected = !region.selected;
  }
};

// 获取状态文本
const getStatus = (selected) => {
  return selected ? "已选择" : "未选择";
};

// 获取风险等级类名
const getRiskClass = (rate) => {
  if (rate > 10) return "high-risk";
  if (rate > 5) return "medium-risk";
  return "low-risk";
};
</script>

<style scoped>
:root {
  --card-bg: rgba(255, 255, 255, 0.05);
  --card-hover-bg: rgba(255, 255, 255, 0.1);
  --primary-color: #4fc3f7;
  --secondary-color: #1976d2;
  --text-color: #c5e1ff;
  --border-color: rgba(255, 255, 255, 0.1);
  --low-risk-color: #4caf50;
  --medium-risk-color: #ff9800;
  --high-risk-color: #f44336;
}

.region-info {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.info-card {
  background-color: var(--card-bg);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.info-card:hover {
  background-color: var(--card-hover-bg);
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid var(--border-color);
}

.card-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--primary-color);
  font-weight: 600;
}

.region-status {
  font-size: 0.8rem;
  padding: 3px 8px;
  border-radius: 12px;
  color: var(--text-color);
  background-color: var(--secondary-color);
}

.region-status.selected {
  background-color: var(--primary-color);
}

.card-content {
  padding: 15px 20px;
}

.info-item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}

.info-label {
  width: 90px;
  font-size: 0.9rem;
  color: rgba(197, 225, 255, 0.7);
}

.info-value {
  flex: 1;
  font-size: 1rem;
  color: var(--text-color);
}

.crops {
  font-family: "Courier New", monospace;
}

.pest-rate {
  font-weight: bold;
}

.pest-rate.low-risk {
  color: var(--low-risk-color);
}

.pest-rate.medium-risk {
  color: var(--medium-risk-color);
}

.pest-rate.high-risk {
  color: var(--high-risk-color);
}

.card-footer {
  padding: 15px 20px;
  text-align: right;
}

.select-button {
  background-color: rgba(25, 118, 210, 0.2);
  border: 1px solid var(--secondary-color);
  color: var(--secondary-color);
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.select-button:hover {
  background-color: rgba(25, 118, 210, 0.4);
}

.select-button.selected {
  background-color: var(--secondary-color);
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .region-info {
    grid-template-columns: 1fr;
  }

  .info-card {
    margin-bottom: 15px;
  }

  .info-item {
    margin-bottom: 8px;
  }

  .info-label {
    width: 60px;
    font-size: 0.8rem;
  }

  .info-value {
    font-size: 0.9rem;
  }
}
</style>
