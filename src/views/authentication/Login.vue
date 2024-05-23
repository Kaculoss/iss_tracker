<script setup lang="ts">
import { themeConfig } from "@themeConfig";
import { VForm } from "vuetify/components/VForm";

import authV2MaskDark from "@images/pages/misc-mask-dark.png";
import authV2MaskLight from "@images/pages/misc-mask-light.png";
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";

import { emailValidator, requiredValidator } from "@/@core/utils/validators";
import {
  UserType,
  useLoginMutation,
} from "@/graphql/generated/__generated_graphql";
import { useUserStore } from "@/store/useUserStore";

const emit = defineEmits<{
  (e: "setToRegister", val: boolean): void;
}>();

const goToRegister = () => {
  emit("setToRegister", true);
};

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark);

const route = useRoute();
const router = useRouter();

const isPasswordVisible = ref(false);

const errors = ref<Record<string, string | undefined>>({
  email: undefined,
  password: undefined,
});

const refVForm = ref<VForm>();

const credentials = ref({
  email: "",
  password: "",
});
const userStore = useUserStore();

const isSnackbarVisible = ref(false);
const isSnackbarTopEnd = ref(false);
const isSnackbarError = ref(false);
const issnackbarScrollYReverse = ref(false);
const snackbarText = ref("");

const {
  mutate: Login,
  onError: onLoginError,
  onDone: onLoginDone,
  loading: loginLoading,
} = useLoginMutation();

onLoginDone((result) => {
  if (result.data?.login) {
    const { access_token, user } = result.data.login;

    localStorage.setItem("accessToken", access_token);
    userStore.setUserData(user as UserType);

    router.replace(route.query.to ? String(route.query.to) : "/");
  }
});

onLoginError((error) => {
  isSnackbarVisible.value = true;
  isSnackbarTopEnd.value = true;
  isSnackbarError.value = true;
  issnackbarScrollYReverse.value = true;
  snackbarText.value = error.message;
});

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    const { email, password } = credentials.value;
    if (isValid) Login({ email, password });
  });
};
</script>

<template>
  <VRow no-gutters class="auth-wrapper bg-surface">
    <VCol lg="8" class="d-none d-lg-flex">
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="505"
            src="public/mark.png"
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg :src="authThemeMask" class="auth-footer-mask" />
      </div>
    </VCol>

    <VCol
      cols="12"
      lg="4"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
        <VCardText>
          <h4 class="text-h4 mb-1">
            Welcome to
            <span class="text-capitalize"> {{ themeConfig.app.title }} </span>
          </h4>
          <p class="mb-0">
            Please sign-in to your account and track company assets
          </p>
        </VCardText>
        <VCardText>
          <VForm ref="refVForm" @submit.prevent="onSubmit">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="credentials.email"
                  label="Email"
                  placeholder="email@hohoema.com"
                  type="email"
                  autofocus
                  :rules="[requiredValidator, emailValidator]"
                  :error-messages="errors.email"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="credentials.password"
                  label="Password"
                  placeholder="············"
                  :rules="[requiredValidator]"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :error-messages="errors.password"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <VBtn class="mt-4" v-if="!loginLoading" block type="submit">
                  Login
                </VBtn>
                <VBtn v-else block class="mt-4">
                  <VProgressCircular color="secondary" indeterminate />
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol cols="12" class="text-center">
                <span>New employee?</span>
                <VBtn
                  variant="plain"
                  density="compact"
                  class="text-primary ms-2"
                  @click="goToRegister"
                  :disabled="loginLoading"
                >
                  Create an account
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
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
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
