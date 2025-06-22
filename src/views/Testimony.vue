<template>
    <div class="testimonials">
        <div class="background"></div>
        <img v-if="viewport.w >= 1024" src="../assets/images/fork.svg" alt="" class="fork" />
        <img v-if="viewport.w >= 1024" src="../assets/images/spoon.svg" alt="" class="spoon" />

        <navBar />
        <div class="testimonials--view_grid">
            <div class="cards_grid">
                <p class="cards_grid--title">
                    What Do <span class="highlight_basil">You</span> Think?
                </p>
                <div class="cards_grid--testimony_wrapper">
                    <button @click="scrollPrev" class="prev_button"><</button>
                    <div class="cards_grid--cards_carousel">
                        <div class="cards_carousel--cards">
                            <img
                                src="../assets/images/quotes.svg"
                                alt=""
                                class="card_content--quotes"
                            />
                            <div class="card_content">
                                <p :style="{ color: getRandomColor() }" class="card_content--title">
                                    Good App!
                                </p>
                                <p class="card_content--desc">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <p :style="{ color: getRandomColor() }" class="card_content--user">
                                    - Marimoria
                                </p>
                            </div>
                            <img
                                src="../assets/images/quotes.svg"
                                alt=""
                                class="card_content--quotes"
                            />
                        </div>
                        <div class="cards_carousel--cards"></div>
                        <div class="cards_carousel--cards"></div>
                        <div class="cards_carousel--cards"></div>
                    </div>
                    <button @click="scrollNext" class="next_button">></button>
                </div>
            </div>
            <div class="testi_forms"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @use "../assets/styles/testimony.scss";
</style>

<script setup>
    import navBar from "../components/Navbar.vue";
    import { gsap } from "../js/vendor";

    const props = defineProps({
        viewport: Object,
        device: Object
    });

    const accentColors = ["#d54f22", "#4f9447", "#847ddd"];

    function getRandomColor() {
        return accentColors[Math.floor(Math.random() * 3)];
    }

    function getDistance() {
        const cards = document.querySelectorAll(".cards_carousel--cards");
        const carousel = document.querySelector(".cards_grid--cards_carousel");

        const cardWidth = cards[0].offsetWidth;
        const gap = parseFloat(getComputedStyle(carousel).fontSize);

        return cardWidth + gap;
    }

    function scrollNext() {
        const distance = getDistance();
        const carousel = document.querySelector(".cards_grid--cards_carousel");

        gsap.to(carousel, {
            scrollTo: { x: carousel.scrollLeft + distance },
            duration: 0.5,
            ease: "power2.out"
        });
    }

    function scrollPrev() {
        const distance = getDistance();
        const carousel = document.querySelector(".cards_grid--cards_carousel");

        gsap.to(carousel, {
            scrollTo: { x: carousel.scrollLeft - distance },
            duration: 0.5,
            ease: "power2.out"
        });
    }
</script>
