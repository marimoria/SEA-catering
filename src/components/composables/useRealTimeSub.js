import { supabase } from "./useSupabase";

let channel = null;

export function useRealtimeSubs(callback) {
    if (!channel) {
        channel = supabase
            .channel("realtime:subscriptions")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "subscriptions" },
                callback
            )
            .subscribe();
    }

    return { channel };
}
