<template>
  <div id="app" style="margin: 0 10px">
    <div :style="css.todayText"> {{ today.toFormat("MM/dd")}}</div>
    <br/>
    <span :style="css.bold">【{{ today.toFormat("MM/dd") }}】の予定</span>
    <GrSchedule :date="this.today" />
    <br/>
    <span :style="css.bold">【{{ tomorrow.toFormat("MM/dd") }}】の予定</span>
    <GrSchedule :date="tomorrow" />
    <br/>
    <span :style="css.bold">【タスク一覧】</span>
    <KinTask />
    <br/>
    <span :style="css.bold">【今日の一言】</span>
    <br/><br/>
    <span :style="css.bold">【今日のアニメ名台詞】</span>
    <AnimeChan />
  </div>
</template>

<script>
import GrSchedule from "./components/GaroonSchedule";
import KinTask from "./components/KintoneTask";
import AnimeChan from "./components/AnimeChan";

import { DateTime } from "luxon";

export default {
  name: "App",
  components: {
    GrSchedule,
    KinTask,
    AnimeChan
  },
  data() {
    return {
      today: DateTime.local(),
      tomorrow: DateTime.local().toFormat("E") === "5" ? DateTime.local().plus({days: 3}): DateTime.local().plus({days: 1}),
      css: {
        bold: "font-weight: 700",
        todayText: {
          "font-family": "cursive",
          "font-size": "x-large",
          "font-weight": "700",
          "color": this.$items.selected_fontcolor
        }
      }
    }
  },
};
</script>

<style></style>