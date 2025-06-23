<template>
    <div class="subscription">
        <div class="background"></div>
        <Navbar />
        <div class="subscription_form">
            <div class="subscription_form--plan">
                <p class="plan--title">Meal Plan</p>
                <p class="plan--desc">Please choose at least one of these meal plan.</p>
                <div class="plan_wrap">
                    <div class="choice_wrap">
                        <div @click="choosePlan($event)" id="recipe_diet" class="plan_wrap--recipe">
                            <img
                                src="../assets/images/veggies_hero.svg"
                                alt=""
                                class="recipe--image"
                            />
                            <p class="recipe--name">Diet Plan</p>
                            <p id="price_diet" class="recipe--price">
                                <span class="bigger_size highlight_basil">Rp30.000,00</span> /meal
                            </p>
                            <p class="recipe--desc">
                                Nourish your body with low-calorie, high-nutrient meals to support
                                weight management. Each dish is balanced for portion control without
                                sacrificing flavor.
                            </p>
                        </div>
                        <p
                            :class="{ hidden_opacity: !chosenPlans.includes('recipe_diet') }"
                            class="selected_message"
                        >
                            ✅ Plan selected
                        </p>
                    </div>

                    <div class="choice_wrap">
                        <div
                            @click="choosePlan($event)"
                            id="recipe_protein"
                            class="plan_wrap--recipe"
                        >
                            <img
                                src="../assets/images/protein_hero.svg"
                                alt=""
                                class="recipe--image"
                            />
                            <p class="recipe--name">Protein Plan</p>
                            <p id="price_protein" class="recipe--price">
                                <span class="bigger_size highlight_paprika">Rp40.000,00</span> /meal
                            </p>
                            <p class="recipe--desc">
                                Power up with protein-packed meals made for strength, recovery, and
                                fullness. Perfect for active lifestyles to keep you energized all
                                day.
                            </p>
                        </div>
                        <p
                            :class="{ hidden_opacity: !chosenPlans.includes('recipe_protein') }"
                            class="selected_message"
                        >
                            ✅ Plan selected
                        </p>
                    </div>

                    <div class="choice_wrap">
                        <div
                            @click="choosePlan($event)"
                            id="recipe_royal"
                            class="plan_wrap--recipe"
                        >
                            <img
                                src="../assets/images/fancy_food.svg"
                                alt=""
                                class="recipe--image"
                            />
                            <p class="recipe--name">Royal Plan</p>
                            <p id="price_royal" class="recipe--price">
                                <span class="bigger_size highlight_purple">Rp60.000,00</span> /meal
                            </p>
                            <p class="recipe--desc">
                                An elite culinary experience crafted with the world's most exquisite
                                ingredients. Each meal is designed for indulgence, balance, and
                                unforgettable taste
                            </p>
                        </div>
                        <p
                            :class="{ hidden_opacity: !chosenPlans.includes('recipe_royal') }"
                            class="selected_message"
                        >
                            ✅ Plan selected
                        </p>
                    </div>
                </div>
            </div>

            <div class="subscription_form--meal_type">
                <p class="type--title">Meal Type</p>
                <p class="type--desc">
                    Please choose at least one of these meal types for each of your chosen plan.
                </p>

                <div class="type_options">
                    <div v-if="chosenPlans.includes('recipe_diet')" class="diet_type">
                        <p class="diet_type--title">
                            <span class="highlight_basil">Diet</span> Plan
                        </p>
                        <MealSelector
                            class="meal_nav"
                            v-model:selected="chosenTypes"
                            :types="['Breakfast', 'Lunch', 'Dinner']"
                            :mealPlan="'dietTypes'"
                            :buttonColor="'#4f9447'"
                            :activeColor="'#8ebe3f'"
                        >
                        </MealSelector>
                    </div>

                    <div v-if="chosenPlans.includes('recipe_protein')" class="protein_type">
                        <p class="protein_type--title">
                            <span class="highlight_paprika">Protein</span> Plan
                        </p>
                        <MealSelector
                            class="meal_nav"
                            v-model:selected="chosenTypes"
                            :types="['Breakfast', 'Lunch', 'Dinner']"
                            :mealPlan="'proteinTypes'"
                            :button-color="'#d54f22'"
                            :active-color="'#ec7b55'"
                        >
                        </MealSelector>
                    </div>

                    <div v-if="chosenPlans.includes('recipe_royal')" class="royal_type">
                        <p class="royal_type--title">
                            <span class="highlight_purple">Royal</span> Plan
                        </p>
                        <MealSelector
                            class="meal_nav"
                            v-model:selected="chosenTypes"
                            :types="['Breakfast', 'Lunch', 'Dinner']"
                            :mealPlan="'royalTypes'"
                            :button-color="'#847ddd'"
                            :active-color="'#a5a0e8'"
                        >
                        </MealSelector>
                    </div>
                </div>
            </div>

            <div class="subscription_form--delivery_days"></div>
            <div class="subscription_form--user_data"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @use "../assets/styles/subscription.scss";
</style>

<script setup>
    import { ref } from "vue";
    import Navbar from "../components/Navbar.vue";
    import MealSelector from "../components/MealSelector.vue";

    const props = defineProps({
        viewport: Object,
        device: Object
    });

    const chosenPlans = ref([]);
    const chosenTypes = ref({
        dietTypes: [],
        proteinTypes: [],
        royalTypes: []
    });

    function choosePlan(event) {
        const recipeCard = event.target.closest(".plan_wrap--recipe");

        if (!recipeCard) {
            return;
        }

        if (chosenPlans.value.includes(recipeCard.id)) {
            const index = chosenPlans.value.indexOf(recipeCard.id);
            chosenPlans.value.splice(index, 1);
        } else {
            chosenPlans.value.push(recipeCard.id);
        }
    }
</script>
