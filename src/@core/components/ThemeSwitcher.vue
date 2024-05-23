<script setup lang="ts">
import { useThemeConfig } from "@core/composable/useThemeConfig";
import type { ThemeSwitcherTheme } from "@layouts/types";

const props = defineProps<{
  themes: ThemeSwitcherTheme[];
}>();

const { theme } = useThemeConfig();
const {
  state: currentThemeName,
  next: getNextThemeName,
  index: currentThemeIndex,
} = useCycleList(
  props.themes.map((t) => t.name),
  { initialValue: theme.value }
);

const changeTheme = () => {
  theme.value = getNextThemeName();
};

// Update icon if theme is changed from other sources
watch(theme, (val) => {
  currentThemeName.value = val;
  console.log("theme", val);
  if (
    val === "dark" ||
    (val === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    document.body.setAttribute("data-mode", "dark");
  } else {
    document.body.removeAttribute("data-mode");
    document.documentElement.classList.remove("dark");
  }
});

onMounted(() => {
  const yepTheme = localStorage.getItem("yep-theme");
  // console.log("Yep", yepTheme);

  if (
    yepTheme === "dark" ||
    (yepTheme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches) ||
    (!("yep-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    document.body.setAttribute("data-mode", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    document.body.removeAttribute("data-mode");
  }
});
</script>

<template>
  <IconBtn @click="changeTheme">
    <VIcon size="26" :icon="props.themes[currentThemeIndex].icon" />
    <VTooltip activator="parent" open-delay="1000" scroll-strategy="close">
      <span class="text-capitalize">{{ currentThemeName }}</span>
    </VTooltip>
  </IconBtn>
</template>
