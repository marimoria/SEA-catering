<template>
    <router-view v-slot="{ Component }">
        <Transition name="fade-slide" mode="out-in">
            <component :is="Component" :viewport="viewport" :device="device" />
        </Transition>
    </router-view>
</template>

<script setup></script>
