import { createApp } from "vue";
import App from "./src/App.vue";
import router from "./src/js/router";
import "./src/js/vendor";
import { fetchProfile } from "./src/components/composables/useAuth";

async function initApp() {
    // Wait until session and profile is fetched
    await fetchProfile();

    const app = createApp(App);
    app.use(router).mount("#app");

    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);
    setVH();
}

initApp();
