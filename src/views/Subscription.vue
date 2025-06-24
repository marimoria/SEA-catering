<template>
    <div class="subscription">
        <div class="background"></div>
        <Navbar />
        <div class="subscription_form">
            <div class="subscription_form--plan">
                <p class="forms--title">Meal Plan<span class="highlight_paprika">*</span></p>
                <p class="forms--desc">Please choose at least one of these meal plan.</p>
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
                            :class="{ hidden_opacity: !chosenPlans.includes('diet') }"
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
                            :class="{ hidden_opacity: !chosenPlans.includes('protein') }"
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
                            :class="{ hidden_opacity: !chosenPlans.includes('royal') }"
                            class="selected_message"
                        >
                            ✅ Plan selected
                        </p>
                    </div>
                </div>
            </div>

            <div v-if="chosenPlans.length !== 0" class="subscription_form--meal_type">
                <p class="forms--title">Meal Type<span class="highlight_paprika">*</span></p>
                <p class="forms--desc">
                    Please choose at least one of these meal types for each of your chosen plan.
                </p>

                <div class="type_options">
                    <div v-if="chosenPlans.includes('diet')" class="diet_type">
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
                        ></MealSelector>
                    </div>

                    <div v-if="chosenPlans.includes('protein')" class="protein_type">
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
                        ></MealSelector>
                    </div>

                    <div v-if="chosenPlans.includes('royal')" class="royal_type">
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
                        ></MealSelector>
                    </div>
                </div>
            </div>

            <div
                v-if="chosenPlans.length !== 0 && typesLength() !== 0"
                class="subscription_form--delivery_days"
            >
                <p class="forms--title">Delivery Days<span class="highlight_paprika">*</span></p>
                <p class="forms--desc">Please choose which days to deliever your food.</p>

                <div class="day_options">
                    <div
                        v-if="chosenPlans.includes('diet') && chosenTypes.dietTypes.length !== 0"
                        class="diet_day"
                    >
                        <p class="diet_day--title">
                            <span class="highlight_basil">Diet</span> Plan
                        </p>
                        <DaySelector
                            class="day_nav"
                            v-model:selected="chosenDays"
                            :days="[
                                'Monday',
                                'Tuesday',
                                'Wednesday',
                                'Thursday',
                                'Friday',
                                'Saturday',
                                'Sunday'
                            ]"
                            :mealPlan="'dietDays'"
                            :buttonColor="'#4f9447'"
                            :activeColor="'#8ebe3f'"
                        ></DaySelector>
                    </div>

                    <div
                        v-if="
                            chosenPlans.includes('protein') && chosenTypes.proteinTypes.length !== 0
                        "
                    >
                        <p class="protein_day--title">
                            <span class="highlight_paprika">Protein</span> Plan
                        </p>
                        <DaySelector
                            class="day_nav"
                            v-model:selected="chosenDays"
                            :days="[
                                'Monday',
                                'Tuesday',
                                'Wednesday',
                                'Thursday',
                                'Friday',
                                'Saturday',
                                'Sunday'
                            ]"
                            :mealPlan="'proteinDays'"
                            :buttonColor="'#d54f22'"
                            :activeColor="'#ec7b55'"
                        ></DaySelector>
                    </div>

                    <div
                        v-if="chosenPlans.includes('royal') && chosenTypes.royalTypes.length !== 0"
                    >
                        <p class="royal_day--title">
                            <span class="highlight_purple">Royal</span> Plan
                        </p>
                        <DaySelector
                            class="day_nav"
                            v-model:selected="chosenDays"
                            :days="[
                                'Monday',
                                'Tuesday',
                                'Wednesday',
                                'Thursday',
                                'Friday',
                                'Saturday',
                                'Sunday'
                            ]"
                            :mealPlan="'royalDays'"
                            :buttonColor="'#847ddd'"
                            :activeColor="'#a5a0e8'"
                        ></DaySelector>
                    </div>
                </div>
            </div>

            <form
                @submit.prevent="sendSubsData"
                v-if="chosenPlans.length !== 0 && typesLength() !== 0 && !isDayEmpty()"
                class="subscription_form--user_data"
            >
                <p class="forms--title">User Data<span class="highlight_paprika">*</span></p>
                <p class="forms--desc">Please enter your information before subscribing.</p>

                <div class="input_area">
                    <p class="forms_area--user_form_title">
                        Your username<span class="highlight_paprika">*</span>
                    </p>
                    <input
                        id="input_name"
                        class="input--name"
                        type="text"
                        v-model="userName"
                        placeholder="Username"
                        maxlength="20"
                        required
                    />
                </div>

                <div class="input_area">
                    <p class="forms_area--user_form_title">
                        Your Full Name<span class="highlight_paprika">*</span>
                    </p>
                    <input
                        id="input_name"
                        class="input--name"
                        type="text"
                        v-model="userFullName"
                        placeholder="Full Name"
                        maxlength="60"
                        required
                    />
                </div>

                <div class="input_area">
                    <p class="forms_area--user_form_title">
                        Your Number<span class="highlight_paprika">*</span>
                    </p>
                    <input
                        id="input_number"
                        class="input--number"
                        type="number"
                        v-model="userNum"
                        placeholder="Your Number"
                        maxlength="20"
                        required
                    />
                </div>

                <div class="input_area">
                    <p class="forms_area--user_form_title">Your Allergies</p>
                    <textarea
                        id="input_allergy"
                        class="input--allergy"
                        v-model="userAllergy"
                        placeholder="Allergies (Separate with commas)"
                        maxlength="200"
                    ></textarea>
                </div>

                <p class="total_price">Total: Rp{{ totalPrice.toLocaleString("id-ID") }}</p>

                <button class="submit_button" type="submit">Order Subscription</button>

                <p v-if="isSubmitted" class="success_message">
                    ✅ Thank you! Your subscription is now active.
                </p>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @use "../assets/styles/subscription.scss";
