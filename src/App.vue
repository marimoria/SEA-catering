<template>
    <router-view v-slot="{ Component }">
        <Transition name="fade-slide" mode="out-in">
            <component :is="Component" :viewport="viewport" :device="device" />
        </Transition>
    </router-view>
</template>

<script setup>
    import "./assets/styles/app.scss"; // global app styling

    import { onMounted, Transition, ref } from "vue";
    import { useViewport } from "./components/composables/useViewport";
    import { getData, insertData } from "./components/composables/useSupabase";

    const { viewport, device } = useViewport();

    const instruments = ref([]);

    onMounted(() => {
        document.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });
    });
</script>
