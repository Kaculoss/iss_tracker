<script setup lang="ts">
const assetCode = ref<string>("");

const isSnackbarVisible = ref(false);
const isSnackbarTopEnd = ref(false);
const isSnackbarError = ref(false);
const issnackbarScrollYReverse = ref(false);
const snackbarText = ref("");

const router = useRouter();

const onTrack = () => {
  if (!assetCode.value.length) {
    isSnackbarVisible.value = true;
    isSnackbarTopEnd.value = true;
    isSnackbarError.value = true;
    issnackbarScrollYReverse.value = true;
    snackbarText.value = "Please Enter an Asset Code to track it";
  }

  if (!assetCode.value.startsWith("HMA-")) {
    isSnackbarVisible.value = true;
    isSnackbarTopEnd.value = true;
    isSnackbarError.value = true;
    issnackbarScrollYReverse.value = true;
    snackbarText.value = "Please Enter a valid Organization Asset Code";
  } else {
    router.push({ name: "asset-code", params: { code: assetCode.value } });
  }
};
</script>

<template>
  <div class="match-height tw-flex tw-flex-col tw-items-center">
    <h2 class="">Welcome To Hohoe Municipal Assembly Asset-Tracking Site!</h2>
    <div>
      Enter the code of the asset you want to track in the field below and click
      the track button to start
    </div>
    <div class="tw-w-full tw-max-w-72 tw-mt-6 tw-flex tw-items-center tw-gap-4">
      <AppTextField
        v-model="assetCode"
        placeholder="HMA-0000"
        single-line
        hide-details
        dense
        outlined
      />

      <VBtn variant="tonal" @click="onTrack">TRACK</VBtn>
    </div>
    <VSnackbar
      v-model="isSnackbarVisible"
      :transition="
        issnackbarScrollYReverse
          ? 'scroll-y-reverse-transition'
          : 'scale-transition'
      "
      :location="isSnackbarTopEnd ? 'top end' : 'bottom end'"
      :color="isSnackbarError ? 'error' : 'success'"
    >
      {{ snackbarText }}
    </VSnackbar>
  </div>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
</route>
