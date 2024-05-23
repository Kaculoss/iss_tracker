<script lang="ts" setup>
import type { Notification } from "@layouts/types";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/useUserStore";

const router = useRouter();

const notifications = ref<Notification[]>([]);

// const removeNotification = (notificationId: number) => {
//   notifications.value.forEach((item, index) => {
//     if (notificationId === item.id) notifications.value.splice(index, 1);
//   });
// };
</script>

<template>
  <div>
    <!-- <Notifications
      :notifications="notifications"
      @read="markRead"
      @click:notification="handleNotificationClick"
    /> -->
  </div>
</template>
