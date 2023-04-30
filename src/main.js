import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import store from "./store/store";

const app = createApp(App);

app.use(store);

app.mount("#app");
