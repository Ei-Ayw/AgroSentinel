<template>
  <div class="report-preview">
    <h2>报告预览</h2>
    <iframe :src="reportUrl" width="100%" height="600"></iframe>
  </div>
</template>

<script setup></script>

<style scoped>
.report-preview {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #e8e8e8;
}

.report-preview h2 {
  margin-top: 0;
}

.report-preview iframe {
  border: none;
}
</style>
