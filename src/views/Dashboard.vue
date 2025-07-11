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
                            <p v-if="!hasSubscriptions" class="no_subs">
                                You have no subscriptions yet!<br />
                                Purchase your subscription
                                <router-link to="/subscription">here</router-link>
                            </p>

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
                                    @input="sanitizeUsername($event)"
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
                                    @input="sanitizePhone($event)"
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
                                {{ isLoading ? "Updating..." : "Update" }}
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
            id="hero_image_1"
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax hero_image"
            :src="getImageUrl('protein_hero.webp')"
            alt=""
        />
        <img
            id="hero_image_2"
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax hero_image"
            :src="getImageUrl('veggies_hero.webp')"
            alt=""
        />
        <img
            id="hero_image_3"
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax hero_image"
            :src="getImageUrl('fruits_hero.webp')"
            alt=""
        />

        <!-- Large screen decors -->
        <img
            v-if="viewport.w >= 1024"
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax bg_image--top_right"
            :src="getImageUrl('foie_gras.webp')"
            alt=""
        />
        <img
            v-if="viewport.w >= 1024"
            data-speedx="0.02"
            data-speedy="0.03"
            class="parallax bg_image--bottom_left"
            :src="getImageUrl('grill_steak.webp')"
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
    import { supabase, getImageUrl } from "../components/composables/useSupabase";
    import { loadSubscriptions } from "../components/composables/useSubscription";
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

    async function tryUpdate(updateFunc, newRef, oldVal) {
        const res = await updateFunc(newRef.value);
        if (!res.success) {
            newRef.value = oldVal;
            errorMessage.value = res.error;
            return false;
        }
        return true;
    }

    async function updateProfile() {
        errorMessage.value = "";
        successMessage.value = "";
        isLoading.value = true;

        const updates = {
            username: username.value !== profile.value.username,
            full_name: userFullName.value !== profile.value.full_name,
            phone: userPhone.value !== profile.value.phone,
            allergies: userAllergy.value !== profile.value.allergies
        };

        const noChanges = !Object.values(updates).some(Boolean);
        if (noChanges) {
            successMessage.value = "No changes were made.";
            isLoading.value = false;
            return;
        }

        try {
            if (updates.username || updates.phone) {
                const { data, error } = await supabase.functions.invoke("checkUniqueSignUp", {
                    body: { username: username.value, phone: userPhone.value }
                });

                if (error) throw new Error(error.message);

                if (updates.username && data.usernameExists) {
                    username.value = profile.value.username;
                    throw new Error("Username already exists.");
                }

                if (updates.phone && data.phoneExists) {
                    userPhone.value = profile.value.phone;
                    throw new Error("Phone number is invalid.");
                }
            }

            const tasks = [
                updates.username && tryUpdate(updateUsername, username, profile.value.username),
                updates.full_name &&
                    tryUpdate(updateFullName, userFullName, profile.value.full_name),
                updates.phone && tryUpdate(updatePhone, userPhone, profile.value.phone),
                updates.allergies &&
                    tryUpdate(updateAllergies, userAllergy, profile.value.allergies)
            ];

            const results = await Promise.all(tasks.filter(Boolean));

            if (results.includes(false)) {
                return;
            }

            successMessage.value = "Profile successfully updated!";
        } catch (err) {
            errorMessage.value = err.message || "Something went wrong.";
        } finally {
            isLoading.value = false;
        }
    }

    onMounted(async () => {
        await loadSubscriptions(user, hasSubscriptions, subscriptions);

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
