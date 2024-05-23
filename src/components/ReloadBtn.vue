<script lang="ts" setup>
interface Props {
  loading?: boolean;
  onClick?: Function;
}

const props = defineProps<Props>();
</script>

<template>
  <VBtn
    density="compact"
    color="disabled"
    :loading="props.loading"
    @click="onClick"
  >
    <VIcon icon="tabler-refresh" />
  </VBtn>
</template>
