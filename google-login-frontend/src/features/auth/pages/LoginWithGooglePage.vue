<script setup lang="ts">
import { useLoginStore } from '../stores/login.store';
import iconGoogle from '../../../assets/images/authentication/icongoogle.svg';
import { HttpStatus } from '@/common/constants';

const loginStore = useLoginStore();

const doLogin = async () => {
    const response = await loginStore.getGoogleLoginUrl();

    if (response?.status === HttpStatus.OK) {
        const { data } = response;
        window.location.replace(data.data.loginUrl);
    } else {
        // TODO: Show error message
    }
};
</script>

<template>
    <div class="d-flex justify-center align-center login-page-wrapper">
        <div class="login-form-wrapper">
            <v-responsive class="login-block-1">
                <img src="@/assets/images/authentication/login-block-1.svg" alt="" />
            </v-responsive>
            <v-responsive class="login-block-2">
                <img src="@/assets/images/authentication/login-block-2.svg" alt="" />
            </v-responsive>
            <form @submit.prevent="doLogin">
                <v-card class="d-flex flex-column mt-12 mt-sm-0 pa-6 login-form-body">
                    <v-container class="pa-4">
                        <v-row>
                            <v-col cols="12">
                                <div class="mb-3 logo-wrapper d-flex justify-center">
                                    <img
                                        src="../../../assets/images/logo.png"
                                        alt=""
                                        height="40"
                                    />
                                </div>
                            </v-col>

                            <v-col cols="12" class="login-page-login">
                                <v-btn
                                    class="mt-1 login-page-button"
                                    color="white"
                                    elevation="1"
                                    type="submit"
                                >
                                    <div class="login-page-button-img">
                                        <img :src="iconGoogle" alt="logo" />
                                    </div>
                                    {{ $t('auth.login.button.loginWithGoogle') }}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
.login-page-wrapper {
    height: 100vh;
    position: relative;

    .login-form-body {
        max-width: 448px;
        width: 100%;
        border-width: 0px;
        box-shadow: none;
        border-color: rgba(var(--v-border-color), var(--v-border-opacity));
        box-shadow: 0 3px 9px 1px rgba(var(--v-theme-on-surface), 0.03),
            0 9px 8px rgba(var(--v-theme-on-surface), 0.02),
            0 1px 6px 4px rgba(var(--v-theme-on-surface), 0.01);
        border-radius: 6px;
    }

    .login-form-wrapper {
        position: relative;
        :deep(.v-responsive) {
            position: absolute;
        }
        .login-block-1 {
            inset-block-start: -77px;
            inset-inline-start: -40px;
        }
        .login-block-2 {
            inset-block-end: -55px;
            inset-inline-end: -55px;
        }

        @media (min-width: 600px) {
            margin-top: 64px !important;
            margin-bottom: 64px !important;
        }
    }
}

// css button login

.login-page-login {
    display: flex;
    align-items: center;
    justify-content: center;
    .login-page-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ccc;
        .login-page-button-img {
            width: 20px;
            margin-right: 10px;
            img {
                width: 100%;
            }
        }
    }
}
</style>
