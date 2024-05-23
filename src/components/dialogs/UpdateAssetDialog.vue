<script setup lang="ts">
import {
  AssetType,
  useFullAssetInfoQuery,
  useUpdateAssetMutation,
} from "@/graphql/generated/__generated_graphql";

const emit = defineEmits<{
  (e: "submit"): void;
  (e: "update:isDialogVisible", val: boolean): void;
  (e: "update:errorMessage", val: string): void;
  (e: "update:successMessage", val: string): void;
}>();

const props = defineProps<{
  isDialogVisible: boolean;
  asset_code: string;
}>();

const updateAssetData = ref<{
  name: string;
  type: string;
  price: number;
  location?: string;
  vendor?: string;
  description?: string;
}>({
  name: "",
  type: "",
  price: 0,
  location: "",
  vendor: "",
  description: "",
});

const types = ["laptop", "monitor", "projector", "printer"];

const errorMsg = ref("");

const {
  result: Asset,
  loading: assetLoading,
  onError: onAssetError,
} = useFullAssetInfoQuery(() => ({ code: props.asset_code }), {
  fetchPolicy: "network-only",
});

onAssetError((error) => {
  emit("update:errorMessage", error.message || "Something Went Wrong");
  emit("update:isDialogVisible", false);
});

const asset = computed(() => Asset.value?.fullAssetInfo as AssetType);

watch(asset, (val) => {
  if (val) {
    const { name, type, price, location, vendor, description } = val;
    updateAssetData.value = {
      name,
      type,
      price,
      location: location || "",
      vendor: vendor || "",
      description: description || "",
    };
  }
});

const {
  mutate: UpdateAsset,
  loading: UpdateAssetLoading,
  onError: onUpdateAssetError,
  onDone: onUpdateAssetDone,
} = useUpdateAssetMutation();

onUpdateAssetError((error) => {
  emit("update:errorMessage", error.message || "Something Went Wrong");
  emit("update:isDialogVisible", false);
});

onUpdateAssetDone((result) => {
  if (result.data?.updateAsset) {
    errorMsg.value = "";
    emit("update:successMessage", "Asset Created Successfully");
    emit("update:isDialogVisible", false);
    emit("submit");
  }
});

const dialogModelValueUpdate = (val: boolean) => {
  emit("update:isDialogVisible", val);
};

const onFormSubmit = () => {
  if (asset.value) {
    const { name, price, type, description, location, vendor } =
      updateAssetData.value;

    if (!name) {
      return (errorMsg.value = "Please add a Name");
    }

    if (!type) return (errorMsg.value = "Please select a Type");

    if (!price) return (errorMsg.value = "Please add a price");

    if (+price < 1) return (errorMsg.value = "Please add a valid price");

    UpdateAsset({
      id: asset.value.id,
      name,
      price: +price,
      type,
      description,
      location,
      vendor,
    });
  }
};
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    max-width="1000"
    @update:model-value="dialogModelValueUpdate"
  >
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VProgressLinear
      v-if="assetLoading"
      height="5"
      indeterminate
      color="primary"
    />

    <VCard v-if="!assetLoading && asset" class="pa-sm-8 pa-5">
      <VDialog v-model="UpdateAssetLoading" width="300">
        <VCard color="primary" width="300">
          <VCardText class="pt-3">
            Please stand by
            <VProgressLinear
              indeterminate
              color="white"
              :height="8"
              class="mb-0 mt-4"
            />
          </VCardText>
        </VCard>
      </VDialog>

      <VCardItem class="text-center">
        <VCardTitle class="text-h3 mb-3"> Update Asset </VCardTitle>
      </VCardItem>

      <VCardText>
        <VForm class="" @submit.prevent="onFormSubmit">
          <VRow>
            <VCol cols="12" md="3">
              <AppSelect
                v-model="updateAssetData.type"
                :items="types"
                label="Asset Type *"
                placeholder="select type"
              />
            </VCol>

            <VCol cols="12" md="4">
              <AppTextField
                v-model="updateAssetData.name"
                label="Asset Name *"
                placeholder="name"
              />
            </VCol>

            <VCol cols="12" md="2">
              <AppTextField
                v-model="updateAssetData.price"
                label="Price (GH₵) *"
                type="number"
                placeholder="10"
              />
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField
                v-model="updateAssetData.vendor"
                label="Vendor"
                placeholder="vendor"
              />
            </VCol>

            <VCol cols="12" md="4">
              <AppTextField
                v-model="updateAssetData.location"
                label="Asset Location"
                placeholder="location"
              />
            </VCol>

            <VCol cols="12" md="8">
              <AppTextField
                v-model="updateAssetData.description"
                label="Description"
                placeholder="description"
              />
            </VCol>

            <p
              v-if="errorMsg"
              class="tw-text-sm tw-w-full tw-text-center tw-text-red-500"
            >
              {{ errorMsg }}
            </p>

            <VCol
              cols="12"
              class="d-flex tw-mt-5 flex-wrap justify-center gap-4"
            >
              <VBtn type="submit"> Submit </VBtn>

              <VBtn
                color="secondary"
                variant="tonal"
                @click="dialogModelValueUpdate(false)"
              >
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
