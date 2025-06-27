<template>
    <div class="dashboard">
        <div class="background"></div>
        <Navbar />

        <div class="dashboard_grid">
            <div class="dashboard_header">
                <p class="dashboard_header--greet">
                    Hello there, <span class="highlight_basil">{{ profile.username }}</span>
                </p>
                <p class="dashboard_header--desc">
                    <span class="typing_text" id="animatedText"></span>
                    <span class="cursor">|</span>
                </p>
            </div>

            <div class="dashboard_content">
                <DashboardNav :tabs="['Subscriptions', 'Settings']">
                    <template #Subscriptions>
                        <div class="subscription_area">
                            <div class="subscription_area--title">My Subscriptions</div>

                            <SubscriptionCard
                                v-for="(sub, i) in subscriptions"
                                :key="sub.id"
                                v-model:subscription="subscriptions[i]"
                                :title="'Subscription ' + (i + 1)"
                                :index="i"
                                @deleted="handleDelete"
                            />
                        </div>
                    </template>

                    <template #Settings>
                        <div class="settings_area">
                            <p class="settings_area--title">Update Profile</p>
                        </div>

                        <form class="forms_area" @submit.prevent="updateProfile">
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

                            <button :disabled="isLoading" class="submit_button" type="submit">
                                {{ isLoading ? "Submitting..." : "Submit Review" }}
                            </button>

                            <LoadingSpinner v-if="isLoading" />

                            <p v-if="errorMessage" class="error_message">❌ {{ errorMessage }}</p>
                            <p v-if="successMessage" class="success_message">
                                ✅ {{ successMessage }}
                            </p>
                        </form>
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

        <!-- Large screen decors -->
        <img
            v-if="viewport.w >= 1024"
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax bg_image--top_right"
            src="/images/chicken_platter.webp"
            alt=""
        />
        <img
            v-if="viewport.w >= 1024"
            data-speedx="0.02"
            data-speedy="0.03"
            class="parallax bg_image--bottom_left"
            src="/images/pad_thai.webp"
            alt=""
        />

        <CalendarModal v-model:visible="calendarVisible" v-model:resumeDate="resumeDate" />
        <DeleteConfirmModal v-model:visible="delVisible" v-model:confirm="delConfirm" />
    </div>
</template>

<style lang="scss" scoped>
    @use "../assets/styles/dashboard.scss";
</style>

<script setup>
    import { onMounted, ref, provide } from "vue";
    import {
        user,
        profile,
        updateUsername,
        updateFullName,
        updatePhone,
        updateAllergies
    } from "../components/composables/useAuth";
    import { getData, supabase } from "../components/composables/useSupabase";
    import { gsap } from "../js/vendor";
    import { useParallax } from "../components/composables/useParallax";

    import Navbar from "../components/Navbar.vue";
    import SubscriptionCard from "../components/SubscriptionCard.vue";
    import DashboardNav from "../components/DashboardNav.vue";
    import CalendarModal from "../components/CalendarModal.vue";
    import DeleteConfirmModal from "../components/DeleteConfirmModal.vue";
    import LoadingSpinner from "../components/LoadingSpinner.vue";

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

    // pause
    const calendarVisible = ref(false);
    const resumeDate = ref(null);
    const pausedSubId = ref(null); // Track which subscription triggered the modal

    provide("calendarVisible", calendarVisible);
    provide("resumeDate", resumeDate);
    provide("pausedSubId", pausedSubId);

    // delete
    const delVisible = ref(false);
    const delConfirm = ref(false);
    const delSubId = ref(null); // Track which subscription triggered the modal

    provide("delVisible", delVisible);
    provide("delConfirm", delConfirm);
    provide("delSubId", delSubId);

    function handleDelete(id) {
        subscriptions.value = subscriptions.value.filter((sub) => sub.id !== id);
    }

    // SETTINGS //
    const username = ref("");
    const userFullName = ref("");
    const userPhone = ref("");
    const userAllergy = ref("");

    const isLoading = ref(false);

    const errorMessage = ref("");
    const successMessage = ref("");

    function sanitizeUsername(e) {
        // Replace anything that's NOT a-z, 0-9, _ or .
        username.value = e.target.value.replace(/[^a-zA-Z0-9_.]/g, "").toLowerCase();
    }

    function sanitizePhone(e) {
        // Only allow numbers and +
        userPhone.value = e.target.value.replace(/[^\d+]/g, "");
    }

    async function updateProfile() {
        errorMessage.value = "";
        successMessage.value = "";
        isLoading.value = true;

        const updates = {
            usernameChanged: username.value !== profile.value.username,
            nameChanged: userFullName.value !== profile.value.full_name,
            phoneChanged: userPhone.value !== profile.value.phone,
            allergyChanged: userAllergy.value !== profile.value.allergies
        };

        if (
            !updates.usernameChanged &&
            !updates.nameChanged &&
            !updates.phoneChanged &&
            !updates.allergyChanged
        ) {
            successMessage.value = "No changes were made.";
            isLoading.value = false;
            return;
        }

        if (updates.usernameChanged || updates.phoneChanged) {
            const { data: dupesData, error: dupesError } = await supabase.functions.invoke(
                "checkUniqueSignUp",
                {
                    body: { username: username.value, phone: userPhone.value }
                }
            );

            if (dupesError) {
                errorMessage.value = dupesError.message;
                isLoading.value = false;
                return;
            }

            if (updates.usernameChanged && dupesData.usernameExists) {
                errorMessage.value = "Username already exists.";
                username.value = profile.value.username;
                isLoading.value = false;
                return;
            }

            if (updates.phoneChanged && dupesData.phoneExists) {
                errorMessage.value = "Phone number is invalid.";
                userPhone.value = profile.value.phone;
                isLoading.value = false;
                return;
            }
        }

        if (updates.usernameChanged) {
            const res = await updateUsername(username.value);
            if (!res.success) {
                username.value = profile.value.username;
                errorMessage.value = res.error;
                isLoading.value = false;
                return;
            }
        }

        if (updates.nameChanged) {
            const res = await updateFullName(userFullName.value);
            if (!res.success) {
                userFullName.value = profile.value.full_name;
                errorMessage.value = res.error;
                isLoading.value = false;
                return;
            }
        }

        if (updates.phoneChanged) {
            const res = await updatePhone(userPhone.value);
            if (!res.success) {
                userPhone.value = profile.value.phone;
                errorMessage.value = res.error;
                isLoading.value = false;
                return;
            }
        }

        if (updates.allergyChanged) {
            const res = await updateAllergies(userAllergy.value);
            if (!res.success) {
                userAllergy.value = profile.value.allergies;
                errorMessage.value = res.error;
                isLoading.value = false;
                return;
            }
        }

        successMessage.value = "Profile successfully updated!";
        isLoading.value = false;
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

        // STARTING VALUES FORM
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
