<script lang="ts" setup>
import navItems from "@/navigation/vertical";
import { useThemeConfig } from "@core/composable/useThemeConfig";

// Components
import Footer from "@/layouts/components/Footer.vue";
import NavBarI18n from "@/layouts/components/NavBarI18n.vue";
import NavBarNotifications from "@/layouts/components/NavBarNotifications.vue";
import NavbarShortcuts from "@/layouts/components/NavbarShortcuts.vue";
import NavbarThemeSwitcher from "@/layouts/components/NavbarThemeSwitcher.vue";
import NavSearchBar from "@/layouts/components/NavSearchBar.vue";
import UserProfile from "@/layouts/components/UserProfile.vue";

import type { VerticalNavItems } from "@/@layouts/types";

// @layouts plugin
import { VerticalNavLayout } from "@layouts";
import { useUserStore } from "@/store/useUserStore";

const { appRouteTransition, isLessThanOverlayNavBreakpoint } = useThemeConfig();
const { width: windowWidth } = useWindowSize();

const userStore = useUserStore();

const showAdminsPage = userStore.isSuperAdmin() || userStore.isAdmin();
const showAssetManagerPage = showAdminsPage || userStore.isAssetManager();

const accessNavItems = computed(() => {
  let a: VerticalNavItems = [];

  navItems.forEach((i) => {
    if ("title" in i) {
      if (i.title === "Home") {
        a.push(i);
      }
      if (i.title === "All Assets" && showAssetManagerPage) {
        a.push(i);
      }
      if (i.title === "Users" && showAdminsPage) {
        a.push(i);
      }
      if (i.title === "Audit Log" && showAdminsPage) {
        a.push(i);
      }
    }
  });

  return a;
});
</script>

<template>
  <VerticalNavLayout :nav-items="accessNavItems">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <IconBtn
          v-if="isLessThanOverlayNavBreakpoint(windowWidth)"
          id="vertical-nav-toggle-btn"
          class="ms-n3"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon size="26" icon="tabler-menu-2" />
        </IconBtn>
        <!-- <VBtn  @click="onTrigger"
          >Notify</VBtn
        > -->

        <VSpacer />

        <NavbarThemeSwitcher class="me-1" />
        <!-- <NavBarNotifications class="me-2" /> -->
        <UserProfile />
      </div>
    </template>

    <!-- 👉 Pages -->
    <RouterView v-slot="{ Component }">
      <Transition :name="appRouteTransition" mode="out-in">
        <Component :is="Component" />
      </Transition>
    </RouterView>

    <!-- 👉 Footer -->
    <template v-if="false" #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>
