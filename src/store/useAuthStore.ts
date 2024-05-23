import { defineStore } from "pinia";

import { provideApolloClient } from "@vue/apollo-composable";
import apolloClient from "@/apollo-config";

import type { AuthStoreState } from "./types";
import { getDefaultAbilities } from "@/plugins/casl/abilities";

import {
  UserType,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
} from "@/graphql/generated/__generated_graphql";
import { useUserStore } from "./useUserStore";

export type onFinishType = (a: boolean) => void;

provideApolloClient(apolloClient);

const user = useUserStore();

export const useAuthStore = defineStore("auth", {
  state: (): AuthStoreState => ({
    token: "",
    loading: false,
    isLoggingIn: false,
    isLoggedIn: false,
    error: "",
  }),
  actions: {
    /**
     * Attempt to login a user
     *
     * @param {string} email
     * @param {string} password
     * @param {string} first_name
     * @param {string} last_name
     * @param {string} confirm_password
     * @param {onFinishType} onFinish
     */
    signup(
      email: string,
      password: string,
      first_name: string,
      last_name: string,
      confirm_password: string,
      onFinish: onFinishType
    ) {
      this.isLoggingIn = true;

      const { mutate: signup, onDone, onError } = useSignupMutation();

      onDone((result) => {
        this.error = "";

        const data = result.data?.signup;

        // Store access token
        this.token = data!.access_token;
        localStorage.setItem("accessToken", this.token);

        // Store user info
        user.setUserData(data!.user as UserType);

        this.isLoggedIn = true;
        this.isLoggingIn = false;

        onFinish(true);
      });

      onError((error) => {
        this.isLoggingIn = false;
        this.error = error.message;
        console.log(this.error);
        // useShowError(error.message);

        onFinish(false);
      });

      signup({ email, password, first_name, last_name, confirm_password });
    },

    login(email: string, password: string, onFinish: onFinishType) {
      this.isLoggingIn = true;

      const { mutate: login, onDone, onError } = useLoginMutation();

      onDone((result) => {
        this.error = "";

        const data = result.data?.login;

        // Store access token
        this.token = data!.access_token;
        localStorage.setItem("accessToken", this.token);

        // Store user info
        user.setUserData(data!.user as UserType);

        this.isLoggedIn = true;
        this.isLoggingIn = false;

        onFinish(true);
      });

      onError((error) => {
        this.isLoggingIn = false;
        this.error = error.message;
        console.log(this.error);
        // useShowError(error.message);

        onFinish(false);
      });

      login({ email, password });
    },

    logout() {
      const { mutate: logout, onDone, onError } = useLogoutMutation();

      onDone((result) => {
        this.error = "";

        const data = result.data?.logout;

        if (data) {
          user.delUserData();
          localStorage.removeItem("accessToken");

          this.router.push("/login").then(() => {
            // Remove "userAbilities" from localStorage
            localStorage.removeItem("userAbilities");

            // Reset ability to initial ability
            this.ability.update(getDefaultAbilities());
          });

          this.$reset();
        }
      });

      onError((error) => {
        this.error = error.message;
        console.log(this.error);
        // useShowError(error.message);
      });

      logout({ id: user.authUserId()!.toString() });
    },
  },
});
