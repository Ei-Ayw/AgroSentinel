<template>
  <div class="tableView">
    <el-form :inline="true" :model="queryParams">
      <el-form-item label="地点编号">
        <el-input
          v-model="queryParams.spaceId"
          placeholder="默认全部查询"
        ></el-input>
      </el-form-item>
      <el-form-item label="起始时间">
        <el-date-picker
          v-model="queryParams.start"
          type="datetime"
          placeholder="选择起始时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="queryParams.end"
          type="datetime"
          placeholder="选择结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="每页数量">
        <el-input v-model="queryParams.limit" placeholder="默认 10"></el-input>
      </el-form-item>
      <el-button type="primary" @click="fetchHistory">查询</el-button>
    </el-form>
    <el-table :data="historyRecords" stripe>
      <el-table-column prop="timestamp" label="时间"></el-table-column>
      <el-table-column prop="image_url" label="图片">
        <template #default="scope">
          <img :src="scope.row.image_url" alt="历史图片" width="100" />
        </template>
      </el-table-column>
      <el-table-column prop="diagnosis" label="病虫害类型"></el-table-column>
      <el-table-column prop="confidence" label="置信度"></el-table-column>
      <el-table-column prop="box" label="锚点"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="viewDetails(scope.row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="report" label="生成报告">
        <el-button type="success">生成 <icon-attachment /></el-button>
      </el-table-column>
    </el-table>
    <el-dialog v-model:visible="dialogVisible" title="历史记录详情">
      <template #content>
        <p><strong>时间:</strong> {{ selectedRecord.timestamp }}</p>
        <p><strong>病虫害类型:</strong> {{ selectedRecord.diagnosis }}</p>
        <p><strong>置信度:</strong> {{ selectedRecord.confidence }}</p>
        <p><strong>锚点:</strong> {{ selectedRecord.box }}</p>
        <p><strong>防治建议:</strong> {{ selectedRecord.treatment }}</p>
        <img :src="selectedRecord.image_url" alt="历史图片" width="300" />
      </template>
      <template #footer>
        <el-button @click="dialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";

