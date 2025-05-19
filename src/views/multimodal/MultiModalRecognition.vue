<template>
  <div class="container">
    <!-- 左侧：检测结果区域 -->
    <div class="result-container">
      <div v-if="!hasResult && !isLoading" class="upload-prompt">
        <h2>检测结果</h2>
        <p>请在右侧上传图片和填写文字进行检测</p>
      </div>

      <div v-if="isLoading" class="loading-container">
        <h2>检测结果</h2>
        <p>正在检测中，请稍候...</p>
        <div class="loading-spinner"></div>
      </div>

      <div v-if="hasResult" class="result-section">
        <h2>检测结果</h2>

        <div class="result-item">
          <span class="result-label">用户名:</span>
          <span class="result-value">{{ predictionResult.username }}</span>
        </div>

        <div class="result-item">
          <span class="result-label">权重:</span>
          <span class="result-value">{{ predictionResult.weight }}</span>
        </div>

        <div class="result-item">
          <span class="result-label">置信度:</span>
          <span class="result-value">{{ predictionResult.conf }}</span>
        </div>

        <div class="result-item">
          <span class="result-label">开始时间:</span>
          <span class="result-value">{{ predictionResult.startTime }}</span>
        </div>

        <div class="result-item">
          <span class="result-label">输入图片:</span>
          <div class="result-image">
            <img
              v-if="imageUrl"
              :src="imageUrl"
              alt="上传的图片"
              style="max-width: 200px; margin-top: 10px"
            />
          </div>
        </div>

        <div class="result-item">
          <span class="result-label">种类:</span>
          <span class="result-value">{{ predictionResult.kind }}</span>
        </div>

        <div class="result-item">
          <span class="result-label">状态:</span>
          <span class="result-value">{{ predictionResult.status }}</span>
        </div>

        <div class="result-item">
          <span class="result-label">消息:</span>
          <span class="result-value">{{ predictionResult.message }}</span>
        </div>

        <div class="result-item">
          <span class="result-label">输出图片:</span>
          <a
            :href="predictionResult.outImg"
            target="_blank"
            class="result-link"
            ref="downloadLink"
            @click="handleDownload"
            >{{ predictionResult.outImg }}</a
          >
        </div>

        <div class="result-item">
          <span class="result-label">总耗时:</span>
          <span class="result-value">{{ predictionResult.allTime }}</span>
        </div>

        <div class="result-item">
          <span class="result-label">置信度百分比:</span>
          <span class="result-value">{{ predictionResult.confidence }}</span>
        </div>

        <div class="result-item">
          <span class="result-label">标签:</span>
          <span class="result-value">{{ predictionResult.label }}</span>
        </div>

        <div class="result-item">
          <!-- 下载提示信息 -->
          <span class="download-tip" v-if="showDownloadTipFlag"
            >图片下载成功</span
          >
        </div>
      </div>
    </div>

    <!-- 右侧：表单区域 -->
    <div class="form-container">
      <h1>多模态识别页面</h1>

      <!-- 输入文字的操作 -->
      <div class="input-group">
        <label for="textInput">输入文字描述:</label>
        <input
          type="text"
          id="textInput"
          v-model="inputText"
          placeholder="请输入文字"
        />
      </div>

      <div class="input-group">
        <label for="usernameInput">输入用户名:</label>
        <input
          type="text"
          id="usernameInput"
          v-model="username"
          placeholder="请输入用户名"
        />
      </div>

      <div class="input-group">
        <label for="weightInput">输入权重:</label>
        <input
          type="text"
          id="weightInput"
          v-model="weight"
          placeholder="请输入权重"
        />
      </div>

      <div class="input-group">
        <label for="confInput">输入置信度:</label>
        <input
          type="text"
          id="confInput"
          v-model="conf"
          placeholder="请输入置信度"
        />
      </div>

      <div class="input-group">
        <label for="startTimeInput">输入开始时间:</label>
        <input
          type="text"
          id="startTimeInput"
          v-model="startTime"
          placeholder="请输入开始时间"
        />
      </div>

      <div class="input-group">
        <label for="kindInput">输入种类:</label>
        <input
          type="text"
          id="kindInput"
          v-model="kind"
          placeholder="请输入种类"
        />
      </div>

      <!-- 上传图片的功能 -->
      <div class="input-group">
        <label for="imageUpload">上传图片:</label>
        <input type="file" id="imageUpload" @change="handleImageUpload" />
        <!-- 显示上传的图片 -->
        <img
          v-if="imageUrl"
          :src="imageUrl"
          alt="上传的图片"
          style="max-width: 200px; margin-top: 10px"
        />
      </div>

      <!-- 添加提交按钮 -->
      <button @click="handleSubmit">提交</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

