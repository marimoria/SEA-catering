<template>
    <Pie :options="chartOptions" :data="chartData" />
</template>

<script setup>
    import { Pie } from "vue-chartjs";

    defineProps({
        chartData: Object,
        chartOptions: Object
    });
</script>
