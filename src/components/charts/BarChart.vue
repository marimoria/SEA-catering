<template>
    <Bar :options="chartOptions" :data="chartData" />
</template>

<script setup>
    import { Bar } from "vue-chartjs";
    import {
        Chart as ChartJS,
        BarElement,
        CategoryScale,
        LinearScale,
        Title,
        Tooltip,
        Legend
    } from "chart.js";

    const props = defineProps({
        chartData: {
            type: Object,
            required: true
        },
        chartOptions: {
            type: Object,
            required: false,
            default: () => ({})
        }
    });

    ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
</script>
