<script setup lang="ts">
import { useCreateAssetMutation } from "@/graphql/generated/__generated_graphql";

const emit = defineEmits<{
  (e: "submit"): void;
  (e: "update:isDialogVisible", val: boolean): void;
  (e: "update:errorMessage", val: string): void;
  (e: "update:successMessage", val: string): void;
}>();

const props = defineProps<{
  isDialogVisible: boolean;
}>();

const createAssetData = ref<{
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
  mutate: CreateAsset,
  loading: createAssetLoading,
  onError: onCreateAssetError,
  onDone: onCreateAssetDone,
} = useCreateAssetMutation();

onCreateAssetError((error) => {
  emit("update:errorMessage", error.message || "Something Went Wrong");
  emit("update:isDialogVisible", false);
});

onCreateAssetDone((result) => {
  if (result.data?.createAsset) {
    createAssetData.value = {
      name: "",
      type: "",
      price: 0,
      location: "",
      vendor: "",
      description: "",
    };

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
  const { name, price, type, description, location, vendor } =
    createAssetData.value;

  if (!name) {
    return (errorMsg.value = "Please add a Name");
  }

  if (!type) return (errorMsg.value = "Please select a Type");

  if (!price) return (errorMsg.value = "Please add a price");

  if (+price < 1) return (errorMsg.value = "Please add a valid price");

  CreateAsset({ name, price: +price, type, description, location, vendor });
};
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    max-width="1000"
    @update:model-value="dialogModelValueUpdate"
  >
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="pa-sm-8 pa-5">
      <VDialog v-model="createAssetLoading" width="300">
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
        <VCardTitle class="text-h3 mb-3"> Create A New Asset </VCardTitle>
      </VCardItem>

      <VCardText>
        <VForm class="" @submit.prevent="onFormSubmit">
          <VRow>
            <VCol cols="12" md="3">
              <AppSelect
                v-model="createAssetData.type"
                :items="types"
                label="Asset Type *"
                placeholder="select type"
              />
            </VCol>

            <VCol cols="12" md="4">
              <AppTextField
                v-model="createAssetData.name"
                label="Asset Name *"
                placeholder="name"
              />
            </VCol>

            <VCol cols="12" md="2">
              <AppTextField
                v-model="createAssetData.price"
                label="Price (GH₵) *"
                type="number"
                placeholder="10"
              />
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField
                v-model="createAssetData.vendor"
                label="Vendor"
                placeholder="vendor"
              />
            </VCol>

            <VCol cols="12" md="4">
              <AppTextField
                v-model="createAssetData.location"
                label="Asset Location"
                placeholder="location"
              />
            </VCol>

            <VCol cols="12" md="8">
              <AppTextField
                v-model="createAssetData.description"
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
