<script setup lang="ts">
import Header from './components/header/HeaderBar.vue';
</script>

<template>
    <v-layout>
        <v-main>
            <div class="main-wrapper">
                <div class="main-container">
                    <Header />
                    <div class="main-component">
                        <router-view v-slot="{ Component }">
                            <component :is="Component" />
                        </router-view>
                    </div>
                </div>
            </div>
        </v-main>
    </v-layout>
</template>

<style lang="scss" scoped>
:deep(v-layout),
:deep(.v-navigation-drawer) {
    height: 100vh !important;
    border-right: 1px solid #e9e9eb;
}

:deep(.v-navigation-drawer) {
    position: fixed !important;
}

.main-wrapper {
    height: 100%;
    min-height: 100vh;
    background-color: $color-white;
}

.main-container {
    margin: auto;
    height: 100%;
}

.main-component {
    padding: 12px 12px 0 12px;
}
</style>
