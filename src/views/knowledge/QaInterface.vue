<template>
  <KnowledgeBoard />
  <div class="chat-container">
    <h2>农业专家 AI 问答</h2>
    <el-card class="chat-box">
      <div class="loading-container" v-if="isFetching">
        <div class="loading-spinner"></div>
        <p>正在思考中...</p>
      </div>
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="chat-message"
        :class="{
          'user-message': message.sender === '你',
          'ai-message': message.sender === 'CJ',
        }"
      >
        <div class="message-avatar">
          <img
            :src="message.sender === '你' ? userAvatar : aiAvatar"
            alt="头像"
            class="avatar"
          />
        </div>
        <div class="message-content">
          <p class="message-sender">{{ message.sender }}：</p>
          <p class="message-text">{{ message.text }}</p>
        </div>
      </div>
    </el-card>

    <el-form class="input-form">
      <el-form-item>
        <el-input
          v-model="userInput"
          placeholder="请输入您的问题..."
          @keyup.enter="sendMessage"
          class="input-field"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="userLocation"
          placeholder="请输入您的地区..."
          class="input-field"
        />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="qaData.prefer"
          placeholder="请选择知识来源优先级..."
          class="select-field"
        >
          <el-option label="专家" value="expert"></el-option>
          <el-option label="本地" value="local"></el-option>
          <el-option label="全国" value="national"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendMessage" class="send-button"
          >发送</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import KnowledgeBoard from "@/views/knowledge/KnowledgeBoard.vue";

const userInput = ref("");
const userLocation = ref("");
const messages = ref([]);
const qaData = ref({
  prefer: "expert",
});
const isFetching = ref(false);

// 头像
const userAvatar = "https://randomuser.me/api/portraits/men/32.jpg";
const aiAvatar = "https://randomuser.me/api/portraits/lego/1.jpg";

const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  // 添加用户消息到聊天记录
  messages.value.push({
    sender: "你",
    text: userInput.value,
    timestamp: new Date().toLocaleTimeString(),
  });

  // 显示 loading 状态
  isFetching.value = true;

  // 构建请求数据
  const requestData = {
    question: userInput.value,
    user_region: userLocation.value || "guangzhou",
    context: "text",
    prefer: qaData.value,
  };

  try {
    // 调用后端API
    const response = await axios.post(
      "http://8.149.133.7:7999/api/qa/",
      requestData
    );

    // 检查响应状态
    if (response.data.code === 200) {
      // 添加AI回答到聊天记录
      const aiResponse = {
        sender: "CJ",
        text: response.data.data.answer,
        timestamp: new Date().toLocaleTimeString(),
      };

      // 如果有来源信息，添加到消息中
      if (response.data.data.sources && response.data.data.sources.length > 0) {
        aiResponse.sources = response.data.data.sources;
      }

      // 如果有权重信息，添加到消息中
      if (response.data.data.sources_weights) {
        aiResponse.weights = response.data.data.sources_weights;
      }

      messages.value.push(aiResponse);
    } else {
      // 如果后端返回非200状态码，显示错误消息
      messages.value.push({
        sender: "AI",
        text: "出错了，请稍后再试！",
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  } catch (error) {
    // 捕获请求错误
    messages.value.push({
      sender: "AI",
      text: "连接后端失败，请检查网络或后端服务状态！",
      timestamp: new Date().toLocaleTimeString(),
    });
    console.error("请求失败:", error);
  } finally {
    // 隐藏 loading 状态
    isFetching.value = false;
  }

  // 清空用户输入
  userInput.value = "";
};
</script>

<style scoped>
.chat-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.chat-box {
  margin-top: 20px;
  height: 500px;
  max-height: 500px;
  overflow-y: auto;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.chat-message {
  display: flex;
  margin: 15px 0;
  text-align: left;
}

.user-message {
  justify-content: flex-end;
}

.ai-message {
  justify-content: flex-start;
}

.message-avatar {
  margin-right: 10px;
}

.ai-message .message-avatar {
  margin-right: 10px;
}

.user-message .message-avatar {
  margin-left: 10px;
  margin-right: 0;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.message-content {
  max-width: 70%;
}

.message-sender {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 14px;
}

.message-text {
  padding: 10px;
  border-radius: 8px;
  background-color: #f1f1f1;
  display: inline-block;
  font-size: 14px;
}

.user-message .message-text {
  background-color: #e3f2fd;
}

.message-meta {
  display: flex;
  margin-top: 8px;
  font-size: 12px;
}

.sources,
.weights {
  margin-left: 10px;
}

.sources p,
.weights p {
  margin: 0 0 5px 0;
}

.sources ul,
.weights ul {
  padding-left: 15px;
  margin: 0;
}

.sources li,
.weights li {
  margin: 0;
  padding: 2px 0;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.loading-spinner {
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 3px solid #4a90e2;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.input-form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin-top: 20px;
}

.input-field,
.select-field {
  width: 100%;
}

.send-button {
  width: 100%;
  padding: 12px;
  background-color: #4a90e2;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-button:hover {
  background-color: #3a7bc8;
}
</style>
