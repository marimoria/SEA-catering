<template>
    <div class="dashboard">
        <div class="background"></div>
        <Navbar />

        <div class="dashboard_grid">
            <div class="dashboard_header">
                <p class="dashboard_header--greet">Hello there, {{ profile.username }}!</p>
                <p class="dashboard_header--desc">
                    <span class="typing_text" id="animatedText"></span>
                    <span class="cursor">|</span>
                </p>
            </div>

            <div class="dashboard_content">
                <DashboardNav :tabs="['Subscriptions', 'Settings']">
                    <template #Subscriptions>
                        <div class="subscription_area">
                            <div class="subscription_area--title">
                                <h1>My Subscriptions</h1>
                            </div>

                            <SubscriptionCard
                                v-for="(sub, i) in subscriptions"
                                :key="i"
                                v-model:subscription="subscriptions[i]"
                                :title="'Subscription ' + (i + 1)"
                                :index="i"
                            />
                        </div>
                    </template>

                    <template #Settings>
                        <div class="settings_area">
                            <h1>Account Settings</h1>
                        </div>
                    </template>
                </DashboardNav>
            </div>
        </div>

        <!-- Parallax Images -->
        <img
            class="parallax hero_image"
            src="/images/protein_hero.webp"
            data-speedx="0.03"
            data-speedy="0.03"
            alt=""
        />
        <img
            class="parallax hero_image"
            src="/images/veggies_hero.webp"
            data-speedx="0.05"
            data-speedy="0.05"
            alt=""
        />
        <img
            class="parallax hero_image"
            src="/images/fruits_hero.webp"
            data-speedx="0.07"
            data-speedy="0.07"
            alt=""
        />
    </div>
</template>

<style lang="scss" scoped>
    @use "../assets/styles/dashboard.scss";
</style>

<script setup>
    import { onMounted, ref } from "vue";
    import { user, profile } from "../components/composables/useAuth";
    import { getData } from "../components/composables/useSupabase";
    import { gsap } from "../js/vendor";
    import { useParallax } from "../components/composables/useParallax";

    import Navbar from "../components/Navbar.vue";
    import SubscriptionCard from "../components/SubscriptionCard.vue";
    import DashboardNav from "../components/DashboardNav.vue";

    const props = defineProps({
        viewport: Object,
        device: Object
    });

    const subscriptions = ref([]);
    const hasSubscriptions = ref(false);

    async function loadSubscriptions() {
        // Get subscriptions
        const { data: subsData, error: subsError } = await getData("subscriptions", {
            user_id: user.value.id
        });

        if (subsError) {
            console.error("Error loading subscriptions:", subsError);
            return;
        }

        if (!subsData || subsData.length === 0) {
            hasSubscriptions.value = true;
            return;
        }

        const subIds = subsData.map((sub) => sub.id);

        // Get all subscription items
        const { data: itemsData, error: itemsError } = await getData("subscription_items", {});

        if (itemsError) {
            console.error("Error loading subscription items:", itemsError);
            return;
        }

        // Only keep item that matches subscription id
        const filteredItems = itemsData.filter((item) => subIds.includes(item.subscription_id));

        // One by one attach to each subscription object
        subscriptions.value = subsData.map((sub) => {
            const relatedItems = filteredItems.filter((item) => item.subscription_id === sub.id);
            return {
                id: sub.id,
                user_id: sub.user_id,
                status: sub.status,
                price: sub.total_price,
                pause_start: sub.pause_start,
                pause_end: sub.pause_end,
                created_at: sub.created_at,
                items: relatedItems.map((item) => ({
                    meal_plan_id: item.meal_plan_id,
                    meal_types: item.meal_types,
                    delivery_days: item.delivery_days
                }))
            };
        });
    }

    onMounted(async () => {
        await loadSubscriptions();

        const parallaxEls = document.querySelectorAll(".parallax");
        parallaxEls.forEach((el) => useParallax(el));

        const descWords = [
            "Ready for another nutritious day?",
            "What are we eating today?",
            "Tackle the day with an energetic spirit!"
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

        for (let i = 0; i < descWords.length; i++) {
            const word = descWords[i];

            typewriterTl
                .call(() => switchImage(i))
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
