<template>
    <div class="contact">
        <div class="background"></div>
        <Navbar />

        <div class="contact_grid">
            <p v-if="viewport.w >= 768" class="contact_grid--title">Reach Out Now!</p>

            <div class="contact_grid--info">
                <div class="contact_info--details">
                    <p class="details--title">Contact Information</p>
                    <p class="details--desc">
                        This is the official contact information for SEA Catering. Feel free to
                        shoot us a message if you have any issues with our service. Thank you for
                        your patience.
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

                <div class="contact_info--form" @submit.prevent="sendContactData">
                    <form>
                        <input v-model="contactName" type="text" placeholder="Username" required />
                        <input
                            v-model="contactEmail"
                            type="email"
                            placeholder="Your Email"
                            required
                        />
                        <input
                            v-model="contactSubject"
                            type="text"
                            placeholder="Subject"
                            required
                        />
                        <textarea
                            v-model="contactMessage"
                            placeholder="Your Message"
                            required
                        ></textarea>

                        <button type="submit">Send Message</button>

                        <LoadingSpinner v-if="isLoading" />

                        <p v-if="errorMessage" class="error_message">❌ {{ errorMessage }}</p>
                        <p v-if="successMessage" class="success_message">✅ {{ successMessage }}</p>
                    </form>
                </div>
            </div>
        </div>

        <img
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax bg_image--top_right"
            :src="getImageUrl('chicken_platter.webp')"
            alt=""
        />
        <img
            data-speedx="0.02"
            data-speedy="0.03"
            class="parallax bg_image--bottom_left"
            :src="getImageUrl('pad_thai.webp')"
            alt=""
        />

        <!-- large screen only -->
        <img
            v-if="viewport.w >= 1024"
            data-speedx="0.01"
            data-speedy="0.03"
            class="parallax bg_image--sec_right"
            :src="getImageUrl('protein_hero.webp')"
            alt=""
        />
        <img
            v-if="viewport.w >= 1024"
            data-speedx="0.04"
            data-speedy="0.03"
            class="parallax bg_image--sec_left"
            :src="getImageUrl('veggies_hero.webp')"
            alt=""
        />
    </div>
</template>

<style scoped lang="scss">
    @use "../assets/styles/contact.scss";
</style>

<script setup>
    import { useParallax } from "../components/composables/useParallax";
    import { computed, onMounted, ref } from "vue";
    import { user, profile } from "../components/composables/useAuth";
    import { getImageUrl } from "../components/composables/useSupabase";

    import Navbar from "../components/Navbar.vue";
    import LoadingSpinner from "../components/LoadingSpinner.vue";
    import emailjs from "emailjs-com";

    const props = defineProps({
        viewport: Object,
        device: Object
    });

    const contactName = ref("");
    const contactEmail = ref("");
    const contactSubject = ref("");
    const contactMessage = ref("");

    const isLoading = ref(false);
    const errorMessage = ref("");
    const successMessage = ref("");

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    function sendContactData() {
        isLoading.value = true;

        const userLogged = computed(() => !!user.value);

        if (!userLogged.value) {
            isLoading.value = false;
            errorMessage.value = "You must sign up or login!";
            return;
        }

        if (contactName.value !== profile.value.username) {
            isLoading.value = false;
            errorMessage.value = "That's not your username!";
            return;
        }

        if (contactEmail.value !== user.value.email) {
            isLoading.value = false;
            errorMessage.value = "That's not your email!";
            return;
        }

        const templateParams = {
            contact_name: contactName.value,
            contact_email: contactEmail.value,
            contact_subject: contactSubject.value,
            contact_message: contactMessage.value
        };

        emailjs
            .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then(() => {
                isLoading.value = false;

                contactName.value = "";
                contactEmail.value = "";
                contactSubject.value = "";
                contactMessage.value = "";

                successMessage.value = "Successfully sent! Please wait within 24 hours.";
            })
            .catch((error) => {
                errorMessage.value = error;
            });
    }

    onMounted(() => {
        const parallaxElements = document.querySelectorAll(".parallax");
        parallaxElements.forEach((el) => useParallax(el));

        if (profile.value && profile.value.username) {
            contactName.value = profile.value.username;
        }

        if (user.value && user.value.email) {
            contactEmail.value = user.value.email;
        }
    });
</script>
