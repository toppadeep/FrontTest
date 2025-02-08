import { createApp } from "vue";
import { createPinia } from "pinia";
import "./styles/global.scss";
import "./styles/_variables.scss";
import "./styles/_mixins.scss";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
createApp(App).mount("#app");
