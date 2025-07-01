<template>
    <div class="admin_dashboard">
        <div class="background"></div>
        <Navbar />

        <div class="admin_dashboard_grid">
            <div class="admin_dashboard_grid--header">
                <p class="header--greet">
                    Welcome, <span class="highlight_paprika">{{ profile.username }}</span>
                </p>
            </div>

            <section class="date_range">
                <p class="date_range--title">Filter by Date Range</p>
                <div class="date_range--inputs">
                    <div class="date_input">
                        <label for="start">From</label>
                        <input id="start" type="date" v-model="startDate" />
                    </div>
                    <div class="date_input">
                        <label for="end">To</label>
                        <input id="end" type="date" v-model="endDate" />
                    </div>
                    <button class="apply_button" @click="fetchMetrics">Apply</button>
                </div>
            </section>

            <section class="metrics_grid">
                <p class="metrics_grid--title">Click to see the graph</p>
                <div class="metrics">
                    <div class="metric_card">
                        <p class="metric_title">New Subscriptions</p>
                        <p class="metric_value">20</p>
                    </div>
                    <div class="metric_card">
                        <p class="metric_title">MRR</p>
                        <p class="metric_value">Rp 20.000</p>
                    </div>
                    <div class="metric_card">
                        <p class="metric_title">Reactivations</p>
                        <p class="metric_value">3</p>
                    </div>
                    <div class="metric_card">
                        <p class="metric_title">Total Subscriptions</p>
                        <p class="metric_value">{{ subscriptions.length }}</p>
                    </div>
                </div>
            </section>

            <section class="metrics_content">
                <div class="metrics_content--subs_panel">
                    <p class="subs_panel--panel_title">Subscriptions Panel</p>
                    <div class="search_area">
                        <input
                            type="text"
                            v-model="subscriptionFilter"
                            placeholder="Subscription id"
                        />
                    </div>
                    <div class="subs_panel--subs_viewer">
                        <p v-if="!hasSubscriptions" class="no_subs">There are no subscriptions</p>
                        <SubscriptionCard
                            v-for="(sub, i) in filteredSubscriptions"
                            :key="sub.id"
                            v-model:subscription="subscriptions[i]"
                            :title="'Subscription ' + (i + 1)"
                            :index="i"
                            @deleted="handleDelete"
                        />
                    </div>
                </div>

                <div class="metrics_content--graphs">
                    <p class="graphs--title"></p>
                </div>
            </section>
        </div>

        <CalendarModal v-model:visible="calendarVisible" v-model:resumeDate="resumeDate" />
        <DeleteConfirmModal v-model:visible="delVisible" v-model:confirm="delConfirm" />
    </div>
</template>

<style lang="scss" scoped>
    @use "../assets/styles/adminDash.scss";
</style>

<script setup>
    import Navbar from "../components/Navbar.vue";
    import SubscriptionCard from "../components/SubscriptionCard.vue";
    import CalendarModal from "../components/CalendarModal.vue";
    import DeleteConfirmModal from "../components/DeleteConfirmModal.vue";

    import { profile } from "../components/composables/useAuth";
    import { getData } from "../components/composables/useSupabase";
    import { onMounted, computed, ref, provide } from "vue";

    const props = defineProps({
        viewport: Object,
        device: Object
    });

    const startDate = ref(null);
    const endDate = ref(null);

    const hasSubscriptions = ref(false);
    const subscriptions = ref([]);

    async function loadSubscriptions() {
        const { data: subsData, error: subsError } = await getData(
            "subscriptions",
            {},
            {
                select: `*, subscription_items (id, meal_plan_id, meal_types, delivery_days, created_at)`
            }
        );

        if (subsError) {
            console.error("Error loading subscriptions:", subsError);
            return;
        }

        if (subsData && subsData.length > 0) {
            hasSubscriptions.value = true;
        }

        subscriptions.value = subsData || [];
    }

    // pause
    const calendarVisible = ref(false);
    const resumeDate = ref(null);
    const pausedSubId = ref(null); // Track which subscription triggered the modal

    provide("calendarVisible", calendarVisible);
    provide("resumeDate", resumeDate);
    provide("pausedSubId", pausedSubId);

    // delete
    const delVisible = ref(false);
    const delConfirm = ref(false);
    const delSubId = ref(null); // Track which subscription triggered the modal

    provide("delVisible", delVisible);
    provide("delConfirm", delConfirm);
    provide("delSubId", delSubId);

    function handleDelete(id) {
        subscriptions.value = subscriptions.value.filter((sub) => sub.id !== id);
    }

    // filter feature
    const subscriptionFilter = ref("");

    const filteredSubscriptions = computed(() => {
        if (!subscriptionFilter.value) {
            return subscriptions.value;
        }
        return subscriptions.value.filter((sub) => sub.id === subscriptionFilter.value.trim());
    });

    onMounted(async () => {
        await loadSubscriptions();
    });
</script>
