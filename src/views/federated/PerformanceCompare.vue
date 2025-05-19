<template>
  <div class="dashboard-container">
    <el-card class="header-card">
      <div class="header-content">
        <h1>模型性能监控面板</h1>
        <div class="button-group">
          <el-button type="primary" @click="fetchAiChat">问题解答</el-button>
          <el-button type="primary" @click="fetchUpload">资料上传</el-button>
          <el-button type="primary" @click="fetchExpert">知识库构建</el-button>
          <el-button type="primary" @click="fetchModel">模型训练</el-button>
        </div>
      </div>
    </el-card>

    <div class="table-section">
      <el-card class="table-card">
        <el-table
          :data="modelPerformance ? [modelPerformance] : mockTableData"
          style="width: 100%"
          border
          class="custom-table"
        >
          <el-table-column prop="region" label="地区" />
          <el-table-column prop="model_type" label="模型类型" />
          <el-table-column prop="accuracy" label="准确率" />
          <el-table-column prop="f1_score" label="F1分数" />
          <el-table-column prop="progress" label="训练进度">
            <template #default="scope">
              <el-progress
                :percentage="scope.row.progress"
                :color="getProgressColor(scope.row.progress)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag
                :type="scope.row.status === 'active' ? 'success' : 'info'"
              >
                {{ scope.row.status === "active" ? "活跃" : "不活跃" }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="last_update" label="最后更新时间" />
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import router from "@/router";

const queryParams = ref({
  model_type: "global",
  metric: "accuracy",
});

const modelPerformance = ref(null);

// 模拟的表格数据
const mockTableData = [
  // ====================== 全局模型（国家级，6大区，每区2条） ======================
  {
    region: "全局模型",
    model_type: "全局模型",
    accuracy: "0.692",
    f1_score: "0.985",
    progress: 78,
    status: "active",
    last_update: "2025-04-09 08:00:00",
  },
  {
    region: "华东地区",
    model_type: "全局模型",
    accuracy: "0.892",
    f1_score: "0.885",
    progress: 75,
    status: "active",
    last_update: "2025-04-09 08:00:00",
  },
  {
    region: "华东地区",
    model_type: "全局模型",
    accuracy: "0.888",
    f1_score: "0.882",
    progress: 78,
    status: "inactive",
    last_update: "2025-04-09 08:15:00",
  },
  {
    region: "华南地区",
    model_type: "全局模型",
    accuracy: "0.865",
    f1_score: "0.853",
    progress: 60,
    status: "active",
    last_update: "2025-04-09 08:30:00",
  },
  {
    region: "华南地区",
    model_type: "全局模型",
    accuracy: "0.870",
    f1_score: "0.856",
    progress: 63,
    status: "active",
    last_update: "2025-04-09 08:45:00",
  },
  {
    region: "华北地区",
    model_type: "全局模型",
    accuracy: "0.883",
    f1_score: "0.869",
    progress: 85,
    status: "active",
    last_update: "2025-04-09 09:00:00",
  },
  {
    region: "华北地区",
    model_type: "全局模型",
    accuracy: "0.880",
    f1_score: "0.866",
    progress: 82,
    status: "inactive",
    last_update: "2025-04-09 09:15:00",
  },
  {
    region: "西南地区",
    model_type: "全局模型",
    accuracy: "0.857",
    f1_score: "0.845",
    progress: 45,
    status: "inactive",
    last_update: "2025-04-09 09:30:00",
  },
  {
    region: "西南地区",
    model_type: "全局模型",
    accuracy: "0.862",
    f1_score: "0.850",
    progress: 50,
    status: "active",
    last_update: "2025-04-09 09:45:00",
  },
  {
    region: "东北地区",
    model_type: "全局模型",
    accuracy: "0.871",
    f1_score: "0.859",
    progress: 65,
    status: "active",
    last_update: "2025-04-09 10:00:00",
  },
  {
    region: "东北地区",
    model_type: "全局模型",
    accuracy: "0.868",
    f1_score: "0.855",
    progress: 62,
    status: "inactive",
    last_update: "2025-04-09 10:15:00",
  },
  {
    region: "西北地区",
    model_type: "全局模型",
    accuracy: "0.868",
    f1_score: "0.863",
    progress: 55,
    status: "inactive",
    last_update: "2025-04-09 10:30:00",
  },
  {
    region: "西北地区",
    model_type: "全局模型",
    accuracy: "0.873",
    f1_score: "0.867",
    progress: 58,
    status: "active",
    last_update: "2025-04-09 10:45:00",
  },
  {
    region: "华中地区",
    model_type: "全局模型",
    accuracy: "0.879",
    f1_score: "0.872",
    progress: 90,
    status: "active",
    last_update: "2025-04-09 11:00:00",
  },
  {
    region: "华中地区",
    model_type: "全局模型",
    accuracy: "0.875",
    f1_score: "0.869",
    progress: 88,
    status: "inactive",
    last_update: "2025-04-09 11:15:00",
  },

  // ====================== 省级模型（中间级，15省份，每省2条） ======================
  {
    region: "浙江省",
    model_type: "省级模型",
    accuracy: "0.915",
    f1_score: "0.908",
    progress: 85,
    status: "active",
    last_update: "2025-04-09 11:30:00",
  },
  {
    region: "浙江省",
    model_type: "省级模型",
    accuracy: "0.910",
    f1_score: "0.903",
    progress: 82,
    status: "inactive",
    last_update: "2025-04-09 11:45:00",
  },
  {
    region: "广东省",
    model_type: "省级模型",
    accuracy: "0.902",
    f1_score: "0.897",
    progress: 90,
    status: "active",
    last_update: "2025-04-09 12:00:00",
  },
  {
    region: "广东省",
    model_type: "省级模型",
    accuracy: "0.898",
    f1_score: "0.893",
    progress: 88,
    status: "inactive",
    last_update: "2025-04-09 12:15:00",
  },
  {
    region: "江苏省",
    model_type: "省级模型",
    accuracy: "0.905",
    f1_score: "0.899",
    progress: 87,
    status: "active",
    last_update: "2025-04-09 12:30:00",
  },
  {
    region: "江苏省",
    model_type: "省级模型",
    accuracy: "0.900",
    f1_score: "0.895",
    progress: 85,
    status: "inactive",
    last_update: "2025-04-09 12:45:00",
  },
  {
    region: "山东省",
    model_type: "省级模型",
    accuracy: "0.895",
    f1_score: "0.888",
    progress: 80,
    status: "active",
    last_update: "2025-04-09 13:00:00",
  },
  {
    region: "山东省",
    model_type: "省级模型",
    accuracy: "0.890",
    f1_score: "0.883",
    progress: 78,
    status: "inactive",
    last_update: "2025-04-09 13:15:00",
  },
  {
    region: "四川省",
    model_type: "省级模型",
    accuracy: "0.898",
    f1_score: "0.891",
    progress: 80,
    status: "inactive",
    last_update: "2025-04-09 13:30:00",
  },
  {
    region: "四川省",
    model_type: "省级模型",
    accuracy: "0.903",
    f1_score: "0.896",
    progress: 83,
    status: "active",
    last_update: "2025-04-09 13:45:00",
  },
  {
    region: "湖北省",
    model_type: "省级模型",
    accuracy: "0.885",
    f1_score: "0.878",
    progress: 75,
    status: "active",
    last_update: "2025-04-09 14:00:00",
  },
  {
    region: "湖北省",
    model_type: "省级模型",
    accuracy: "0.880",
    f1_score: "0.873",
    progress: 72,
    status: "inactive",
    last_update: "2025-04-09 14:15:00",
  },
  {
    region: "河南省",
    model_type: "省级模型",
    accuracy: "0.875",
    f1_score: "0.868",
    progress: 70,
    status: "active",
    last_update: "2025-04-09 14:30:00",
  },
  {
    region: "河南省",
    model_type: "省级模型",
    accuracy: "0.870",
    f1_score: "0.863",
    progress: 68,
    status: "inactive",
    last_update: "2025-04-09 14:45:00",
  },
  {
    region: "湖南省",
    model_type: "省级模型",
    accuracy: "0.888",
    f1_score: "0.881",
    progress: 80,
    status: "active",
    last_update: "2025-04-09 15:00:00",
  },
  {
    region: "湖南省",
    model_type: "省级模型",
    accuracy: "0.885",
    f1_score: "0.878",
    progress: 78,
    status: "inactive",
    last_update: "2025-04-09 15:15:00",
  },
  {
    region: "陕西省",
    model_type: "省级模型",
    accuracy: "0.872",
    f1_score: "0.865",
    progress: 65,
    status: "active",
    last_update: "2025-04-09 15:30:00",
  },
  {
    region: "陕西省",
    model_type: "省级模型",
    accuracy: "0.868",
    f1_score: "0.861",
    progress: 62,
    status: "inactive",
    last_update: "2025-04-09 15:45:00",
  },
  {
    region: "福建省",
    model_type: "省级模型",
    accuracy: "0.890",
    f1_score: "0.883",
    progress: 75,
    status: "active",
    last_update: "2025-04-09 16:00:00",
  },
  {
    region: "福建省",
    model_type: "省级模型",
    accuracy: "0.885",
    f1_score: "0.878",
    progress: 72,
    status: "inactive",
    last_update: "2025-04-09 16:15:00",
  },

  // ====================== 市级模型（基层，20城市，每市1条） ======================
  {
    region: "杭州市",
    model_type: "市级模型",
    accuracy: "0.889",
    f1_score: "0.882",
    progress: 70,
    status: "inactive",
    last_update: "2025-04-09 16:30:00",
  },
  {
    region: "广州市",
    model_type: "市级模型",
    accuracy: "0.876",
    f1_score: "0.869",
    progress: 65,
    status: "active",
    last_update: "2025-04-09 16:45:00",
  },
  {
    region: "南京市",
    model_type: "市级模型",
    accuracy: "0.895",
    f1_score: "0.888",
    progress: 78,
    status: "active",
    last_update: "2025-04-09 17:00:00",
  },
  {
    region: "济南市",
    model_type: "市级模型",
    accuracy: "0.865",
    f1_score: "0.858",
    progress: 60,
    status: "inactive",
    last_update: "2025-04-09 17:15:00",
  },
  {
    region: "成都市",
    model_type: "市级模型",
    accuracy: "0.860",
    f1_score: "0.853",
    progress: 55,
    status: "active",
    last_update: "2025-04-09 17:30:00",
  },
  {
    region: "武汉市",
    model_type: "市级模型",
    accuracy: "0.875",
    f1_score: "0.868",
    progress: 70,
    status: "inactive",
    last_update: "2025-04-09 17:45:00",
  },
  {
    region: "郑州市",
    model_type: "市级模型",
    accuracy: "0.855",
    f1_score: "0.848",
    progress: 50,
    status: "active",
    last_update: "2025-04-09 18:00:00",
  },
  {
    region: "长沙市",
    model_type: "市级模型",
    accuracy: "0.880",
    f1_score: "0.873",
    progress: 75,
    status: "inactive",
    last_update: "2025-04-09 18:15:00",
  },
  {
    region: "西安市",
    model_type: "市级模型",
    accuracy: "0.850",
    f1_score: "0.843",
    progress: 45,
    status: "active",
    last_update: "2025-04-09 18:30:00",
  },
  {
    region: "福州市",
    model_type: "市级模型",
    accuracy: "0.870",
    f1_score: "0.863",
    progress: 65,
    status: "inactive",
    last_update: "2025-04-09 18:45:00",
  },
  {
    region: "青岛市",
    model_type: "市级模型",
    accuracy: "0.865",
    f1_score: "0.858",
    progress: 60,
    status: "active",
    last_update: "2025-04-09 19:00:00",
  },
  {
    region: "宁波市",
    model_type: "市级模型",
    accuracy: "0.890",
    f1_score: "0.883",
    progress: 78,
    status: "inactive",
    last_update: "2025-04-09 19:15:00",
  },
  {
    region: "东莞市",
    model_type: "市级模型",
    accuracy: "0.855",
    f1_score: "0.848",
    progress: 55,
    status: "active",
    last_update: "2025-04-09 19:30:00",
  },
  {
    region: "苏州市",
    model_type: "市级模型",
    accuracy: "0.885",
    f1_score: "0.878",
    progress: 75,
    status: "inactive",
    last_update: "2025-04-09 19:45:00",
  },
  {
    region: "温州市",
    model_type: "市级模型",
    accuracy: "0.860",
    f1_score: "0.853",
    progress: 60,
    status: "active",
    last_update: "2025-04-09 20:00:00",
  },
  {
    region: "佛山市",
    model_type: "市级模型",
    accuracy: "0.850",
    f1_score: "0.843",
    progress: 50,
    status: "inactive",
    last_update: "2025-04-09 20:15:00",
  },
  {
    region: "合肥市",
    model_type: "市级模型",
    accuracy: "0.875",
    f1_score: "0.868",
    progress: 70,
    status: "active",
    last_update: "2025-04-09 20:30:00",
  },
  {
    region: "昆明市",
    model_type: "市级模型",
    accuracy: "0.865",
    f1_score: "0.858",
    progress: 65,
    status: "inactive",
    last_update: "2025-04-09 20:45:00",
  },
  {
    region: "哈尔滨市",
    model_type: "市级模型",
    accuracy: "0.855",
    f1_score: "0.848",
    progress: 55,
    status: "active",
    last_update: "2025-04-09 21:00:00",
  },
  {
    region: "长春市",
    model_type: "市级模型",
    accuracy: "0.870",
    f1_score: "0.863",
    progress: 60,
    status: "inactive",
    last_update: "2025-04-09 21:15:00",
  },
];

// 获取进度条颜色
const getProgressColor = (progress) => {
  if (progress >= 80) return "#4caf50";
  if (progress >= 60) return "#ff9800";
  return "#f44336";
};

// 查询性能
const fetchPerformance = async () => {
  try {
    // 模拟API请求延迟
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 根据查询参数获取虚拟数据
    const { model_type, metric } = queryParams.value;

    // 模拟后端返回的数据
    modelPerformance.value = {
      region: model_type === "global" ? "全局" : "本地",
      model_type: model_type === "global" ? "全局模型" : "本地模型",
      accuracy: mockData[metric].global.global_value.toFixed(3),
      f1_score: mockData.f1.global.global_value.toFixed(3),
      progress: Math.floor(Math.random() * 100),
      status: Math.random() > 0.3 ? "active" : "inactive",
      last_update: new Date().toLocaleString(),
    };
  } catch (error) {
    ElMessage.error("获取模型性能失败：" + error.message);
  }
};

// 模拟的虚拟数据
const mockData = {
  accuracy: {
    global: { global_value: 0.875 },
    local: { global_value: null },
  },
  f1: {
    global: { global_value: 0.862 },
    local: { global_value: null },
  },
};

const fetchAiChat = () => {
  console.log("问答页面");
  router.push({
    path: "/knowledge/qa",
  });
};

const fetchUpload = () => {
  console.log("资料上传页面");
  router.push({
    path: "/knowledge/upload",
  });
};

const fetchExpert = () => {
  console.log("知识库构建页面");
  router.push({
    path: "/knowledge/expert-knowledge",
  });
};

const fetchModel = () => {
  console.log("模型训练页面");
  router.push({
    path: "/federated/training-status",
  });
};

onMounted(() => {
  // 初始加载数据
  modelPerformance.value = null;
});
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header-card {
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: none !important;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1px;
}

h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filter-section {
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 8px;
  height: 30px;
}

.filter-form {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

.button-group {
  display: flex;
  gap: 12px; /* 调整按钮之间的距离 */
}

.el-button {
  margin-left: 0 !important; /* 移除默认的左边距 */
}

.table-section {
  flex: 1;
}

.table-card {
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.custom-table {
  --el-table-header-bg-color: #f5f7fa;
  --el-table-border-color: #dcdfe6;
}

:deep(.el-table th) {
  background-color: var(--el-table-header-bg-color);
  font-weight: bold;
}

:deep(.el-table .el-table__cell) {
  padding: 12px 15px;
}

:deep(.el-progress__text) {
  display: none;
}
</style>
