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
        { id: 1, content: "Welcome to our website1!" },
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
  background-color: #f2f2f2;
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
