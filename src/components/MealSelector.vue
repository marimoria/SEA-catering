<template>
    <div class="meal_type_selector">
        <button
            v-for="type in types"
            :key="type"
            type="button"
            @click="toggleType(type)"
            :class="{ active: isSelected(type) }"
            :style="{
                backgroundColor: isSelected(type) ? props.activeColor : '#fff9f4',
                color: isSelected(type) ? 'white' : props.buttonColor,
                borderColor: props.buttonColor
            }"
        >
            {{ type }}
        </button>
    </div>
</template>

<script setup>
    import { defineModel } from "vue";

    const props = defineProps({
        types: Array,
        mealPlan: String,
        buttonColor: String,
        activeColor: String
    });

    // array of selected meal types
    // a prop called selected binded to reactive element in parent
    const selected = defineModel("selected");

    function isSelected(type) {
        if (selected.value[props.mealPlan].includes(type.toLowerCase())) {
            return true;
        }
        return false;
    }

    function toggleType(type) {
        const typeLower = type.toLowerCase();
        const planArray = selected.value[props.mealPlan];

        if (isSelected(type)) {
            const index = planArray.indexOf(typeLower);
            planArray?.splice(index, 1);
        } else {
            planArray?.push(typeLower);
        }

        console.log(selected.value);
    }
</script>

<style scoped>
    .meal_type_selector {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: clamp(0.2rem, 0.5vh, 0.5rem);
    }

    .meal_type_selector button {
        padding: 0.5rem 1rem;
        border: 2px solid;
        background-color: transparent;
        font-weight: 600;
        border-radius: 20px;
        cursor: pointer;
        transition: background 0.2s;
        font-size: clamp(1rem, 2.3vw, 2rem);
    }

    .meal_type_selector button.active {
        color: white;
    }

    @media (min-width: 1024px) {
        .meal_type_selector button {
            font-size: clamp(1rem, 1.2rem, 1.5rem);
        }
    }
</style>
