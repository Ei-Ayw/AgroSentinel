<template>
  <div class="tableView">
    <el-card shadow="always" style="border-radius: 15px; overflow: hidden">
      <template #header>
        <div class="card-header">
          <span style="font-size: 20px; font-weight: bold"
            >联邦学习训练状态</span
          >
          <a-button
            type="primary"
            style="margin-left: 20px"
            @click="handleModalPerformance"
          >
            模型表现
          </a-button>
        </div>
      </template>

      <div class="global-loss">
        <span style="font-weight: bold; font-size: 16px">全局损失:</span>
        <span style="margin-left: 10px">{{ trainingStatus?.global_loss }}</span>
      </div>

      <el-table
        :data="trainingStatus?.nodes"
        stripe
        style="margin-top: 20px; width: 100%"
        border
        header-cell-class-name="custom-header"
      >
        <el-table-column prop="node_id" label="节点ID" min-width="150" />
        <el-table-column prop="status" label="状态" min-width="100">
          <template #default="scope">
            <el-tag
              :type="scope.row.status === 'active' ? 'success' : 'info'"
              effect="dark"
            >
              {{ scope.row.status === "active" ? "活跃" : "不活跃" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="local_loss" label="本地损失" min-width="120" />
        <el-table-column prop="contribution" label="贡献度" min-width="100" />
        <el-table-column label="训练进度" min-width="180">
          <template #default="scope">
            <a-progress
              :percent="scope.row.progress"
              :strokeWidth="8"
              :format="(percent) => `${percent}%`"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="last_update"
          label="最后更新时间"
          min-width="180"
        />
        <el-table-column label="是否已上传权重" min-width="150">
          <template #default="scope">
            <el-tag type="primary" effect="dark" style="font-weight: bold">
              {{ scope.row.weight_uploaded ? "已上传" : "未上传" }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import router from "@/router";

const trainingStatus = ref(null);

onMounted(() => {
  try {
    // 虚拟数据
    trainingStatus.value = {
      global_loss: 0.345,
      nodes: [
        {
          node_id: "北京市",
          status: "active",
          local_loss: 0.234,
          contribution: 0.12,
          progress: 0.80,
          last_update: "2025-04-09 10:30:00",
          weight_uploaded: true,
        },
        {
          node_id: "上海市",
          status: "inactive",
          local_loss: 0.456,
          contribution: 0.08,
          progress: 0.40,
          last_update: "2025-04-09 10:15:00",
          weight_uploaded: false,
        },
        {
          node_id: "广东省广州市",
          status: "active",
          local_loss: 0.123,
          contribution: 0.15,
          progress: 0.60,
          last_update: "2025-04-09 10:45:00",
          weight_uploaded: true,
        },
        {
          node_id: "江苏省南京市",
          status: "active",
          local_loss: 0.345,
          contribution: 0.1,
          progress: 0.80,
          last_update: "2025-04-09 11:00:00",
          weight_uploaded: true,
        },
        {
          node_id: "四川省成都市",
          status: "inactive",
          local_loss: 0.567,
          contribution: 0.05,
          progress: 0.30,
          last_update: "2025-04-09 11:15:00",
          weight_uploaded: false,
        },
        {
          node_id: "湖北省武汉市",
          status: "active",
          local_loss: 0.231,
          contribution: 0.18,
          progress: 0.50,
          last_update: "2025-04-09 11:30:00",
          weight_uploaded: true,
        },
        {
          node_id: "浙江省杭州市",
          status: "active",
          local_loss: 0.453,
          contribution: 0.13,
          progress: 0.70,
          last_update: "2025-04-09 11:45:00",
          weight_uploaded: true,
        },
        {
          node_id: "陕西省西安市",
          status: "inactive",
          local_loss: 0.678,
          contribution: 0.07,
          progress: 0.25,
          last_update: "2025-04-09 12:00:00",
          weight_uploaded: false,
        },
        {
          node_id: "福建省厦门市",
          status: "active",
          local_loss: 0.342,
          contribution: 0.14,
          progress: 0.65,
          last_update: "2025-04-09 12:15:00",
          weight_uploaded: true,
        },
        {
          node_id: "湖南省长沙市",
          status: "inactive",
          local_loss: 0.564,
          contribution: 0.09,
          progress: 0.45,
          last_update: "2025-04-09 12:30:00",
          weight_uploaded: false,
        },
        {
          node_id: "广东省广州市",
          status: "active",
          local_loss: 0.234,
          contribution: 0.12,
          progress: 0.2,
          last_update: "2025-04-09 10:30:00",
          weight_uploaded: false,
        },
        {
          node_id: "江苏省南京市",
          status: "inactive",
          local_loss: 0.456,
          contribution: 0.08,
          progress: 0.4,
          last_update: "2025-04-09 10:15:00",
          weight_uploaded: true,
        },
        {
          node_id: "浙江省杭州市",
          status: "active",
          local_loss: 0.123,
          contribution: 0.15,
          progress: 0.6,
          last_update: "2025-04-09 10:45:00",
          weight_uploaded: false,
        },
        {
          node_id: "山东省济南市",
          status: "active",
          local_loss: 0.345,
          contribution: 0.1,
          progress: 0.8,
          last_update: "2025-04-09 11:00:00",
          weight_uploaded: true,
        },
        {
          node_id: "河南省郑州市",
          status: "inactive",
          local_loss: 0.567,
          contribution: 0.05,
          progress: 0.3,
          last_update: "2025-04-09 11:15:00",
          weight_uploaded: false,
        },
        {
          node_id: "四川省成都市",
          status: "active",
          local_loss: 0.231,
          contribution: 0.18,
          progress: 0.5,
          last_update: "2025-04-09 11:30:00",
          weight_uploaded: true,
        },
        {
          node_id: "湖北省武汉市",
          status: "active",
          local_loss: 0.453,
          contribution: 0.13,
          progress: 0.7,
          last_update: "2025-04-09 11:45:00",
          weight_uploaded: false,
        },
        {
          node_id: "湖南省长沙市",
          status: "inactive",
          local_loss: 0.678,
          contribution: 0.07,
          progress: 0.25,
          last_update: "2025-04-09 12:00:00",
          weight_uploaded: true,
        },
        {
          node_id: "福建省福州市",
          status: "active",
          local_loss: 0.342,
          contribution: 0.14,
          progress: 0.65,
          last_update: "2025-04-09 12:15:00",
          weight_uploaded: false,
        },
        {
          node_id: "陕西省西安市",
          status: "inactive",
          local_loss: 0.564,
          contribution: 0.09,
          progress: 0.45,
          last_update: "2025-04-09 12:30:00",
          weight_uploaded: true,
        },
        {
          node_id: "安徽省合肥市",
          status: "active",
          local_loss: 0.235,
          contribution: 0.16,
          progress: 0.85,
          last_update: "2025-04-09 12:45:00",
          weight_uploaded: false,
        },
        {
          node_id: "辽宁省沈阳市",
          status: "active",
          local_loss: 0.457,
          contribution: 0.11,
          progress: 0.35,
          last_update: "2025-04-09 13:00:00",
          weight_uploaded: true,
        },
        {
          node_id: "山西省太原市",
          status: "inactive",
          local_loss: 0.679,
          contribution: 0.06,
          progress: 0.55,
          last_update: "2025-04-09 13:15:00",
          weight_uploaded: false,
        },
        {
          node_id: "江西省南昌市",
          status: "active",
          local_loss: 0.346,
          contribution: 0.17,
          progress: 0.75,
          last_update: "2025-04-09 13:30:00",
          weight_uploaded: true,
        },
        {
          node_id: "广西壮族自治区南宁市",
          status: "inactive",
          local_loss: 0.568,
          contribution: 0.04,
          progress: 0.15,
          last_update: "2025-04-09 13:45:00",
          weight_uploaded: false,
        },
        {
          node_id: "云南省昆明市",
          status: "active",
          local_loss: 0.237,
          contribution: 0.19,
          progress: 0.65,
          last_update: "2025-04-09 14:00:00",
          weight_uploaded: true,
        },
        {
          node_id: "贵州省贵阳市",
          status: "active",
          local_loss: 0.459,
          contribution: 0.12,
          progress: 0.45,
          last_update: "2025-04-09 14:15:00",
          weight_uploaded: false,
        },
        {
          node_id: "甘肃省兰州市",
          status: "inactive",
          local_loss: 0.681,
          contribution: 0.03,
          progress: 0.25,
          last_update: "2025-04-09 14:30:00",
          weight_uploaded: true,
        },
        {
          node_id: "青海省西宁市",
          status: "active",
          local_loss: 0.348,
          contribution: 0.15,
          progress: 0.85,
          last_update: "2025-04-09 14:45:00",
          weight_uploaded: false,
        },
        {
          node_id: "宁夏回族自治区银川市",
          status: "inactive",
          local_loss: 0.57,
          contribution: 0.02,
          progress: 0.1,
          last_update: "2025-04-09 15:00:00",
          weight_uploaded: true,
        },
      ],
    };
  } catch (error) {
    ElMessage.error("获取训练状态失败：" + error.message);
  }
});

const handleModalPerformance = () => {
  router.push({
    path: "/federated/performance",
  });
};
</script>

<style scoped>
.tableView {
  margin-top: 20px;
  margin-left: 40px;
  margin-right: 40px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
}

.global-loss {
  margin: 15px 0;
  font-size: 16px;
}

:deep(.custom-header) {
  background-color: #f5f7fa;
  font-weight: bold;
  color: #333;
  text-align: center;
}

:deep(.el-table th) {
  background-color: #f5f7fa;
  font-weight: bold;
  color: #333;
}

:deep(.el-table td) {
  text-align: center;
}
</style>
