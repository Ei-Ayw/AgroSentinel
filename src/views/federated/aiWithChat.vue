<template>
  <div class="chat-container">
    <h2>AI 机器人聊天</h2>
    <el-card class="chat-box">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="chat-message"
      >
        <p>
          <strong>{{ message.sender }}：</strong> {{ message.text }}
        </p>
      </div>
    </el-card>
    <el-input
      style="margin-top: 20px"
      v-model="userInput"
      placeholder="请输入您的问题..."
      @keyup.enter="sendMessage"
    />
    <el-button style="margin-top: 20px" type="primary" @click="sendMessage"
      >发送</el-button
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const userInput = ref("");
const messages = ref([]);

const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  messages.value.push({ sender: "你", text: userInput.value });

  try {
    const response = await axios.post("http://localhost:7999/api/chat", {
      message: userInput.value,
    });

    messages.value.push({ sender: "AI", text: response.data });
  } catch (error) {
    messages.value.push({ sender: "AI", text: "出错了，请稍后再试！" });
  }

  userInput.value = "";
};
</script>

<style>
.chat-container {
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
}
.chat-box {
  margin-top: 20px;
  height: 400px;
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 10px;
}
.chat-message {
  text-align: left;
  margin: 5px 0;
}
</style>
