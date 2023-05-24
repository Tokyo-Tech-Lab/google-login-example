<script lang="ts" setup>
import localStorageAuthService from '@/common/storages/authStorage';
import { SupportLanguage } from '@/common/constants';
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const currentLanguage = ref(localStorageAuthService.getLanguage());

const { t, locale } = useI18n({ useScope: 'global' });

const onChangeLanguage = (language: SupportLanguage) => {
    localStorageAuthService.setLanguage(language);
    locale.value = language;
};

const languageOptions = () => {
    return Object.values(SupportLanguage).map((item) => ({
        title: t(`app.header.languages.${item}`),
        value: item,
    }));
};

const imageUrl = (item: { value: string }) => {
    return new URL(`/src/assets/icons/flag-${item.value}.svg`, import.meta.url).href;
};

onMounted(() => {
    locale.value = currentLanguage.value;
});
</script>

<template>
    <v-select
        v-model="currentLanguage"
        :items="languageOptions()"
        variant="solo"
        menu-icon="mdi-chevron-down"
        @update:modelValue="onChangeLanguage"
    >
        <template v-slot:selection="{ item }">
            <div class="d-flex flex-row align-items-center">
                <img class="language-icon" :src="imageUrl(item)" alt="" />
            </div>
            <span class="d-flex flex-row align-items-center">{{ item.title }}</span>
        </template>
        <template v-slot:item="{ item, props }">
            <v-list-item v-bind="props">
                <template v-slot:prepend>
                    <img class="language-icon" :src="imageUrl(item)" alt="" />
                </template>
            </v-list-item>
        </template>
    </v-select>
</template>

<style lang="scss" scoped>
.v-list {
    background-color: transparent;
}

.v-list-item {
    padding-inline-start: 4px !important;
    padding-inline-end: 8px !important;
    min-height: 42px;
    height: 42px;
}

.language-icon {
    margin-left: 4px;
    margin-right: 5px;
    width: 30px;
}

:deep(.v-field) {
    padding-right: 0;
}

:deep(.v-field__append-inner) {
    padding-top: 0;
    align-items: center;
}

:deep(.v-input__details) {
    display: none;
}

:deep(.v-input) {
    width: 150px;
}

:deep(.v-select__selection-text) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

:deep(.v-field) {
    background-color: transparent;
    box-shadow: none;
    border: none;

    &:hover {
        box-shadow: none;
    }
    &.v-field--focused {
        box-shadow: none;
    }
}

:deep(.v-field__input) {
    padding: 5px 0 5px 8px;
    min-height: auto;
}
</style>
