<template>
    <header class="navbar">
        <div class="container">
            <div class="logo">
                <img src="../assets/images/logo.png" alt="" class="logo_image" />
                <p class="logo_name"><span class="gradient_1">SEA</span> Catering</p>
            </div>

            <nav class="desktop-nav">
                <router-link class="nav_name" to="/">Home</router-link>
                <router-link class="nav_name" to="/meal">Meal Plans</router-link>
                <router-link class="nav_name" to="/testimony">Testimonies</router-link>
                <router-link class="nav_name" to="/subscription">Subscription</router-link>
                <router-link class="nav_name" to="/contact">Contact Us</router-link>
            </nav>

            <nav v-if="!userLogged" class="desktop-nav">
                <router-link class="sign_up" to="/">Sign Up</router-link>
            </nav>

            <!-- Hamburger -->
            <button class="hamburger" @click="isOpen = !isOpen">
                <!-- Might need to add @touchend later for mobile -->
                <span :class="{ open: isOpen }"></span>
                <span :class="{ open: isOpen }"></span>
                <span :class="{ open: isOpen }"></span>
            </button>

            <!-- Dropdown Menu -->
            <transition name="fade-slide">
                <nav v-if="isOpen" class="dropdown">
                    <router-link class="nav_name" to="/">Home</router-link>
                    <router-link class="nav_name" to="/meal">Meal Plans</router-link>
                    <router-link class="nav_name" to="/testimony">Testimonies</router-link>
                    <router-link class="nav_name" to="/subscription">Subscription</router-link>
                    <router-link class="nav_name" to="/contact">Contact Us</router-link>
                </nav>
            </transition>
        </div>
    </header>
</template>

<script setup>
    import { ref } from "vue";

    const isOpen = ref(false);
    const userLogged = ref(false);
</script>

<style scoped>
    .router-link-active {
        color: var(--color-fresh-basil);
        font-weight: 600;
    }

    .navbar {
        padding: 1rem 1rem;
        top: 0;
        position: sticky;
        z-index: 100;
    }

    .container {
        display: flex;
        gap: 5vw;
        width: 100%;
        margin: 0 auto;
        padding: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }

    .logo {
        display: flex;
        flex-direction: row;
        font-weight: bold;
        gap: 10px;
        align-self: flex-start;
        align-items: center;
    }

    .logo_image {
        width: clamp(1.5em, 3vw + 1.5em, 2.5em);
        height: auto;
    }

    .logo_name {
        font-family: "Inter";
        font-size: 1.2rem;
    }

    .nav_name {
        font-family: "Inter";
    }

    /* Hamburger */
    .hamburger {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        z-index: 100;
    }

    .hamburger span {
        height: 3px;
        width: 25px;
        background: #333;
        transition: all 0.3s;
        border-radius: 2px;
    }

    .hamburger span.open:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    .hamburger span.open:nth-child(2) {
        opacity: 0;
    }
    .hamburger span.open:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }

    /* Dropdown Menu */
    .dropdown {
        position: absolute;
        top: 100%;
        left: 50%;
        width: 100%;
        transform: translateX(-50%);
        background: white;
        border-radius: 20px;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin-top: 1rem;
        z-index: 10;
    }

    .dropdown a {
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s;
    }

    /* Transition Animation */
    .fade-slide-enter-active,
    .fade-slide-leave-active {
        transition: all 0.3s ease;
    }

    .fade-slide-enter-from {
        opacity: 0;
        transform: translate(-50%, -10px);
    }

    .fade-slide-leave-to {
        opacity: 0;
        transform: translate(-50%, -10px);
    }

    .desktop-nav {
        display: none;
        gap: 2rem;
    }

    .desktop-nav a {
        text-decoration: none;
        font-weight: 600;
    }

    @media (min-width: 769px) {
        .navbar {
            padding: 1rem 2rem 0 2rem;
        }
        .desktop-nav {
            display: flex;
        }

        .hamburger {
            display: none;
        }

        .logo_name {
            font-size: 1.5rem;
        }
    }

    .sign_up {
        background-color: #fff9f4;
        font-family: "Inter";
        font-weight: 600;
        font-size: 1rem;
        padding: 0.8em;

        border: 2px solid transparent;
        border-radius: 1em;
        background-image: linear-gradient(white, white), var(--second-gradient);
        background-clip: padding-box, border-box;
    }
</style>
