<template>
    <div class="signup">
        <div class="background"></div>
        <Navbar />
        <img :src="getImageUrl('spoon.svg')" alt="" class="spoon" />

        <div class="signup_grid">
            <div class="signup_hero">
                <div class="signup_hero--circle_banner"></div>
                <div class="signup_hero--food">
                    <img
                        data-speedx="0.01"
                        data-speedy="0.03"
                        :src="getImageUrl('carrot.svg')"
                        alt=""
                        class="parallax carrot"
                    />
                    <img
                        data-speedx="0.01"
                        data-speedy="0.03"
                        :src="getImageUrl('tomato.svg')"
                        alt=""
                        class="parallax tomato"
                    />
                    <img
                        data-speedx="0.01"
                        data-speedy="0.01"
                        class="parallax signup_hero--image"
                        :src="getImageUrl('veggies_hero.webp')"
                        alt=""
                    />
                    <img
                        data-speedx="0.007"
                        data-speedy="0.007"
                        class="parallax signup_hero--image"
                        :src="getImageUrl('protein_hero.webp')"
                        alt=""
                    />
                    <img
                        data-speedx="0.005"
                        data-speedy="0.005"
                        class="parallax signup_hero--image"
                        :src="getImageUrl('foie_gras.webp')"
                        alt=""
                    />
                </div>
            </div>

            <div class="signup_info--form">
                <p class="content_title">Create Your Account</p>
                <div class="form">
                    <p class="form--title">Sign Up</p>
                    <form @submit.prevent="submitSignUp">
                        <input
                            v-model="username"
                            type="text"
                            placeholder="Username"
                            maxlength="20"
                            @input="sanitizeUsername($event, username)"
                            required
                        />
                        <input v-model="email" type="email" placeholder="Email Address" required />
                        <input v-model="password" type="password" placeholder="Password" required />
                        <input v-model="fullName" type="text" placeholder="Full Name" required />
                        <input
                            v-model="phone"
                            type="text"
                            placeholder="+6281234567"
                            @input="sanitizePhone($event, phone)"
                            required
                        />
                        <input v-model="allergies" type="text" placeholder="Allergies (optional)" />

                        <button :disabled="isLoading" type="submit">
                            {{ isLoading ? "Signing Up..." : "Sign Up" }}
                        </button>

                        <LoadingSpinner v-if="isLoading" />

                        <p v-if="errorMessage" class="error_message">❌ {{ errorMessage }}</p>
                        <p v-if="successMessage" class="success_message">✅ {{ successMessage }}</p>
                    </form>
                    <p class="nav_message">
                        Already have an account?
                        <router-link to="/login">Login Here</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import Navbar from "../components/Navbar.vue";
    import LoadingSpinner from "../components/LoadingSpinner.vue";

    import { onMounted, ref } from "vue";
    import { useParallax } from "../components/composables/useParallax";
    import { handleSignUp } from "../components/composables/useAuth";
    import { getImageUrl } from "../components/composables/useSupabase";
    import { sanitizeUsername, sanitizePhone } from "../components/composables/useSanitize";

    const props = defineProps({
        viewport: Object,
        device: Object
    });

    const isLoading = ref(false);

    const email = ref("");
    const password = ref("");
    const username = ref("");
    const fullName = ref("");
    const phone = ref("");
    const allergies = ref("");

    const successMessage = ref("");
    const errorMessage = ref("");

    async function submitSignUp() {
        errorMessage.value = "";
        successMessage.value = "";
        isLoading.value = true;

        const result = await handleSignUp({
            email: email.value,
            password: password.value,
            username: username.value,
            fullName: fullName.value,
            phone: phone.value,
            allergies: allergies.value
        });

        isLoading.value = false;

        if (result.success) {
            successMessage.value = result.message;

            email.value = "";
            password.value = "";
            username.value = "";
            fullName.value = "";
            phone.value = "";
            allergies.value = "";
        } else {
            errorMessage.value = result.error;
        }
    }

    onMounted(() => {
        const parallaxElements = document.querySelectorAll(".parallax");
        parallaxElements.forEach((el) => useParallax(el));
    });
</script>

<style scoped lang="scss">
    @use "../assets/styles/signup.scss";
</style>
