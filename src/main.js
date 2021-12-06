import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import firebase from "firebase/app";
import "firebase/firestore";
import VueApexCharts from "vue-apexcharts";
import "../src/assets/css/app.scss";
import store from "./store";
import  Vue2Editor  from "vue2-editor";

Vue.use(VueApexCharts);
Vue.use(Vue2Editor);

Vue.component("apexchart", VueApexCharts);

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyCbCxyn0qaT2go1Ujxu1k8vuVOQQHXQ02o",
  authDomain: "todo-list-8c895.firebaseapp.com",
  projectId: "todo-list-8c895",
  storageBucket: "todo-list-8c895.appspot.com",
  messagingSenderId: "294379503258",
  appId: "1:294379503258:web:17f54fff1febd078bbe923",
});
export const db = firebase.firestore();

let app;
firebase.auth().onAuthStateChanged((user) => {
  console.log(user);
  if (!app) {
    app = new Vue({
      vuetify,
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
