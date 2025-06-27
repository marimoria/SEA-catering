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

                <div class="login_info--form">
                    <p class="details--title">Login</p>
                    <form @submit.prevent="submitLogin">
                        <input v-model="email" type="email" placeholder="Email Address" required />
                        <input v-model="password" type="password" placeholder="Password" required />

                        <button :disabled="isLoading" type="submit">
                            {{ isLoading ? "Logging..." : "Login" }}
                        </button>

                        <LoadingSpinner v-if="isLoading" />

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
            :src="getImageUrl('chicken_platter.webp')"
            alt=""
        />
        <img
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax bg_image--bottom_left"
            :src="getImageUrl('pad_thai.webp')"
            alt=""
        />
        <img
            v-if="viewport.w >= 1024"
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax bg_image--sec_right"
            :src="getImageUrl('protein_hero.webp')"
            alt=""
        />
        <img
            v-if="viewport.w >= 1024"
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax bg_image--sec_left"
            :src="getImageUrl('veggies_hero.webp')"
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
    import { getImageUrl } from "../components/composables/useSupabase";
    import LoadingSpinner from "../components/LoadingSpinner.vue";

    const props = defineProps({
        viewport: Object,
        device: Object
    });

    const isLoading = ref(false);

    const router = useRouter();

    const email = ref("");
    const password = ref("");
    const successMessage = ref("");
    const errorMessage = ref("");

    async function submitLogin() {
        errorMessage.value = "";
        successMessage.value = "";
        isLoading.value = true;

        const result = await handleLogin({
            email: email.value,
            password: password.value
        });

        if (result.success) {
            isLoading.value = false;
            successMessage.value = result.message;

            email.value = "";
            password.value = "";

            router.push("/");
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
