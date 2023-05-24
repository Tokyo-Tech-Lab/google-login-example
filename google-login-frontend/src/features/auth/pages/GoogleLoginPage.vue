<script setup lang="ts">
import { HttpStatus, PageName } from '@/common/constants';

import { useRoute, useRouter } from 'vue-router';

import { useLoginStore } from '../stores/login.store';

const loginStore = useLoginStore();
const route = useRoute();
const router = useRouter();

async function loginWithGoogle() {
    const token = route.query.code || '';
    if (token) {
        const redirectUri = `${window.location.origin}/google-login`;
        const response = await loginStore.login({
            token: token as string,
            redirectUri,
        });
        if (response?.status === HttpStatus.OK) {
            router.push({ name: PageName.DASHBOARD_PAGE });
            return;
        }
    }
    // TODO: show error message
    router.push({ name: PageName.LOGIN_PAGE });
}
loginWithGoogle();
</script>

<template>
    <div></div>
</template>

<style scoped lang="scss"></style>
