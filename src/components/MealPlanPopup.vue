<template>
    <div v-if="visible" class="popup_overlay" @click.self="closePopup">
        <div class="popup_card" :style="{ borderColor: darkColor }">
            <button
                class="close_btn"
                @click="emit('close')"
                :style="{ borderColor: darkColor, color: darkColor }"
            >
                ×
            </button>

            <h2 class="popup_title" :style="{ color: medColor }">{{ name }}</h2>
            <p class="popup_desc">{{ desc }}</p>

            <section class="popup_section">
                <h3 class="popup_heading" :style="{ color: medColor }">Nutritional Info</h3>
                <div class="nutrition_grid">
                    <div
                        v-for="(val, key) in nutrition"
                        :key="key"
                        class="nutrition_item"
                        :style="{ border: `2px solid ${darkColor}`, background: lightColor + '22' }"
                    >
                        <p class="nutrition_value" :style="{ color: darkColor }">{{ val }}</p>
                        <p class="nutrition_key">{{ key }}</p>
                    </div>
                </div>
            </section>

            <section v-if="benefits.length" class="popup_section">
                <h3 class="popup_heading" :style="{ color: medColor }">Benefits</h3>
                <ul class="benefits_list">
                    <li v-for="(benefit, index) in benefits" :key="index">{{ benefit }}</li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script setup>
    import { onMounted } from "vue";

    const props = defineProps({
        visible: Boolean,
        name: String,
        desc: String,
        benefits: Array,
        nutrition: Object,
        darkColor: String,
        medColor: String,
        lightColor: String
    });

    const emit = defineEmits(["close"]);

    onMounted(() => {
        document.documentElement.style.setProperty("--accent-color", props.lightColor);
    });
</script>

<style scoped>
    .popup_overlay {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow-y: auto;
        padding: 2vh 1.5em;
        z-index: 999;
    }

    .popup_card {
        background-color: white;
        border-radius: 1em;
        padding: clamp(1rem, 4vw, 2rem);
        width: 100%;
        width: clamp(320px, 80vw, 480px);
        height: 70%;
        border: 2px solid;
        position: relative;
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
        overflow: auto;
    }

    .close_btn {
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        background: transparent;
        border: 2px solid;
        border-radius: 50%;
        font-size: clamp(1rem, 2.5vw, 1.5rem);
        width: clamp(2rem, 5vw, 2.5rem);
        height: clamp(2rem, 5vw, 2.5rem);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
    }

    .popup_title {
        font-size: clamp(1.3rem, 3.5vw, 2rem);
        font-weight: 700;
        text-align: center;
        margin-bottom: 0.3em;
        font-family: "Inter";
    }

    .popup_desc {
        font-family: "Inter";
        font-size: clamp(0.9rem, 2.5vw, 1.1rem);
        color: #444;
        text-align: center;
        margin-bottom: clamp(1rem, 3vw, 1.5rem);
    }

    .popup_section {
        margin-top: clamp(1rem, 2.5vw, 2rem);
    }

    .popup_heading {
        font-family: "Inter";
        font-size: clamp(1rem, 2.7vw, 1.3rem);
        font-weight: 600;
        margin-bottom: 0.6em;
    }

    .nutrition_grid {
        display: flex;
        flex-wrap: wrap;
        gap: clamp(0.5rem, 2vw, 1rem);
        justify-content: center;
    }

    .nutrition_item {
        background-color: white;
        border-radius: 0.7em;
        padding: clamp(0.75rem, 2vw, 1rem);
        width: clamp(5rem, 18vw, 6rem);
        text-align: center;
        border: 2px solid;
    }

    .nutrition_value {
        font-family: "Inter";
        font-size: clamp(1.2rem, 3vw, 1.5rem);
        font-weight: 700;
        margin-bottom: 0.3em;
    }

    .nutrition_key {
        font-family: "Inter";
        font-size: clamp(0.8rem, 2vw, 1rem);
        font-weight: 500;
        color: #666;
    }

    .benefits_list {
        font-family: "Inter";
        list-style: none;
        padding-left: 0;
        font-size: clamp(0.9rem, 2.3vw, 1.1rem);
        max-width: 100%;
        margin-inline: auto;
        line-height: 1.6;
    }

    .benefits_list li::before {
        content: "• ";
        color: v-bind("lightColor");
    }
</style>
