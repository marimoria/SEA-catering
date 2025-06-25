<template>
    <div class="login">
        <div class="background"></div>
        <Navbar />

        <div class="login_grid">
            <p v-if="viewport.w >= 768" class="login_grid--title">Welcome Back!</p>

            <div class="login_grid--info">
                <div class="login_info--details">
                    <p class="details--title">Enjoy Effortless Meals Again</p>
                    <p class="details--desc">
                        Login to access your meal plans, update preferences, and enjoy seamless
                        catering just for you.
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

                <div class="login_info--form">
                    <p class="details--title">Login</p>
                    <form @submit.prevent="submitLogin">
                        <input v-model="email" type="email" placeholder="Email Address" required />
                        <input v-model="password" type="password" placeholder="Password" required />

                        <button type="submit">Login</button>

                        <p v-if="errorMessage" class="error_message">❌ {{ errorMessage }}</p>
                        <p v-if="successMessage" class="success_message">✅ {{ successMessage }}</p>
                    </form>
                    <p class="nav_message">
                        Don't have an account?
                        <router-link to="/signup">Sign Up Here</router-link>
                    </p>
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

<style scoped lang="scss">
    @use "../assets/styles/login.scss";
</style>

<script setup>
    import Navbar from "../components/Navbar.vue";
    import { useRouter } from "vue-router";
    import { ref, onMounted } from "vue";
    import { handleLogin } from "../components/composables/useAuth";
    import { useParallax } from "../components/composables/useParallax";

    const props = defineProps({
        viewport: Object,
        device: Object
    });

    const router = useRouter();

    const email = ref("");
    const password = ref("");
    const successMessage = ref("");
    const errorMessage = ref("");

    async function submitLogin() {
        errorMessage.value = "";
        successMessage.value = "";

        const result = await handleLogin({
            email: email.value,
            password: password.value
        });

        if (result.success) {
            successMessage.value = result.message;

            email.value = "";
            password.value = "";

            router.push("/");
        } else {
            errorMessage.value = result.error;
        }
    }

    onMounted(() => {
        const parallaxElements = document.querySelectorAll(".parallax");
        parallaxElements.forEach((el) => useParallax(el));
    });
</script>
