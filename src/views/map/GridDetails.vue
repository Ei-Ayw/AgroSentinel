<template>
  <div class="layout">
    <a-layout style="height: 300px">
      <a-layout>
        <a-layout-sider style="width: 320px; margin-left: 10px"
          ><template #extra>
            <a-link>More</a-link>
          </template>
          ByteDance's core product, Toutiao ("Headlines"), is a content platform
          in China and around the world. Toutiao started out as a news
          recommendation engine and gradually evolved into a platform delivering
          content in various formats.</a-layout-sider
        >
        <a-layout-sider style="width: 320px; margin-left: 10px"
          >Sider</a-layout-sider
        >
        <a-layout-sider style="width: 320px; margin-left: 10px"
          >Sider</a-layout-sider
        >
        <a-layout-sider style="width: 320px; margin-left: 10px"
          >Sider</a-layout-sider
        >
      </a-layout>
    </a-layout>
  </div>
</template>
<style scoped>
.layout {
  display: flex;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
<script setup lang="ts"></script>
