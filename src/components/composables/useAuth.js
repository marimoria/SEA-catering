import { ref } from "vue";
import { supabase, getData, insertData } from "../composables/useSupabase";

const user = ref(null);
const isAdmin = ref(false);

export async function fetchProfile() {
    const {
        data: { user: authUser }
    } = await supabase.auth.getUser();

    user.value = authUser;

    if (authUser) {
        const { data: profile, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", authUser.id)
            .single();

        if (error && error.code === "PGRST116") {
            // User authenticated but row not created yet
            const { error: insertError } = await insertData("profiles", {
                id: authUser.id,
                username: authUser.user_metadata?.username ?? "unknown",
                full_name: authUser.user_metadata?.full_name ?? "",
                phone: authUser.user_metadata?.phone ?? "",
                allergies: authUser.user_metadata?.allergies ?? "",
                created_at: new Date().toISOString()
            });

            if (insertError) {
                console.error("Insert profile failed:", insertError);
            }
        }

        const { data: check } = await supabase
            .from("admin_roles")
            .select("*")
            .eq("id", authUser.id)
            .single();

        isAdmin.value = !!check;
    }
}

export async function handleSignUp({ email, password, username, fullName, phone, allergies }) {
    // Check for duplicate username
    const usernameExists = await getData("profiles", { username });
    if (usernameExists.length > 0) {
        return { success: false, error: "Username already exists." };
    }

    // Check for duplicate phone
    const phoneExists = await getData("profiles", { phone });
    if (phoneExists.length > 0) {
        return { success: false, error: "Phone number already registered." };
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        return { success: false, error: error.message };
    }

    return {
        success: true,
        message: "Success! Please check your email to confirm your account."
    };
}

export async function handleLogin({ email, password }) {
    const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    });

    if (error) {
        return { success: false, error: error.message };
    } else {
        await fetchProfile();
        return { success: true, message: "Successfully logged in!" };
    }
}

export { user, isAdmin };
