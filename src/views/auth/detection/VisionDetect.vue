<template>
  <div>
    <div class="tableView">
      <a-space>
        <a-input
          :style="{ width: '320px', marginRight: '40px' }"
          placeholder="作物类型"
          allow-clear
        />
        <a-input
          :style="{ width: '320px' }"
          placeholder="请输入查询地区"
          allow-clear
        />
        <a-button @click="handleConfirmQuery">确认查询</a-button>
        <a-button @click="handleMultiModalRecognition">多模态识别</a-button>
        <a-button @click="handleMultiHistoryRecognition">历史记录</a-button>
      </a-space>
    </div>
    <div class="tableView">
      <VisionDetectTableVue :tableData="tableData" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import VisionDetectTableVue from "@/views/auth/detection/VisionDetectTableVue.vue";

const router = useRouter();
const tableData = ref([
  {
    key: "1",
    cropType: "水稻",
    region: "湖南",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    key: "2",
    cropType: "小麦",
    region: "河南",
    imageUrl: "https://via.placeholder.com/150",
  },
]);

const handleConfirmQuery = () => {
  console.log("确认查询");
};

const handleMultiModalRecognition = () => {
  router.push({ name: "MultiModalRecognition" });
};

const handleMultiHistoryRecognition = () => {
  router.push({
    path: "/detection/history",
  });
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.uploadView {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

.tableView {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

.image-preview {
  padding: 20px;
}

.image-preview img {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}
</style>
