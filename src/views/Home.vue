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
                        <span class="greeting_area--greet_text--second">Right at Your Door!</span>
                    </p>
                    <p class="greeting_area--slogan">Healthy Meals, Anytime, Anywhere</p>
                </div>
                <div class="hero_area--features_area"></div>
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

    onMounted(() => {});
</script>
