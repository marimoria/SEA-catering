<template>
    <div class="login">
        <div class="background"></div>
        <Navbar />
        <img :src="getImageUrl('fork.svg')" alt="" class="fork" />

        <div class="login_grid">
            <div class="login_hero">
                <div class="login_hero--circle_banner"></div>
                <div class="login_hero--food">
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
                        class="parallax login_hero--image"
                        :src="getImageUrl('wagyu.webp')"
                        alt=""
                    />
                    <img
                        data-speedx="0.007"
                        data-speedy="0.007"
                        class="parallax login_hero--image"
                        :src="getImageUrl('chicken_platter.webp')"
                        alt=""
                    />
                    <img
                        data-speedx="0.005"
                        data-speedy="0.005"
                        class="parallax login_hero--image"
                        :src="getImageUrl('grilled_salmon.webp')"
                        alt=""
                    />
                </div>
            </div>

            <div class="login_info--form">
                <p class="content_title">Welcome Back!</p>
                <div class="form">
                    <p class="form--title">Login</p>
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
                        Don’t have an account?
                        <router-link to="/signup">Sign Up Here</router-link>
                    </p>
                </div>
            </div>
        </div>
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
