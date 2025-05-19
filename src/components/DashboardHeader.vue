<template>
  <div class="dashboard-header">
    <!-- 仪表盘标题 -->
    <div class="header-title">
      <h1>Dashboard</h1>
    </div>
    <!-- 导航菜单 -->
    <nav class="header-nav">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Analytics</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </nav>
    <!-- 用户信息 -->
    <div class="user-info">
      <span class="user-name">John Doe</span>
      <img
        src="https://via.placeholder.com/30"
        alt="User Avatar"
        class="user-avatar"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardHeader",
  data() {
    return {
      // 这里可以添加更多状态数据
    };
  },
  methods: {
    // 这里可以添加交互方法
  },
};
</script>

<style scoped>
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: #333;
  color: white;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-title h1 {
  margin: 0;
  font-size: 24px;
}

.header-nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.header-nav ul li {
  margin-right: 20px;
}

.header-nav ul li a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.header-nav ul li a:hover {
  color: #007bff;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-name {
  margin-right: 10px;
}

.user-avatar {
  border-radius: 50%;
}
</style>
