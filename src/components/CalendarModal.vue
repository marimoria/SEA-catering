<template>
    <div class="modal" v-if="model">
        <div class="modal_box">
            <h2>Pick Resume Date</h2>

            <input type="date" v-model="resumeDate" :min="today" class="date_input" />

            <div class="actions">
                <button class="confirm_btn" @click="confirm">Confirm</button>
                <button class="cancel_btn" @click="model = false">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    const model = defineModel("visible");
    const resumeDate = defineModel("resumeDate");

    const today = new Date().toISOString().split("T")[0];

    function confirm() {
        if (resumeDate) {
            model.value = false;
        }
    }
</script>

<style scoped>
    .modal {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal_box {
        background: white;
        padding: clamp(1rem, 5vw, 2rem);
        border-radius: clamp(0.75rem, 2vw, 1rem);
        width: 90%;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .date_input {
        width: 100%;
        font-size: clamp(0.9rem, 2.5vw, 1.1rem);
        padding: clamp(0.5rem, 2vw, 0.6rem);
        border: 1px solid #ccc;
        border-radius: clamp(0.4rem, 1vw, 0.5rem);
        margin-top: 1rem;
    }

    .actions {
        margin-top: clamp(1rem, 3vw, 1.5rem);
        display: flex;
        justify-content: center;
        gap: clamp(0.5rem, 2vw, 1rem);
    }

    .confirm_btn,
    .cancel_btn {
        padding: clamp(0.4rem, 1.5vw, 0.5rem) clamp(1rem, 3vw, 1.2rem);
        border-radius: clamp(0.4rem, 1vw, 0.5rem);
        font-size: clamp(0.9rem, 2.2vw, 1rem);
        font-weight: bold;
        border: none;
        cursor: pointer;
    }

    .confirm_btn {
        background: #bbf7d0;
        color: #166534;
    }

    .cancel_btn {
        background: #fecaca;
        color: #991b1b;
    }
</style>
