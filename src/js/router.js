import { createRouter, createWebHashHistory } from "vue-router";
import { user, isAdmin } from "../components/composables/useAuth";

import Home from "../views/Home.vue";
import Meal from "../views/MealPlans.vue";
import Subscription from "../views/Subscription.vue";
import ContactUs from "../views/ContactUs.vue";
import Testimony from "../views/Testimony.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import AdminDash from "../views/AdminDash.vue";

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
            component: SignUp,
            meta: { notAllowAuth: true }
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: { notAllowAuth: true }
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: Dashboard,
            meta: { requiresAuth: true, notAllowAdmin: true }
        },
        {
            path: "/admin",
            name: "admin dashboard",
            component: AdminDash,
            meta: { requiresAdmin: true }
        },
        {
            path: "/:pathMatch(.*)*",
            component: Home
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);
    const notAllowAuth = to.matched.some((record) => record.meta.notAllowAuth);
    const notAllowAdmin = to.matched.some((record) => record.meta.notAllowAdmin);

    if (notAllowAuth && user.value) {
        return next("/");
    }

    if (notAllowAdmin && isAdmin.value) {
        return next("/");
    }

    if (requiresAuth && !user.value) {
        return next("/");
    }

    if (requiresAdmin && !isAdmin.value) {
        return next("/");
    }

    return next();
});

export default router;
