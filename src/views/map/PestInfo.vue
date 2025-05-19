<template>
  <div class="pest-info">
    <div class="risk-summary">
      <h3>病虫害风险概览</h3>
      <div class="summary-stats">
        <div class="stat-item">
          <span class="stat-value">{{ totalPests }}</span>
          <span class="stat-label">监测病虫害种类</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ highRiskCount }}</span>
          <span class="stat-label">高风险区域</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ currentinfectedArea }}</span>
          <span class="stat-label">当前感染面积 (亩)</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ preventionRate }}</span>
          <span class="stat-label">防治覆盖率</span>
        </div>
      </div>
    </div>

    <div class="pest-cards">
      <div class="pest-card" v-for="pest in pestData" :key="pest.name">
        <div class="card-header">
          <h3>{{ pest.name }}</h3>
          <div :class="['risk-level', `level-${pest.riskLevel}`]">
            {{ pest.riskLevel }}
          </div>
        </div>
        <div class="card-content">
          <p>主要分布区域: {{ pest.regions.join(", ") }}</p>
          <p>危害作物: {{ pest.crops.join(", ") }}</p>
          <p>发生概率: {{ pest.probability }}%</p>
          <p>防治建议: {{ pest.advice }}</p>
        </div>
      </div>
    </div>

    <div class="pest-history">
      <h3>病虫害历史发生记录</h3>
      <div class="history-table">
        <table>
          <thead>
            <tr>
              <th>病虫害名称</th>
              <th>发生地区</th>
              <th>发生时间</th>
              <th>严重程度</th>
              <th>防治措施</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, index) in historyRecords" :key="index">
              <td>{{ record.pestName }}</td>
              <td>{{ record.region }}</td>
              <td>{{ record.date }}</td>
              <td :class="`severity-${record.severity}`">
                {{ getSeverityText(record.severity) }}
              </td>
              <td>{{ record.measures }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// 定义组件内部的病虫害数据
const pestData = ref([
  {
    name: "草地贪夜蛾",
    riskLevel: "高",
    regions: ["河北", "山东", "河南"],
    crops: ["玉米", "小麦"],
    probability: 70,
    advice: "化学防治+生物防治",
  },
  {
    name: "小麦赤霉病",
    riskLevel: "中",
    regions: ["安徽", "江苏"],
    crops: ["小麦"],
    probability: 50,
    advice: "喷洒杀菌剂",
  },
  {
    name: "稻飞虱",
    riskLevel: "低",
    regions: ["湖南", "江西"],
    crops: ["水稻"],
    probability: 30,
    advice: "杀虫剂喷雾",
  },
]);

// 病虫害历史记录数据
const historyRecords = ref([
  {
    pestName: "草地贪夜蛾",
    region: "河北",
    date: "2023-05-15",
    severity: 3,
    measures: "化学防治+生物防治",
  },
  {
    pestName: "小麦赤霉病",
    region: "安徽",
    date: "2023-04-20",
    severity: 2,
    measures: "喷洒杀菌剂",
  },
  {
    pestName: "稻飞虱",
    region: "江苏",
    date: "2023-06-10",
    severity: 2,
    measures: "杀虫剂喷雾",
  },
  {
    pestName: "玉米螟",
    region: "山东",
    date: "2023-07-05",
    severity: 1,
    measures: "诱捕器+生物防治",
  },
  {
    pestName: "水稻纹枯病",
    region: "湖南",
    date: "2023-06-25",
    severity: 3,
    measures: "复合防治",
  },
]);

// 计算总病虫害种类数
const totalPests = computed(() => {
  return pestData.value.length;
});

// 计算高风险区域数量
const highRiskCount = computed(() => {
  return pestData.value.filter((pest) => pest.riskLevel === "高").length;
});

// 当前感染面积（模拟数据）
const currentinfectedArea = ref("124568");

// 防治覆盖率（模拟数据）
const preventionRate = ref("78.5%");

// 获取严重程度文本
const getSeverityText = (severity) => {
  switch (severity) {
    case 1:
      return "轻微";
    case 2:
      return "中等";
    case 3:
      return "严重";
    default:
      return "未知";
  }
};

// 初始化地图
const incidenceMap = ref(null);
onMounted(() => {
  // 这里可以集成地图库来显示病虫害分布情况
  // 例如使用 ECharts 或 MapBox
  if (incidenceMap.value) {
    console.log("地图容器已初始化");
    // 实际项目中可以在这里添加地图初始化代码
  }
});
</script>

<style scoped>
:root {
  --card-bg: rgba(255, 255, 255, 0.05);
  --card-hover-bg: rgba(255, 255, 255, 0.1);
  --primary-color: #4fc3f7;
  --secondary-color: #1976d2;
  --high-risk-color: #f5222d;
  --medium-risk-color: #faad14;
  --low-risk-color: #52c41a;
  --border-color: rgba(255, 255, 255, 0.1);
  --text-color: #c5e1ff;
  --font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.pest-info {
  padding: 20px;
  font-family: var(--font-family);
}

.risk-summary {
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.risk-summary h3 {
  margin-top: 0;
  color: var(--primary-color);
  font-size: 1.2rem;
  font-weight: 600;
}

.summary-stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 15px;
}

.stat-item {
  flex: 1;
  min-width: 150px;
  text-align: center;
  padding: 15px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.03);
  margin: 5px;
}

.stat-value {
  display: block;
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--primary-color);
}

.stat-label {
  font-size: 0.9rem;
  color: #81d4fa;
}

.pest-incidence-map {
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.pest-incidence-map h3 {
  margin-top: 0;
  color: var(--primary-color);
  font-size: 1.2rem;
  font-weight: 600;
}

.incidence-map {
  height: 300px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-top: 15px;
}

.pest-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
}

.pest-card {
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.pest-card:hover {
  background-color: var(--card-hover-bg);
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
}

.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-color);
  font-weight: 600;
}

.risk-level {
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: bold;
}

.level-高 {
  background-color: var(--high-risk-color);
  color: white;
}

.level-中 {
  background-color: var(--medium-risk-color);
  color: white;
}

.level-低 {
  background-color: var(--low-risk-color);
  color: white;
}

.card-content {
  font-size: 0.95rem;
  color: var(--text-color);
}

.card-content p {
  margin: 8px 0;
  line-height: 1.5;
}

.pest-history {
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.pest-history h3 {
  margin-top: 0;
  color: var(--primary-color);
  font-size: 1.2rem;
  font-weight: 600;
}

.history-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

th,
td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

th {
  background-color: var(--card-bg);
  color: var(--primary-color);
  font-weight: 600;
}

.severity-1 {
  color: var(--low-risk-color);
}

.severity-2 {
  color: var(--medium-risk-color);
}

.severity-3 {
  color: var(--high-risk-color);
  font-weight: bold;
}

tr:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .summary-stats {
    flex-direction: column;
  }
  .stat-item {
    margin-bottom: 10px;
  }
  .pest-cards {
    grid-template-columns: 1fr;
  }
  .incidence-map {
    height: 200px;
  }
}
</style>
