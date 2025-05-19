<template>
  <div class="tableView">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="region" label="地区" width="180" />
      <el-table-column prop="cropType" label="作物类型" width="180" />
      <el-table-column prop="uploadUser" label="上传用户" width="180" />
      <el-table-column prop="img" label="图片" width="180px">
        <template v-slot="scope">
          <img :src="scope.row.img" width="140" height="140" alt="作物图片" />
        </template>
      </el-table-column>
      <el-table-column prop="recognitionResult" label="识别结果" width="180" />
      <el-table-column prop="controlSuggestion" label="防治建议" />
    </el-table>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tableData = ref([
  {
    region: "河北省邯郸市曲周县四疃镇王庄村",
    cropType: "小麦",
    uploadUser: "张建国",
    img: "https://yupi2-1325799959.cos.ap-guangzhou.myqcloud.com//2025/04/res_354c7230-dbcd-42d7-826f-0d7a5daf0bba.jpg",
    recognitionResult: "健康",
    controlSuggestion:
      "当前小麦生长健康，需定期巡查田间，重点监测蚜虫、红蜘蛛等虫害，同时做好排水防涝，避免湿度过高引发纹枯病、白粉病等病害。",
  },
  {
    region: "江苏省苏州市吴江区平望镇庙头村",
    cropType: "水稻",
    uploadUser: "李卫国",
    img: "https://yupi2-1325799959.cos.ap-guangzhou.myqcloud.com//2025/04/res_e3c296f3-3cfd-44a2-ab7f-9bde4c4ce0c3.jpg",
    recognitionResult: "锈病",
    controlSuggestion:
      "针对水稻锈病，建议选用25%三唑酮可湿性粉剂1500倍液喷雾防治，间隔7 - 10天再喷1次，连喷2 - 3次；同时清除田间病残体，合理密植增强通风透光，配合增施磷钾肥提升植株抗病能力。",
  },
  {
    region: "广东省茂名市高州市分界镇储良村",
    cropType: "玉米",
    uploadUser: "王振华",
    img: "https://th.bing.com/th/id/R.6b023dad6b951aea4b6a91017443546a?rik=MGGcqMxRMiBFqA&riu=http%3a%2f%2fatt.191.cn%2fattachment%2fMon_1807%2f610_258127_2b630dca26a1bbc.jpg%3f97&ehk=eVZvOC0PBxCEK9XKB4miUf2SDBOoLneaHyIZrHtASwY%3d&risl=&pid=ImgRaw&r=0 ",
    recognitionResult: "虫害",
    controlSuggestion:
      "玉米发生虫害（主要为玉米螟），可在心叶期亩用1.5%辛硫磷颗粒剂0.5 - 1公斤撒施于心叶丛中，或在卵孵化高峰期用20%氯虫苯甲酰胺悬浮剂3000倍液喷雾；及时处理秸秆，破坏害虫越冬环境以减少虫源。",
  },
  {
    region: "黑龙江省哈尔滨市五常市龙凤山镇永生村",
    cropType: "大豆",
    uploadUser: "赵立民",
    img: "https://yupi2-1325799959.cos.ap-guangzhou.myqcloud.com//2025/04/res_8427d172-dd6a-4deb-ba24-8af44f8b5eb3.jpg",
    recognitionResult: "健康",
    controlSuggestion:
      "大豆当前生长状态良好，需预防大豆食心虫和根腐病，可在开花结荚期布设性诱剂诱杀成虫，播种前用35%甲霜灵拌种剂处理种子；避免连作，及时中耕除草保持田间通风。",
  },
  {
    region: "陕西省渭南市大荔县范家镇井庄村",
    cropType: "棉花",
    uploadUser: "钱志勇",
    img: "https://yupi2-1325799959.cos.ap-guangzhou.myqcloud.com//2025/04/res_086e33bb-6684-4522-8de0-57ae43b1b209.jpg",
    recognitionResult: "枯萎病",
    controlSuggestion:
      "棉花枯萎病防治需在发病初期用50%多菌灵可湿性粉剂500倍液灌根，每株灌药液200 - 250毫升，间隔10天1次，连灌2 - 3次；重病田实行与禾本科作物5年以上轮作，选用中棉所96等抗病品种。",
  },
  {
    region: "四川省成都市郫都区唐昌镇战旗村",
    cropType: "辣椒",
    uploadUser: "孙晓峰",
    img: "https://yupi2-1325799959.cos.ap-guangzhou.myqcloud.com//2025/04/res_8b964070-7959-466e-9643-d3f5edaef659.jpg",
    recognitionResult: "健康",
    controlSuggestion:
      "辣椒目前健康，需提前预防炭疽病和疫病，定期清除田间病残叶，雨季及时排水降湿；可喷施1:1:100波尔多液保护叶片，发现零星病株立即拔除并喷施75%百菌清可湿性粉剂800倍液。",
  },
  {
    region: "山东省潍坊市寿光市孙家集街道三元朱村",
    cropType: "番茄",
    uploadUser: "周明辉",
    img: "https://yupi2-1325799959.cos.ap-guangzhou.myqcloud.com//2025/04/res_2a890e0c-5eee-42d2-b6ad-14952c0efb5f.jpg",
    recognitionResult: "早疫病",
    controlSuggestion:
      "番茄早疫病防治需在发病前或初期用80%代森锰锌可湿性粉剂600倍液喷雾保护，发病后改用50%异菌脲悬浮剂1000倍液，7 - 10天一次，连喷2 - 3次；同时合理整枝打杈，控制棚内湿度以增强透光性。",
  },
  {
    region: "浙江省温州市乐清市虹桥镇建强村",
    cropType: "黄瓜",
    uploadUser: "吴俊峰",
    img: "https://yupi2-1325799959.cos.ap-guangzhou.myqcloud.com//2025/04/res_215ae289-b076-489e-8a10-55de1bbc84e7.jpg",
    recognitionResult: "健康",
    controlSuggestion:
      "黄瓜当前无病虫害，需重点防范霜霉病和蚜虫，可悬挂黄色粘虫板监测虫情，每隔10天喷施1次1%中生菌素水剂1000倍液预防细菌性病害；控制氮肥用量，防止植株徒长影响抗病能力。",
  },
  {
    region: "山东省潍坊市寿光市孙家集街道三元朱村",
    cropType: "番茄",
    uploadUser: "周明辉",
    img: "https://yupi2-1325799959.cos.ap-guangzhou.myqcloud.com//2025/04/res_64346f73-f5cf-4712-9fae-6b3652ab57f0.jpg",
    recognitionResult: "早疫病",
    controlSuggestion:
      "番茄早疫病防治需在发病前或初期用80%代森锰锌可湿性粉剂600倍液喷雾保护，发病后改用50%异菌脲悬浮剂1000倍液，7 - 10天一次，连喷2 - 3次；同时合理整枝打杈，控制棚内湿度以增强透光性。",
  },
  {
    region: "浙江省温州市乐清市虹桥镇建强村",
    cropType: "黄瓜",
    uploadUser: "吴俊峰",
    img: "https://yupi2-1325799959.cos.ap-guangzhou.myqcloud.com//2025/04/res_2a890e0c-5eee-42d2-b6ad-14952c0efb5f.jpg",
    recognitionResult: "健康",
    controlSuggestion:
      "黄瓜当前无病虫害，需重点防范霜霉病和蚜虫，可悬挂黄色粘虫板监测虫情，每隔10天喷施1次1%中生菌素水剂1000倍液预防细菌性病害；控制氮肥用量，防止植株徒长影响抗病能力。",
  },
  {
    region: "江苏省苏州市吴江区平望镇庙头村",
    cropType: "水稻",
    uploadUser: "李卫国",
    img: "https://yupi2-1325799959.cos.ap-guangzhou.myqcloud.com//2025/04/res_e3c296f3-3cfd-44a2-ab7f-9bde4c4ce0c3.jpg",
    recognitionResult: "锈病",
    controlSuggestion:
      "针对水稻锈病，建议选用25%三唑酮可湿性粉剂1500倍液喷雾防治，间隔7 - 10天再喷1次，连喷2 - 3次；同时清除田间病残体，合理密植增强通风透光，配合增施磷钾肥提升植株抗病能力。",
  },
  {
    region: "黑龙江省哈尔滨市五常市龙凤山镇永生村",
    cropType: "大豆",
    uploadUser: "赵立民",
    img: "https://yupi2-1325799959.cos.ap-guangzhou.myqcloud.com//2025/04/res_8427d172-dd6a-4deb-ba24-8af44f8b5eb3.jpg",
    recognitionResult: "健康",
    controlSuggestion:
      "大豆当前生长状态良好，需预防大豆食心虫和根腐病，可在开花结荚期布设性诱剂诱杀成虫，播种前用35%甲霜灵拌种剂处理种子；避免连作，及时中耕除草保持田间通风。",
  },
  {
    region: "陕西省渭南市大荔县范家镇井庄村",
    cropType: "棉花",
    uploadUser: "钱志勇",
    img: "https://yupi2-1325799959.cos.ap-guangzhou.myqcloud.com//2025/04/res_2a890e0c-5eee-42d2-b6ad-14952c0efb5f.jpg",
    recognitionResult: "枯萎病",
    controlSuggestion:
      "棉花枯萎病防治需在发病初期用50%多菌灵可湿性粉剂500倍液灌根，每株灌药液200 - 250毫升，间隔10天1次，连灌2 - 3次；重病田实行与禾本科作物5年以上轮作，选用中棉所96等抗病品种。",
  },
  {
    region: "黑龙江省哈尔滨市五常市龙凤山镇永生村",
    cropType: "大豆",
    uploadUser: "赵立民",
    img: "https://yupi2-1325799959.cos.ap-guangzhou.myqcloud.com//2025/04/res_2a890e0c-5eee-42d2-b6ad-14952c0efb5f.jpg",
    recognitionResult: "健康",
    controlSuggestion:
      "大豆当前生长状态良好，需预防大豆食心虫和根腐病，可在开花结荚期布设性诱剂诱杀成虫，播种前用35%甲霜灵拌种剂处理种子；避免连作，及时中耕除草保持田间通风。",
  },
  {
    region: "陕西省渭南市大荔县范家镇井庄村",
    cropType: "棉花",
    uploadUser: "钱志勇",
    img: "https://yupi2-1325799959.cos.ap-guangzhou.myqcloud.com//2025/04/res_086e33bb-6684-4522-8de0-57ae43b1b209.jpg",
    recognitionResult: "枯萎病",
    controlSuggestion:
      "棉花枯萎病防治需在发病初期用50%多菌灵可湿性粉剂500倍液灌根，每株灌药液200 - 250毫升，间隔10天1次，连灌2 - 3次；重病田实行与禾本科作物5年以上轮作，选用中棉所96等抗病品种。",
  },
  {
    region: "吉林省长春市九台区其塔木镇刘家村",
    cropType: "草莓",
    uploadUser: "沈嘉豪",
    img: "https://cdn.pixabay.com/photo/2020/09/16/06/23/natural-5575515_1280.jpg",
    recognitionResult: "健康",
    controlSuggestion:
      "草莓处于健康状态，需预防灰霉病和蚜虫，采用膜下滴灌降低棚内湿度，并用50%腐霉利可湿性粉剂1000倍液喷雾防治病害；蚜虫发生时用10%吡虫啉可湿性粉剂2000倍液喷雾，注意轮换用药避免抗药性。",
  },
  {
    region: "黑龙江省哈尔滨市五常市龙凤山镇永生村",
    cropType: "大豆",
    uploadUser: "赵立民",
    img: "https://yupi2-1325799959.cos.ap-guangzhou.myqcloud.com//2025/04/res_8427d172-dd6a-4deb-ba24-8af44f8b5eb3.jpg",
    recognitionResult: "健康",
    controlSuggestion:
      "大豆当前生长状态良好，需预防大豆食心虫和根腐病，可在开花结荚期布设性诱剂诱杀成虫，播种前用35%甲霜灵拌种剂处理种子；避免连作，及时中耕除草保持田间通风。",
  },
  {
    region: "陕西省渭南市大荔县范家镇井庄村",
    cropType: "棉花",
    uploadUser: "钱志勇",
    img: "https://yupi2-1325799959.cos.ap-guangzhou.myqcloud.com//2025/04/res_086e33bb-6684-4522-8de0-57ae43b1b209.jpg",
    recognitionResult: "枯萎病",
    controlSuggestion:
      "棉花枯萎病防治需在发病初期用50%多菌灵可湿性粉剂500倍液灌根，每株灌药液200 - 250毫升，间隔10天1次，连灌2 - 3次；重病田实行与禾本科作物5年以上轮作，选用中棉所96等抗病品种。",
  },
  {
    region: "黑龙江省哈尔滨市五常市龙凤山镇永生村",
    cropType: "大豆",
    uploadUser: "赵立民",
    img: "https://yupi2-1325799959.cos.ap-guangzhou.myqcloud.com//2025/04/res_2a890e0c-5eee-42d2-b6ad-14952c0efb5f.jpg",
    recognitionResult: "健康",
    controlSuggestion:
      "大豆当前生长状态良好，需预防大豆食心虫和根腐病，可在开花结荚期布设性诱剂诱杀成虫，播种前用35%甲霜灵拌种剂处理种子；避免连作，及时中耕除草保持田间通风。",
  },
  {
    region: "陕西省渭南市大荔县范家镇井庄村",
    cropType: "棉花",
    uploadUser: "钱志勇",
    img: "https://yupi2-1325799959.cos.ap-guangzhou.myqcloud.com//2025/04/res_086e33bb-6684-4522-8de0-57ae43b1b209.jpg",
    recognitionResult: "枯萎病",
    controlSuggestion:
      "棉花枯萎病防治需在发病初期用50%多菌灵可湿性粉剂500倍液灌根，每株灌药液200 - 250毫升，间隔10天1次，连灌2 - 3次；重病田实行与禾本科作物5年以上轮作，选用中棉所96等抗病品种。",
  },
]);
</script>

<style scoped>
img {
  border-radius: 4px;
}

.tableView {
  margin-top: 40px;
  margin-left: 40px;
  margin-right: 40px;
}
</style>
