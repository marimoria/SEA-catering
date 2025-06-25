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
                            <img src="../assets/images/phone.svg" alt="" class="group--icon" />
                            <p class="group--info">(+62) 123-456-789</p>
                        </div>
                        <div class="group">
                            <img src="../assets/images/gmail.svg" alt="" class="group--icon" />
                            <p class="group--info">SEACatering@support.com</p>
                        </div>
                        <div class="group">
                            <img src="../assets/images/location.svg" alt="" class="group--icon" />
                            <p class="group--info">Jakarta, Indonesia</p>
                        </div>
                    </div>
                </div>

                <div class="signup_info--form">
                    <p class="details--title">Sign Up</p>
                    <form @submit.prevent="handleSignup">
                        <input
                            v-model="username"
                            type="text"
                            placeholder="Username"
                            maxlength="20"
                            @input="sanitizeUsername($event)"
                            required
                        />
                        <input v-model="email" type="email" placeholder="Email Address" required />
                        <input v-model="password" type="password" placeholder="Password" required />
                        <input v-model="fullName" type="text" placeholder="Full Name" required />
                        <input v-model="phone" type="number" placeholder="Phone Number" required />
                        <input v-model="allergies" type="text" placeholder="Allergies (optional)" />

                        <button type="submit">Sign Up</button>

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
            src="../assets/images/grill_steak.svg"
            alt=""
        />
        <img
            data-speedx="0.01"
            data-speedy="0.03"
            class="parallax bg_image--bottom_left"
            src="../assets/images/grilled_salmon.svg"
            alt=""
        />
        <img
            v-if="viewport.w >= 1024"
            data-speedx="0.04"
            data-speedy="0.03"
            class="parallax bg_image--sec_right"
            src="../assets/images/duck.svg"
            alt=""
        />
        <img
            v-if="viewport.w >= 1024"
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax bg_image--sec_left"
            src="../assets/images/quinoa_salad.svg"
            alt=""
        />
    </div>
</template>

<script setup>
    import Navbar from "../components/Navbar.vue";
    import { onMounted, ref } from "vue";
    import { supabase, getData, insertData } from "../components/composables/useSupabase";
    import { useParallax } from "../components/composables/useParallax";

    const props = defineProps({
        viewport: Object,
        device: Object
    });

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

    async function handleSignup() {
        errorMessage.value = "";
        successMessage.value = "";

        // Duplicate checks
        const usernameExists = await getData("profiles", { username: username.value });
        if (usernameExists.length > 0) {
            errorMessage.value = "Username already exists.";
            return;
        }

        const phoneExists = await getData("profiles", { phone: phone.value });
        if (phoneExists.length > 0) {
            errorMessage.value = "Phone number already registered.";
            return;
        }

        // Register user with Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value
        });

        if (error) {
            errorMessage.value = error.message;
            return;
        }

        // Get user ID
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id;

        if (!userId) {
            errorMessage.value = "Could not retrieve user ID after sign-up.";
            return;
        }

        // Insert full profile
        await insertData("profiles", {
            id: userId,
            username: username.value,
            full_name: fullName.value,
            phone: phone.value,
            allergies: allergies.value,
            created_at: new Date().toISOString()
        });

        successMessage.value = "Success! Please check your email to confirm your account.";

        // Reset
        email.value = "";
        password.value = "";
        username.value = "";
        fullName.value = "";
        phone.value = "";
        allergies.value = "";
    }

    onMounted(() => {
        const parallaxElements = document.querySelectorAll(".parallax");
        parallaxElements.forEach((el) => useParallax(el));
    });
</script>

<style scoped lang="scss">
    @use "../assets/styles/signup.scss";
</style>
