<template>
  <div class="announcement-board">
    <div
      class="announcement-content"
      v-for="announcement in announcementList"
      :key="announcement.id"
    >
      <span>{{ announcement.content }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      announcementList: [
        {
          id: 1,
          content:
            "农业专家 AI 问答服务由国家级、省级、市级三级联邦学习模型微调，融合专家知识库提供 !",
        },
        // ... More announcements
      ],
    };
  },
  methods: {
    closeAnnouncement(id) {
      this.announcementList = this.announcementList.filter(
        (announcement) => announcement.id !== id
      );
    },
  },
};
</script>

<style scoped>
.announcement-board {
  width: 100%;
  background-color: #d4e6f1;
  padding: 10px 0;
  text-align: center;
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.announcement-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.announcement-content span {
  flex-grow: 1;
}

.announcement-content button {
  padding: 2px 5px;
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 3px;
}
</style>
