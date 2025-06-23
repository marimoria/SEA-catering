<template>
    <div class="contact">
        <Navbar />
        <p class="title">Let's Get in Contact!</p>
        <img
            id="hero_image_1"
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax hero_image"
            src="../assets/images/protein_hero.svg"
            alt=""
        />
        <img
            id="hero_image_2"
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax hero_image"
            src="../assets/images/veggies_hero.svg"
            alt=""
        />
        <img
            id="hero_image_3"
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax hero_image"
            src="../assets/images/fruits_hero.svg"
            alt=""
        />
    </div>
</template>

<style scoped lang="scss">
    @use "../assets/styles/contact.scss";
</style>

<script setup>
    import Navbar from "../components/Navbar.vue";

    import { onMounted } from "vue";
    import { gsap } from "../js/vendor.js";
    import { useParallax } from "../components/composables/useParallax";

    let currentIndex = 0;

    function switchImage(nextIndex) {
        const heroImages = Array.from(document.querySelectorAll(".hero_image"));
        const current = heroImages[currentIndex];
        const next = heroImages[nextIndex];

        gsap.to(current, {
            rotation: 360,
            opacity: 0,
            duration: 2,
            ease: "power1.inOut",
            onComplete: () => {
                current.classList.remove("active");
                gsap.set(current, { rotation: 0 });
            }
        });

        gsap.to(next, {
            rotation: 360,
            opacity: 1,
            duration: 2,
            ease: "power1.inOut",
            onStart: () => next.classList.add("active")
        });

        currentIndex = nextIndex;
    }

    onMounted(() => {
        const heroImages = Array.from(document.querySelectorAll(".hero_image"));

        heroImages[0].classList.add("active");
        gsap.set(heroImages[0], { opacity: 1 });

        const spinningTl = gsap.timeline({ repeat: -1 });

        for (let i = 0; i < heroImages.length; i++) {
            spinningTl.add(() => {
                const nextIndex = (currentIndex + 1) % heroImages.length;
                switchImage(nextIndex);
            }, `+=2.5`);
        }

        const parallaxEls = document.querySelectorAll(".parallax");
        parallaxEls.forEach((el) => useParallax(el));
    });
</script>
