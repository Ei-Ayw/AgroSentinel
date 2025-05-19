<template>
  <div
    class="agriculture-system"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="logo">
        <span class="logo-text" style="color: black">苍穹智鉴</span>
      </div>
      <ul class="nav-links">
        <li>
          <router-link to="/multi-modal-recognition" class="nav-link"
            >多模态识别病虫害
          </router-link>
        </li>
        <li>
          <router-link to="/federated/training-status" class="nav-link"
            >联邦学习
          </router-link>
        </li>
        <li>
          <router-link to="/detection/vision" class="nav-link"
            >病虫害检测
          </router-link>
        </li>
        <li>
          <router-link to="/map/dashboard" class="nav-link"
            >实时监测
          </router-link>
        </li>
        <li>
          <router-link to="/knowledge/upload" class="nav-link"
            >专家知识库
          </router-link>
        </li>
        <li>
          <router-link to="/user/location" class="nav-link"
            >地点管理
          </router-link>
        </li>
        <li>
          <router-link to="/user/settings" class="nav-link"
            >用户中心
          </router-link>
        </li>
      </ul>
      <div class="user-actions">
        <template v-if="isLoggedIn">
          <span class="user-name">{{ nickName }}</span>
          <button class="logout-btn" @click="logout">登出</button>
        </template>
        <template v-else>
          <router-link to="/login" class="login-btn">登录</router-link>
        </template>
      </div>
    </nav>

    <!-- 主要内容 -->
    <main>
      <!-- 英雄区域 -->
      <section class="hero-section">
        <div class="hero-content">
          <h1>智能农业，智慧决策</h1>
          <p style="margin-top: 25px">
            利用多模态联邦学习技术，精准识别病虫害，联邦三级数据隐私保护体系，提升农业管理效率
          </p>
          <router-link to="/multi-modal-recognition" class="primary-btn"
            >开始使用
          </router-link>
        </div>
      </section>

      <!-- 核心功能 -->
      <section class="product-showcase">
        <div class="section-header" style="color: #333; margin-top: 10px">
          <h2>核心功能</h2>
          <p>我们的系统提供全方位的农业病虫害管理解决方案</p>
        </div>
        <div class="product-grid">
          <div class="product-card">
            <img
              src="@/assets/image/VCG41N1407662864.jpg"
              alt="产品图片"
              class="product-image"
            />
            <h3>多模态识别病虫害</h3>
            <p>
              借助先进的多模态识别技术，系统能够精准分析农作物图像，快速识别病虫害类型及其严重程度。
            </p>
            <router-link to="/multi-modal-recognition" class="secondary-btn"
              >了解更多</router-link
            >
          </div>
          <div class="product-card">
            <img
              src="@/assets/image/VCG41N1407662864.jpg"
              alt="产品图片"
              class="product-image"
              style="background-color: #2196f3"
            />
            <h3>联邦学习</h3>
            <p>
              创新的三级联邦学习体系，确保数据在本地进行计算，仅共享加密的模型参数，充分保护数据隐私和安全。
            </p>
            <router-link to="/federated/training-status" class="secondary-btn"
              >了解更多</router-link
            >
          </div>
          <div class="product-card">
            <img
              src="@/assets/image/VCG41N1407662864.jpg"
              alt="产品图片"
              class="product-image"
            />
            <h3>专家知识库</h3>
            <p>
              整合农业领域专家的丰富知识和实践经验，构建全面的病虫害防治知识库，获取个性化的解决方案。
            </p>
            <router-link to="/knowledge/upload" class="secondary-btn"
              >了解更多</router-link
            >
          </div>
          <div class="product-card">
            <img
              src="@/assets/image/VCG41N1407662864.jpg"
              alt="产品图片"
              class="product-image"
            />
            <h3>用户中心</h3>
            <p>
              用户中心，方便您集中管理农业数据、模型训练任务和知识库内容，直观了解农田状况和病虫害趋势。
            </p>
            <router-link to="/user/settings" class="secondary-btn"
              >了解更多</router-link
            >
          </div>
        </div>
      </section>

      <!-- 快速链接 -->
      <section class="quick-links">
        <div class="section-header" style="color: #ffffff">
          <h2>快速访问</h2>
          <p>快速访问我们的主要功能</p>
        </div>
        <div class="quick-link-grid">
          <div class="quick-link-card">
            <img
              src="@/assets/image/VCG41N1407662864.jpg"
              alt="产品图片"
              class="product-image"
            />
            <h3>病虫害检测</h3>
            <router-link to="/detection/vision" class="secondary-btn"
              >了解更多
            </router-link>
          </div>
          <div class="quick-link-card">
            <img
              src="@/assets/image/VCG41N1407662864.jpg"
              alt="产品图片"
              class="product-image"
            />
            <h3>地图管理</h3>
            <router-link to="/map/dashboard" class="secondary-btn"
              >了解更多
            </router-link>
          </div>
          <div class="quick-link-card">
            <img
              src="@/assets/image/VCG41N1407662864.jpg"
              alt="产品图片"
              class="product-image"
            />
            <h3>知识库上传</h3>
            <router-link to="/knowledge/upload" class="secondary-btn"
              >了解更多
            </router-link>
          </div>
        </div>
      </section>

      <!-- 行业应用 -->
      <section class="industry-applications">
        <div class="section-header">
          <h2>行业应用</h2>
          <p>我们的技术在多个农业场景中得到应用</p>
        </div>
        <div class="application-grid">
          <div class="application-card">
            <img
              src="@/assets/image/VCG41N1407662864.jpg"
              alt="产品图片"
              class="product-image"
            />
            <h3>农业病虫害检测</h3>
            <p>实时监测病虫害，减少农药使用，提升作物产量</p>
            <router-link to="/detection/vision" class="secondary-btn"
              >了解更多
            </router-link>
          </div>
          <div class="application-card">
            <img
              src="@/assets/image/VCG41N1407662864.jpg"
              alt="产品图片"
              class="product-image"
            />
            <h3>联邦学习训练</h3>
            <p>保护数据隐私，提升模型性能，实现精准农业</p>
            <router-link to="/federated/training-status" class="secondary-btn"
              >了解更多
            </router-link>
          </div>
        </div>
      </section>

      <!-- 创新故事 -->
      <section class="innovation-stories">
        <div class="section-header" style="color: #ffffff">
          <h2>创新故事</h2>
          <p>在探索的征途中，以科技之光点亮未来，用创新之力推动进步</p>
        </div>
        <div class="story-grid">
          <div class="story-card">
            <img
              src="@/assets/image/VCG41N1407662864.jpg"
              alt="产品图片"
              class="product-image"
            />
            <h3>多模态识别技术</h3>
            <p>结合多种模态数据，提升病虫害识别精度</p>
            <router-link to="/multi-modal-recognition" class="secondary-btn"
              >了解更多
            </router-link>
          </div>
          <div class="story-card">
            <img
              src="@/assets/image/VCG41N1407662864.jpg"
              alt="产品图片"
              class="product-image"
            />
            <h3>联邦学习技术</h3>
            <p>保护数据隐私，提升模型性能</p>
            <router-link to="/federated/training-status" class="secondary-btn"
              >了解更多
            </router-link>
          </div>
        </div>
      </section>
    </main>

    <!-- 底部 -->
    <footer>
      <div class="footer-content">
        <div class="footer-section">
          <h3>了解更多</h3>
          <ul>
            <li>
              <router-link to="/multi-modal-recognition"
                >多模态识别病虫害</router-link
              >
            </li>
            <li>
              <router-link to="/federated/training-status"
                >联邦学习&专家知识库问答</router-link
              >
            </li>
            <li>
              <router-link to="/user/location">地点管理</router-link>
            </li>
            <li>
              <router-link to="/user/settings">用户中心</router-link>
            </li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>服务与支持</h3>
          <ul>
            <li>
              <router-link to="/detection/vision">病虫害检测</router-link>
            </li>
            <li>
              <router-link to="/map/dashboard">地图管理</router-link>
            </li>
            <li>
              <router-link to="/knowledge/upload">知识库上传</router-link>
            </li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>安全使用指引</h3>
          <ul>
            <li>
              <router-link to="/user/settings">数据安全</router-link>
            </li>
            <li>
              <router-link to="/user/settings">隐私保护</router-link>
            </li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>联系我们</h3>
          <p>邮箱：info@agriculture-system.com</p>
          <p>电话：+86 123 4567 8910</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>
          &copy; 2024 苍穹智鉴・农业病虫害多模态联邦决策天穹系统. 保留所有权利.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import backgroundImage from "@/assets/image/VCG211525399501.jpg";

