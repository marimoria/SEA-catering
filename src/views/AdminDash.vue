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
                    <div @click="switchGraphs('newSubs')" class="metric_card">
                        <p class="metric_title">New Subscriptions</p>
                        <p class="metric_value">{{ newSubsCountTotal }}</p>
                    </div>
                    <div @click="switchGraphs('mrr')" class="metric_card">
                        <p class="metric_title">MRR</p>
                        <p class="metric_value">Rp 20.000</p>
                    </div>
                    <div @click="switchGraphs('reactivations')" class="metric_card">
                        <p class="metric_title">Reactivations</p>
                        <p class="metric_value">{{ reactivationsCountTotal }}</p>
                    </div>
                    <div @click="switchGraphs('totalSubs')" class="metric_card">
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
                            @deleted="handleDelete(sub.id)"
                            @paused="fetchMetrics()"
                        />
                    </div>
                </div>

                <div class="metrics_content--graphs">
                    <p v-if="graphs.totalSubs" class="graphs--title">Total Subscriptions</p>
                    <PieChart
                        v-if="graphs.totalSubs && totalSubsData.datasets?.length"
                        :chartData="totalSubsData"
                        :chartOptions="totalSubsOption"
                    />

                    <p v-if="graphs.newSubs" class="graphs--title">Total Subscriptions</p>
                    <BarChart
                        v-if="graphs.newSubs && newSubsData.datasets?.length"
                        :chartData="newSubsData"
                        :chartOptions="newSubsOption"
                    />

                    <p v-if="graphs.reactivations" class="graphs--title">Reactivations</p>
                    <BarChart
                        v-if="graphs.reactivations && reactivationData.datasets?.length"
                        :chartData="reactivationData"
                        :chartOptions="reactivationOption"
                    />
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
    import PieChart from "../components/charts/PieChart.vue";
    import BarChart from "../components/charts/BarChart.vue";

    import { profile } from "../components/composables/useAuth";
    import { getData } from "../components/composables/useSupabase";
    import { useRealtimeSubs } from "../components/composables/useRealTimeSub";
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
                select: `*, subscription_items (id, meal_plan_id, meal_types, delivery_days, created_at)`,
                orderBy: { column: "created_at", ascending: false }
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

    const subscriptionEvents = ref([]);

    async function loadSubscriptionEvents() {
        const { data: eventsData, error: eventsError } = await getData(
            "subscription_events",
            {},
            {
                orderBy: { column: "event_date", ascending: false }
            }
        );

        if (eventsError) {
            console.error("Error loading subs events:", eventsError);
            return;
        }

        subscriptionEvents.value = eventsData;
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
        fetchMetrics();
    }

    // filter feature
    const subscriptionFilter = ref("");

    const filteredSubscriptions = computed(() => {
        if (!subscriptionFilter.value) {
            return subscriptions.value;
        }
        return subscriptions.value.filter((sub) => sub.id === subscriptionFilter.value.trim());
    });

    // graphs
    const graphs = ref({
        newSubs: false,
        mrr: false,
        reactivations: false,
        totalSubs: true
    });

    function switchGraphs(graphName) {
        for (const key in graphs.value) {
            graphs.value[key] = false;
        }

        graphs.value[graphName] = true;
    }

    const totalSubsData = ref({});
    const totalSubsOption = ref({});

    const newSubsData = ref({});
    const newSubsOption = ref({});
    const newSubsCountTotal = ref(0);

    const reactivationData = ref({});
    const reactivationOption = ref({});
    const reactivationsCountTotal = ref(0);

    function fetchMetrics() {
        // TOTAL SUBSCRIPTIONS, always show first by default
        const totalSubActive = subscriptions.value.filter((sub) => sub.status == "active");
        const totalSubPaused = subscriptions.value.filter((sub) => sub.status == "paused");

        totalSubsData.value = {
            labels: ["Active", "Paused"],
            datasets: [
                {
                    label: "Total Subscriptions",
                    data: [totalSubActive.length, totalSubPaused.length],
                    backgroundColor: ["#8ebe3f", "#f28c28"],
                    hoverOffset: 4
                }
            ]
        };
        totalSubsOption.value = {
            responsive: true
        };

        if (!startDate || !endDate) {
            return;
        }

        // NEW SUBSCRIPTIONS
        const startNewSub = new Date(startDate.value);
        startNewSub.setHours(0, 0, 0, 0);

        const endNewSub = new Date(endDate.value);
        endNewSub.setHours(23, 59, 59, 999);

        // all subs within range
        const newSubsRange = subscriptions.value.filter((sub) => {
            const createdAt = new Date(sub.created_at);
            return createdAt >= startNewSub && createdAt <= endNewSub;
        });

        const newSubsLabels = [];
        const currentLabel = new Date(startNewSub);

        while (currentLabel <= endNewSub) {
            newSubsLabels.push(
                new Date(currentLabel).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                })
            );
            currentLabel.setDate(currentLabel.getDate() + 1);
        }

        // count subs per label
        const newSubsCounts = newSubsLabels.map((label) => {
            return newSubsRange.filter((sub) => {
                const createdDate = new Date(sub.created_at);
                const formattedCreatedDate = createdDate.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                });
                return formattedCreatedDate === label;
            }).length;
        });

        if (newSubsCountTotal.value != 0) {
            newSubsCountTotal.value = 0;
        }

        newSubsCounts.forEach((count) => {
            newSubsCountTotal.value += count;
        });

        const barColors = [
            "#f28c28", // sunset orange
            "#d54f22", // paprika red
            "#8ebe3f", // lime leaf
            "#4f9447", // fresh basil
            "#847ddd" // pink
        ];

        newSubsData.value = {
            labels: newSubsLabels,
            datasets: [
                {
                    label: "New subscriptions",
                    data: newSubsCounts,
                    backgroundColor: newSubsCounts.map((_, i) => barColors[i % barColors.length])
                }
            ]
        };

        newSubsOption.value = {
            responsive: true,
            scales: {
                y: {
                    type: "linear",
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        };

        // REACTIVATIONS
        const startReactivation = new Date(startDate.value);
        startReactivation.setHours(0, 0, 0, 0);

        const endReactivation = new Date(endDate.value);
        endReactivation.setHours(23, 59, 59, 999);

        // all events within range
        const eventsRange = subscriptionEvents.value.filter((subEvent) => {
            const eventDate = new Date(subEvent.event_date);
            return eventDate >= startReactivation && eventDate <= endReactivation;
        });

        const reactivationLabels = [];
        const currentReactLabel = new Date(startReactivation);

        while (currentReactLabel <= endReactivation) {
            reactivationLabels.push(
                new Date(currentReactLabel).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                })
            );
            currentReactLabel.setDate(currentReactLabel.getDate() + 1);
        }

        // count events per label
        const reactivationCounts = reactivationLabels.map((label) => {
            return eventsRange.filter((event) => {
                const eventDate = new Date(event.event_date);
                const formattedEventDate = eventDate.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                });
                return formattedEventDate === label;
            }).length;
        });

        if (reactivationsCountTotal.value != 0) {
            reactivationsCountTotal.value = 0;
        }

        reactivationCounts.forEach((count) => {
            reactivationsCountTotal.value += count;
        });

        reactivationData.value = {
            labels: reactivationLabels,
            datasets: [
                {
                    label: "Reactivations",
                    data: reactivationCounts,
                    backgroundColor: reactivationCounts.map(
                        (_, i) => barColors[i % barColors.length]
                    )
                }
            ]
        };

        reactivationOption.value = {
            responsive: true,
            scales: {
                y: {
                    type: "linear",
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        };
    }

    onMounted(async () => {
        await loadSubscriptions();
        await loadSubscriptionEvents();
        fetchMetrics();

        useRealtimeSubs(async () => {
            await loadSubscriptions();
            fetchMetrics();
        });
    });
</script>
