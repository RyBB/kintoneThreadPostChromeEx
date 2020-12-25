<template>
  <div>
    <div style="line-height: 1.2; white-space: nowrap;">
      <div v-for="(data, index) in scheduleData" :key="index">
        <span> {{ data.time }} </span>
        <span :style="'background-color:' + colorConf[data.color]">
          <span v-if="data.menu" :style="menucss">{{ data.menu }}</span>
        </span>
        <a target="_brank" :href="'/g/schedule/view.csp?event=' + data.id"> {{ data.subject }} </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { DateTime } from "luxon";

export default {
  name: "GrSche",
  props: ["date"],
  data() {
    return {
      html: "",
      scheduleData: [],
      colorConf: {
        normal: "rgb(49, 130, 220)",
        blue: "rgb(49, 130, 200)",
        wblue: "rgb(87, 179, 237)",
        orange: "rgb(239, 146, 1)",
        red: "rgb(244, 72, 72)",
        pink: "rgb(241, 148, 167)",
        purple: "rgb(181, 146, 216)",
        brown:"rgb(185, 153, 118)",
        gray: "rgb(153, 153, 153)",
        ygreen: "rgb(50, 205, 50)"
      },
      menucss: {
        "display": "inline-block",
        "margin-right": "3px",
        "padding": "2px 2px 1px",
        "color": "rgb(255, 255, 255)",
        "font-size": "11.628px",
        "border-radius": "2px",
        "line-height": "1.1",
      }
    };
  },
  async mounted() {
    const data = await this.getGaroonSchedule(this.date.toFormat("yyyy-MM-dd"));
    this.html = this.formatSchedule(data);
  },
  methods: {
    getGaroonSchedule(d) {
      const url = `/g/api/v1/schedule/events?rangeStart=${d}T00:00:00%2b09:00&rangeEnd=${d}T23:59:59%2b09:00`;
      return axios.get(url, {
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        }
      });
    },
    setMenuColor(plan) {
      switch (plan) {
        // 青
        case "打合":
        case "会議":
          return "blue";
        // 水色
        case "来訪":
          return "wblue";
        // オレンジ
        case "出張":
        case "ウルトラワーク":
          return "orange";
        // 赤
        case "複業":
        case "休み":
          return "red";
        // ピンク
        case "往訪":
          return "pink";
        // 紫
        case "面接":
        case "フェア":
          return "purple";
        // 茶色
        case "勉強会":
        case "タスク":
          return "brown";
        // グレー
        case "説明会":
        case "セミナー":
        case "その他":
          return "gray";
        // 黄緑
        case "終日":
          return "ygreen";
        // デフォルト
        default:
          return "normal";
      }
    },
    formatSchedule(schedule) {
      this.scheduleData = schedule.data.events
        .filter(val => val.eventType !== "ALL_DAY")
        .sort((a, b) => {
          if (a.start.dateTime > b.start.dateTime) return 1;
          else if (a.start.dateTime < b.start.dateTime) return -1;
          return 0;
        })
        .map(ele => {
          return {
            time: `${DateTime.fromISO(ele.start.dateTime).toFormat("HH:mm")}-${DateTime.fromISO(ele.end.dateTime).toFormat("HH:mm")}`,
            menu: ele.isAllDay ? "終日" : ele.eventMenu !== "" ?  ele.eventMenu: "",
            color: this.setMenuColor(ele.isAllDay ? "終日" : ele.eventMenu !== "" ?  ele.eventMenu: ""),
            id: ele.id,
            subject: ele.subject
          }
        });
    }
  }
};
</script>

<style></style>