</style>

<script setup>
    import { ref, computed } from "vue";
    import Navbar from "../components/Navbar.vue";
    import MealSelector from "../components/MealSelector.vue";
    import DaySelector from "../components/DaySelector.vue";

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
    const chosenDays = ref({
        dietDays: [],
        proteinDays: [],
        royalDays: []
    });

    function typesLength() {
        return (
            chosenTypes.value["dietTypes"].length +
            chosenTypes.value["proteinTypes"].length +
            chosenTypes.value["royalTypes"].length
        );
    }

    function isDayEmpty() {
        if (chosenPlans.value.includes("diet")) {
            return chosenDays.value.dietDays.length == 0;
        }

        if (chosenPlans.value.includes("protein")) {
            return chosenDays.value.proteinDays.length == 0;
        }

        if (chosenPlans.value.includes("royal")) {
            return chosenDays.value.royalDays.length == 0;
        }
    }

    function choosePlan(event) {
        const recipeCard = event.target.closest(".plan_wrap--recipe");
        let planName;

        switch (recipeCard.id) {
            case "recipe_diet":
                planName = "diet";
                break;

            case "recipe_protein":
                planName = "protein";
                break;

            case "recipe_royal":
                planName = "royal";
                break;
        }

        if (chosenPlans.value.includes(planName)) {
            const index = chosenPlans.value.indexOf(planName);
            chosenPlans.value.splice(index, 1);
        } else {
            chosenPlans.value.push(planName);
        }
    }

    const userName = ref("");
    const userFullName = ref("");
    const userNum = ref("");
    const userAllergy = ref("");
    const isSubmitted = ref(false);

    const allergyList = computed(() => {
        if (!userAllergy.value) return [];

        return userAllergy.value
            .split(/\s*,\s*/) // split on commas with optional spaces around
            .map((a) => a.trim()) // trim extra spaces
            .filter((a) => a.length > 0); // remove empty entries
    });

    // to be get by db
    const planPrices = {
        diet: 30000,
        protein: 40000,
        royal: 60000
    };

    const totalPrice = computed(() => {
        let total = 0;

        for (let i = 0; i < chosenPlans.value.length; i++) {
            const plan = chosenPlans.value[i];
            const planPrice = planPrices[plan];
            const numTypes = chosenTypes.value[`${plan}Types`].length;
            const numDays = chosenDays.value[`${plan}Days`].length;

            total += planPrice * numTypes * numDays * 4.3;
        }

        return total;
    });

    function isDataValid() {
        if (
            !userName.value ||
            !userFullName.value ||
            !userNum.value ||
            chosenPlans.value.length === 0
        ) {
            return false;
        }

        for (const plan in chosenPlans.value) {
            if (
                chosenTypes.value[`${plan}Types`].length === 0 ||
                chosenDays.value[`${plan}Days`].length === 0
            ) {
                return false;
            }
        }

        return true;
    }

    // have to modify based on db
    function sendSubsData() {
        console.log(userName.value, userFullName.value, userNum.value, allergyList.value);

        isSubmitted.value = true;

        userName.value = "";
        userFullName.value = "";
        userNum.value = "";
        userAllergy.value = "";

        setTimeout(() => {
            isSubmitted.value = false;
        }, 3000);
    }
</script>
