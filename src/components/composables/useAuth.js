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
        const { data: profile } = await supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", authUser.id)
            .single();

        isAdmin.value = profile?.is_admin === true;
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

    const userId = data?.user?.id;
    if (!userId) {
        return { success: false, error: "Could not retrieve user ID after sign-up." };
    }

    const { error: profileError } = await insertData("profiles", {
        id: userId,
        username,
        full_name: fullName,
        phone,
        allergies,
        created_at: new Date().toISOString()
    });

    if (profileError) {
        return { success: false, error: profileError.message };
    } else {
        await fetchProfile();

        return {
            success: true,
            message: "Success! Please check your email to confirm your account."
        };
    }
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
