<script setup lang="ts">
import { PageName } from '@/common/constants';

import { useRoute, useRouter } from 'vue-router';
import { GOOGLE_REDIRECT_URI } from '../constants';

import { useLoginStore } from '../stores/login.store';

const loginStore = useLoginStore();
const route = useRoute();
const router = useRouter();

async function loginWithGoogle() {
    const token = route.query.code || '';
    if (token) {
        await loginStore.login({
            token: token as string,
            redirectUri: GOOGLE_REDIRECT_URI,
        });
        if (loginStore.loginUser?.email) {
            router.push({ name: PageName.DASHBOARD_PAGE });
            return;
        }
    }
    // TODO: show error message
    router.push({ name: PageName.LOGIN_PAGE });
}
loginWithGoogle();
</script>

<style scoped lang="scss"></style>
