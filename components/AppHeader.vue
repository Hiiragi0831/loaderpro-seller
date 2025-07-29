<script setup lang="ts">
type Country = { code: "russia" | "united-states" | "china"; name?: string };
const { locale, locales, setLocale } = useI18n();
const selectedCountry = ref<Country>({ code: locale.value });
const authStore = useAuthStore();

locales.value.forEach((l) => {
  if (l.code === locale.value) {
    selectedCountry.value = { code: l.code, name: l.name };
  }
});

watch(selectedCountry, (value) => {
  setLocale(value.code);
});
</script>

<template>
  <header class="py-28">
    <div class="container m-auto flex justify-between">
      <div class="flex gap-50">
        <IconLogo class="w-228 h-48" />
        <FloatLabel class="w-140 h-50">
          <Select
            v-model="selectedCountry"
            :options="locales"
            option-label="name"
            class="w-full h-full !rounded-2xl !bg-primary-500 !border-none"
          >
            <template #value="slotProps">
              <div
                v-if="slotProps.value"
                class="flex items-center gap-8 h-full"
              >
                <Icon
                  :name="`icons:flag-${slotProps.value.code.toLowerCase()}`"
                />
                <div class="text-white">{{ slotProps.value.name }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex items-center gap-8">
                <Icon
                  :name="`icons:flag-${slotProps.option.code.toLowerCase()}`"
                />
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
            <template #dropdownicon>
              <Icon
                name="icons:arrow-drop-down-rounded"
                class="!w-[70%] !h-full !bg-white"
              />
            </template>
          </Select>
        </FloatLabel>
      </div>
      <div class="flex gap-16">
        <HeaderLogin v-if="!authStore.isAuthenticated" />
        <HeaderUser v-if="authStore.isAuthenticated" />
      </div>
    </div>
  </header>
</template>

<style scoped></style>
