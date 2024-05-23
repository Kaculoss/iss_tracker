<script setup lang="ts">
import {
  UserType,
  useUsersQuery,
} from "@/graphql/generated/__generated_graphql";
import { VDataTable } from "vuetify/labs/VDataTable";
import { avatarText } from "@/@core/utils/formatters";
import { useUserStore } from "@/store/useUserStore";
const isSnackbarVisible = ref(false);
const isSnackbarTopEnd = ref(false);
const isSnackbarError = ref(false);
const issnackbarScrollYReverse = ref(false);
const snackbarText = ref("");

const selectedUserID = ref<string>();
const assignRoleDialog = ref(false);

const {
  result: Users,
  loading: usersLoading,
  onError: onUsersError,
  refetch: refetchUsers,
} = useUsersQuery({
  fetchPolicy: "network-only",
});

const users = computed(() => Users.value?.users as UserType[]);

const userState = useUserStore();

const { user } = storeToRefs(useUserStore());

onUsersError((error) => {
  onError(error.message || "Something Went Wrong");
});

const onSubmit = () => {
  refetchUsers();
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

const openAssignRoleDialog = (user: UserType) => {
  selectedUserID.value = user.id;
  assignRoleDialog.value = true;
};

const closeAssignDialog = (val: boolean) => {
  assignRoleDialog.value = val;
  selectedUserID.value = undefined;
};

const usersHeader = [
  { title: "USER", key: "user" },
  { title: "EMAIL", key: "email" },
  { title: "ROLE", key: "role" },
  { title: "STATUS", key: "status" },
];

const usersAuthHeader = [
  { title: "USER", key: "user" },
  { title: "EMAIL", key: "email" },
  { title: "ROLE", key: "role" },
  { title: "STATUS", key: "status" },
  { title: "ACTION", key: "actions" },
];

const resolveUserStatusVariant = (stat: boolean) => {
  if (stat) return { color: "success", name: "active" };
  return { color: "secondary", name: "inactive" };
};

const resolveUserRoleVariant = (role: string) => {
  if (role === "Regular User") return { color: "warning", icon: "tabler-user" };
  if (role === "Admin")
    return { color: "primary", icon: "tabler-user-pentagon" };
  if (role === "Asset Manager") return { color: "info", icon: "tabler-pencil" };
  if (role === "Super Admin")
    return { color: "error", icon: "tabler-device-desktop" };
  return { color: "white", icon: "tabler-user" };
};
</script>

<template>
  <section>
    <VCard class="px-3 pb-3">
      <VCardText class="d-flex flex-wrap gap-4">
        <h4 class="text-h4 mb-0">ALL USERS</h4>
      </VCardText>

      <VProgressLinear
        v-if="usersLoading"
        height="5"
        indeterminate
        color="primary"
      />

      <VDataTable
        :headers="userState.isAdmin() ? usersAuthHeader : usersHeader"
        :items="users"
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

        <template #item.user="{ item }">
          <div class="d-flex align-center">
            <VAvatar
              size="32"
              :color="item.raw.avatar ? '' : 'primary'"
              :class="item.raw.avatar ? '' : 'v-avatar-light-bg primary--text'"
              :variant="item.raw.avatar ? 'tonal' : undefined"
            >
              <VImg v-if="item.raw.avatar" :src="item.raw.avatar" />
              <span v-else>{{ avatarText(item.raw.full_name) }}</span>
            </VAvatar>
            <div class="d-flex ms-3">
              <span
                class="d-block font-weight-medium text-high-emphasis text-truncate"
                >{{ item.raw.full_name }}</span
              >
            </div>
          </div>
        </template>

        <template #item.role="{ item }">
          <div class="d-flex align-center gap-4">
            <VAvatar
              :size="30"
              :color="resolveUserRoleVariant(item.raw.role.name).color"
              variant="tonal"
            >
              <VIcon
                :size="20"
                :icon="resolveUserRoleVariant(item.raw.role.name).icon"
              />
            </VAvatar>
            <span class="text-capitalize">{{ item.raw.role.name }}</span>
          </div>
        </template>

        <template #item.status="{ item }">
          <VChip
            :color="resolveUserStatusVariant(item.raw.active).color"
            size="x-small"
            label
            class="text-capitalize"
          >
            {{ resolveUserStatusVariant(item.raw.active).name }}
          </VChip>
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex">
            <VTooltip
              v-if="
                !(
                  user.id === item.raw.id ||
                  item.raw.role.name === 'Super Admin'
                )
              "
              location="top"
              transition="scale-transition"
            >
              <template #activator="{ props }">
                <VIcon
                  v-bind="props"
                  size="20"
                  icon="tabler-edit"
                  color="primary"
                  @click="() => openAssignRoleDialog(item.raw)"
                />
              </template>
              <span>Re-assign role</span>
            </VTooltip>
          </div>
        </template>
      </VDataTable>
    </VCard>

    <AssignRoleDialog
      v-if="selectedUserID"
      v-model:isDialogVisible="assignRoleDialog"
      :user_id="selectedUserID"
      @update:is-dialog-visible="closeAssignDialog"
      @submit="onSubmit"
      @update:errorMessage="onError"
      @update:successMessage="onSuccess"
    />

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
  </section>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
</route>
