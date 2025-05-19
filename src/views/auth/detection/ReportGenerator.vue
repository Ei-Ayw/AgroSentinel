<template>
  <DashboardHeader title="多模态病虫害检测" />
  <el-container>
    <el-aside width="300px">
      <FileUploader
        :accept="['image/jpeg', 'image/png']"
        @upload="handleImageUpload"
        uploadUrl="/multimodal"
      />
      <FileUploader
        :accept="['audio/*']"
        @upload="handleAudioUpload"
        uploadUrl="/multimodal"
      />
      <el-form>
        <el-form-item label="作物类型">
          <el-input v-model="crop" placeholder="如 rice"></el-input>
        </el-form-item>
      </el-form>
    </el-aside>
    <el-main>
      <div v-if="previewImage" class="image-preview">
        <img :src="previewImage" alt="检测图片" />
        <div v-if="detectionResult">
          <h2>检测结果</h2>
          <p>病虫害类型: {{ detectionResult.final_diagnosis.disease }}</p>
          <p>置信度: {{ detectionResult.final_diagnosis.confidence }}</p>
          <p>锚点: {{ detectionResult.final_diagnosis.box }}</p>
          <p>防治建议: {{ detectionResult.treatment }}</p>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from "vue";
import { useLocationStore } from "@/stores/locations";
import { multimodalDetect } from "@/api/detection";
import FileUploader from "@/components/FileUploader.vue";
import DashboardHeader from "@/components/DashboardHeader.vue";
import { ElMessage } from "element-plus";

const locationStore = useLocationStore();
const crop = ref("");
const previewImage = ref(null);
const previewAudio = ref(null);
const detectionResult = ref(null);
const imageFile = ref(null);
const audioFile = ref(null);

const handleImageUpload = (file) => {
  previewImage.value = URL.createObjectURL(file);
  imageFile.value = file;
  if (imageFile.value && audioFile.value) {
    performMultimodalDetection();
  }
};

const handleAudioUpload = (file) => {
  previewAudio.value = URL.createObjectURL(file);
  audioFile.value = file;
  if (imageFile.value && audioFile.value) {
    performMultimodalDetection();
  }
};

const performMultimodalDetection = async () => {
  const formData = new FormData();
  formData.append("image", imageFile.value);
  formData.append("audio", audioFile.value);
  formData.append("crop", crop.value);
  formData.append("spaceId", locationStore.currentSpaceId);

  try {
    const { data } = await multimodalDetect(formData);
    detectionResult.value = data.data;
  } catch (error) {
    ElMessage.error("检测失败：" + error.message);
  }
};
</script>

<style scoped>
.image-preview {
  padding: 20px;
}

.image-preview img {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}
</style>
