<template>
    <div class="modal" v-if="delVisible">
        <div class="modal_box">
            <h2>Are you sure?</h2>
            <p class="modal_message">This action will permanently delete your subscription.</p>

            <div class="actions">
                <button class="confirm_btn" @click="confirmDelete">Delete</button>
                <button class="cancel_btn" @click="delVisible = false">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    const delVisible = defineModel("visible");
    const delConfirm = defineModel("confirm");

    function confirmDelete() {
        delConfirm.value = true;
        delVisible.value = false;
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

    .modal_message {
        font-size: clamp(0.9rem, 2.5vw, 1.1rem);
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
        background: #fecaca;
        color: #991b1b;
    }

    .cancel_btn {
        background: #bbf7d0;
        color: #166534;
    }
</style>
