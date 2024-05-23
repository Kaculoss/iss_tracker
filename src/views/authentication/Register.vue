<script setup lang="ts">
import { VForm } from "vuetify/components/VForm";

import mark from "@/assets/images/mark.png";

import authV2MaskDark from "@images/pages/misc-mask-dark.png";
import authV2MaskLight from "@images/pages/misc-mask-light.png";
import { useGenerateImageVariant } from "@/@core/composable/useGenerateImageVariant";
import { emailValidator, requiredValidator } from "@/@core/utils/validators";
import {
  UserType,
  useSignupMutation,
} from "@/graphql/generated/__generated_graphql";
import { useUserStore } from "@/store/useUserStore";

const emit = defineEmits<{
  (e: "setToRegister", val: boolean): void;
}>();

const goToRegister = () => {
  emit("setToRegister", false);
};

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark);

const form = ref({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
  privacyPolicies: false,
});

const isPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

const refVForm = ref<VForm>();

const route = useRoute();
const router = useRouter();

const isSnackbarVisible = ref(false);
const isSnackbarTopEnd = ref(false);
const isSnackbarError = ref(false);
const issnackbarScrollYReverse = ref(false);
const snackbarText = ref("");

const userStore = useUserStore();

const {
  mutate: SignUp,
  onError: onSignUpError,
  onDone: onSignUpDone,
  loading: signUpLoading,
} = useSignupMutation();

onSignUpDone((result) => {
  if (result.data?.signup) {
    const { access_token, user } = result.data.signup;

    localStorage.setItem("accessToken", access_token);
    userStore.setUserData(user as UserType);

    router.replace(route.query.to ? String(route.query.to) : "/");
  }
});

onSignUpError((error) => {
  isSnackbarVisible.value = true;
  isSnackbarTopEnd.value = true;
  isSnackbarError.value = true;
  issnackbarScrollYReverse.value = true;
  snackbarText.value = error.message;
});

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    const { email, password, first_name, last_name, confirm_password } =
      form.value;
    if (isValid)
      SignUp({ email, password, first_name, last_name, confirm_password });
  });
};
</script>

<template>
  <VRow no-gutters class="auth-wrapper bg-surface">
    <VCol md="8" class="d-none d-md-flex">
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="505"
            :src="mark"
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg class="auth-footer-mask" :src="authThemeMask" />
      </div>
    </VCol>

    <VCol
      cols="12"
      md="4"
      class="auth-card-v2 d-flex align-center justify-center"
      style="background-color: rgb(var(--v-theme-surface))"
    >
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
        <VCardText>
          <VForm ref="refVForm" @submit.prevent="onSubmit">
            <VRow>
              <VCol cols="12">
                <AppTextField
                  v-model="form.first_name"
                  :rules="[requiredValidator]"
                  autofocus
                  label="First name"
                  placeholder="John"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="form.last_name"
                  :rules="[requiredValidator]"
                  autofocus
                  label="Last name"
                  placeholder="Doe"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="form.email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                  type="email"
                  placeholder="email@hohoema.com"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="form.password"
                  :rules="[requiredValidator]"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="form.confirm_password"
                  :rules="[requiredValidator]"
                  label="Confirm Password"
                  placeholder="············"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="
                    isConfirmPasswordVisible = !isConfirmPasswordVisible
                  "
                />

                <VBtn class="mt-4" v-if="!signUpLoading" block type="submit">
                  Sign up
                </VBtn>
                <VBtn class="mt-4" v-else block>
                  <VProgressCircular color="secondary" indeterminate />
                </VBtn>
              </VCol>

              <VCol cols="12" class="text-center text-base">
                <span>Already have an account?</span>
                <VBtn
                  variant="plain"
                  density="compact"
                  class="text-primary ms-2"
                  @click="goToRegister"
                  :disabled="signUpLoading"
                >
                  Sign in instead
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