const isLoggedIn = ref(false);
const nickName = ref("");
const router = useRouter();

const logout = () => {
  isLoggedIn.value = false;
  nickName.value = "";
  router.push("/login");
};
</script>

<style scoped>
.agriculture-system {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: #333;
  min-height: 40vh;
}

/* 导航栏样式 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 5%;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 20px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 40px;
  margin-right: 10px;
}

.logo-text {
  font-size: 1.4rem;
  font-weight: 700;
  margin-left: 40px;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
  padding: 0.5rem 0;
  position: relative;
}

.nav-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #4caf50;
  transition: width 0.3s;
}

.nav-link:hover::after {
  width: 100%;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  font-weight: 500;
}

.login-btn,
.register-btn {
  padding: 0.5rem 1.2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.login-btn {
  color: #2196f3;
  border: 1px solid #2196f3;
}

.register-btn {
  background-color: #4caf50;
  color: white;
}

.login-btn:hover {
  background-color: rgba(33, 150, 243, 0.1);
}

.register-btn:hover {
  background-color: #3d8b40;
}

.logout-btn {
  padding: 0.5rem 1.2rem;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #d32f2f;
}

/* 英雄区域样式 */
.hero-section {
  padding: 5rem 5%;
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.1) 0%,
    rgba(33, 150, 243, 0.1) 100%
  );
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  color: #ffffff;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  font-weight: 300;
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 8px; /* 如果需要圆角效果 */
  object-fit: cover; /* 确保图片覆盖整个区域 */
}

