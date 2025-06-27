import { ref } from "vue";
import { supabase, insertData, updateData } from "../composables/useSupabase";

const user = ref(null); // only contains email + metadata
const profile = ref(null);
const isAdmin = ref(false);

export async function fetchProfile() {
    const {
        data: { user: authUser }
    } = await supabase.auth.getUser();

    if (authUser) {
        user.value = authUser;

        const { data: profileData, error } = await supabase
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

        const { data: checkAdmin } = await supabase
            .from("admin_roles")
            .select("*")
            .eq("id", authUser.id)
            .single();

        isAdmin.value = !!checkAdmin;
        profile.value = profileData;
    }
}

export async function handleSignUp({ email, password, username, fullName, phone, allergies }) {
    if (!isValidIndonesianPhone(phone)) {
        return { success: false, error: "Phone number is not Indonesian." };
    }

    // check for dupes
    const { data: dupesData, error: dupesError } = await supabase.functions.invoke(
        "checkUniqueSignUp",
        {
            body: { username: username, phone: phone }
        }
    );

    if (dupesError) {
        return { succes: false, error: dupesError.message };
    }

    if (dupesData.usernameExists) {
        return { success: false, error: "Username already exists." };
    } else if (dupesData.phoneExists) {
        return { success: false, error: "Phone number is invalid." };
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: "https://marimoria.github.io/SEA-catering/#/login",
            // save to meta data
            data: {
                username,
                full_name: fullName,
                phone,
                allergies
            }
        }
    });

    if (error) {
        return { success: false, error: error.message };
    }

    return {
        success: true,
        message: "A confirmation link will be sent to your email in a few minutes."
    };
}

export async function handleLogin({ email, password }) {
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        return { success: false, error: error.message };
    } else {
        await fetchProfile();
        return { success: true, message: "Successfully logged in!" };
    }
}

export async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Logout error:", error.message);
        return { success: false, error: error.message };
    }

    user.value = null;
    profile.value = null;
    isAdmin.value = false;

    return { success: true };
}

export async function updateAllergies(newAllergy) {
    try {
        await updateData("profiles", { id: user.value.id }, { allergies: newAllergy });

        profile.value = {
            ...profile.value,
            allergies: newAllergy
        };

        return { success: true };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

export function isValidIndonesianPhone(phoneNumber) {
    const regex = /^\+62[0-9]{8,12}$/;
    return regex.test(phoneNumber);
}

export { user, isAdmin, profile };
