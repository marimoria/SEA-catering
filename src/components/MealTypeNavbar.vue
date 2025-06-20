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
                    backgroundColor: activeTab === index ? props.activeColor : 'transparent',
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
        gap: 1rem;
    }

    .tab_buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }

    .tab_buttons button {
        padding: 0.5rem 1rem;
        border: 2px solid;
        background-color: transparent;
        font-weight: 600;
        border-radius: 20px;
        cursor: pointer;
        transition: background 0.2s;
    }

    .tab_buttons button.active {
        color: white;
    }

    .tab_content {
        text-align: center;
    }
</style>
