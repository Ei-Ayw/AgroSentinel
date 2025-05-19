<template>
  <div class="container">
    <el-form :model="userInfo" label-width="120px" class="form-container">
      <el-form-item label="用户名" class="form-item">
        <el-input v-model="userInfo.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" class="form-item">
        <el-input v-model="userInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" class="form-item">
        <el-input v-model="userInfo.phone"></el-input>
      </el-form-item>
      <el-button type="primary" @click="saveSettings" class="submit-button"
        >保存设置</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const userInfo = ref({
  username: "",
  email: "",
  phone: "",
});

onMounted(() => {
  userInfo.value = {
    ...userStore.user,
  };
});

const saveSettings = async () => {
  try {
    ElMessage.success("设置保存成功");
  } catch (error) {
    ElMessage.error("保存设置失败：" + error.message);
  }
};

const fetchUserInfo = async () => {
  try {
    console.log("login");
  } catch (error) {
    console.error(error);
  }
};
fetchUserInfo();
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.form-container {
  width: 100%;
  max-width: 400px;
}

.form-item {
  margin-bottom: 50px !important;
}

.submit-button {
  width: 100%;
  margin-top: 10px;
}

.el-form {
  margin-top: 150px;
}
</style>
