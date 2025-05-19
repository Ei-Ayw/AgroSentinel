<template>
  <div class="upload-container">
    <el-card class="upload-card">
      <template #header>
        <div class="card-header">
          <span>文件上传</span>
        </div>
      </template>
      <el-form
        :model="uploadData"
        label-width="120px"
        ref="uploadForm"
        :rules="rules"
      >
        <el-form-item label="文件" prop="file">
          <FileUploader @upload="handleFileUpload" uploadUrl="/user/upload" />
          <div class="file-info" v-if="uploadData.file">
            <span>文件名：{{ uploadData.file.name }}</span>
            <span>大小：{{ fileSize }}</span>
          </div>
        </el-form-item>
        <el-form-item label="文件类型" prop="file_type">
          <el-select
            v-model="uploadData.file_type"
            placeholder="请选择文件类型(csv、pdf或图片"
          >
            <el-option label="CSV" value="csv"></el-option>
            <el-option label="PDF" value="pdf"></el-option>
            <el-option label="图片" value="image"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地区" prop="metadata.region">
          <el-input
            v-model="uploadData.metadata.region"
            placeholder="请输入地区"
          ></el-input>
        </el-form-item>
        <el-form-item label="作物" prop="metadata.crop">
          <el-input
            v-model="uploadData.metadata.crop"
            placeholder="请输入作物名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="数据类型" prop="metadata.data_type">
          <el-input
            v-model="uploadData.metadata.data_type"
            placeholder="请输入数据类型"
          ></el-input>
        </el-form-item>
        <el-form-item label="上传者角色" prop="metadata.uploader_role">
          <el-select
            v-model="uploadData.metadata.uploader_role"
            placeholder="请选择上传者角色"
          >
            <el-option label="农户" value="farmer"></el-option>
            <el-option label="专家" value="expert"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitUpload"
            :loading="loading"
            :disabled="loading"
          >
            {{ loading ? "上传中..." : "提交" }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import FileUploader from "@/components/FileUploader.vue";
import { ElMessage, ElNotification } from "element-plus";

const uploadData = ref({
  file: null,
  file_type: "csv",
  metadata: {
    region: "",
    crop: "",
    data_type: "",
    uploader_role: "farmer",
  },
});

// 表单验证规则
const rules = ref({
  file: [{ required: true, message: "请选择文件", trigger: "change" }],
  "metadata.region": [
    { required: true, message: "请输入地区", trigger: "blur" },
  ],
  "metadata.crop": [
    { required: true, message: "请输入作物名称", trigger: "blur" },
  ],
  "metadata.data_type": [
    { required: true, message: "请输入数据类型", trigger: "blur" },
  ],
  "metadata.uploader_role": [
    { required: true, message: "请选择上传者角色", trigger: "change" },
  ],
});

const uploadForm = ref(null);

const handleFileUpload = (file) => {
  uploadData.value.file = file;
};

// 计算文件大小
const fileSize = computed(() => {
  if (!uploadData.value.file) return "";
  const size = uploadData.value.file.size;
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
});

const loading = ref(false);

const submitUpload = async () => {
  try {
    await uploadForm.value.validate();
  } catch (error) {
    return;
  }

  loading.value = true;

  try {
    // 模拟上传延迟
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 显示成功通知
    ElNotification({
      title: "上传成功",
      message: `文件 ${uploadData.value.file.name} 上传成功`,
      type: "success",
    });

    // 重置表单
    uploadForm.value.resetFields();
  } catch (error) {
    ElMessage.error("上传失败：" + error.message);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.upload-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
}

.upload-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: none !important;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.file-info {
  margin-top: 8px;
  font-size: 14px;
  color: #606266;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #303133;
}

:deep(.el-button--primary) {
  width: 100%;
  background-color: #409eff;
  border-color: #409eff;
}

:deep(.el-button--primary:hover) {
  background-color: #66b1ff;
  border-color: #66b1ff;
}
</style>
