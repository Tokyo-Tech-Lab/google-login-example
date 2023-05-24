<script setup lang="ts"></script>

<template>
    <div class="auth-layout">
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
    </div>
</template>
<style lang="scss" scoped>
.auth-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>
