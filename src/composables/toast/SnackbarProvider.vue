<template>
  <div>
    <slot />
    <VSnackbar
      v-model="show"
      :location="opts.location"
      :transition="opts.transition"
      :timeout="opts.timeout"
      :color="opts.color"
      variant="flat"
      multi-line
    >
      {{ text }}
      <template v-if="opts.showCloseButton" #action="{ attrs }">
        <v-btn
          :color="opts.closeButtonColor"
          text
          v-bind="attrs"
          @click="show = false"
        >
          Close
        </v-btn>
      </template>
    </VSnackbar>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, provide } from "vue";
import { CreateSnackbarKey, CreateSnackbarOptions } from "./useSnackbar";

export default defineComponent({
  setup() {
    const show = ref<boolean>(false);
    const text = ref<string>("");
    const opts = ref<CreateSnackbarOptions>({
      color: "info",
      showCloseButton: true,
      closeButtonColor: "",
      location: "top end",
      transition: "scroll-y-reverse-transition",
      timeout: 3000,
    });

    const createSnackbar = (
      message: string,
      options: CreateSnackbarOptions = {}
    ) => {
      show.value = true;
      text.value = message;
      opts.value = Object.assign(opts.value, options);
    };

    provide(CreateSnackbarKey, createSnackbar);

    return {
      show,
      text,
      opts,
    };
  },
});
</script>
