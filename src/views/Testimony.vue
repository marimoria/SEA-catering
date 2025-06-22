<template>
    <div class="testimonials">
        <div class="background"></div>
        <img v-if="viewport.w >= 1024" src="../assets/images/fork.svg" alt="" class="fork" />
        <img v-if="viewport.w >= 1024" src="../assets/images/spoon.svg" alt="" class="spoon" />

        <navBar />
        <div class="testimonials--view_grid">
            <div class="cards_grid">
                <p class="cards_grid--title">
                    What Do <span class="highlight_basil">They</span> Think?
                </p>
                <p class="cards_grid--desc">
                    Dozens of people have trusted SEA Catering for their daily curated meals packed
                    with flavor, nutrients, and love. Your feedback helps us to create a more
                    reliable, safe, and consistent service!
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
                                <rating
                                    id="rating_read"
                                    :max-rating="5"
                                    :rating="3"
                                    :canRate="false"
                                />
                                <p class="card_content--desc">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                                    commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                                    penatibus et magnis dis parturient montes, nascetur ridiculus
                                    mus.
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

            <div class="testi_forms">
                <p class="testi_forms--title">
                    What Do <span class="highlight_basil">You</span> Think?
                </p>
                <p class="testi_forms--desc">
                    Help us create a more satisfying meal and experience here at SEA Catering!
                </p>

                <div class="testi_forms--forms_area">
                    <div class="input_area">
                        <p class="forms_area--name_title">Your name</p>
                        <input
                            id="input_name"
                            class="input--name"
                            type="text"
                            v-model="reviewName"
                            placeholder="Username"
                            maxlength="17"
                        />
                    </div>

                    <div class="input_area">
                        <p class="forms_area--star_review">Your rating</p>
                        <rating
                            id="rating_form"
                            :max-rating="5"
                            v-model:rating="reviewStars"
                            :canRate="true"
                        />
                    </div>

                    <div class="input_area">
                        <p class="forms_area--summary_review">Your Experience Summary</p>
                        <input
                            id="input_summary"
                            class="input--summary"
                            type="text"
                            v-model="reviewSummary"
                            placeholder="Summary"
                            maxlength="20"
                        />
                    </div>

                    <div class="input_area">
                        <p class="forms_area--message_review">Your Message</p>
                        <textarea
                            id="input_message"
                            class="input--message"
                            v-model="reviewMessage"
                            placeholder="Message"
                            maxlength="200"
                        ></textarea>
                    </div>
                </div>
            </div>

            <button class="submit_button" @click="sendReviewData">Submit Review</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @use "../assets/styles/testimony.scss";
</style>

<script setup>
    import { ref } from "vue";
    import navBar from "../components/Navbar.vue";
    import rating from "../components/Rating.vue";

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

    const reviewName = ref("");
    const reviewStars = ref(0);
    const reviewSummary = ref("");
    const reviewMessage = ref("");

    function sendReviewData() {
        // connect with supabase & do checks
        console.log(reviewName.value, reviewStars.value, reviewSummary.value, reviewMessage.value);
    }
</script>
