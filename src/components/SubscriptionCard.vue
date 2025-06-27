<template>
    <div class="subscription_card" :style="{ borderColor: currentStyle.border }">
        <div class="subscription_content">
            <div class="card_header">
                <p class="title" :style="{ color: currentStyle.text }">{{ title }}</p>
                <button class="toggle_btn" @click="expanded = !expanded">
                    {{ expanded ? "Hide Details" : "Show Details" }}
                </button>
            </div>

            <div class="info_row">
                <div class="info_block">
                    <p>
                        <strong>Status: </strong>
                        {{ subscription.status }}
                    </p>
                    <p><strong>Price:</strong> Rp {{ formatPrice(subscription.price) }}</p>
                    <p><strong>Purchased:</strong> {{ formatDate(subscription.created_at) }}</p>
                    <p v-if="subscription.status == 'paused'">
                        <strong>Paused at:</strong> {{ formatDate(subscription.pause_start) }}
                    </p>
                    <p v-if="subscription.status == 'paused'">
                        <strong>Paused until:</strong> {{ formatDate(subscription.pause_end) }}
                    </p>
                </div>

                <div class="action_buttons">
                    <button @click="showCalendar()" class="action_btn pause_btn">Pause</button>
                    <button class="action_btn cancel_btn">Cancel</button>
                </div>
            </div>

            <div v-if="expanded" class="details">
                <div
                    v-for="(item, i) in subscription.items"
                    :key="i"
                    class="plan_detail"
                    :style="{
                        backgroundColor: lighten(getPlanById(item.meal_plan_id).colors.light, 0.7)
                    }"
                >
                    <p>
                        <strong :style="{ color: getPlanById(item.meal_plan_id).colors.medium }"
                            >🍽️ Meal Plan:</strong
                        >
                        {{ capitalize(getPlanById(item.meal_plan_id).title) }}
                    </p>
                    <p>
                        <strong :style="{ color: getPlanById(item.meal_plan_id).colors.medium }"
                            >🕑 Meal Types:</strong
                        >
                        {{ item.meal_types.join(", ") }}
                    </p>
                    <p>
                        <strong :style="{ color: getPlanById(item.meal_plan_id).colors.medium }"
                            >📦 Delivery Days:</strong
                        >
                        {{ item.delivery_days.map(capitalize).join(", ") }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, inject, watch } from "vue";
    import { getData, updateData, deleteData } from "./composables/useSupabase";

    const props = defineProps({
        index: Number,
        title: String
    });

    const subscription = defineModel("subscription");

    const expanded = ref(false);

    const formatPrice = (price) => price.toLocaleString("id-ID");
    const formatDate = (date) =>
        new Date(date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    const cardColors = [
        {
            border: "var(--color-paprika-red)",
            text: "#d45a36"
        },
        {
            border: "var(--color-sunset-orange)",
            text: "var(--color-sunset-orange)"
        },
        {
            border: "var(--color-lime-leaf)",
            text: "var(--color-fresh-basil)"
        },
        {
            border: "var(--color-pink)",
            text: "#5953ad"
        }
    ];

    const currentStyle = computed(() => cardColors[props.index % 4]);

    const plans = ref([]);

    async function loadMealPlans() {
        try {
            const { data: mealPlans } = await getData("meal_plans");

            plans.value = mealPlans.map((plan) => ({
                id: plan.id,
                title: plan.title,
                desc_short: plan.desc_short,
                price: plan.price,
                colors: plan.colors,
                hero_image: plan.hero_image
            }));
        } catch (err) {
            console.error("Failed to load meal plans:", err.message);
        }
    }

    function getPlanById(id) {
        for (let i = 0; i < plans.value.length; i++) {
            if (plans.value[i].id === id) {
                return plans.value[i];
            }
        }
        return null;
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function lighten(hex, mix = 0.7) {
        const base = [255, 255, 255]; // soft white
        const num = parseInt(hex.replace("#", ""), 16);
        const rgb = [(num >> 16) & 255, (num >> 8) & 255, num & 255];

        const mixed = rgb.map((channel, i) => Math.round(channel * (1 - mix) + base[i] * mix));

        return "#" + mixed.map((x) => x.toString(16).padStart(2, "0")).join("");
    }

    // pause subscription
    const calendarVisible = inject("calendarVisible");
    const resumeDate = inject("resumeDate");
    const pausedSubId = inject("pausedSubId");

    function showCalendar() {
        resumeDate.value = null;
        calendarVisible.value = true;
        pausedSubId.value = subscription.value.id;
    }

    // Watch resumeDate when modal closes
    watch([calendarVisible, resumeDate], async ([visible, date]) => {
        if (!visible && date && pausedSubId.value === subscription.value.id) {
            const now = new Date().toISOString();

            subscription.value.status = "paused";
            subscription.value.pause_start = now;
            subscription.value.pause_end = date;

            console.log("Paused subscription value:", subscription.value);
            console.log("Paused subscription ID:", subscription.value.id);

            const { error } = await updateData(
                "subscriptions",
                { id: subscription.value.id },
                {
                    status: "paused",
                    pause_start: now,
                    pause_end: date
                }
            );

            if (error) {
                console.error("Failed to pause subscription:", error.message);
            }

            resumeDate.value = null;
            pausedSubId.value = null;
        }
    });

    onMounted(async () => {
        await loadMealPlans();
    });
</script>

<style scoped>
    .subscription_card {
        border-radius: 1rem;
        border: 2px solid;
        width: 100%;
        background-color: white;
        box-shadow: 4px 4px 3px rgba(105, 51, 3, 0.1);
        overflow: hidden;
        transition: transform 0.2s ease;
    }

    .subscription_content {
        padding: clamp(0.5rem, 3vw, 1rem);
        background-color: white;
    }

    .card_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: clamp(0.5rem, 2vw, 1rem);
    }

    .title {
        font-size: clamp(1rem, 2.5vw, 1.2rem);
        font-weight: 700;
        margin: 0;
    }

    .info_row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
        margin-bottom: 1rem;
    }

    .info_block {
        flex-grow: 1;
    }

    .action_buttons {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .action_btn {
        padding: 0.8rem;
        border: none;
        border-radius: 0.6rem;
        font-size: clamp(0.88rem, 1.2vw, 1rem);
        cursor: pointer;
        font-weight: 600;
        transition: background-color 0.2s ease;
    }

    .pause_btn {
        background-color: #fef08a;
        color: #a16207;
    }

    .cancel_btn {
        background-color: #fecaca;
        color: #991b1b;
    }

    .info_block {
        background-color: #fff;
        border-radius: 1.2rem;
        font-size: clamp(0.95rem, 1.1vw, 1.1rem);
    }

    .toggle_btn {
        background: none;
        border: none;
        color: #683213;
        cursor: pointer;
        font-weight: 600;
        font-size: clamp(0.8rem, 1vw, 1rem);
        padding: 0.3rem;
    }

    .details {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        margin-top: clamp(0.8rem, 2vw, 1rem);
        border-radius: 1rem;
    }

    .plan_detail {
        padding: clamp(0.6rem, 1.5vw, 0.9rem);
        border-radius: 8px;
        font-size: clamp(0.9rem, 1.1vw, 1.1rem);
    }

    @media (min-width: 1024px) {
        .action-buttons {
            flex-direction: row;
        }
    }
</style>
