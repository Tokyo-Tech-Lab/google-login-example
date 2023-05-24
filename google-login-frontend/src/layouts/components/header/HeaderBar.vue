<script setup lang="ts">
import HeaderBarLanguage from './HeaderBarLanguage.vue';
import HeaderBarUser from './HeaderBarUser.vue';
</script>

<template>
    <div class="header-container">
        <div class="d-flex flex-row-reverse align-items-center">
            <div class="d-flex flex-row align-items-center">
                <div class="header-item">
                    <HeaderBarLanguage />
                </div>
                <div class="header-item">
                    <HeaderBarUser />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header-container {
    padding: 14px 0;
    border-bottom: 1px solid #e9e9eb;
}

.header-item {
    padding: 0 10px;
    border-radius: 20px;
    cursor: pointer;
}
</style>
