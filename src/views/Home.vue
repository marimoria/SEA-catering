<template>
    <section class="background">
        <navBar />
        <div class="main_grid">
            <div class="main_grid--hero_area">
                <div class="hero_area--greeting_area">
                    <p class="greeting_area--greet_text">
                        Your favorite <span class="typing_text" id="animatedText"></span>
                        <span class="cursor" style="color: black">|</span>
                        <br />
                        <span class="greeting_area--greet_text--second">right at your door!</span>
                    </p>
                    <p class="greeting_area--slogan">Healthy Meals, Anytime, Anywhere</p>
                    <p class="greeting_area--intro">
                        SEA Catering delivers your healthy & customizable meal plans fresh to your
                        doorstep, anywhere in Indonesia.
                    </p>
                    <div class="greeting_area--contact">
                        <p class="greeting_area--contact--text">Brian | 123456789</p>
                    </div>
                </div>
                <div class="hero_area--features_area">
                    <div class="features_area--feature_grid">
                        <div id="feature_card_1" class="feature_card">
                            <div class="feature_card--img">1</div>
                            <div class="feature_card--info">
                                <p class="info--name">Meal Customization</p>
                                <p class="info--desc">
                                    We allow users to pick their own meal plan.
                                </p>
                            </div>
                        </div>
                        <div id="feature_card_2" class="feature_card">
                            <div class="feature_card--img">2</div>
                            <div class="feature_card--info">
                                <p class="info--name">Speedy Deliveries</p>
                                <p class="info--desc">Reliable delivery wherever you are.</p>
                            </div>
                        </div>
                        <div id="feature_card_3" class="feature_card">
                            <div class="feature_card--img">3</div>
                            <div class="feature_card--info">
                                <p class="info--name">Detailed Nutrition</p>
                                <p class="info--desc">
                                    We prioritize our user's health, satisfaction, and belly.
                                </p>
                            </div>
                        </div>
                        <div id="feature_card_4" class="feature_card">
                            <div class="feature_card--img">4</div>
                            <div class="feature_card--info">
                                <p class="info--name">Budget Friendly</p>
                                <p class="info--desc">Affordable healthy meal for everyone!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <img
            id="hero_image_1"
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax hero_image"
            src="/images/protein_hero.svg"
            alt=""
        />
        <img
            id="hero_image_2"
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax hero_image"
            src="/images/veggies_hero.svg"
            alt=""
        />
        <img
            id="hero_image_3"
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax hero_image"
            src="/images/fruits_hero.svg"
            alt=""
        />
    </section>
</template>

<style scoped lang="scss">
    @use "../assets/styles/home.scss";
</style>

<script setup>
    import navBar from "../components/Navbar.vue";

    import { onMounted } from "vue";
    import { gsap } from "../js/vendor.js";
    import { useParallax } from "../components/composables/useParallax";

    const props = defineProps({
        viewport: Object,
        device: Object
    });

    onMounted(() => {
        const parallaxEls = document.querySelectorAll(".parallax");
        parallaxEls.forEach((el) => useParallax(el));

        const wordsObject = [
            {
                word: "protein",
                color: "--color-sunset-orange"
            },
            {
                word: "veggies",
                color: "--color-fresh-basil"
            },
            {
                word: "fruits",
                color: "--color-pink"
            }
        ];

        const heroImages = Array.from(document.querySelectorAll(".hero_image"));
        let currentIndex = 0;

        function switchImage(nextIndex) {
            const current = heroImages[currentIndex];
            const next = heroImages[nextIndex];

            gsap.to(current, {
                rotation: 360,
                opacity: 0,
                duration: 2,
                ease: "power1.in",
                onComplete: () => {
                    current.classList.remove("active");
                    gsap.set(current, { rotation: 0 });
                }
            });

            gsap.to(next, {
                rotation: 360,
                opacity: 1,
                duration: 2,
                ease: "power1.out",
                onStart: () => next.classList.add("active")
            });

            currentIndex = nextIndex;
        }

        const textRef = "#animatedText";
        const typewriterTl = gsap.timeline({ repeat: -1 });

        for (let i = 0; i < wordsObject.length; i++) {
            const { word, color } = wordsObject[i];

            typewriterTl
                .call(() => switchImage(i))
                .set(textRef, {
                    color: "var(" + color + ")"
                })
                .to(textRef, {
                    duration: 1,
                    text: word,
                    ease: "steps(" + word.length + ")"
                })
                .to({}, { duration: 5 })
                .to(textRef, {
                    duration: 0.5,
                    text: "",
                    ease: "steps(" + word.length + ")"
                });
        }
    });
</script>