// 定义输入的文字
const inputText = ref("");
// 定义用户名
const username = ref("1");
// 定义权重
const weight = ref("corn_best.pt");
// 定义置信度
const conf = ref("0.25");
// 定义开始时间
const startTime = ref("1");
// 定义种类
const kind = ref("rice");
// 定义图片的 URL
const imageUrl = ref("");
// 定义预测结果
const predictionResult = ref({
  username: "",
  weight: "",
  conf: "",
  startTime: "",
  inputImg: "", // 确保包含inputImg属性
  kind: "",
  status: "",
  message: "",
  outImg: "",
  allTime: "",
  confidence: "",
  label: "",
});
// 定义是否显示结果组件
const hasResult = ref(false);
// 定义是否正在加载
const isLoading = ref(false);

// 定义是否显示下载提示
const showDownloadTipFlag = ref(false);

// 定义下载链接的引用
const downloadLink = ref(null);

// 处理图片上传的方法
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// 处理下载的方法
const handleDownload = () => {
  // 触发下载
  downloadLink.value.click();
  // 显示下载提示
  showDownloadTipFlag.value = true;
  // 2秒后隐藏提示
  setTimeout(() => {
    showDownloadTipFlag.value = false;
  }, 2000);
};

// 处理提交事件的方法
const handleSubmit = async () => {
  isLoading.value = true; // 开始加载

  const formData = new FormData();
  formData.append("inputText", inputText.value);
  formData.append("username", username.value);
  formData.append("weight", weight.value);
  formData.append("conf", conf.value);
  formData.append("startTime", startTime.value);
  formData.append("kind", kind.value);
  const file = document.getElementById("imageUpload").files[0];
  if (file) {
    formData.append("inputImg", file);
  }

  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/predictImg",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    predictionResult.value = response.data;
    hasResult.value = true; // 请求成功，显示结果组件
  } catch (error) {
    console.error("请求失败:", error);
    hasResult.value = false; // 请求失败，不显示结果组件
  } finally {
    isLoading.value = false; // 结束加载
  }
};
</script>

<style scoped>
/* 容器样式，采用左右布局 */
.container {
  display: flex;
  height: 100%;
  padding: 20px;
  gap: 30px;
  max-width: 1800px;
  margin: 0 auto -40px;
}

/* 左侧结果容器 */
.result-container {
  flex: 1;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

/* 右侧表单容器 */
.form-container {
  flex: 0.8;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 上传提示样式 */
.upload-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 50px;
}

/* 加载容器样式 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 50px;
}

/* 加载动画 */
.loading-spinner {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #4a90e2;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-top: 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 输入组样式 */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 标签样式 */
label {
  font-size: 16px;
  font-weight: bold;
}

/* 输入框和文件上传框样式 */
input[type="text"],
input[type="file"] {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

/* 标题样式 */
h1 {
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
}

/* 提交按钮样式 */
button {
  padding: 12px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;
}

button:hover {
  background-color: #0056b3;
}

/* 结果区域样式 */
.result-section {
  overflow-y: auto;
  max-height: 80vh;
}

.result-section h2 {
  font-size: 22px;
  margin-bottom: 20px;
  color: #2c3e50;
  border-bottom: 2px solid #4a90e2;
  padding-bottom: 10px;
}

.result-item {
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.result-item:last-child {
  border-bottom: none;
}

.result-label {
  width: 120px;
  font-weight: bold;
  color: #555;
}

.result-value {
  flex: 1;
  color: #333;
}

.result-link {
  color: #4a90e2;
  text-decoration: none;
}

.result-link:hover {
  text-decoration: underline;
}

/* 下载提示样式 */
.download-tip {
  color: green;
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 900px) {
  .container {
    flex-direction: column;
  }

  .result-container,
  .form-container {
    width: 100%;
  }

  .result-container {
    margin-bottom: 30px;
  }
}
</style>
