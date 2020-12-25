import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

chrome.extension.onMessage.addListener(() => {
  chrome.storage.sync.get(null, items => {
    // フォーカスしている部分を取得
    console.log(items);
    Vue.prototype.$items = items;
    const target = document.activeElement;
    const target_area = target.id;
    // フォーカスしていなかったら処理をやめる
    if (!target_area) return;
    new Vue({
      render: h => h(App)
    }).$mount(target.children[0]);
  });
});
