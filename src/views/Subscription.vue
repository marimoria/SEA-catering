<template>
    <div class="subscription">
        <div class="background"></div>
        <Navbar />
        <div class="subscription_form">
            <div class="subscription_form--plan">
                <p class="forms--title">Meal Plan<span class="highlight_paprika">*</span></p>
                <p class="forms--desc">Please choose at least one of these meal plan.</p>
                <div class="plan_wrap">
                    <div v-for="(plan, index) in plans" :key="plan.id" class="choice_wrap">
                        <div
                            @click="choosePlan($event)"
                            :id="'recipe_' + plan.title"
                            class="plan_wrap--recipe"
                        >
                            <img :src="getImageUrl(plan.hero_image)" class="recipe--image" />
                            <p class="recipe--name">{{ capitalize(plan.title) + " Plan" }}</p>
                            <p class="recipe--price">
                                <span
                                    class="bigger_size"
                                    :class="`highlight_${plan.title.toLowerCase()}`"
                                    >Rp{{ parseInt(plan.price).toLocaleString("id-ID") }},00</span
                                >
                                /meal
                            </p>
                            <p class="recipe--desc">
                                {{ plan.desc_short }}
                            </p>
                        </div>
                        <p
                            :class="{ hidden_opacity: !chosenPlans.includes(plan.id) }"
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
                    <div
                        v-for="(planId, index) in chosenPlans"
                        :key="planId"
                        :class="getPlanById(planId).title + '_type'"
                    >
                        <p :class="getPlanById(planId).title + '_type--title'">
                            <span :class="'highlight_' + getPlanById(planId).title">
                                {{ capitalize(getPlanById(planId).title) }}
                            </span>
                            Plan
                        </p>
                        <MealSelector
                            class="meal_nav"
                            v-model:selected="chosenTypes"
                            :types="['Breakfast', 'Lunch', 'Dinner']"
                            :mealPlanId="planId"
                            :buttonColor="getPlanById(planId).colors.medium"
                            :activeColor="getPlanById(planId).colors.light"
                        />
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
                    <div v-for="planId in chosenPlans" :key="planId">
                        <div
                            v-if="chosenTypes[planId]?.length !== 0"
                            :class="getPlanById(planId).title + '_day'"
                        >
                            <p :class="getPlanById(planId).title + '_day--title'">
                                <span :class="'highlight_' + getPlanById(planId).title">
                                    {{ capitalize(getPlanById(planId).title) }}
                                </span>
                                Plan
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
                                :mealPlanId="planId"
                                :buttonColor="getPlanById(planId).colors.medium"
                                :activeColor="getPlanById(planId).colors.light"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <form
                @submit.prevent="checkSubsData"
                v-if="chosenPlans?.length !== 0 && typesLength() !== 0 && !isDayEmpty()"
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
                        v-model="username"
                        placeholder="Username"
                        maxlength="20"
                        @input="sanitizeUsername($event, username)"
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
                        type="text"
                        v-model="userPhone"
                        placeholder="+6281234567"
                        maxlength="20"
                        @input="sanitizePhone($event, userPhone)"
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

                <button :disabled="isLoading" class="submit_button" type="submit">
                    {{ isLoading ? "Ordering..." : "Order Subscription" }}
                </button>

                <div v-if="showAllergyPrompt" class="allergy_prompt">
                    <p class="allergy_prompt--desc">
                        Your current allergy information doesn't match your profile. Would you like
                        to update it?
                    </p>

                    <div class="prompt_buttons" :class="{ column: props.viewport.w < 1024 }">
                        <button class="change_button" @click="updateAllergyAndSubmit">
                            Change
                        </button>
                        <button
                            class="cancel_button"
                            @click="
                                () => {
                                    showAllergyPrompt = false;
                                    hasConfirmedAllergy = true;
                                    insertSubscription(
                                        user,
                                        totalPrice,
                                        isLoading,
                                        errorMessage,
                                        successMessage,
                                        chosenPlans,
                                        chosenTypes,
                                        chosenDays
                                    );
                                }
                            "
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                <LoadingSpinner v-if="isLoading" />

                <p v-if="errorMessage" class="error_message">❌ {{ errorMessage }}</p>
                <p v-if="successMessage" class="success_message">✅ {{ successMessage }}</p>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @use "../assets/styles/subscription.scss";
</style>

