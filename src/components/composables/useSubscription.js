import {
    getData,
    insertData,
    supabase,
    updateData,
    deleteData
} from "../../components/composables/useSupabase";
import { watch } from "vue";

export async function loadSubscriptions(user, hasSubscriptions, subscriptions) {
    const { data: subsData, error: subsError } = await getData(
        "subscriptions",
        { user_id: user.value.id },
        {
            select: `*, subscription_items (meal_plan_id, meal_types, delivery_days)`,
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

export async function insertSubscription(
    user,
    totalPrice,
    isLoading,
    errorMessage,
    successMessage,
    chosenPlans,
    chosenTypes,
    chosenDays
) {
    isLoading.value = true;

    // Insert into subscriptions table
    const { error: subsError } = await insertData("subscriptions", {
        user_id: user.value.id,
        status: "active",
        total_price: totalPrice.value,
        created_at: new Date().toISOString()
    });

    if (subsError) {
        isLoading.value = false;
        errorMessage.value = "Something went wrong while inserting to subscriptions.";
        return;
    }

    const { data: latestSubs, error: getSubError } = await getData(
        "subscriptions",
        { user_id: user.value.id },
        {
            orderBy: { column: "created_at", ascending: false }
        }
    );

    if (getSubError) {
        isLoading.value = false;
        errorMessage.value = "Failed to fetch latest subscription:" + error.message;
        return;
    }

    const latestSub = latestSubs?.[0];

    // Insert each chosen meal plan as a subscription_item
    const itemsPayload = chosenPlans.value.map((planId) => ({
        subscription_id: latestSub.id,
        meal_plan_id: planId,
        meal_types: chosenTypes.value[planId],
        delivery_days: chosenDays.value[planId],
        created_at: new Date().toISOString()
    }));

    const cleanItems = itemsPayload.filter(
        (item) => item.meal_types.length && item.delivery_days.length
    );

    const { error: itemsError } = await insertData("subscription_items", cleanItems);

    await supabase.functions.invoke("updateMRR", {
        body: {
            type: "create",
            price: totalPrice.value,
            date: new Date().toISOString()
        }
    });

    if (!!itemsError) {
        isLoading.value = false;
        errorMessage.value = "Something went wrong: " + itemsError.message;
    } else {
        isLoading.value = false;
        successMessage.value = "Subscription is now active!";
    }
}

export function watchToPause(calendarVisible, resumeDate, subscription, pausedSubId, emitEvents) {
    watch([calendarVisible, resumeDate], async ([visible, date]) => {
        if (!visible && date && pausedSubId.value === subscription.value.id) {
            const now = new Date().toISOString();

            const { error } = await updateData(
                "subscriptions",
                { id: subscription.value.id },
                {
                    status: "paused",
                    pause_start: now,
                    pause_end: date
                }
            );

            await supabase.functions.invoke("updateMRR", {
                body: {
                    type: "pause",
                    price: subscription.value.total_price,
                    date: subscription.value.created_at
                }
            });

            if (error) {
                console.error("Failed to pause subscription:", error.message);
                return;
            }

            subscription.value.status = "paused";
            subscription.value.pause_start = now;
            subscription.value.pause_end = date;

            emitEvents("paused");
            resumeDate.value = null;
            pausedSubId.value = null;
        }
    });
}

export async function resumeSubscription(subscription, emitEvents) {
    const { error } = await updateData(
        "subscriptions",
        { id: subscription.id },
        {
            status: "active",
            pause_start: null,
            pause_end: null
        }
    );

    if (error) {
        console.error("Failed to reactivate subscription:", error.message);
        return;
    }

    const now = new Date().toISOString();

    const { error: eventError } = await insertData("subscription_events", {
        subscription_id: subscription.id,
        event_type: "reactivated",
        event_date: now
    });

    await supabase.functions.invoke("updateMRR", {
        body: {
            type: "reactivate",
            price: subscription.total_price,
            date: subscription.created_at
        }
    });

    if (eventError) {
        console.error("Failed to log reactivate subscription:", eventError.message);
        return;
    }

    emitEvents("reactivated");
    subscription.status = "active";
    subscription.pause_start = null;
    subscription.pause_end = null;
}

export function watchToDelete(delVisible, delConfirm, subscription, delSubId, emitEvents) {
    watch([delVisible, delConfirm], async ([visible, confirm]) => {
        if (!visible && confirm && delSubId.value === subscription.value.id) {
            const { error } = await deleteData("subscriptions", { id: subscription.value.id });

            await supabase.functions.invoke("updateMRR", {
                body: {
                    type: "cancel",
                    price: subscription.value.total_price,
                    date: subscription.value.created_at
                }
            });

            if (error) {
                console.error("Failed to delete subscription:", error.message);
                return;
            }

            emitEvents("deleted", subscription.value.id);
            delConfirm.value = false;
            delSubId.value = null;
        }
    });
}
