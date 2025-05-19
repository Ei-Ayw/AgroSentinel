<template>
  <div class="container">
    <el-form :model="newLocation" label-width="120px" class="form-container">
      <el-form-item label="地点名称" class="form-item">
        <el-input v-model="newLocation.name"></el-input>
      </el-form-item>
      <el-form-item label="关联网格ID" class="form-item">
        <el-input v-model="newLocation.grid_id"></el-input>
      </el-form-item>
      <el-form-item label="作物" class="form-item">
        <el-input v-model="newLocation.crop"></el-input>
      </el-form-item>
      <el-form-item label="是否设为默认" class="form-item">
        <el-switch v-model="newLocation.is_default"></el-switch>
      </el-form-item>
      <el-button type="primary" @click="addNewLocation" class="import-button">
        添加地点
      </el-button>
    </el-form>
    <el-table :data="locations" stripe class="table-container">
      <el-table-column prop="name" label="地点名称"></el-table-column>
      <el-table-column prop="grid_id" label="关联网格ID"></el-table-column>
      <el-table-column prop="crop" label="作物"></el-table-column>
      <el-table-column prop="last_alert" label="最后警报时间"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="editLocation(scope.row)">
            编辑
          </el-button>
          <el-button
            type="danger"
            @click="deleteLocation(scope.row.location_id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useLocationStore } from "@/stores/locations";
import {
  addLocation as apiAddLocation,
  // 这里注释掉原有的 getLocations，因为我们使用虚拟数据
  // getLocations,
  deleteLocation as apiDeleteLocation,
} from "@/api/auth";
import { ElMessage } from "element-plus";

const locationStore = useLocationStore();
const newLocation = ref({
  name: "",
  grid_id: "",
  crop: "",
  is_default: false,
});
const locations = ref([]);

// 生成随机日期函数
const getRandomDate = () => {
  const start = new Date(2023, 0, 1);
  const end = new Date();
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomDate.toLocaleString();
};

// 作物列表
const crops = ["小麦", "玉米", "水稻", "大豆", "棉花"];

// 生成 10 条虚拟数据
const generateMockData = () => {
  const mockData = [];
  for (let i = 1; i <= 10; i++) {
    const randomCropIndex = Math.floor(Math.random() * crops.length);
    mockData.push({
      location_id: i,
      name: `农场${i}号地块`,
      grid_id: `GRID-${Math.floor(Math.random() * 1000)}`,
      crop: crops[randomCropIndex],
      last_alert: getRandomDate(),
      is_default: Math.random() > 0.5,
    });
  }
  return mockData;
};

onMounted(() => {
  try {
    const mockData = generateMockData();
    locations.value = mockData;
    locationStore.setLocations(mockData);
  } catch (error) {
    ElMessage.error("获取地点列表失败：" + error.message);
  }
});

const addNewLocation = async () => {
  try {
    const { data } = await apiAddLocation(newLocation.value);
    locations.value.push(data);
    locationStore.setLocations(locations.value);
    ElMessage.success("地点添加成功");
    newLocation.value = {
      name: "",
      grid_id: "",
      crop: "",
      is_default: false,
    };
  } catch (error) {
    ElMessage.error("添加地点失败：" + error.message);
  }
};

const editLocation = () => {
  // 可以在这里实现编辑逻辑，例如弹出编辑表单
};

const deleteLocation = async (id) => {
  try {
    await apiDeleteLocation(id);
    locations.value = locations.value.filter(
      (location) => location.location_id !== id
    );
    locationStore.setLocations(locations.value);
    ElMessage.success("地点已删除");
  } catch (error) {
    ElMessage.error("删除地点失败：" + error.message);
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.form-container {
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.form-item {
  margin-bottom: 25px !important;
}

.table-container {
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
}

.import-button {
  width: 100%;
  margin-top: 10px;
}
</style>
