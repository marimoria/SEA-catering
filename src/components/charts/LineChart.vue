<template>
    <Line :options="chartOptions" :data="chartData" />
</template>

<script setup>
    import { Line } from "vue-chartjs";
    import {
        Chart as ChartJS,
        LineElement,
        PointElement,
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

    ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
</script>