// 虚拟数据
const dummyData = [
  {
    timestamp: "2025-03-10 08:30:15",
    image_url:
      "https://ts1.tc.mm.bing.net/th/id/R-C.189ff2a3ee9cf5c9d1d2ac57106a4ce2?rik=X39GYCIel0irQw&riu=http%3a%2f%2fk.sinaimg.cn%2fn%2fsinakd20220119s%2f790%2fw450h340%2f20220119%2f4ad3-5b45afa4280a20734de03bd471f7d845.jpg%2fw700d1q75cms.jpg&ehk=q3OhC4ebsZY%2f6iIhChMaYbP%2bvRB9xAUf59iw0CUPW6s%3d&risl=&pid=ImgRaw&r=0",
    diagnosis: "蚜虫",
    confidence: "89.5%",
    box: [120, 80, 350, 280],
    treatment: "建议使用10%吡虫啉可湿性粉剂2000倍液喷雾防治，间隔7天再喷一次",
    report: "生成报告",
  },
  {
    timestamp: "2025-03-10 14:15:40",
    image_url:
      "https://www.zsbeike.com/imgs/P/P09521/P09521.0134.10[4ca7c341a2d1].jpg",
    diagnosis: "白粉病",
    confidence: "92.3%",
    box: [450, 150, 680, 420],
    treatment: "发病初期喷施25%三唑酮可湿性粉剂1500倍液，连续2-3次",
    report: "生成报告",
  },
  {
    timestamp: "2025-03-11 09:05:20",
    image_url:
      "https://ts1.tc.mm.bing.net/th/id/R-C.3cec1276917c4f5c8e9821df441af399?rik=uwUnsQNqMZtulw&riu=http%3a%2f%2fatt.191.cn%2fattachment%2fthumb%2fMon_0909%2f63_30486_26b840147205605.jpg%3f613&ehk=DQ0%2bfvxiwvxH8hxalY7K3ouhjr%2bQuakW2ZQ5Bf569lA%3d&risl=&pid=ImgRaw&r=0",
    diagnosis: "叶斑病",
    confidence: "85.7%",
    box: [200, 220, 500, 550],
    treatment: "及时清除病叶，喷施50%多菌灵500倍液进行防治",
    report: "生成报告",
  },
  {
    timestamp: "2025-03-11 16:40:05",
    image_url:
      "https://a.img.s105.cn/UploadFiles/company-news/2017/11/201711151733472178.jpg!w640qm.jpg",
    diagnosis: "红蜘蛛",
    confidence: "91.2%",
    box: [30, 300, 200, 500],
    treatment: "使用1.8%阿维菌素乳油3000倍液喷雾，重点喷施叶背",
    report: "生成报告",
  },
  {
    timestamp: "2025-03-12 07:50:30",
    image_url:
      "https://ts1.tc.mm.bing.net/th/id/R-C.34f881ade1653ee99eb92b935fbaa190?rik=PtUosMqZEpkCWw&riu=http%3a%2f%2fatt.191.cn%2fattachment%2fphoto%2fMon_1107%2f6528_a585131123319502652719ee56080.jpg&ehk=xzf8XFGXbK%2f4OWhaehG4dWW%2fChP8QodIyi4DvGj5K6Y%3d&risl=&pid=ImgRaw&r=0",
    diagnosis: "根腐病",
    confidence: "78.9%",
    box: [500, 600, 800, 800],
    treatment: "拔除病株后用50%甲基托布津1000倍液灌根，控制土壤湿度",
    report: "生成报告",
  },
  {
    timestamp: "2025-03-12 13:20:55",
    image_url:
      "https://www.shuomingshu.cn/wp-content/uploads/images/2022/12/03/37cf371d2de248b78985e354aea08872_jbi5mrtrtti.jpg",
    diagnosis: "蚜虫",
    confidence: "82.1%",
    box: [150, 100, 380, 300],
    treatment: "建议使用10%吡虫啉可湿性粉剂2000倍液喷雾防治，间隔7天再喷一次",
    report: "生成报告",
  },
  {
    timestamp: "2025-03-13 10:10:10",
    image_url: "https://www.zsbeike.com/imgs/H/H09571/h09571_tm.txt.5f49d2.jpg",
    diagnosis: "白粉病",
    confidence: "90.5%",
    box: [400, 180, 700, 450],
    treatment: "发病初期喷施25%三唑酮可湿性粉剂1500倍液，连续2-3次",
    report: "生成报告",
  },
  {
    timestamp: "2025-03-13 17:30:45",
    image_url:
      "https://tse3-mm.cn.bing.net/th/id/OIP-C.lwA9V0PuDS5GDFFfSGrWOgHaE8?rs=1&pid=ImgDetMain",
    diagnosis: "叶斑病",
    confidence: "88.3%",
    box: [250, 250, 550, 600],
    treatment: "及时清除病叶，喷施50%多菌灵500倍液进行防治",
    report: "生成报告",
  },
  {
    timestamp: "2025-03-14 08:45:20",
    image_url:
      "https://ts1.tc.mm.bing.net/th/id/R-C.f1d5455954628a021689e759e1f46571?rik=ItQEPLM%2fXxkyZw&riu=http%3a%2f%2fk.sinaimg.cn%2fn%2fsinakd20201003ac%2f500%2fw800h500%2f20201003%2f3b7b-izwfpyt8953262.jpg%2fw700d1q75cms.jpg&ehk=BfldOeDkQQP%2f8ytkcBrS2GUIApnLs%2bG2pNIHbekTCqk%3d&risl=&pid=ImgRaw&r=0",
    diagnosis: "红蜘蛛",
    confidence: "89.9%",
    box: [50, 350, 220, 550],
    treatment: "使用1.8%阿维菌素乳油3000倍液喷雾，重点喷施叶背",
    report: "生成报告",
  },
  {
    timestamp: "2025-03-14 15:20:00",
    image_url:
      "https://ts1.tc.mm.bing.net/th/id/R-C.78d00a876fa060514017fc9ef908aac0?rik=ii4MQGgqdcReXQ&riu=http%3a%2f%2fn.sinaimg.cn%2fsinakd20200507ac%2f47%2fw1080h567%2f20200507%2f6603-iteyfww1322170.jpg&ehk=RA%2fibCITabOwAGey5L9rRwOmnjxuCtQfYksvoTlAC4I%3d&risl=&pid=ImgRaw&r=0",
    diagnosis: "根腐病",
    confidence: "75.6%",
    box: [550, 650, 850, 850],
    treatment: "拔除病株后用50%甲基托布津1000倍液灌根，控制土壤湿度",
    report: "生成报告",
  },
  {
    timestamp: "2025-03-15 09:30:30",
    image_url:
      "https://tse4-mm.cn.bing.net/th/id/OIP-C.okh14xgCGUW7mJuwgrTSkQHaHd?rs=1&pid=ImgDetMain",
    diagnosis: "蚜虫",
    confidence: "86.4%",
    box: [180, 120, 400, 320],
    treatment: "建议使用10%吡虫啉可湿性粉剂2000倍液喷雾防治，间隔7天再喷一次",
    report: "生成报告",
  },
  {
    timestamp: "2025-03-15 16:05:55",
    image_url:
      "https://tse2-mm.cn.bing.net/th/id/OIP-C.3zbd5OmfBIJqWnCILt4zZwHaFk?rs=1&pid=ImgDetMain",
    diagnosis: "白粉病",
    confidence: "93.1%",
    box: [420, 200, 720, 480],
    treatment: "发病初期喷施25%三唑酮可湿性粉剂1500倍液，连续2-3次",
    report: "生成报告",
  },
  {
    timestamp: "2025-03-16 10:20:15",
    image_url:
      "https://q5.itc.cn/q_70/images03/20240515/c124b1198c4143a0bd155a1549b3b029.jpeg",
    diagnosis: "叶斑病",
    confidence: "84.2%",
    box: [300, 300, 600, 650],
    treatment: "及时清除病叶，喷施50%多菌灵500倍液进行防治",
    report: "生成报告",
  },
  {
    timestamp: "2025-03-16 17:45:40",
    image_url:
      "https://tse2-mm.cn.bing.net/th/id/OIP-C.g2Bwcq7intKjWhU6FiXmkgHaHF?rs=1&pid=ImgDetMain",
    diagnosis: "红蜘蛛",
    confidence: "90.8%",
    box: [80, 400, 250, 600],
    treatment: "使用1.8%阿维菌素乳油3000倍液喷雾，重点喷施叶背",
    report: "生成报告",
  },
  {
    timestamp: "2025-03-17 08:00:00",
    image_url:
      "https://ts1.tc.mm.bing.net/th/id/R-C.2848afb6263764d8807be461211d7790?rik=Hr3fQNATf2WR1Q&riu=http%3a%2f%2fqnsunong.365sn.cn%2f57299ea54c4ef.jpg&ehk=2LAA%2bO9dVshDkLOktC8T3Pbc9LyAkZpi9lX0r2xyBsk%3d&risl=&pid=ImgRaw&r=0",
    diagnosis: "根腐病",
    confidence: "79.3%",
    box: [600, 700, 900, 900],
    treatment: "拔除病株后用50%甲基托布津1000倍液灌根，控制土壤湿度",
    report: "生成报告",
  },
  {
    timestamp: "2025-03-17 14:45:15",
    image_url:
      "https://tse3-mm.cn.bing.net/th/id/OIP-C.MwRFcMKHg7W-Tl6n7eW22gHaEp?rs=1&pid=ImgDetMain",
    diagnosis: "蚜虫",
    confidence: "81.7%",
    box: [220, 150, 450, 350],
    treatment: "建议使用10%吡虫啉可湿性粉剂2000倍液喷雾防治，间隔7天再喷一次",
    report: "生成报告",
  },
  {
    timestamp: "2025-03-18 09:15:30",
    image_url:
      "https://www.dedemu.cn/upload/default/20230729/10b168eba6b1ef30e1c22d7746da8a12.jpg",
    diagnosis: "白粉病",
    confidence: "94.0%",
    box: [450, 220, 750, 500],
    treatment: "发病初期喷施25%三唑酮可湿性粉剂1500倍液，连续2-3次",
    report: "生成报告",
  },
  {
    timestamp: "2025-03-18 16:30:45",
    image_url:
      "https://ts1.tc.mm.bing.net/th/id/R-C.4fcb0d4afd59a79541a5eeb7f99ed7df?rik=bUYXSt8R4ZZs5w&riu=http%3a%2f%2fn.sinaimg.cn%2fsinacn20190522s%2f322%2fw641h481%2f20190522%2ff604-hxhyiun5287019.jpg&ehk=ZNxoWcxbZDy%2fxNGlVofW3wPfqnO7oXIU8RuYyeqOx7c%3d&risl=&pid=ImgRaw&r=0",
    diagnosis: "叶斑病",
    confidence: "87.6%",
    box: [350, 350, 650, 700],
    treatment: "及时清除病叶，喷施50%多菌灵500倍液进行防治",
    report: "生成报告",
  },
  {
    timestamp: "2025-03-19 10:50:00",
    image_url:
      "https://x0.ifengimg.com/ucms/2021_47/FAB1094C9E9D8BFB32DFF020F3EB6D47AFDCF4F8_size51_w689_h387.jpg",
    diagnosis: "红蜘蛛",
    confidence: "89.1%",
    box: [100, 450, 280, 650],
    treatment: "使用1.8%阿维菌素乳油3000倍液喷雾，重点喷施叶背",
    report: "生成报告",
  },
  {
    timestamp: "2025-03-19 18:00:15",
    image_url:
      "https://tse1-mm.cn.bing.net/th/id/OIP-C.kMX0ezD9BQgmWbO-wjIygQHaFI?rs=1&pid=ImgDetMain",
    diagnosis: "根腐病",
    confidence: "76.5%",
    box: [650, 750, 950, 950],
    treatment: "拔除病株后用50%甲基托布津1000倍液灌根，控制土壤湿度",
    report: "生成报告",
  },
];

const queryParams = ref({
  spaceId: null,
  start: null,
  end: null,
  limit: 10,
});
const historyRecords = ref([]);
const dialogVisible = ref(false);
const selectedRecord = ref({});

const fetchHistory = async () => {
  try {
    // 这里模拟从接口获取数据，实际使用时可以替换为真实接口调用
    historyRecords.value = dummyData;
  } catch (error) {
    ElMessage.error("查询失败：" + error.message);
  }
};

const viewDetails = (record) => {
  selectedRecord.value = record;
  dialogVisible.value = true;
};

onMounted(() => {
  fetchHistory();
});
</script>

<style scoped>
.tableView {
  margin-top: 48px;
  margin-left: 40px;
  margin-right: 40px;
}

.el-table {
  margin-top: 20px;
}
</style>