.primary-btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.3s;
}

.primary-btn:hover {
  background-color: #3d8b40;
  transform: translateY(-2px);
}

/* 产品展示样式 */
.product-showcase {
  padding: 4rem 5%;
  background-color: white;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

.section-header p {
  font-size: 1.2rem;
  font-weight: 300;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.product-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  padding: 1.5rem;
  text-align: center;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.color-block {
  width: 100%;
  height: 180px;
  border-radius: 6px;
  margin-bottom: 1.2rem;
}

.product-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: #333;
}

.product-card p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.secondary-btn {
  display: inline-block;
  padding: 0.6rem 1.5rem;
  background-color: #f5f5f5;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s, color 0.3s;
}

.secondary-btn:hover {
  background-color: #e0e0e0;
  color: #333;
}

/* 快速链接样式 */
.quick-links {
  padding: 4rem 5%;
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.05) 0%,
    rgba(33, 150, 243, 0.05) 100%
  );
}

.quick-link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.quick-link-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  padding: 1.5rem;
  text-align: center;
}

.quick-link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* 行业应用样式 */
.industry-applications {
  padding: 4rem 5%;
  background-color: white;
}

.application-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.application-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.application-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.application-card .color-block {
  margin-bottom: 1.2rem;
}

.application-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: #333;
}

.application-card p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

/* 创新故事样式 */
.innovation-stories {
  padding: 4rem 5%;
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.05) 0%,
    rgba(33, 150, 243, 0.05) 100%
  );
}

.story-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.story-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.story-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.story-card .color-block {
  margin-bottom: 1.2rem;
}

.story-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: #333;
}

.story-card p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

/* 底部样式 */
footer {
  background-color: #333;
  color: white;
  padding: 3rem 5% 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #4caf50;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: white;
}

.footer-bottom {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #444;
  color: #999;
}
</style>
