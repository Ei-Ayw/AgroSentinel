<template>
  <div class="agriculture-info">
    <div class="info-grid">
      <div class="info-card" v-for="item in infoData" :key="item.name">
        <div class="card-icon">
          <i :class="getItemIcon(item.name)"></i>
        </div>
        <div class="card-content">
          <h3>{{ item.name }}</h3>
          <div class="data-display">
            <span class="value">{{ item.value }}</span>
            <span
              :class="['trend', item.trend.startsWith('↑') ? 'up' : 'down']"
            >
              {{ item.trend }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="chart-container">
      <h3>农作物种植面积变化 (近5年)</h3>
      <div ref="chartRef" class="chart"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted} from "vue";
import * as echarts from "echarts";

const chartRef = ref(null);
const chartInstance = ref(null);

// 农业数据
const infoData = [
  { name: "小麦种植面积", value: "3.46亿亩", trend: "↑3.4%" },
  { name: "玉米种植面积", value: "6.35亿亩", trend: "↑2.2%" },
  { name: "水稻种植面积", value: "4.49亿亩", trend: "↓0.2%" },
  { name: "病虫害发生率", value: "12.5%", trend: "↓1.8%" },
];

// 获取图标类名
const getItemIcon = (name) => {
  const iconMap = {
    小麦种植面积: "icon-wheat",
    玉米种植面积: "icon-corn",
    水稻种植面积: "icon-rice",
    病虫害发生率: "icon-pest",
  };
  return iconMap[name] || "icon-default";
};

// 初始化图表
onMounted(() => {
  initChart();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  chartInstance.value?.dispose();
});

const handleResize = () => {
  chartInstance.value?.resize();
};

const initChart = () => {
  if (!chartRef.value) return;

  // 创建图表实例
  chartInstance.value = echarts.init(chartRef.value);

  // 图表配置
  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["2019", "2020", "2021", "2022", "2023"],
      axisLine: {
        lineStyle: {
          color: "#81d4fa",
        },
      },
      axisLabel: {
        color: "#e6f1ff",
      },
    },
    yAxis: {
      type: "value",
      name: "面积 (亿亩)",
      nameTextStyle: {
        color: "#e6f1ff",
      },
      axisLine: {
        lineStyle: {
          color: "#81d4fa",
        },
      },
      axisLabel: {
        color: "#e6f1ff",
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,0.1)",
        },
      },
    },
    legend: {
      data: ["小麦", "玉米", "水稻"],
      textStyle: {
        color: "#e6f1ff",
      },
    },
    series: [
      {
        name: "小麦",
        type: "bar",
        data: [3.32, 3.38, 3.4, 3.44, 3.46],
        itemStyle: {
          color: "#4fc3f7",
        },
      },
      {
        name: "玉米",
        type: "bar",
        data: [6.1, 6.15, 6.2, 6.25, 6.35],
        itemStyle: {
          color: "#ffb74d",
        },
      },
      {
        name: "水稻",
        type: "bar",
        data: [4.52, 4.5, 4.51, 4.5, 4.49],
        itemStyle: {
          color: "#ffcc80",
        },
      },
    ],
  };

  // 渲染图表
  chartInstance.value.setOption(option);
};
</script>

<style scoped>
:root {
  --card-bg: rgba(255, 255, 255, 0.05);
  --card-hover-bg: rgba(255, 255, 255, 0.1);
  --icon-bg: rgba(33, 150, 243, 0.2);
  --text-color: #e6f1ff;
  --value-color: #4fc3f7;
  --trend-up-color: #f5222d;
  --trend-down-color: #52c41a;
  --grid-gap: 15px;
  --card-padding: 15px;
  --card-icon-size: 40px;
}

.agriculture-info {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--grid-gap);
}

.info-card {
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: var(--card-padding);
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.info-card:hover {
  background-color: var(--card-hover-bg);
  transform: translateY(-2px);
}

.card-icon {
  width: var(--card-icon-size);
  height: var(--card-icon-size);
  background-color: var(--icon-bg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--card-padding);
}

.card-icon i {
  font-size: 20px;
  color: #1976d2;
}

.card-content {
  flex: 1;
}

.card-content h3 {
  margin: 0 0 5px 0;
  font-size: 1.25rem;
  color: var(--text-color);
}

.data-display {
  display: flex;
  align-items: baseline;
}

.value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--value-color);
}

.trend {
  margin-left: 5px;
  font-size: 1rem;
  padding: 2px 5px;
  border-radius: 3px;
}

.trend.up {
  background-color: rgba(var(--trend-up-color-rgb), 0.2);
  color: var(--trend-up-color);
}

.trend.down {
  background-color: rgba(var(--trend-down-color-rgb), 0.2);
  color: var(--trend-down-color);
}

.chart-container {
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: var(--card-padding);
}

.chart-container h3 {
  margin-top: 20px;
  font-size: 1.5rem;
  color: var(--value-color);
  margin-bottom: 10px;
}

.chart {
  height: 250px;
  width: 100%;
}

/* 图标样式 */
.icon-wheat:before {
  content: "🌾";
}
.icon-corn:before {
  content: "🌽";
}
.icon-rice:before {
  content: "🍚";
}
.icon-pest:before {
  content: "🐛";
}
.icon-default:before {
  content: "📊";
}

/* 响应式调整 */
@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .chart {
    height: 200px;
  }
}
</style>
