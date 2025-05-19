<template>
  <div class="container">
    <el-card class="form-card">
      <template #header>
        <div class="card-header">
          <span>文档导入</span>
        </div>
      </template>
      <el-form
        :model="importData"
        label-width="120px"
        class="form-container"
        ref="importForm"
        :rules="rules"
      >
        <el-form-item label="文档" prop="documents[0].file">
          <FileUploader
            @upload="handleFileUpload"
            uploadUrl="/expert-knowledge/import"
          />
          <div class="file-info" v-if="importData.documents[0].file">
            <span>文件名：{{ importData.documents[0].file.name }}</span>
            <span>大小：{{ fileSize }}</span>
          </div>
        </el-form-item>
        <el-form-item label="标题" prop="documents[0].metadata.title">
          <el-input
            v-model="importData.documents[0].metadata.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="documents[0].metadata.author">
          <el-input
            v-model="importData.documents[0].metadata.author"
            placeholder="请输入作者"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="documents[0].metadata.category">
          <el-input
            v-model="importData.documents[0].metadata.category"
            placeholder="请输入分类"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="发布日期"
          prop="documents[0].metadata.publish_date"
        >
          <el-date-picker
            v-model="importData.documents[0].metadata.publish_date"
            type="date"
            placeholder="选择发布日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitImport"
            :loading="loading"
            :disabled="loading"
            class="import-button"
          >
            {{ loading ? "导入中..." : "批量导入" }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  importExpertDocuments,
  queryKnowledgeGraph as apiQueryKnowledgeGraph,
} from "@/api/federated";
import FileUploader from "@/components/FileUploader.vue";
import { ElMessage, ElNotification } from "element-plus";

const importData = ref({
  documents: [
    {
      file: null,
      metadata: {
        title: "",
        author: "",
        category: "",
        publish_date: "",
      },
    },
  ],
});

const queryParams = ref({
  subject: "",
});

const knowledgeGraph = ref(null);

const loading = ref(false);
const queryLoading = ref(false);

const importForm = ref(null);

// 表单验证规则
const rules = ref({
  "documents[0].file": [
    { required: true, message: "请选择文件", trigger: "change" },
  ],
  "documents[0].metadata.title": [
    { required: true, message: "请输入标题", trigger: "blur" },
  ],
  "documents[0].metadata.author": [
    { required: true, message: "请输入作者", trigger: "blur" },
  ],
  "documents[0].metadata.category": [
    { required: true, message: "请输入分类", trigger: "blur" },
  ],
  "documents[0].metadata.publish_date": [
    { required: true, message: "请选择发布日期", trigger: "change" },
  ],
});

const handleFileUpload = (file) => {
  importData.value.documents[0].file = file;
};

// 计算文件大小
const fileSize = computed(() => {
  const file = importData.value.documents[0].file;
  if (!file) return "";
  const size = file.size;
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
});

const submitImport = async () => {
  try {
    await importForm.value.validate();
  } catch (error) {
    return;
  }

  loading.value = true;

  try {
    // 模拟上传延迟
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 模拟后端返回数据
    const mockResponse = {
      success: true,
      message: "文档导入成功",
      data: {
        file_name: importData.value.documents[0].file.name,
        import_time: new Date().toLocaleString(),
      },
    };

    // 显示成功通知
    ElNotification({
      title: "导入成功",
      message: `文档 ${importData.value.documents[0].file.name} 导入成功`,
      type: "success",
    });

    // 重置表单
    importForm.value.resetFields();
  } catch (error) {
    ElMessage.error("导入失败：" + error.message);
  } finally {
    loading.value = false;
  }
};

const queryKnowledgeGraph = async () => {
  if (!queryParams.value.subject) {
    ElMessage.error("请输入查询主题");
    return;
  }

  queryLoading.value = true;

  try {
    // 模拟查询延迟
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 模拟后端返回数据
    knowledgeGraph.value = {
      subject: queryParams.value.subject,
      relations: [
        { predicate: "作者", object: "张三" },
        { predicate: "分类", object: "农业技术" },
        { predicate: "发布日期", object: "2025-04-01" },
      ],
    };
  } catch (error) {
    ElMessage.error("查询失败：" + error.message);
  } finally {
    queryLoading.value = false;
  }
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
}

.form-card,
.query-card {
  width: 100%;
  margin-bottom: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.card-header {
  font-weight: 600;
  font-size: 18px;
  color: #303133;
}

.form-container {
  padding: 20px;
}

.query-form {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.knowledge-graph-container {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
  margin-top: 20px;
}

.knowledge-graph-container h2 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 16px;
  color: #303133;
}

.knowledge-graph-container ul {
  padding-left: 20px;
  margin-bottom: 0;
}

.knowledge-graph-container li {
  margin-bottom: 8px;
  font-size: 14px;
  color: #606266;
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

:deep(.el-date-editor) {
  width: 100%;
}
</style>
