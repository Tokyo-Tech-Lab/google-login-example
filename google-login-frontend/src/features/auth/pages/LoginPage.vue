<script setup lang="ts">
import { useLoginStore } from '../stores/login.store';
import iconGoogle from '../../../assets/images/authentication/icon-google.svg';


const loginStore = useLoginStore();

const doLogin = async () => {
    // call API to get googleLoginUrl
    await loginStore.getGoogleLoginUrl();

    if (loginStore.googleLoginUrl) {
        // redirect to google login url
        window.location.href = loginStore.googleLoginUrl;
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
                        <v-col cols="12" class="button-login-wrapper">
                            <v-btn
                                class="mt-1 button-login"
                                color="white"
                                elevation="1"
                                type="button"
                                @click="doLogin"
                            >
                                <div class="button-login-img">
                                    <img :src="iconGoogle" alt="logo" />
                                </div>
                                {{ $t('auth.login.button.loginWithGoogle') }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
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

.button-login-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    .button-login {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ccc;
        .button-login-img {
            width: 20px;
            margin-right: 10px;
            img {
                width: 100%;
            }
        }
    }
}
</style>
