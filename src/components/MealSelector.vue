<template>
    <div class="meal_type_selector">
        <!--Breakfast, Lunch-->
        <button
            v-for="type in types"
            :key="type.toLowerCase()"
            type="button"
            @click="toggleType(type.toLowerCase())"
            :class="{ active: isSelected(type.toLowerCase()) }"
            :style="{
                backgroundColor: isSelected(type.toLowerCase()) ? props.activeColor : '#fff9f4',
                color: isSelected(type.toLowerCase()) ? 'white' : props.buttonColor,
                borderColor: props.buttonColor
            }"
        >
            {{ type }}
        </button>
    </div>
</template>

<script setup>
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
        return selected.value[props.mealPlan].includes(type);
    }

    function toggleType(type) {
        const planArray = selected.value[props.mealPlan];

        if (isSelected(type)) {
            const index = planArray.indexOf(type);
            planArray.splice(index, 1);
        } else {
            planArray.push(type);
        }
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
