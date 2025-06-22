<template>
    <div class="rating">
        <img
            v-for="index in maxRating"
            :key="index"
            :src="index <= rating ? starFilled : starEmpty"
            @click="canRate ? changeRating(index) : null"
            :id="index"
            class="stars"
        />
    </div>
</template>

<script setup>
    import starFilled from "../assets/images/star_filled.svg";
    import starEmpty from "../assets/images/star_empty.svg";

    const props = defineProps({
        maxRating: Number,
        canRate: Boolean
    });

    const rating = defineModel("rating"); // binded prop called rating to a reactive element in parent

    function changeRating(index) {
        if (!props.canRate) {
            return;
        }
        rating.value = index;
    }
</script>

<style scoped>
    .rating {
        display: flex;
        flex-direction: row;
        gap: 5px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .stars {
        width: 2em;
        height: auto;
    }
</style>
