<script setup lang="ts">
import {
  UserType,
  useAssignRoleMutation,
  useUserQuery,
} from "@/graphql/generated/__generated_graphql";
import { avatarText } from "@/@core/utils/formatters";

const emit = defineEmits<{
  (e: "submit"): void;
  (e: "update:isDialogVisible", val: boolean): void;
  (e: "update:errorMessage", val: string): void;
  (e: "update:successMessage", val: string): void;
}>();

const props = defineProps<{
  isDialogVisible: boolean;
  user_id: string;
}>();

const roles = [
  { role: "Admin", id: "2" },
  { role: "Asset Manager", id: "3" },
  { role: "Regular User", id: "4" },
];

const {
  result: User,
  loading: userLoading,
  onError: onUserError,
} = useUserQuery(() => ({ id: props.user_id }), {
  fetchPolicy: "network-only",
});

onUserError((error) => {
  emit("update:errorMessage", error.message || "Something Went Wrong");
  emit("update:isDialogVisible", false);
});

const user = computed(() => User.value?.user as UserType);

const userRole = ref<{ role: string; id: string }>();

watch(user, (val) => {
  if (val) {
    userRole.value = { role: val.role.name, id: val.role.id };
  }
});

const {
  mutate: AssignRole,
  loading: assignRoleLoading,
  onError: onAssignRoleError,
  onDone: onAssignRoleDone,
} = useAssignRoleMutation();

onAssignRoleError((error) => {
  emit("update:errorMessage", error.message || "Something Went Wrong");
  emit("update:isDialogVisible", false);
});

onAssignRoleDone((result) => {
  if (result.data?.assignRole) {
    emit("update:successMessage", "User Role Successfully Assigned");
    emit("update:isDialogVisible", false);
    emit("submit");
  }
});

const dialogModelValueUpdate = (val: boolean) => {
  emit("update:isDialogVisible", val);
};

const onFormSubmit = () => {
  if (userRole.value) {
    AssignRole({
      user_id: props.user_id,
      role_id: userRole.value.id,
    });
  }
};
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    max-width="850"
    @update:model-value="dialogModelValueUpdate"
  >
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />
    <VProgressLinear
      v-if="userLoading"
      height="5"
      indeterminate
      color="primary"
    />

    <VCard v-if="!userLoading && user" class="pa-sm-5 pa-3">
      <VDialog v-model="assignRoleLoading" width="300">
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
        <VCardTitle class="text-h3 mb-3"> Assign Role </VCardTitle>
      </VCardItem>

      <VCardText>
        <VForm class="" @submit.prevent="onFormSubmit">
          <VRow>
            <VCol cols="12" md="5" class="d-flex align-end">
              <div class="d-flex align-center">
                <VAvatar
                  size="40"
                  :color="user?.avatar ? '' : 'primary'"
                  :class="user?.avatar ? '' : 'v-avatar-light-bg primary--text'"
                  :variant="user?.avatar ? 'tonal' : undefined"
                >
                  <VImg v-if="user?.avatar" :src="user?.avatar" />
                  <span v-else>{{ avatarText(user?.full_name) }}</span>
                </VAvatar>
                <div class="d-flex flex-column ms-3">
                  <span
                    class="d-block font-weight-medium text-high-emphasis text-truncate tw-text-lg"
                    >{{ user?.full_name }}</span
                  >
                  <small class="tw-text-sm">{{ user?.email }}</small>
                </div>
              </div>
            </VCol>
            <VCol cols="12" md="3" class="d-flex align-end">
              <VSelect
                v-model="userRole"
                :items="roles"
                item-title="role"
                label="Role"
                return-object
                placeholder="Select Role"
              />
            </VCol>

            <VCol
              cols="12"
              md="4"
              class="d-flex flex-wrap justify-end align-end gap-4"
            >
              <VBtn variant="tonal" type="submit" size="small"> Submit </VBtn>

              <VBtn
                size="small"
                variant="tonal"
                color="secondary"
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
