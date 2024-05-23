<script setup lang="ts">
import {
  AssetType,
  SomeAssetInfoType,
  useFullAssetInfoQuery,
  useSomeAssetInfoQuery,
} from "@/graphql/generated/__generated_graphql";
import { useUserStore } from "@/store/useUserStore";

const route = useRoute();

const userState = useUserStore();

const errorMsg = ref("");

const {
  result: SomeAsset,
  loading: SomeAssetLoading,
  onError: onSomeAssetError,
} = useSomeAssetInfoQuery(() => ({ code: route.params.code as string }), {
  fetchPolicy: "network-only",
  enabled: userState.isRegularUser(),
});

onSomeAssetError((error) => {
  errorMsg.value = error.message || "Something went wrong";
});

const {
  result: FullAsset,
  loading: FullAssetLoading,
  onError: onFullAssetError,
} = useFullAssetInfoQuery(() => ({ code: route.params.code as string }), {
  fetchPolicy: "network-only",
  enabled: !userState.isRegularUser(),
});

onFullAssetError((error) => {
  errorMsg.value = error.message || "Something went wrong";
});

const someAsset = computed(
  () => (SomeAsset.value?.someAssetInfo as SomeAssetInfoType) || null
);

const fullAsset = computed(
  () => (FullAsset.value?.fullAssetInfo as AssetType) || null
);

const resolveTypeVariant = (type: string) => {
  if (type === "laptop")
    return { color: "error", icon: "tabler-device-laptop" };
  if (type === "printer") return { color: "primary", icon: "tabler-printer" };
  if (type === "projector")
    return { color: "info", icon: "tabler-device-projector" };
  if (type === "monitor")
    return { color: "warning", icon: "tabler-device-desktop" };
  return { color: "white", icon: "tabler-question-mark" };
};
</script>

<template>
  <div class="match-height tw-flex tw-flex-col tw-items-start">
    <h2 class="mb-0">ASSET INFO</h2>

    <VProgressLinear
      v-if="SomeAssetLoading || FullAssetLoading"
      height="5"
      indeterminate
      color="primary"
    />

    <div v-if="errorMsg">
      {{ errorMsg }}
    </div>

    <div
      v-if="userState.isRegularUser() && someAsset"
      class="tw-w-full tw-mt-2 tw-flex tw-items-start tw-gap-4 tw-flex-col"
    >
      <div>
        Code:
        <span class="tw-text-lg tw-font-bold mb-0 tw-flex tw-items-center">{{
          someAsset.code
        }}</span>
      </div>
      <div>
        Type:
        <span class="tw-text-lg tw-font-bold mb-0 tw-flex tw-items-center">
          <VIcon start :icon="resolveTypeVariant(someAsset.type).icon" />
          {{ someAsset.type }}</span
        >
      </div>
      <div>
        Name:
        <span class="tw-text-lg tw-font-bold mb-0 tw-flex tw-items-center">{{
          someAsset.name
        }}</span>
      </div>
      <div>
        Description:
        <span class="tw-text-lg tw-font-bold mb-0 tw-flex tw-items-center">{{
          someAsset.description
        }}</span>
      </div>
      <div>
        Location:
        <span class="tw-text-lg tw-font-bold mb-0 tw-flex tw-items-center">{{
          someAsset.location
        }}</span>
      </div>
    </div>

    <div
      v-if="!userState.isRegularUser() && fullAsset"
      class="tw-w-full tw-mt-2 tw-flex tw-items-start tw-gap-4 tw-flex-col"
    >
      <div>
        Code:
        <span class="tw-text-lg tw-font-bold mb-0 tw-flex tw-items-center">{{
          fullAsset.code
        }}</span>
      </div>
      <div>
        Type:
        <span class="tw-text-lg tw-font-bold mb-0 tw-flex tw-items-center">
          <VIcon start :icon="resolveTypeVariant(fullAsset.type).icon" />
          {{ fullAsset.type }}</span
        >
      </div>
      <div>
        Name:
        <span class="tw-text-lg tw-font-bold mb-0 tw-flex tw-items-center">{{
          fullAsset.name
        }}</span>
      </div>
      <div>
        Description:
        <span class="tw-text-lg tw-font-bold mb-0 tw-flex tw-items-center">{{
          fullAsset.description
        }}</span>
      </div>
      <div>
        Price:
        <span class="tw-text-lg tw-font-bold mb-0 tw-flex tw-items-center"
          >GH₵{{ fullAsset.price.toFixed(2) }}</span
        >
      </div>
      <div>
        Vendor:
        <span class="tw-text-lg tw-font-bold mb-0 tw-flex tw-items-center">{{
          fullAsset.vendor
        }}</span>
      </div>
      <div>
        Location:
        <span class="tw-text-lg tw-font-bold mb-0 tw-flex tw-items-center">{{
          fullAsset.location
        }}</span>
      </div>
      <div>
        Date Added:
        <span class="tw-text-lg tw-font-bold mb-0 tw-flex tw-items-center">{{
          new Date(fullAsset.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        }}</span>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
</route>
