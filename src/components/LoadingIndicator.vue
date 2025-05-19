<template>
  <div class="loading-indicator">
    <el-loading :visible="loading" text="加载中..."></el-loading>
  </div>
</template>

<style scoped>
.loading-indicator {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
