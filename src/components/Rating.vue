<template>
    <div class="rating">
        <img
            v-for="index in maxRating"
            :key="index"
            :src="index <= rating ? starFilled : starEmpty"
            class="stars"
        />
    </div>
</template>

<script setup>
    import starFilled from "../assets/images/star_filled.svg";
    import starEmpty from "../assets/images/star_empty.svg";

    const props = defineProps({
        rating: Number,
        maxRating: Number
    });
</script>

<style scoped>
    .rating {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 5px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .stars {
        width: 2em;
        height: auto;
    }
</style>
