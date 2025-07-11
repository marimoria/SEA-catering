<template>
    <main class="meal_plan">
        <div class="background"></div>
        <navBar />

        <div
            v-for="(plan, index) in plans"
            :key="plan.id"
            :class="['meal_plan_panel', 'plan-' + plan.title.toLowerCase()]"
        >
            <img
                v-if="viewport.w >= 1024"
                :src="getImageUrl(`${utensils[index % utensils.length]}.svg`)"
                :class="utensils[index % utensils.length]"
            />

            <div class="meal_plan_panel--meal_plan_hero">
                <div
                    class="meal_plan_hero--banner"
                    :style="`background: linear-gradient(135deg, ${plan.colors.dark}, ${plan.colors.medium}, ${plan.colors.light})`"
                ></div>
                <img
                    data-speedx="0.02"
                    data-speedy="0.03"
                    :src="getImageUrl(plan.hero_image)"
                    :alt="`${plan.title} hero image`"
                    class="parallax meal_plan_hero--image"
                />
            </div>

            <div class="meal_plan_panel--meal_plan_info">
                <p class="meal_plan_info--title">
                    <span :class="`highlight_${plan.title.toLowerCase()}`">
                        {{ capitalize(plan.title) }}
                    </span>
                    Meal Plan
                </p>

                <p class="meal_plan_info--desc">
                    {{ plan.desc_short }}
                </p>

                <router-link to="/subscription">
                    <p
                        class="button meal_plan_info--price"
                        :style="`border-color: ${plan.colors.medium}`"
                    >
                        <span class="bigger_size" :class="`highlight_${plan.title.toLowerCase()}`">
                            Rp{{ parseInt(plan.price).toLocaleString("id-ID") }},00
                        </span>
                        /meal
                    </p>
                </router-link>

                <mealTypeNav
                    class="meal_nav"
                    :tabs="['Breakfast', 'Lunch', 'Dinner']"
                    :button-color="plan.colors.medium"
                    :active-color="plan.colors.light"
                >
                    <template #Breakfast>
                        <div class="meals_recipe_wrap">
                            <div
                                class="meals_recipe_wrap--recipe"
                                v-for="(r, i) in plan.recipes.breakfast"
                                :key="`${plan.title.toLowerCase()}-breakfast-${i}`"
                                :style="`background: linear-gradient(180deg, rgb(255, 249, 244) 0%, rgb(255, 249, 244) 45%, ${hexToRgba(plan.colors.light, 0.5)} 99%, ${hexToRgba(plan.colors.medium, 0.6)} 100%); border-color: ${plan.colors.dark}`"
                            >
                                <img :src="getImageUrl(r.image)" class="recipe--image" />
                                <p class="recipe--name" :style="`color: ${plan.colors.medium}`">
                                    {{ r.name }}
                                </p>
                                <p class="recipe--desc">{{ r.description }}</p>
                            </div>
                        </div>
                    </template>

                    <template #Lunch>
                        <div class="meals_recipe_wrap">
                            <div
                                class="meals_recipe_wrap--recipe"
                                v-for="(r, i) in plan.recipes.lunch"
                                :key="`${plan.title.toLowerCase()}-lunch-${i}`"
                                :style="`background: linear-gradient(180deg, rgb(255, 249, 244) 0%, rgb(255, 249, 244) 45%, ${hexToRgba(plan.colors.light, 0.5)} 99%, ${hexToRgba(plan.colors.medium, 0.6)} 100%); border-color: ${plan.colors.dark}`"
                            >
                                <img :src="getImageUrl(r.image)" class="recipe--image" />
                                <p class="recipe--name" :style="`color: ${plan.colors.medium}`">
                                    {{ r.name }}
                                </p>
                                <p class="recipe--desc">{{ r.description }}</p>
                            </div>
                        </div>
                    </template>

                    <template #Dinner>
                        <div class="meals_recipe_wrap">
                            <div
                                class="meals_recipe_wrap--recipe"
                                v-for="(r, i) in plan.recipes.dinner"
                                :key="`${plan.title.toLowerCase()}-dinner-${i}`"
                                :style="`background: linear-gradient(180deg, rgb(255, 249, 244) 0%, rgb(255, 249, 244) 45%, ${hexToRgba(plan.colors.light, 0.5)} 99%, ${hexToRgba(plan.colors.medium, 0.6)} 100%); border-color: ${plan.colors.dark}`"
                            >
                                <img :src="getImageUrl(r.image)" class="recipe--image" />
                                <p class="recipe--name" :style="`color: ${plan.colors.medium}`">
                                    {{ r.name }}
                                </p>
                                <p class="recipe--desc">{{ r.description }}</p>
                            </div>
                        </div>
                    </template>
                </mealTypeNav>

                <p
                    @click="popupStates[plan.title.toLowerCase()] = true"
                    class="button meal_plan_info--details"
                    :style="`border-color: ${plan.colors.medium}`"
                >
                    See more
                    <span :class="`highlight_${plan.title.toLowerCase()}`">details</span>
                </p>

                <mealPlanPopup
                    :visible="popupStates[plan.title.toLowerCase()]"
                    @close="popupStates[plan.title.toLowerCase()] = false"
                    :name="capitalize(plan.title) + ' Meal Plan'"
                    :desc="plan.desc_long"
                    :benefits="plan.popup_benefits"
                    :nutrition="plan.popup_nutrition"
                    :darkColor="plan.colors.dark"
                    :medColor="plan.colors.medium"
                    :lightColor="plan.colors.light"
                />
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss">
    @use "../assets/styles/mealPlan.scss";
</style>

<script setup>
    import { ref, onMounted, nextTick } from "vue";
    import { getData, getImageUrl } from "../components/composables/useSupabase";
    import { useParallax } from "../components/composables/useParallax";

    import navBar from "../components/Navbar.vue";
    import mealTypeNav from "../components/MealTypeNavbar.vue";
    import mealPlanPopup from "../components/MealPlanPopup.vue";

    const props = defineProps({
        viewport: Object,
        device: Object
    });

    const utensils = ["fork", "spoon", "knife"];
    const plans = ref([]);
    const popupStates = ref({});

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function hexToRgba(hex, alpha = 1) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function parallaxInit() {
        const elements = document.querySelectorAll(".parallax");
        elements.forEach((el) => useParallax(el));
    }

    async function loadMealPlansAndRecipes() {
        try {
            const { data: plansData, error } = await getData(
                "meal_plans",
                {},
                { select: `*, recipes (meal_type, name, description, image, order_index)` }
            );

            console.log(plansData);

            if (error) {
                console.error("Failed to load meal plans:", error.message);
                return;
            }

            // For each plan, separate their recipes into 3 groups
            plans.value = (plansData || []).map((plan) => {
                const grouped = {
                    breakfast: [],
                    lunch: [],
                    dinner: []
                };

                for (const recipe of plan.recipes) {
                    grouped[recipe.meal_type].push(recipe);
                }

                return {
                    ...plan,
                    recipes: grouped
                };
            });

            popupStates.value = Object.fromEntries(
                plans.value.map((plan) => [plan.title.toLowerCase(), false])
            );

            nextTick(() => {
                parallaxInit();
            });
        } catch (err) {
            console.error("Unexpected error:", err.message);
        }
    }

    onMounted(() => {
        loadMealPlansAndRecipes();
    });
</script>
