<template>
  <div
    class="page-container"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <div class="middle-page-container">
      <div class="button-group">
        <button @click="handleMultiModal">多模态识别病虫害</button>
        <button @click="handleFederatedLearning">
          联邦学习&专家知识库问答
        </button>
        <button @click="handleULocationManager">地点管理</button>
        <button @click="handleUserCenter">用户中心</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import backgroundImage from "@/assets/d3740210f41a3044542487d7e081980.jpg";
import router from "@/router";
const handleMultiModal = () => {
  // 这里可以添加多模态识别病虫害页面跳转逻辑
  console.log("跳转到多模态识别病虫害页面");
  router.push({
    path: "/detection/vision",
  });
};

const handleFederatedLearning = () => {
  // 这里可以添加联邦学习&专家知识库问答页面跳转逻辑
  console.log("跳转到联邦学习&专家知识库问答页面");
  router.push({
    path: "/federated/training-status",
  });
};

const handleULocationManager = () => {
  // 这里可以添加用户中心页面跳转逻辑
  console.log("跳转到用户中心页面");
  router.push({
    path: "/user/location",
  });
};

const handleUserCenter = () => {
  // 这里可以添加用户中心页面跳转逻辑
  console.log("跳转到用户中心页面");
  router.push({
    path: "/user/settings",
  });
};
</script>

<style scoped>
.page-container {
  /* 使用CSS设置背景图 */
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.middle-page-container {
  text-align: center;
  padding: 50px;
}

.button-group {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.button-group button {
  width: 300px;
  height: 200px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.button-group button:nth-child(1) {
  background: linear-gradient(to bottom, #ffb6c1, #ff69b4);
}

.button-group button:nth-child(2) {
  background: linear-gradient(to bottom, #87cefa, #00bfff);
}

.button-group button:nth-child(3) {
  background: linear-gradient(to bottom, #98fb98, #32cd32);
}

.button-group button:nth-child(4) {
  background: linear-gradient(to bottom, #f0e68c, #ffd700);
}

.button-group button:hover {
  transform: translateY(-3px);
}
</style>
