<script setup lang="ts">
import Image404 from '@/assets/icons/error404.svg';
</script>
<template>
    <div class="wrapper">
        <v-row class="content">
            <v-col cols="6" class="left">
                <span class="header">{{ $t('error.header') }}</span>
                <h3 class="title">{{ $t('error.title') }}</h3>
                <span class="description"> {{ $t('error.description') }} </span>
            </v-col>
            <v-col cols="6">
                <v-img height="60vh" :src="Image404" />
            </v-col>
        </v-row>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    align-items: center;
    width: 60%;
    height: 100vh;
    margin: auto;
    .content {
        padding: 40px 60px;
        border-radius: 10px;
        background-color: $color-white-01;
        .left {
            align-self: center;
        }
        .header {
            color: $color-red;
            font-size: 16px;
            font-weight: 600;
        }
        .title {
            margin: 20px 0;
            font-size: 30px;
            font-weight: 600;
        }
    }
}
</style>
