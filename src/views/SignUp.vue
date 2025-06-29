<template>
    <div class="signup">
        <div class="background"></div>
        <Navbar />

        <div class="signup_grid">
            <p v-if="viewport.w >= 768" class="signup_grid--title">Create Your Account</p>

            <div class="signup_grid--info">
                <div class="signup_info--details">
                    <p class="details--title">Why Join SEA Catering?</p>
                    <p class="details--desc">
                        Signing up gives you access to customized meal plans tailored to your goals.
                        Fast, fresh, and nutritious.
                    </p>
                    <div class="details--grid">
                        <div class="group">
                            <img :src="getImageUrl('phone.svg')" alt="" class="group--icon" />
                            <p class="group--info">(+62) 123-456-789</p>
                        </div>
                        <div class="group">
                            <img :src="getImageUrl('gmail.svg')" alt="" class="group--icon" />
                            <p class="group--info">SEACatering@support.com</p>
                        </div>
                        <div class="group">
                            <img :src="getImageUrl('location.svg')" alt="" class="group--icon" />
                            <p class="group--info">Jakarta, Indonesia</p>
                        </div>
                    </div>
                </div>

                <div class="signup_info--form">
                    <p class="details--title">Sign Up</p>
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

        <!-- background assets -->
        <img
            data-speedx="0.02"
            data-speedy="0.03"
            class="parallax bg_image--top_right"
            :src="getImageUrl('grill_steak.webp')"
            alt=""
        />
        <img
            data-speedx="0.01"
            data-speedy="0.03"
            class="parallax bg_image--bottom_left"
            :src="getImageUrl('grilled_salmon.webp')"
            alt=""
        />
        <img
            v-if="viewport.w >= 1024"
            data-speedx="0.04"
            data-speedy="0.03"
            class="parallax bg_image--sec_right"
            :src="getImageUrl('duck.webp')"
            alt=""
        />
        <img
            v-if="viewport.w >= 1024"
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax bg_image--sec_left"
            :src="getImageUrl('quinoa_salad.webp')"
            alt=""
        />
    </div>
</template>

<script setup>
    import Navbar from "../components/Navbar.vue";
    import { onMounted, ref } from "vue";
    import { useParallax } from "../components/composables/useParallax";
    import { handleSignUp } from "../components/composables/useAuth";
    import { getImageUrl } from "../components/composables/useSupabase";
    import LoadingSpinner from "../components/LoadingSpinner.vue";

    const props = defineProps({
        viewport: Object,
        device: Object
    });

    const isLoading = ref(false);

    // form state
    const email = ref("");
    const password = ref("");
    const username = ref("");
    const fullName = ref("");
    const phone = ref("");
    const allergies = ref("");

    const successMessage = ref("");
    const errorMessage = ref("");

    function sanitizeUsername(e) {
        // Replace anything that's NOT a-z, 0-9, _ or .
        username.value = e.target.value.replace(/[^a-zA-Z0-9_.]/g, "").toLowerCase();
    }

    function sanitizePhone(e) {
        // Only allow numbers and +
        phone.value = e.target.value.replace(/[^\d+]/g, "");
    }

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

        if (result.success) {
            isLoading.value = false;
            successMessage.value = result.message;

            email.value = "";
            password.value = "";
            username.value = "";
            fullName.value = "";
            phone.value = "";
            allergies.value = "";
        } else {
            isLoading.value = false;
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
