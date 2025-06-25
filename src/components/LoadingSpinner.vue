<template>
    <div ref="spinner" class="loading-spinner" aria-label="Loading..."></div>
</template>

<script setup>
    import { onMounted, ref } from "vue";
    import { gsap } from "../js/vendor";

    const spinner = ref(null);

    onMounted(() => {
        gsap.to(spinner.value, {
            rotation: 360,
            duration: 1,
            repeat: -1,
            ease: "linear",
            transformOrigin: "50% 50%"
        });
    });
</script>

<style scoped>
    .loading-spinner {
        width: clamp(24px, 5vw, 48px);
        height: clamp(24px, 5vw, 48px);
        border: clamp(3px, 0.5vw, 6px) solid #ccc;
        border-top: clamp(3px, 0.5vw, 6px) solid #ca7433;
        border-radius: 50%;
        margin-inline: auto;
        margin-top: 1rem;
    }
</style>
