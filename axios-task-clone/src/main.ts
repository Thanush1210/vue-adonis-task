import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);

app.mount("#app");

app.config.globalProperties.$filters = {
  gradeFilter(value: number) {
    let grade;
    if (value > 90 && value <= 100) {
      grade = "O";
    } else if (value > 80 && value <= 90) {
      grade = "A+";
    } else if (value > 70 && value <= 80) {
      grade = "A";
    } else if (value > 60 && value <= 70) {
      grade = "B+";
    } else if (value >= 50 && value <= 60) {
      grade = "B";
    } else {
      grade = "Fail";
    }
    return grade;
  },
};
