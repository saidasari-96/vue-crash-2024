import "./assets/main.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "primeicons/primeicons.css";

import router from "./router";
import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store";

const app = createApp(App);
app.use(router);
app.use(Toast);
app.use(store);

app.mount("#app");
