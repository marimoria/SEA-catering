<template>
    <router-view v-slot="{ Component }">
        <Transition name="fade-slide" mode="out-in">
            <component :is="Component" :viewport="viewport" :device="device" />
        </Transition>
    </router-view>
</template>

<script setup>
    import "./assets/styles/app.scss"; // global app styling

    import { onMounted, Transition } from "vue";
    import { useViewport } from "./components/composables/useViewport";

    const { viewport, device } = useViewport();

    onMounted(() => {
        document.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });
    });
</script>
