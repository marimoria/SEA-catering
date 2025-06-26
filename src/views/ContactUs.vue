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
                            <img src="/images/phone.svg" alt="" class="group--icon" />
                            <p class="group--info">(+62) 123-456-789</p>
                        </div>
                        <div class="group">
                            <img src="/images/gmail.svg" alt="" class="group--icon" />
                            <p class="group--info">SEACatering@support.com</p>
                        </div>
                        <div class="group">
                            <img src="/images/location.svg" alt="" class="group--icon" />
                            <p class="group--info">Jakarta, Indonesia</p>
                        </div>
                    </div>
                </div>

                <div class="contact_info--form" @submit.prevent="sendContactData">
                    <form>
                        <input v-model="contactName" type="text" placeholder="Your Name" required />
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
                        <p v-if="isSubmitted" class="success_message">
                            ✅ Thank you! Your review has been submitted.
                        </p>
                    </form>
                </div>
            </div>
        </div>

        <img
            data-speedx="0.03"
            data-speedy="0.03"
            class="parallax bg_image--top_right"
            src="/images/chicken_platter.webp"
            alt=""
        />
        <img
            data-speedx="0.02"
            data-speedy="0.03"
            class="parallax bg_image--bottom_left"
            src="/images/pad_thai.webp"
            alt=""
        />

        <!-- large screen only -->
        <img
            v-if="viewport.w >= 1024"
            data-speedx="0.01"
            data-speedy="0.03"
            class="parallax bg_image--sec_right"
            src="/images/protein_hero.webp"
            alt=""
        />
        <img
            v-if="viewport.w >= 1024"
            data-speedx="0.04"
            data-speedy="0.03"
            class="parallax bg_image--sec_left"
            src="/images/veggies_hero.webp"
            alt=""
        />
    </div>
</template>

<style scoped lang="scss">
    @use "../assets/styles/contact.scss";
</style>

<script setup>
    import { useParallax } from "../components/composables/useParallax";
    import Navbar from "../components/Navbar.vue";
    import { onMounted, ref } from "vue";

    const props = defineProps({
        viewport: Object,
        device: Object
    });

    const contactName = ref("");
    const contactEmail = ref("");
    const contactSubject = ref("");
    const contactMessage = ref("");
    const isSubmitted = ref(false);

    function sendContactData() {
        console.log(
            contactName.value,
            contactEmail.value,
            contactSubject.value,
            contactMessage.value
        );

        isSubmitted.value = true;

        contactName.value = "";
        contactEmail.value = "";
        contactSubject.value = "";
        contactMessage.value = "";

        setTimeout(() => {
            isSubmitted.value = false;
        }, 3000);
    }

    onMounted(() => {
        const parallaxElements = document.querySelectorAll(".parallax");
        parallaxElements.forEach((el) => useParallax(el));
    });
</script>
