<script setup lang="ts">
import {
  AssetType,
  useAllAssetsQuery,
} from "@/graphql/generated/__generated_graphql";
import { VDataTable } from "vuetify/labs/VDataTable";
import { useUserStore } from "@/store/useUserStore";
const isSnackbarVisible = ref(false);
const isSnackbarTopEnd = ref(false);
const isSnackbarError = ref(false);
const issnackbarScrollYReverse = ref(false);
const snackbarText = ref("");

const selectedAssetID = ref<string>();
const selectedAssetCode = ref<string>();
const createAssetDialog = ref(false);
const isDeleteDialogVisible = ref(false);
const updateAssetDialog = ref(false);

const {
  result: AllAssets,
  loading: AllAssetsLoading,
  onError: onAllAssetsError,
  refetch: refetchAllAssets,
} = useAllAssetsQuery({
  fetchPolicy: "network-only",
});

const allAssets = computed(() => AllAssets.value?.allAssets as AssetType[]);

const userState = useUserStore();

onAllAssetsError((error) => {
  onError(error.message || "Something Went Wrong");
});

const onSubmit = () => {
  refetchAllAssets();
};

const onError = (errorMessage: string) => {
  isSnackbarVisible.value = true;
  isSnackbarTopEnd.value = true;
  isSnackbarError.value = true;
  issnackbarScrollYReverse.value = true;
  snackbarText.value = errorMessage;
};

const onSuccess = (successMessage: string) => {
  isSnackbarVisible.value = true;
  isSnackbarTopEnd.value = false;
  isSnackbarError.value = false;
  issnackbarScrollYReverse.value = false;
  snackbarText.value = successMessage;
};

const closeCreateAssetDialog = (val: boolean) => {
  createAssetDialog.value = val;
};

const openUpdateDialog = (asset: AssetType) => {
  selectedAssetCode.value = asset.code;
  updateAssetDialog.value = true;
};

const closeUpdateAssetDialog = (val: boolean) => {
  selectedAssetCode.value = undefined;
  updateAssetDialog.value = val;
};

const openDeleteDialog = (asset: AssetType) => {
  selectedAssetID.value = asset.id;
  isDeleteDialogVisible.value = true;
};

const CloseDeleteDialog = (val: boolean) => {
  selectedAssetID.value = undefined;
  isDeleteDialogVisible.value = val;
};

const allAssetsHeader = [
  { title: "CODE", key: "code" },
  { title: "TYPE", key: "type" },
  { title: "NAME", key: "name" },
  { title: "PRICE", key: "price" },
  { title: "VENDOR", key: "vendor" },
  { title: "LOCATION", key: "location" },
  { title: "DATE ADDED", key: "createdAt" },
];

const allAssetsAuthHeader = [
  { title: "CODE", key: "code" },
  { title: "TYPE", key: "type" },
  { title: "NAME", key: "name" },
  { title: "PRICE", key: "price" },
  { title: "VENDOR", key: "vendor" },
  { title: "LOCATION", key: "location" },
  { title: "DATE ADDED", key: "createdAt" },
  { title: "ACTION", key: "actions" },
];

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
  <section>
    <VCard class="px-3 pb-3">
      <VCardText class="d-flex justify-space-between align-center">
        <h4 class="text-h4 mb-0">ALL ASSETS</h4>
        <VBtn
          v-if="userState.isAssetManager()"
          variant="tonal"
          @click="createAssetDialog = true"
          >Add New Asset</VBtn
        >
      </VCardText>

      <VProgressLinear
        v-if="AllAssetsLoading"
        height="5"
        indeterminate
        color="primary"
      />

      <VDataTable
        :headers="
          userState.isAdmin() ||
          userState.isAssetManager() ||
          userState.isSuperAdmin()
            ? allAssetsAuthHeader
            : allAssetsHeader
        "
        :items="allAssets"
        :items-per-page="25"
      >
        <template v-slot:headers="{ columns }">
          <tr>
            <template v-for="column in columns" :key="column.key">
              <td :class="`!tw-bg-slate-600 !tw-text-white !tw-h-9`">
                <span class="font-weight-bold tw-text-sm">{{
                  column.title
                }}</span>
              </td>
            </template>
          </tr>
        </template>

        <template #item.type="{ item }">
          <VChip
            :color="resolveTypeVariant(item.raw.type).color"
            size="x-small"
            label
            class="text-capitalize"
          >
            <VIcon start :icon="resolveTypeVariant(item.raw.type).icon" />
            {{ item.raw.type }}
          </VChip>
        </template>

        <template #item.name="{ item }">
          <div class="d-flex flex-column">
            <span
              class="d-block font-weight-medium text-high-emphasis text-truncate"
              >{{ item.raw.name }}</span
            >
            <small>{{ item.raw.description }}</small>
          </div>
        </template>

        <template #item.price="{ item }">
          <span class=""> GH₵{{ item.raw.price.toFixed(2) }}</span>
        </template>

        <template #item.createdAt="{ item }">
          <span class="d-block font-weight-regular text-truncate">
            {{
              new Date(item.raw.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            }}
          </span>
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex gap-3">
            <VTooltip
              v-if="userState.isAdmin() || userState.isAssetManager()"
              location="top"
              transition="scale-transition"
            >
              <template #activator="{ props }">
                <VBtn
                  variant="plain"
                  density="compact"
                  v-bind="props"
                  size="small"
                  icon
                  @click="() => openUpdateDialog(item.raw)"
                >
                  <VIcon size="20" icon="tabler-edit" color="primary" />
                </VBtn>
              </template>
              <span>Update Asset</span>
            </VTooltip>

            <VTooltip location="top" transition="scale-transition">
              <template #activator="{ props }">
                <VBtn
                  variant="plain"
                  density="compact"
                  v-bind="props"
                  size="small"
                  icon
                  :to="`asset/${item.raw.code}`"
                >
                  <VIcon size="20" icon="tabler-eye" color="primary" />
                </VBtn>
              </template>
              <span>View Asset</span>
            </VTooltip>

            <VTooltip
              v-if="userState.isAdmin() || userState.isAssetManager()"
              location="top"
              transition="scale-transition"
            >
              <template #activator="{ props }">
                <VBtn
                  variant="plain"
                  density="compact"
                  size="small"
                  v-bind="props"
                  icon
                  @click="() => openDeleteDialog(item.raw)"
                >
                  <VIcon size="20" icon="tabler-trash" color="error" />
                </VBtn>
              </template>
              <span>Delete Asset</span>
            </VTooltip>
          </div>
        </template>
      </VDataTable>
    </VCard>

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

    <AddAssetDialog
      v-model:isDialogVisible="createAssetDialog"
      @update:isDialogVisible="closeCreateAssetDialog"
      @update:errorMessage="onError"
      @update:successMessage="onSuccess"
      @submit="onSubmit"
    />

    <UpdateAssetDialog
      v-if="selectedAssetCode"
      v-model:isDialogVisible="updateAssetDialog"
      :asset_code="selectedAssetCode"
      @update:isDialogVisible="closeUpdateAssetDialog"
      @update:errorMessage="onError"
      @update:successMessage="onSuccess"
      @submit="onSubmit"
    />

    <DeleteAssetDialog
      v-if="selectedAssetID"
      v-model:isDialogVisible="isDeleteDialogVisible"
      :id="selectedAssetID"
      @update:DialogVisible="CloseDeleteDialog"
      @submit="onSubmit"
      @update:errorMessage="onError"
      @update:successMessage="onSuccess"
    />
  </section>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
</route>
