<template>
    <div class="dashboard_nav">
        <div class="tab_buttons">
            <button
                type="button"
                v-for="(tab, index) in tabs"
                :key="index"
                :class="{ active: activeTab === index }"
                @click="activeTab = index"
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
        }
    });

    const activeTab = ref(0);
</script>

<style scoped>
    .dashboard_nav {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        width: 100%;
    }

    .tab_buttons {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem;
        width: 100%;
    }

    .tab_buttons button {
        padding: 0.5rem 1.2rem;
        font-weight: 600;
        border: 2px solid transparent;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: clamp(1rem, 2.3vw, 2rem);
        font-family: "Inter", sans-serif;

        background-image: linear-gradient(#fff9f4, #fff9f4), var(--second-gradient);
        background-clip: padding-box, border-box;
        background-origin: border-box;

        color: #333;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .tab_buttons button.active {
        background: var(--second-gradient);
        color: white;
        border: none;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .tab_content {
        width: 100%;
        overflow-y: auto;
    }

    @media (min-width: 1024px) {
        .tab_buttons button {
            font-size: clamp(1rem, 1.2rem, 1.5rem);
        }
    }
</style>