<script setup>
    import { ref, computed, onMounted } from "vue";
    import { sanitizeUsername, sanitizePhone } from "@/components/composables/useSanitize";
    import { user, profile, updateAllergies } from "../components/composables/useAuth";
    import { insertSubscription } from "../components/composables/useSubscription";
    import { getData, getImageUrl } from "../components/composables/useSupabase";

    import Navbar from "../components/Navbar.vue";
    import MealSelector from "../components/MealSelector.vue";
    import DaySelector from "../components/DaySelector.vue";
    import LoadingSpinner from "../components/LoadingSpinner.vue";

    const props = defineProps({
        viewport: Object,
        device: Object
    });

    const plans = ref([]);

    const chosenPlans = ref([]);
    const chosenTypes = ref({});
    const chosenDays = ref({});

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    async function loadMealPlans() {
        try {
            const { data: mealPlans } = await getData("meal_plans");

            plans.value = mealPlans.map((plan) => ({
                id: plan.id,
                title: plan.title,
                desc_short: plan.desc_short,
                price: plan.price,
                colors: plan.colors,
                hero_image: plan.hero_image
            }));
        } catch (err) {
            console.error("Failed to load meal plans:", err.message);
        }
    }

    function typesLength() {
        let total = 0;

        for (let i = 0; i < chosenPlans.value.length; i++) {
            const planId = chosenPlans.value[i];
            const types = chosenTypes.value[planId];

            if (types && types.length > 0) {
                total += types.length;
            }
        }

        return total;
    }

    function isDayEmpty() {
        for (let i = 0; i < chosenPlans.value.length; i++) {
            const planId = chosenPlans.value[i];
            const days = chosenDays.value[planId];
            if (!days || days.length === 0) {
                return true;
            }
        }
        return false;
    }

    function choosePlan(event) {
        const recipeCard = event.target.closest(".plan_wrap--recipe");

        plans.value.forEach((plan) => {
            if (recipeCard.id == `recipe_${plan.title}`) {
                const planId = plan.id;
                const index = chosenPlans.value.indexOf(planId);

                if (index !== -1) {
                    chosenPlans.value.splice(index, 1);
                } else {
                    chosenPlans.value.push(planId);
                }
            }
        });
    }

    function getPlanById(id) {
        for (let i = 0; i < plans.value.length; i++) {
            if (plans.value[i].id === id) {
                return plans.value[i];
            }
        }
        return null;
    }

    const username = ref("");
    const userFullName = ref("");
    const userPhone = ref("");
    const userAllergy = ref("");

    const isLoading = ref(false);
    const showAllergyPrompt = ref(false);
    const hasConfirmedAllergy = ref(false);

    const errorMessage = ref("");
    const successMessage = ref("");

    const totalPrice = computed(() => {
        let total = 0;

        for (let i = 0; i < chosenPlans.value.length; i++) {
            const planId = chosenPlans.value[i];
            const plan = getPlanById(planId);

            const planPrice = plan.price;
            const numTypes = chosenTypes.value[planId].length;
            const numDays = chosenDays.value[planId].length;

            total += planPrice * numTypes * numDays * 4.3;
        }

        return total;
    });

    function checkSubsData() {
        const userLogged = computed(() => !!user.value);
        isLoading.value = true;

        if (!userLogged.value) {
            isLoading.value = false;
            errorMessage.value = "You must sign up or login!";
            return;
        }

        if (username.value !== profile.value.username) {
            isLoading.value = false;
            errorMessage.value = "That's not your username!";
            return;
        }

        if (userFullName.value !== profile.value.full_name) {
            isLoading.value = false;
            errorMessage.value = "That's not your full name!";
            return;
        }

        if (userPhone.value !== profile.value.phone) {
            isLoading.value = false;
            errorMessage.value = "That's not your phone number!";
            return;
        }

        if (!hasConfirmedAllergy.value && userAllergy.value !== profile.value.allergies) {
            isLoading.value = false;
            showAllergyPrompt.value = true;
            errorMessage.value = "";
            successMessage.value = "";
            return;
        }

        insertSubscription(
            user,
            totalPrice,
            isLoading,
            errorMessage,
            successMessage,
            chosenPlans,
            chosenTypes,
            chosenDays
        );
    }

    async function updateAllergyAndSubmit() {
        isLoading.value = true;
        const { success, error } = await updateAllergies(userAllergy.value);

        if (!success) {
            isLoading.value = false;
            errorMessage.value = "❌ Failed to update allergy: " + error;
            return;
        }

        hasConfirmedAllergy.value = true;
        showAllergyPrompt.value = false;

        insertSubscription(
            user,
            totalPrice,
            isLoading,
            errorMessage,
            successMessage,
            chosenPlans,
            chosenTypes,
            chosenDays
        );
    }

    onMounted(async () => {
        await loadMealPlans();

        plans.value.forEach((plan) => {
            if (!chosenTypes.value[plan.id]) {
                chosenTypes.value[plan.id] = [];
            }

            if (!chosenDays.value[plan.id]) {
                chosenDays.value[plan.id] = [];
            }
        });

        if (profile.value && profile.value.username) {
            username.value = profile.value.username;
        }

        if (profile.value && profile.value.full_name) {
            userFullName.value = profile.value.full_name;
        }

        if (profile.value && profile.value.phone) {
            userPhone.value = profile.value.phone;
        }

        if (profile.value && profile.value.allergies) {
            userAllergy.value = profile.value.allergies;
        }
    });
</script>
