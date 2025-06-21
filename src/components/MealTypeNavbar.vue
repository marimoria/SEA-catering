<template>
    <div class="meal_type_nav">
        <div class="tab_buttons">
            <!-- Checks if current active tab is equal to index -->
            <button
                v-for="(tab, index) in tabs"
                :key="index"
                :class="{ active: activeTab === index }"
                @click="activeTab = index"
                :style="{
                    backgroundColor: activeTab === index ? props.activeColor : '#fff9f4',
                    color: activeTab === index ? 'white' : props.buttonColor,
                    borderColor: props.buttonColor
                }"
            >
                {{ tab }}
            </button>
        </div>
        <div class="tab_content">
            <slot :name="tabs[activeTab]"></slot>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";

    const props = defineProps({
        tabs: {
            type: Array,
            required: true
        },
        buttonColor: {
            type: String,
            default: "#ffffff"
        },
        activeColor: {
            type: String,
            default: "#d54f22"
        }
    });

    const activeTab = ref(0);
</script>

<style scoped>
    .meal_type_nav {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .tab_buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: clamp(0.2rem, 0.5vh, 0.5rem);
    }

    .tab_buttons button {
        padding: 0.5rem 1rem;
        border: 2px solid;
        background-color: transparent;
        font-weight: 600;
        border-radius: 20px;
        cursor: pointer;
        transition: background 0.2s;
        font-size: clamp(1rem, 2.3vw, 2rem);
    }

    .tab_buttons button.active {
        color: white;
    }

    .tab_content {
        text-align: center;
    }

    @media (min-width: 1024px) {
        .tab_buttons button {
            font-size: clamp(1rem, 1.2rem, 1.5rem);
        }
    }
</style>
