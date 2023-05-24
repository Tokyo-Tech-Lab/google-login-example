<script lang="ts" setup>
import localStorageAuthService from '@/common/storages/authStorage';
import { PageName } from '@/common/constants';
import { useLoginStore } from '@/features/auth/stores/login.store';
import { useRouter } from 'vue-router';

const router = useRouter();

const loginStore = useLoginStore();
const userEmail = localStorageAuthService.getLoginUser()?.email;

const logout = () => {
    localStorageAuthService.resetAll();
    const currentPage = router.currentRoute?.value;
    if (currentPage?.meta?.requiresAuth) {
        router.push({
            name: PageName.LOGIN_PAGE,
        });
    }
    loginStore.resetLoginUser();
};
</script>

<template>
    <div>
        <div class="d-flex flex-row align-items-center">
            <div class="d-flex flex-column text-right">
                <span>{{ userEmail }}</span>
            </div>
            <div class="user-image">
                <img class="avatar" src="@/assets/images/avatar-default.png" alt="" />
            </div>
            <v-menu
                activator="parent"
                offset="10"
                min-width="100"
                width="190"
                location="bottom end"
            >
                <v-list>
                    <v-list-item>
                        <div @click="logout" class="d-flex flex-row align-items-center">
                            <img class="icon" src="@/assets/icons/logout.svg" alt="" />
                            <span>{{ $t('app.header.title.logout') }}</span>
                        </div>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.user-image {
    margin-left: 8px;
}

.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.icon {
    margin-right: 8px;
    width: 21px;
}

:deep(.v-list-item) {
    min-height: 42px !important;
    cursor: pointer;

    &:hover {
        background-color: $color-white-01;
    }
}
</style>
