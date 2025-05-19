<template>
  <div class="container">
    <h2 style="margin-top: 140px; margin-bottom: 48px; text-align: center">
      苍穹智鉴・农业病虫害多模态联邦决策天穹系统
    </h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
    >
      <a-form-item laba="用户名:" prop="username" class="form-item">
        <a-input v-model="form.username" placeholder="请输入用户名"></a-input>
      </a-form-item>
      <a-form-item laba="密码:" prop="password" class="form-item">
        <a-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
        ></a-input>
      </a-form-item>
      <a-form-item laba="邮箱:" prop="email" class="form-item">
        <a-input v-model="form.email" placeholder="请输入邮箱"></a-input>
      </a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        style="width: 98%; margin-left: 16px"
        @click="handleRegister"
      >
        注册
      </a-button>
    </a-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "@/api/auth";
import { ElMessage } from "element-plus";

const form = ref({ username: "", password: "", email: "" });
const router = useRouter();

const handleRegister = async () => {
  try {
    const response = await register(form.value);
    if (response.message === "User registered successfully") {
      ElMessage.success("注册成功，请登录");
      router.push("/login");
    } else {
      ElMessage.error("注册失败：未知错误");
    }
  } catch (error) {
    ElMessage.error("注册失败：" + error.message);
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
  padding: 50px;
}

.form-item {
  margin-bottom: 25px !important;
}
</style>
