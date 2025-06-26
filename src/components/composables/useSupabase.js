import { supabase } from "../../lib/supabaseClient";

export async function getData(table, filters = {}, options = {}) {
    let query = supabase.from(table).select();

    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
    }

    if (options.orderBy) {
        query = query.order(options.orderBy.column, {
            ascending: options.orderBy.ascending ?? true
        });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
}

export async function insertData(table, payload) {
    const { data, error } = await supabase.from(table).insert(payload);
    if (error) throw error;
    return data;
}

export async function updateData(table, match, updates) {
    const { data, error } = await supabase.from(table).update(updates).match(match);
    if (error) throw error;
    return data;
}

export async function deleteData(table, match) {
    const { data, error } = await supabase.from(table).delete().match(match);
    if (error) throw error;
    return data;
}

export { supabase };
