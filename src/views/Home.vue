<template>
    <section class="home">
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
                </div>
                <div class="hero_area--features_area">
                    <div class="features_area--menu_grid">
                        <div id="menu_card_1" class="menu_card">
                            <div class="menu_card--img">1</div>
                            <div class="menu_card--info">
                                <p class="info--name">Meal Customization</p>
                                <p class="info--desc">
                                    We allow users to pick their own meal plan.
                                </p>
                            </div>
                        </div>
                        <div id="menu_card_2" class="menu_card">
                            <div class="menu_card--img">2</div>
                            <div class="menu_card--info">
                                <p class="info--name">Speedy Deliveries</p>
                                <p class="info--desc">Reliable delivery everywhere.</p>
                            </div>
                        </div>
                        <div id="menu_card_3" class="menu_card">
                            <div class="menu_card--img">3</div>
                            <div class="menu_card--info">
                                <p class="info--name">Detailed Nutrition</p>
                                <p class="info--desc">We prioritize our user's health.</p>
                            </div>
                        </div>
                        <div id="menu_card_4" class="menu_card">
                            <div class="menu_card--img">4</div>
                            <div class="menu_card--info">
                                <p class="info--name">Budget Friendly</p>
                                <p class="info--desc">And their wallets!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
    @use "../assets/styles/home.scss";
</style>

<script setup>
    import navBar from "../components/Navbar.vue";
    import { onMounted } from "vue";
    import { gsap } from "../js/vendor.js";

    onMounted(() => {
        const textRef = "#animatedText";

        const wordsObject = [
            { word: "protein", color: "--color-sunset-orange" },
            { word: "veggies", color: "--color-fresh-basil" },
            { word: "fruits", color: "--color-pink" }
        ];

        const typewriterTl = gsap.timeline({ repeat: -1 });

        for (let i = 0; i < wordsObject.length; i++) {
            const { word, color } = wordsObject[i];

            typewriterTl
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
