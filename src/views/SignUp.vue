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
                    <form @submit.prevent="handleSignup">
                        <input v-model="email" type="email" placeholder="Email Address" required />
                        <input v-model="password" type="password" placeholder="Password" required />
                        <input v-model="username" type="text" placeholder="Username" required />
                        <input v-model="fullName" type="text" placeholder="Full Name" required />
                        <input v-model="phone" type="tel" placeholder="Phone Number" required />
                        <input v-model="allergies" type="text" placeholder="Allergies (optional)" />

                        <button type="submit">Sign Up</button>

                        <p v-if="errorMessage" class="error_message">❌ {{ errorMessage }}</p>
                        <p v-if="successMessage" class="success_message">✅ {{ successMessage }}</p>
                    </form>
                </div>
            </div>
        </div>

        <!-- background assets -->
        <img
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax bg_image--top_right"
            src="../assets/images/chicken_platter.svg"
            alt=""
        />
        <img
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax bg_image--bottom_left"
            src="../assets/images/pad_thai.svg"
            alt=""
        />
        <img
            v-if="viewport.w >= 1024"
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax bg_image--sec_right"
            src="../assets/images/protein_hero.svg"
            alt=""
        />
        <img
            v-if="viewport.w >= 1024"
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax bg_image--sec_left"
            src="../assets/images/veggies_hero.svg"
            alt=""
        />
    </div>
</template>

<script setup>
    import Navbar from "../components/Navbar.vue";
    import { ref } from "vue";
    import { supabase, getData, insertData } from "../components/composables/useSupabase";

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

    async function handleSignup() {
        errorMessage.value = "";
        successMessage.value = "";

        // duplicate username
        const usernameExists = await getData("profiles", { username: username.value });
        if (usernameExists.length > 0) {
            errorMessage.value = "Username already exists.";
            return;
        }

        // duplicate phone
        const phoneExists = await getData("profiles", { phone: phone.value });
        if (phoneExists.length > 0) {
            errorMessage.value = "Phone number already registered.";
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value
        });

        if (error) {
            errorMessage.value = error.message;
            return;
        }

        // insert additional profile data
        await insertData("profiles", {
            username: username.value,
            full_name: fullName.value,
            is_admin: false,
            phone: phone.value,
            allergies: allergies.value,
            created_at: new Date().toISOString()
        });

        successMessage.value = "Success! Please check your email to confirm your account.";

        // reset form
        email.value = "";
        password.value = "";
        username.value = "";
        fullName.value = "";
        phone.value = "";
        allergies.value = "";
    }
</script>

<style scoped lang="scss">
    @use "../assets/styles/signup.scss";
</style>
