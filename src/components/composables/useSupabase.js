import { supabase } from "../../lib/supabaseClient";

export async function getData(table, filters = {}, options = {}) {
    const selectFields = options.select ?? "*";
    let query = supabase.from(table).select(selectFields);

    for (const [key, value] of Object.entries(filters)) {
        if (typeof value === "object" && value !== null) {
            if (value.gte !== undefined) {
                query = query.gte(key, value.gte);
            }
            if (value.lte !== undefined) {
                query = query.lte(key, value.lte);
            }
        } else {
            query = query.eq(key, value);
        }
    }

    if (options.orderBy) {
        query = query.order(options.orderBy.column, {
            ascending: options.orderBy.ascending ?? true
        });
    }

    const { data, error } = await query;
    return { data, error };
}

export async function insertData(table, payload) {
    const { data, error } = await supabase.from(table).insert(payload);
    return { data, error };
}

export async function updateData(table, match, updates) {
    const { data, error } = await supabase.from(table).update(updates).match(match);
    return { data, error };
}

export async function deleteData(table, match) {
    const { data, error } = await supabase.from(table).delete().match(match);
    return { data, error };
}

export function getImageUrl(filename) {
    return `${import.meta.env.VITE_CDN_URL}/${filename}`;
}

export { supabase };
