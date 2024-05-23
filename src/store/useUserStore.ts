import { acceptHMRUpdate, defineStore } from "pinia";
import { useShowError, useShowSuccess } from "@/composables";
import type { UserStoreState } from "./types";

import {
  UserType,
  useUserQuery,
  useUsersQuery,
} from "@/graphql/generated/__generated_graphql";

export const useUserStore = defineStore("user", {
  state: (): UserStoreState => ({
    user: {} as UserType,
    users: [],
    isLoading: false,
  }),
  actions: {
    async getUsers() {
      this.isLoading = true;

      const { onError, onResult } = useUsersQuery({
        fetchPolicy: "network-only",
      });

      onError((error) => {
        this.isLoading = false;
        useShowError(error.message);
      });

      onResult((result) => {
        this.isLoading = false;
        this.users = result.data.users as UserType[];
      });
    },

    async getUser(id: string) {
      this.isLoading = true;

      const { onError, onResult } = useUserQuery(
        { id },
        { fetchPolicy: "network-only" }
      );

      onError((error) => {
        this.isLoading = false;
        useShowError(error.message);
      });

      onResult((result) => {
        this.isLoading = false;
        this.setUserData(result.data.user as UserType);
      });
    },

    setUserData(userData: UserType) {
      this.$patch({
        user: userData,
      });
      localStorage.setItem("userData", JSON.stringify(userData));
    },

    delUserData() {
      this.$reset();
      localStorage.removeItem("userData");
    },
  },
  getters: {
    items: (state) => {
      return (): UserType[] => {
        return state.users ?? [];
      };
    },

    authUser: (state) => {
      return (): UserType | null => {
        const u = localStorage.getItem("userData");
        if (u != null) {
          return JSON.parse(u) as UserType;
        }
        return u;
      };
    },

    authUserId: (state) => {
      return (): number | null => {
        const u = localStorage.getItem("userData");
        if (u != null) {
          const x = JSON.parse(u) as UserType;
          if (x) {
            return parseInt(x.id);
          }
        }

        return null;
      };
    },

    isSuperAdmin: (state) => {
      return (): boolean => {
        return state.user.role.id === "1";
      };
    },

    isAdmin: (state) => {
      return (): boolean => {
        return state.user.role.id === "2";
      };
    },

    isAssetManager: (state) => {
      return (): boolean => {
        return state.user.role.id === "3";
      };
    },

    isRegularUser: (state) => {
      return (): boolean => {
        return state.user.role.id === "4";
      };
    },
  },
  persist: true,
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot));
}
