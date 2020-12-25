<template>
  <div>
    <table style="text-align:center; border-collapse:collapse; border: 1px solid #333333;">
      <thead>
        <tr>
          <th :style="css">種類</th>
          <th :style="css">タスク名</th>
          <th :style="css">優先度</th>
          <th :style="css">ステータス</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(val, index) in task" :key="index">
          <td :style="val.css">{{ val.type }}</td>
          <td :style="val.css" style="text-align: left">{{ val.title }}</td>
          <td :style="val.css">{{ val.triage }}</td>
          <td :style="val.css">{{ val.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "KinTask",
  data() {
    return {
      task: [],
      css: {
        border: "1px solid #333333",
        padding: "3px"
      }
    }
  },
  async mounted() {
    const url = "XXXXX";
    const {data} = await axios.get(url);
    this.task = JSON.parse(data).records.map(ele => {
      const obj = {
        type: ele.type.value,
        title: ele.title.value,
        triage: ele.triage.value,
        status: ele.status.value,
        css: {
          border: "1px solid #333333",
          padding: "0 20px"
        }
      };
      obj.css['background-color'] = ele.status.value === '未処理' ? '#ffe391' : '';
      obj.css.color = (ele.status.value ===  "完了" || ele.status.value ===  "保留") ? '#ccc' : '#000';
      return obj
    });
  }
}
</script>

<style></style>