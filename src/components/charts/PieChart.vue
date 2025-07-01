<template>
    <Pie :options="chartOptions" :data="chartData" />
</template>

<script setup>
    import { Pie } from "vue-chartjs";
    import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

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

    ChartJS.register(Title, Tooltip, Legend, ArcElement);
</script>
