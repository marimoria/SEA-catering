import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../views/Home.vue";
import Meal from "../views/MealPlans.vue";
import Subscription from "../views/Subscription.vue";
import ContactUs from "../views/ContactUs.vue";
import Testimony from "../views/Testimony.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/meal",
            name: "meal plan",
            component: Meal
        },
        {
            path: "/testimony",
            name: "testimony",
            component: Testimony
        },
        {
            path: "/subscription",
            name: "subscription",
            component: Subscription
        },
        {
            path: "/contact",
            name: "contact",
            component: ContactUs
        },
        {
            path: "/signup",
            name: "sign up",
            component: SignUp
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: Dashboard
        },
        {
            path: "/:pathMatch(.*)*",
            component: Home
        }
    ]
});

export default router;
