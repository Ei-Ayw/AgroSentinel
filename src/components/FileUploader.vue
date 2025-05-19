<template>
  <div>
    <el-upload
      :action="uploadUrl"
      :headers="headers"
      :accept="accept"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="beforeUpload"
      ref="uploadRef"
    >
      <el-button type="primary">选择文件</el-button>
    </el-upload>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { useUserStore } from "@/stores/user";

// 如果 props 未使用，移除定义
// const props = defineProps({
//   // 定义 props
// });

const emits = defineEmits(["upload"]);

const uploadRef = ref(null);
const userStore = useUserStore();

const headers = {
  Authorization: `Bearer ${userStore.token}`,
};

const beforeUpload = (file) => {
  emits("upload", file);
  return false;
};

const handleSuccess = () => {
  // 处理上传成功逻辑
};

const handleError = () => {
  // 处理上传失败逻辑
};
</script>
