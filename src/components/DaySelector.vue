<template>
    <div class="day_selector">
        <button
            v-for="day in days"
            :key="day.toLowerCase()"
            type="button"
            @click="toggleDay(day.toLowerCase())"
            :class="{ active: isSelected(day.toLowerCase()) }"
            :style="{
                backgroundColor: isSelected(day.toLowerCase()) ? props.activeColor : '#fff9f4',
                color: isSelected(day.toLowerCase()) ? 'white' : props.buttonColor,
                borderColor: props.buttonColor
            }"
        >
            {{ day }}
        </button>
    </div>
</template>

<script setup>
    const props = defineProps({
        days: Array,
        mealPlanId: String,
        buttonColor: String,
        activeColor: String
    });

    const selected = defineModel("selected");

    function isSelected(day) {
        const planDays = selected.value[props.mealPlanId];
        return planDays.includes(day);
    }

    function toggleDay(day) {
        const planDays = selected.value[props.mealPlanId];

        if (isSelected(day)) {
            const index = planDays.indexOf(day);
            planDays.splice(index, 1);
        } else {
            planDays.push(day);
        }
    }
</script>

<style scoped>
    .day_selector {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: clamp(0.2rem, 0.5vh, 0.5rem);
    }

    .day_selector button {
        padding: 0.5rem 1rem;
        border: 2px solid;
        background-color: transparent;
        font-weight: 600;
        border-radius: 20px;
        cursor: pointer;
        transition: background 0.2s;
        font-size: clamp(1rem, 2.3vw, 2rem);
    }

    .day_selector button.active {
        color: white;
    }

    @media (min-width: 1024px) {
        .day_selector button {
            font-size: clamp(1rem, 1.2rem, 1.5rem);
        }
    }
</style>
