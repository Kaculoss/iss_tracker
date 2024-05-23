<script setup lang="ts">
import {
  AuditLogType,
  useAuditLogsQuery,
} from "@/graphql/generated/__generated_graphql";
import { VDataTable } from "vuetify/labs/VDataTable";
import { avatarText } from "@/@core/utils/formatters";
const isSnackbarVisible = ref(false);
const isSnackbarTopEnd = ref(false);
const isSnackbarError = ref(false);
const issnackbarScrollYReverse = ref(false);
const snackbarText = ref("");

const {
  result: AuditLogs,
  loading: auditLogsLoading,
  onError: onAuditLogsError,
} = useAuditLogsQuery({
  fetchPolicy: "network-only",
});

const auditLogs = computed(() => AuditLogs.value?.auditLogs as AuditLogType[]);

onAuditLogsError((error) => {
  isSnackbarVisible.value = true;
  isSnackbarTopEnd.value = true;
  isSnackbarError.value = true;
  issnackbarScrollYReverse.value = true;
  snackbarText.value = error.message;
});

const auditLogHeader = [
  { title: "TYPE", key: "type" },
  { title: "USER", key: "user" },
  { title: "EVENT", key: "event" },
  { title: "DATE", key: "date" },
  { title: "TIME", key: "time" },
];
</script>

<template>
  <section>
    <VCard class="px-3 pb-3">
      <VCardText class="d-flex flex-wrap gap-4">
        <h4 class="text-h4 mb-0">AUDIT LOG</h4>
      </VCardText>

      <VProgressLinear
        v-if="auditLogsLoading"
        height="5"
        indeterminate
        color="primary"
      />

      <VDataTable
        :headers="auditLogHeader"
        :items="auditLogs"
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
              :color="item.columns.user?.avatar ? '' : 'primary'"
              :class="
                item.columns.user?.avatar
                  ? ''
                  : 'v-avatar-light-bg primary--text'
              "
              :variant="item.columns.user?.avatar ? 'tonal' : undefined"
            >
              <VImg
                v-if="item.columns.user?.avatar"
                :src="item.columns.user?.avatar"
              />
              <span v-else>{{ avatarText(item.columns.user?.full_name) }}</span>
            </VAvatar>
            <div class="d-flex flex-column ms-3">
              <span
                class="d-block font-weight-medium text-high-emphasis text-truncate"
                >{{ item.columns.user?.full_name }}</span
              >
              <small>{{ item.raw.user_role }}</small>
            </div>
          </div>
        </template>

        <template #item.date="{ item }">
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

        <template #item.time="{ item }">
          <span class="d-block font-weight-regular text-truncate">
            {{ new Date(item.raw.createdAt).toLocaleTimeString() }}
          </span>
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
  </section>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
</route>
