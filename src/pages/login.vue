<script setup lang="ts">
import Login from "@/views/authentication/Login.vue";
import Register from "@/views/authentication/Register.vue";

const isRegister = ref(false);

const setRegisterPage = (val: boolean) => {
  isRegister.value = val;
};
</script>

<template>
  <Register v-if="isRegister" @setToRegister="setRegisterPage" />
  <Login v-else @setToRegister="setRegisterPage" />
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
