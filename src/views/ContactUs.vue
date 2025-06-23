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

                <div class="contact_info--form">
                    <form>
                        <input type="text" placeholder="Your Name" />
                        <input type="email" placeholder="Your Email" />
                        <input type="text" placeholder="Subject" />
                        <textarea placeholder="Your Message"></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        </div>

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

        <!-- large screen only -->
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
    @use "../assets/styles/contact.scss";
</style>

<script setup>
    import Navbar from "../components/Navbar.vue";

    const props = defineProps({
        viewport: Object,
        device: Object
    });
</script>
