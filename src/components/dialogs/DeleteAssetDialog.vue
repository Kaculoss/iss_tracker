<script setup lang="ts">
import { useDeleteAssetMutation } from "@/graphql/generated/__generated_graphql";

const emit = defineEmits<{
  (e: "submit"): void;
  (e: "update:DialogVisible", val: boolean): void;
  (e: "update:errorMessage", val: string): void;
  (e: "update:successMessage", val: string): void;
}>();

const props = defineProps<{
  isDialogVisible: boolean;
  id: string;
}>();

const {
  mutate: DeleteAsset,
  loading: deleteAssetLoading,
  onError: onDeleteAssetError,
  onDone: onDeleteAssetDone,
} = useDeleteAssetMutation();

onDeleteAssetError((error) => {
  emit("update:errorMessage", error.message || "Something Went Wrong");
  emit("update:DialogVisible", false);
});

onDeleteAssetDone(() => {
  emit("update:successMessage", "Asset Deleted");
  emit("update:DialogVisible", false);
  emit("submit");
});

const dialogVisibleUpdate = (val: boolean) => {
  emit("update:DialogVisible", val);
};

const onFormSubmit = () => {
  DeleteAsset({ id: props.id });
};
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    max-width="500"
    @update:model-value="dialogVisibleUpdate"
  >
    <DialogCloseBtn @click="dialogVisibleUpdate(false)" />

    <VCard class="pa-sm-8 pa-5">
      <VDialog v-model="deleteAssetLoading" width="300">
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
        <p class="mb-0">Are you sure you want to delete this Asset?</p>
      </VCardItem>

      <VCardText>
        <VForm class="mt-6" @submit.prevent="onFormSubmit">
          <VRow>
            <VCol cols="12" class="d-flex justify-space-between">
              <VBtn color="error" type="submit"> Delete </VBtn>

              <VBtn
                color="secondary"
                variant="tonal"
                @click="dialogVisibleUpdate(false)"
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
