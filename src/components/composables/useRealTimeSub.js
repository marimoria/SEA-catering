import { supabase } from "./useSupabase";

let channel = null;

export function useRealtimeSubs(callback) {
    if (!channel) {
        channel = supabase
            .channel("realtime:subscriptions")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "subscriptions" },
                { event: "UPDATE", schema: "public", table: "subscriptions" },
                { event: "DELETE", schema: "public", table: "subscriptions" },
                callback
            )
            .subscribe();
    }

    return { channel };
}
