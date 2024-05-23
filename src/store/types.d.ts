import { UserType } from "@/graphql/generated/__generated_graphql";

export interface AuthStoreState {
  loading: boolean;
  token: string;
  isLoggingIn: boolean;
  isLoggedIn: boolean;
  error: string;
}

export interface UserStoreState {
  user: UserType;
  users: UserType[];
  isLoading: boolean;
}
