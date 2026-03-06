<template>
  <div class="container">
    <div id="userLoginView">
      <h2 style="margin-bottom: 48px; text-align: center">
        苍穹智鉴・农业病虫害多模态联邦决策天穹系统
      </h2>
      <a-form
        style="max-width: 480px; margin: 0 auto"
        label-align="left"
        auto-label-width
        :model="form"
        @submit="handleSubmit"
      >
        <a-form-item
          field="userAccount"
          label="账号"
          style="margin-bottom: 25px"
        >
          <a-input v-model="form.userAccount" placeholder="请输入账号" />
        </a-form-item>
        <a-form-item
          field="userPassword"
          tooltip="密码不少于 8 位"
          label="密码"
          style="margin-bottom: 25px"
        >
          <a-input-password
            v-model="form.userPassword"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            style="width: 90%; margin-right: 10px"
          >
            登录
          </a-button>
          <p
            @click="goToOtherRoute"
            style="cursor: pointer; text-decoration: none"
          >
            注册
          </p>
        </a-form-item>
      </a-form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import router from "@/router";
import axios from "axios";

const form = reactive({
  userAccount: "",
  userPassword: "",
});

let errorMessage = "";

const goToOtherRoute = async () => {
  await router.push({
    path: "/register",
    // replace: true,
  });
};

const handleSubmit = async () => {
  try {
    const response = await axios.post("http://localhost:7999/api/login/", {
      username: form.userAccount,
      password: form.userPassword,
    });

    // 处理后端返回的令牌
    const { refresh, access } = response.data;
    // 这里可以将令牌存储到 localStorage 或其他合适的地方
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("accessToken", access);

    await router.push({
      path: "/",
      replace: true,
    });
    console.log("登录完成");
  } catch (error) {
    errorMessage = "登录失败，请检查账号和密码";
    console.error("登录失败:", error);
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  padding: 80px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
