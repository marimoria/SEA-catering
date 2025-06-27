<template>
    <div class="testimonials">
        <div class="background"></div>
        <img v-if="viewport.w >= 1024" src="/images/fork.svg" alt="" class="fork" />
        <img v-if="viewport.w >= 1024" src="/images/spoon.svg" alt="" class="spoon" />

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

                    <div
                        class="cards_grid--cards_carousel"
                        :class="{
                            center_carousel: testimonies.length === 0 || testimonies.length === 1
                        }"
                    >
                        <div v-if="testimonies.length === 0" class="cards_carousel--cards">
                            <div class="card_content">
                                <p :style="{ color: getRandomColor() }" class="card_content--title">
                                    Be the First!
                                </p>
                                <p class="card_content--desc">
                                    Submit your review using the form below. Help us create a better
                                    service for all.
                                </p>
                                <p :style="{ color: getRandomColor() }" class="card_content--user">
                                    - SEA Catering Team
                                </p>
                            </div>
                        </div>

                        <div
                            v-for="(t, i) in testimonies"
                            :key="t.id"
                            class="cards_carousel--cards"
                        >
                            <img src="/images/quotes.svg" alt="" class="card_content--quotes" />
                            <div class="card_content">
                                <p :style="{ color: getRandomColor() }" class="card_content--title">
                                    {{ t.summary }}
                                </p>
                                <rating
                                    id="rating_read"
                                    :max-rating="5"
                                    :rating="t.rating"
                                    :canRate="false"
                                />
                                <p class="card_content--desc">{{ t.review_message }}</p>
                                <p :style="{ color: getRandomColor() }" class="card_content--user">
                                    - {{ t.username || "Anonymous" }}
                                </p>
                            </div>
                            <img src="/images/quotes.svg" alt="" class="card_content--quotes" />
                        </div>
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

                <form class="testi_forms--forms_area" @submit.prevent="sendReviewData">
                    <div class="input_area">
                        <p class="forms_area--name_title">Your name</p>
                        <input
                            id="input_name"
                            class="input--name"
                            type="text"
                            v-model="reviewName"
                            placeholder="Username"
                            maxlength="20"
                            required
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
                            required
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
                            required
                        ></textarea>
                    </div>

                    <button :disabled="isLoading" class="submit_button" type="submit">
                        {{ isLoading ? "Submitting..." : "Submit Review" }}
                    </button>

                    <LoadingSpinner v-if="isLoading" />

                    <p v-if="errorMessage" class="error_message">❌ {{ errorMessage }}</p>
                    <p v-if="successMessage" class="success_message">✅ {{ successMessage }}</p>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @use "../assets/styles/testimony.scss";
</style>

<script setup>
    import { computed, onMounted, ref } from "vue";
    import navBar from "../components/Navbar.vue";
    import rating from "../components/Rating.vue";
    import LoadingSpinner from "../components/LoadingSpinner.vue";
    import { user, profile } from "../components/composables/useAuth";
    import { getData, insertData } from "../components/composables/useSupabase";

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
    const reviewStars = ref(1);
    const reviewSummary = ref("");
    const reviewMessage = ref("");

    const errorMessage = ref("");
    const successMessage = ref("");
    const isLoading = ref(false);

    async function sendReviewData() {
        const userLogged = computed(() => !!user.value);
        isLoading.value = true;

        if (!userLogged.value) {
            isLoading.value = false;
            errorMessage.value = "You must sign up or login!";
            return;
        }

        if (reviewName.value !== profile.value.username) {
            isLoading.value = false;
            errorMessage.value = "That's not your username!";
            return;
        }

        const { data: existingTestimonial } = await getData("testimonies", {
            user_id: user.value.id
        });

        if (existingTestimonial.length > 0) {
            isLoading.value = false;
            errorMessage.value = "You've already submitted a review!";
            return;
        }

        if (
            reviewSummary.value.length > 20 ||
            reviewMessage.value.length > 200 ||
            reviewStars.value < 1 ||
            reviewStars.value > 5
        ) {
            isLoading.value = false;
            errorMessage.value = "Invalid input. Please check all fields.";
            return;
        }

        const response = await insertData("testimonies", {
            user_id: user.value.id,
            username: profile.value.username,
            summary: reviewSummary.value.trim(),
            rating: reviewStars.value,
            review_message: reviewMessage.value.trim()
        });

        if (!!response.error) {
            isLoading.value = false;
            errorMessage.value = "Something went wrong, please contact Administration.";
        } else {
            isLoading.value = false;
            successMessage.value = "Review submitted successfully!";

            reviewSummary.value = "";
            reviewMessage.value = "";
            reviewStars.value = 1;
            reviewName.value = "";

            loadCards();
        }
    }

    const testimonies = ref([]);

    async function loadCards() {
        const { data: testimonyData } = await getData(
            "testimonies",
            {},
            {
                select: `
                testimony_id,
                summary,
                rating,
                review_message,
                created_at,
                username
            `,
                orderBy: { column: "created_at", ascending: false }
            }
        );

        testimonies.value = (testimonyData || []).map((t) => ({
            id: t.testimony_id,
            summary: t.summary,
            rating: t.rating,
            review_message: t.review_message,
            created_at: t.created_at,
            username: t.username || "Anonymous"
        }));
    }

    onMounted(() => {
        if (profile.value && profile.value.username) {
            reviewName.value = profile.value.username;
        }

        loadCards();
    });
</script>
