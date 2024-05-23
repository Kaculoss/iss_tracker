/* eslint-disable */
// @ts-nocheck
import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import type * as VueCompositionApi from '@vue/composition-api';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ISODate: { input: any; output: any; }
};

export type AssetType = {
  __typename?: 'AssetType';
  code: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['ISODate']['output']>;
  deletedAt?: Maybe<Scalars['ISODate']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['ISODate']['output']>;
  vendor?: Maybe<Scalars['String']['output']>;
};

export type AuditLogType = {
  __typename?: 'AuditLogType';
  createdAt?: Maybe<Scalars['ISODate']['output']>;
  event: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  type: Scalars['String']['output'];
  user: UserType;
  user_role: Scalars['String']['output'];
};

export type AuthUser = {
  __typename?: 'AuthUser';
  access_token: Scalars['String']['output'];
  user: UserType;
};

export type EntitlementType = {
  __typename?: 'EntitlementType';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type PermissionType = {
  __typename?: 'PermissionType';
  entitlement: EntitlementType;
  id: Scalars['ID']['output'];
};

export type RoleType = {
  __typename?: 'RoleType';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permissions?: Maybe<Array<Maybe<PermissionType>>>;
};

export type RootMutation = {
  __typename?: 'RootMutation';
  assignRole?: Maybe<UserType>;
  createAsset?: Maybe<AssetType>;
  deleteAsset?: Maybe<Scalars['Boolean']['output']>;
  login?: Maybe<AuthUser>;
  logout?: Maybe<Scalars['Boolean']['output']>;
  signup?: Maybe<SignUpType>;
  updateAsset?: Maybe<AssetType>;
};


export type RootMutationAssignRoleArgs = {
  role_id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
};


export type RootMutationCreateAssetArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  type: Scalars['String']['input'];
  vendor?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationDeleteAssetArgs = {
  id: Scalars['ID']['input'];
};


export type RootMutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type RootMutationLogoutArgs = {
  id: Scalars['ID']['input'];
};


export type RootMutationSignupArgs = {
  confirm_password: Scalars['String']['input'];
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type RootMutationUpdateAssetArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  vendor?: InputMaybe<Scalars['String']['input']>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  allAssets?: Maybe<Array<Maybe<AssetType>>>;
  auditLogs?: Maybe<Array<Maybe<AuditLogType>>>;
  entitlements?: Maybe<Array<Maybe<EntitlementType>>>;
  fullAssetInfo?: Maybe<AssetType>;
  roles?: Maybe<Array<Maybe<RoleType>>>;
  someAssetInfo?: Maybe<SomeAssetInfoType>;
  user?: Maybe<UserType>;
  users?: Maybe<Array<Maybe<UserType>>>;
};


export type RootQueryFullAssetInfoArgs = {
  code: Scalars['String']['input'];
};


export type RootQuerySomeAssetInfoArgs = {
  code: Scalars['String']['input'];
};


export type RootQueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type SignUpType = {
  __typename?: 'SignUpType';
  access_token: Scalars['String']['output'];
  user: UserType;
};

export type SomeAssetInfoType = {
  __typename?: 'SomeAssetInfoType';
  code: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type UserType = {
  __typename?: 'UserType';
  active: Scalars['Boolean']['output'];
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['ISODate']['output']>;
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  full_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  last_name: Scalars['String']['output'];
  role: RoleType;
};

export type AssetFragmentFragment = { __typename?: 'AssetType', id: string, code: string, name: string, type: string, price: number, vendor?: string | null, description?: string | null, location?: string | null, createdAt?: any | null, updatedAt?: any | null };

export type AuditLogFragmentFragment = { __typename?: 'AuditLogType', id: string, event: string, type: string, createdAt?: any | null, user_role: string, user: { __typename?: 'UserType', id: string, email: string, full_name: string, first_name: string, last_name: string, avatar?: string | null, active: boolean, createdAt?: any | null, role: { __typename?: 'RoleType', id: string, name: string, description?: string | null, permissions?: Array<{ __typename?: 'PermissionType', id: string, entitlement: { __typename?: 'EntitlementType', id: string, name: string } } | null> | null } } };

export type EntitlementFragmentFragment = { __typename?: 'EntitlementType', id: string, name: string };

export type RoleFragmentFragment = { __typename?: 'RoleType', id: string, name: string, description?: string | null, permissions?: Array<{ __typename?: 'PermissionType', id: string, entitlement: { __typename?: 'EntitlementType', id: string, name: string } } | null> | null };

export type SomeAssetInfoFragmentFragment = { __typename?: 'SomeAssetInfoType', id: string, code: string, name: string, type: string, description?: string | null, location?: string | null };

export type UserFragmentFragment = { __typename?: 'UserType', id: string, email: string, full_name: string, first_name: string, last_name: string, avatar?: string | null, active: boolean, createdAt?: any | null, role: { __typename?: 'RoleType', id: string, name: string, description?: string | null, permissions?: Array<{ __typename?: 'PermissionType', id: string, entitlement: { __typename?: 'EntitlementType', id: string, name: string } } | null> | null } };

export type AssignRoleMutationVariables = Exact<{
  user_id: Scalars['ID']['input'];
  role_id: Scalars['ID']['input'];
}>;


export type AssignRoleMutation = { __typename?: 'RootMutation', assignRole?: { __typename?: 'UserType', id: string, email: string, full_name: string, first_name: string, last_name: string, avatar?: string | null, active: boolean, createdAt?: any | null, role: { __typename?: 'RoleType', id: string, name: string, description?: string | null, permissions?: Array<{ __typename?: 'PermissionType', id: string, entitlement: { __typename?: 'EntitlementType', id: string, name: string } } | null> | null } } | null };

export type CreateAssetMutationVariables = Exact<{
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  vendor?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateAssetMutation = { __typename?: 'RootMutation', createAsset?: { __typename?: 'AssetType', id: string, code: string, name: string, type: string, price: number, vendor?: string | null, description?: string | null, location?: string | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type DeleteAssetMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteAssetMutation = { __typename?: 'RootMutation', deleteAsset?: boolean | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'RootMutation', login?: { __typename?: 'AuthUser', access_token: string, user: { __typename?: 'UserType', id: string, email: string, full_name: string, first_name: string, last_name: string, avatar?: string | null, active: boolean, createdAt?: any | null, role: { __typename?: 'RoleType', id: string, name: string, description?: string | null, permissions?: Array<{ __typename?: 'PermissionType', id: string, entitlement: { __typename?: 'EntitlementType', id: string, name: string } } | null> | null } } } | null };

export type LogoutMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type LogoutMutation = { __typename?: 'RootMutation', logout?: boolean | null };

export type SignupMutationVariables = Exact<{
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  confirm_password: Scalars['String']['input'];
}>;


export type SignupMutation = { __typename?: 'RootMutation', signup?: { __typename?: 'SignUpType', access_token: string, user: { __typename?: 'UserType', id: string, email: string, full_name: string, first_name: string, last_name: string, avatar?: string | null, active: boolean, createdAt?: any | null, role: { __typename?: 'RoleType', id: string, name: string, description?: string | null, permissions?: Array<{ __typename?: 'PermissionType', id: string, entitlement: { __typename?: 'EntitlementType', id: string, name: string } } | null> | null } } } | null };

export type UpdateAssetMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  vendor?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateAssetMutation = { __typename?: 'RootMutation', updateAsset?: { __typename?: 'AssetType', id: string, code: string, name: string, type: string, price: number, vendor?: string | null, description?: string | null, location?: string | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type AllAssetsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllAssetsQuery = { __typename?: 'RootQuery', allAssets?: Array<{ __typename?: 'AssetType', id: string, code: string, name: string, type: string, price: number, vendor?: string | null, description?: string | null, location?: string | null, createdAt?: any | null, updatedAt?: any | null } | null> | null };

export type AuditLogsQueryVariables = Exact<{ [key: string]: never; }>;


export type AuditLogsQuery = { __typename?: 'RootQuery', auditLogs?: Array<{ __typename?: 'AuditLogType', id: string, event: string, type: string, createdAt?: any | null, user_role: string, user: { __typename?: 'UserType', id: string, email: string, full_name: string, first_name: string, last_name: string, avatar?: string | null, active: boolean, createdAt?: any | null, role: { __typename?: 'RoleType', id: string, name: string, description?: string | null, permissions?: Array<{ __typename?: 'PermissionType', id: string, entitlement: { __typename?: 'EntitlementType', id: string, name: string } } | null> | null } } } | null> | null };

export type EntitlementsQueryVariables = Exact<{ [key: string]: never; }>;


export type EntitlementsQuery = { __typename?: 'RootQuery', entitlements?: Array<{ __typename?: 'EntitlementType', id: string, name: string } | null> | null };

export type FullAssetInfoQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type FullAssetInfoQuery = { __typename?: 'RootQuery', fullAssetInfo?: { __typename?: 'AssetType', id: string, code: string, name: string, type: string, price: number, vendor?: string | null, description?: string | null, location?: string | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type RolesQueryVariables = Exact<{ [key: string]: never; }>;


export type RolesQuery = { __typename?: 'RootQuery', roles?: Array<{ __typename?: 'RoleType', id: string, name: string, description?: string | null, permissions?: Array<{ __typename?: 'PermissionType', id: string, entitlement: { __typename?: 'EntitlementType', id: string, name: string } } | null> | null } | null> | null };

export type SomeAssetInfoQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type SomeAssetInfoQuery = { __typename?: 'RootQuery', someAssetInfo?: { __typename?: 'SomeAssetInfoType', id: string, code: string, name: string, type: string, description?: string | null, location?: string | null } | null };

export type UserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserQuery = { __typename?: 'RootQuery', user?: { __typename?: 'UserType', id: string, email: string, full_name: string, first_name: string, last_name: string, avatar?: string | null, active: boolean, createdAt?: any | null, role: { __typename?: 'RoleType', id: string, name: string, description?: string | null, permissions?: Array<{ __typename?: 'PermissionType', id: string, entitlement: { __typename?: 'EntitlementType', id: string, name: string } } | null> | null } } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'RootQuery', users?: Array<{ __typename?: 'UserType', id: string, email: string, full_name: string, first_name: string, last_name: string, avatar?: string | null, active: boolean, createdAt?: any | null, role: { __typename?: 'RoleType', id: string, name: string, description?: string | null, permissions?: Array<{ __typename?: 'PermissionType', id: string, entitlement: { __typename?: 'EntitlementType', id: string, name: string } } | null> | null } } | null> | null };

export const AssetFragment = gql`
    fragment AssetFragment on AssetType {
  id
  code
  name
  type
  price
  vendor
  description
  location
  createdAt
  updatedAt
}
    `;
export const EntitlementFragment = gql`
    fragment EntitlementFragment on EntitlementType {
  id
  name
}
    `;
export const RoleFragment = gql`
    fragment RoleFragment on RoleType {
  id
  name
  description
  permissions {
    id
    entitlement {
      ...EntitlementFragment
    }
  }
}
    ${EntitlementFragment}`;
export const UserFragment = gql`
    fragment UserFragment on UserType {
  id
  email
  full_name
  first_name
  last_name
  avatar
  active
  createdAt
  role {
    ...RoleFragment
  }
}
    ${RoleFragment}`;
export const AuditLogFragment = gql`
    fragment AuditLogFragment on AuditLogType {
  id
  event
  type
  createdAt
  user_role
  user {
    ...UserFragment
  }
}
    ${UserFragment}`;
export const SomeAssetInfoFragment = gql`
    fragment SomeAssetInfoFragment on SomeAssetInfoType {
  id
  code
  name
  type
  description
  location
}
    `;
export const AssignRole = gql`
    mutation AssignRole($user_id: ID!, $role_id: ID!) {
  assignRole(user_id: $user_id, role_id: $role_id) {
    ...UserFragment
  }
}
    ${UserFragment}`;
export const CreateAsset = gql`
    mutation CreateAsset($name: String!, $type: String!, $price: Int!, $location: String, $vendor: String, $description: String) {
  createAsset(
    name: $name
    type: $type
    price: $price
    location: $location
    vendor: $vendor
    description: $description
  ) {
    ...AssetFragment
  }
}
    ${AssetFragment}`;
export const DeleteAsset = gql`
    mutation DeleteAsset($id: ID!) {
  deleteAsset(id: $id)
}
    `;
export const Login = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    access_token
    user {
      ...UserFragment
    }
  }
}
    ${UserFragment}`;
export const Logout = gql`
    mutation Logout($id: ID!) {
  logout(id: $id)
}
    `;
export const Signup = gql`
    mutation Signup($first_name: String!, $last_name: String!, $email: String!, $password: String!, $confirm_password: String!) {
  signup(
    first_name: $first_name
    last_name: $last_name
    email: $email
    password: $password
    confirm_password: $confirm_password
  ) {
    access_token
    user {
      ...UserFragment
    }
  }
}
    ${UserFragment}`;
export const UpdateAsset = gql`
    mutation UpdateAsset($id: ID!, $name: String, $type: String, $price: Int, $location: String, $vendor: String, $description: String) {
  updateAsset(
    id: $id
    name: $name
    type: $type
    price: $price
    location: $location
    vendor: $vendor
    description: $description
  ) {
    ...AssetFragment
  }
}
    ${AssetFragment}`;
export const AllAssets = gql`
    query AllAssets {
  allAssets {
    ...AssetFragment
  }
}
    ${AssetFragment}`;
export const AuditLogs = gql`
    query AuditLogs {
  auditLogs {
    ...AuditLogFragment
  }
}
    ${AuditLogFragment}`;
export const Entitlements = gql`
    query Entitlements {
  entitlements {
    ...EntitlementFragment
  }
}
    ${EntitlementFragment}`;
export const FullAssetInfo = gql`
    query FullAssetInfo($code: String!) {
  fullAssetInfo(code: $code) {
    ...AssetFragment
  }
}
    ${AssetFragment}`;
export const Roles = gql`
    query roles {
  roles {
    ...RoleFragment
  }
}
    ${RoleFragment}`;
export const SomeAssetInfo = gql`
    query SomeAssetInfo($code: String!) {
  someAssetInfo(code: $code) {
    ...SomeAssetInfoFragment
  }
}
    ${SomeAssetInfoFragment}`;
export const User = gql`
    query User($id: ID!) {
  user(id: $id) {
    ...UserFragment
  }
}
    ${UserFragment}`;
export const Users = gql`
    query Users {
  users {
    ...UserFragment
  }
}
    ${UserFragment}`;
export const AssetFragmentFragmentDoc = gql`
    fragment AssetFragment on AssetType {
  id
  code
  name
  type
  price
  vendor
  description
  location
  createdAt
  updatedAt
}
    `;
export const EntitlementFragmentFragmentDoc = gql`
    fragment EntitlementFragment on EntitlementType {
  id
  name
}
    `;
export const RoleFragmentFragmentDoc = gql`
    fragment RoleFragment on RoleType {
  id
  name
  description
  permissions {
    id
    entitlement {
      ...EntitlementFragment
    }
  }
}
    ${EntitlementFragmentFragmentDoc}`;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on UserType {
  id
  email
  full_name
  first_name
  last_name
  avatar
  active
  createdAt
  role {
    ...RoleFragment
  }
}
    ${RoleFragmentFragmentDoc}`;
export const AuditLogFragmentFragmentDoc = gql`
    fragment AuditLogFragment on AuditLogType {
  id
  event
  type
  createdAt
  user_role
  user {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export const SomeAssetInfoFragmentFragmentDoc = gql`
    fragment SomeAssetInfoFragment on SomeAssetInfoType {
  id
  code
  name
  type
  description
  location
}
    `;
export const AssignRoleDocument = gql`
    mutation AssignRole($user_id: ID!, $role_id: ID!) {
  assignRole(user_id: $user_id, role_id: $role_id) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useAssignRoleMutation__
 *
 * To run a mutation, you first call `useAssignRoleMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAssignRoleMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAssignRoleMutation({
 *   variables: {
 *     user_id: // value for 'user_id'
 *     role_id: // value for 'role_id'
 *   },
 * });
 */
export function useAssignRoleMutation(options: VueApolloComposable.UseMutationOptions<AssignRoleMutation, AssignRoleMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<AssignRoleMutation, AssignRoleMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<AssignRoleMutation, AssignRoleMutationVariables>(AssignRoleDocument, options);
}
export type AssignRoleMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<AssignRoleMutation, AssignRoleMutationVariables>;
export const CreateAssetDocument = gql`
    mutation CreateAsset($name: String!, $type: String!, $price: Int!, $location: String, $vendor: String, $description: String) {
  createAsset(
    name: $name
    type: $type
    price: $price
    location: $location
    vendor: $vendor
    description: $description
  ) {
    ...AssetFragment
  }
}
    ${AssetFragmentFragmentDoc}`;

/**
 * __useCreateAssetMutation__
 *
 * To run a mutation, you first call `useCreateAssetMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssetMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateAssetMutation({
 *   variables: {
 *     name: // value for 'name'
 *     type: // value for 'type'
 *     price: // value for 'price'
 *     location: // value for 'location'
 *     vendor: // value for 'vendor'
 *     description: // value for 'description'
 *   },
 * });
 */
export function useCreateAssetMutation(options: VueApolloComposable.UseMutationOptions<CreateAssetMutation, CreateAssetMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateAssetMutation, CreateAssetMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateAssetMutation, CreateAssetMutationVariables>(CreateAssetDocument, options);
}
export type CreateAssetMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateAssetMutation, CreateAssetMutationVariables>;
export const DeleteAssetDocument = gql`
    mutation DeleteAsset($id: ID!) {
  deleteAsset(id: $id)
}
    `;

/**
 * __useDeleteAssetMutation__
 *
 * To run a mutation, you first call `useDeleteAssetMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAssetMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteAssetMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAssetMutation(options: VueApolloComposable.UseMutationOptions<DeleteAssetMutation, DeleteAssetMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteAssetMutation, DeleteAssetMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<DeleteAssetMutation, DeleteAssetMutationVariables>(DeleteAssetDocument, options);
}
export type DeleteAssetMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteAssetMutation, DeleteAssetMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    access_token
    user {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout($id: ID!) {
  logout(id: $id)
}
    `;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLogoutMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useLogoutMutation(options: VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
}
export type LogoutMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LogoutMutation, LogoutMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($first_name: String!, $last_name: String!, $email: String!, $password: String!, $confirm_password: String!) {
  signup(
    first_name: $first_name
    last_name: $last_name
    email: $email
    password: $password
    confirm_password: $confirm_password
  ) {
    access_token
    user {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSignupMutation({
 *   variables: {
 *     first_name: // value for 'first_name'
 *     last_name: // value for 'last_name'
 *     email: // value for 'email'
 *     password: // value for 'password'
 *     confirm_password: // value for 'confirm_password'
 *   },
 * });
 */
export function useSignupMutation(options: VueApolloComposable.UseMutationOptions<SignupMutation, SignupMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SignupMutation, SignupMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
}
export type SignupMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SignupMutation, SignupMutationVariables>;
export const UpdateAssetDocument = gql`
    mutation UpdateAsset($id: ID!, $name: String, $type: String, $price: Int, $location: String, $vendor: String, $description: String) {
  updateAsset(
    id: $id
    name: $name
    type: $type
    price: $price
    location: $location
    vendor: $vendor
    description: $description
  ) {
    ...AssetFragment
  }
}
    ${AssetFragmentFragmentDoc}`;

/**
 * __useUpdateAssetMutation__
 *
 * To run a mutation, you first call `useUpdateAssetMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAssetMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateAssetMutation({
 *   variables: {
 *     id: // value for 'id'
 *     name: // value for 'name'
 *     type: // value for 'type'
 *     price: // value for 'price'
 *     location: // value for 'location'
 *     vendor: // value for 'vendor'
 *     description: // value for 'description'
 *   },
 * });
 */
export function useUpdateAssetMutation(options: VueApolloComposable.UseMutationOptions<UpdateAssetMutation, UpdateAssetMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateAssetMutation, UpdateAssetMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateAssetMutation, UpdateAssetMutationVariables>(UpdateAssetDocument, options);
}
export type UpdateAssetMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateAssetMutation, UpdateAssetMutationVariables>;
export const AllAssetsDocument = gql`
    query AllAssets {
  allAssets {
    ...AssetFragment
  }
}
    ${AssetFragmentFragmentDoc}`;

/**
 * __useAllAssetsQuery__
 *
 * To run a query within a Vue component, call `useAllAssetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllAssetsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useAllAssetsQuery();
 */
export function useAllAssetsQuery(options: VueApolloComposable.UseQueryOptions<AllAssetsQuery, AllAssetsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AllAssetsQuery, AllAssetsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<AllAssetsQuery, AllAssetsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<AllAssetsQuery, AllAssetsQueryVariables>(AllAssetsDocument, {}, options);
}
export function useAllAssetsLazyQuery(options: VueApolloComposable.UseQueryOptions<AllAssetsQuery, AllAssetsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AllAssetsQuery, AllAssetsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<AllAssetsQuery, AllAssetsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<AllAssetsQuery, AllAssetsQueryVariables>(AllAssetsDocument, {}, options);
}
export type AllAssetsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<AllAssetsQuery, AllAssetsQueryVariables>;
export const AuditLogsDocument = gql`
    query AuditLogs {
  auditLogs {
    ...AuditLogFragment
  }
}
    ${AuditLogFragmentFragmentDoc}`;

/**
 * __useAuditLogsQuery__
 *
 * To run a query within a Vue component, call `useAuditLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuditLogsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useAuditLogsQuery();
 */
export function useAuditLogsQuery(options: VueApolloComposable.UseQueryOptions<AuditLogsQuery, AuditLogsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AuditLogsQuery, AuditLogsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<AuditLogsQuery, AuditLogsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<AuditLogsQuery, AuditLogsQueryVariables>(AuditLogsDocument, {}, options);
}
export function useAuditLogsLazyQuery(options: VueApolloComposable.UseQueryOptions<AuditLogsQuery, AuditLogsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AuditLogsQuery, AuditLogsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<AuditLogsQuery, AuditLogsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<AuditLogsQuery, AuditLogsQueryVariables>(AuditLogsDocument, {}, options);
}
export type AuditLogsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<AuditLogsQuery, AuditLogsQueryVariables>;
export const EntitlementsDocument = gql`
    query Entitlements {
  entitlements {
    ...EntitlementFragment
  }
}
    ${EntitlementFragmentFragmentDoc}`;

/**
 * __useEntitlementsQuery__
 *
 * To run a query within a Vue component, call `useEntitlementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntitlementsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useEntitlementsQuery();
 */
export function useEntitlementsQuery(options: VueApolloComposable.UseQueryOptions<EntitlementsQuery, EntitlementsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<EntitlementsQuery, EntitlementsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<EntitlementsQuery, EntitlementsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<EntitlementsQuery, EntitlementsQueryVariables>(EntitlementsDocument, {}, options);
}
export function useEntitlementsLazyQuery(options: VueApolloComposable.UseQueryOptions<EntitlementsQuery, EntitlementsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<EntitlementsQuery, EntitlementsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<EntitlementsQuery, EntitlementsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<EntitlementsQuery, EntitlementsQueryVariables>(EntitlementsDocument, {}, options);
}
export type EntitlementsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<EntitlementsQuery, EntitlementsQueryVariables>;
export const FullAssetInfoDocument = gql`
    query FullAssetInfo($code: String!) {
  fullAssetInfo(code: $code) {
    ...AssetFragment
  }
}
    ${AssetFragmentFragmentDoc}`;

/**
 * __useFullAssetInfoQuery__
 *
 * To run a query within a Vue component, call `useFullAssetInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useFullAssetInfoQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useFullAssetInfoQuery({
 *   code: // value for 'code'
 * });
 */
export function useFullAssetInfoQuery(variables: FullAssetInfoQueryVariables | VueCompositionApi.Ref<FullAssetInfoQueryVariables> | ReactiveFunction<FullAssetInfoQueryVariables>, options: VueApolloComposable.UseQueryOptions<FullAssetInfoQuery, FullAssetInfoQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FullAssetInfoQuery, FullAssetInfoQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FullAssetInfoQuery, FullAssetInfoQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<FullAssetInfoQuery, FullAssetInfoQueryVariables>(FullAssetInfoDocument, variables, options);
}
export function useFullAssetInfoLazyQuery(variables: FullAssetInfoQueryVariables | VueCompositionApi.Ref<FullAssetInfoQueryVariables> | ReactiveFunction<FullAssetInfoQueryVariables>, options: VueApolloComposable.UseQueryOptions<FullAssetInfoQuery, FullAssetInfoQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FullAssetInfoQuery, FullAssetInfoQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FullAssetInfoQuery, FullAssetInfoQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<FullAssetInfoQuery, FullAssetInfoQueryVariables>(FullAssetInfoDocument, variables, options);
}
export type FullAssetInfoQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<FullAssetInfoQuery, FullAssetInfoQueryVariables>;
export const RolesDocument = gql`
    query roles {
  roles {
    ...RoleFragment
  }
}
    ${RoleFragmentFragmentDoc}`;

/**
 * __useRolesQuery__
 *
 * To run a query within a Vue component, call `useRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useRolesQuery();
 */
export function useRolesQuery(options: VueApolloComposable.UseQueryOptions<RolesQuery, RolesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<RolesQuery, RolesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<RolesQuery, RolesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<RolesQuery, RolesQueryVariables>(RolesDocument, {}, options);
}
export function useRolesLazyQuery(options: VueApolloComposable.UseQueryOptions<RolesQuery, RolesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<RolesQuery, RolesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<RolesQuery, RolesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<RolesQuery, RolesQueryVariables>(RolesDocument, {}, options);
}
export type RolesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<RolesQuery, RolesQueryVariables>;
export const SomeAssetInfoDocument = gql`
    query SomeAssetInfo($code: String!) {
  someAssetInfo(code: $code) {
    ...SomeAssetInfoFragment
  }
}
    ${SomeAssetInfoFragmentFragmentDoc}`;

/**
 * __useSomeAssetInfoQuery__
 *
 * To run a query within a Vue component, call `useSomeAssetInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useSomeAssetInfoQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSomeAssetInfoQuery({
 *   code: // value for 'code'
 * });
 */
export function useSomeAssetInfoQuery(variables: SomeAssetInfoQueryVariables | VueCompositionApi.Ref<SomeAssetInfoQueryVariables> | ReactiveFunction<SomeAssetInfoQueryVariables>, options: VueApolloComposable.UseQueryOptions<SomeAssetInfoQuery, SomeAssetInfoQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SomeAssetInfoQuery, SomeAssetInfoQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SomeAssetInfoQuery, SomeAssetInfoQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<SomeAssetInfoQuery, SomeAssetInfoQueryVariables>(SomeAssetInfoDocument, variables, options);
}
export function useSomeAssetInfoLazyQuery(variables: SomeAssetInfoQueryVariables | VueCompositionApi.Ref<SomeAssetInfoQueryVariables> | ReactiveFunction<SomeAssetInfoQueryVariables>, options: VueApolloComposable.UseQueryOptions<SomeAssetInfoQuery, SomeAssetInfoQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SomeAssetInfoQuery, SomeAssetInfoQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SomeAssetInfoQuery, SomeAssetInfoQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<SomeAssetInfoQuery, SomeAssetInfoQueryVariables>(SomeAssetInfoDocument, variables, options);
}
export type SomeAssetInfoQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<SomeAssetInfoQuery, SomeAssetInfoQueryVariables>;
export const UserDocument = gql`
    query User($id: ID!) {
  user(id: $id) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a Vue component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useUserQuery({
 *   id: // value for 'id'
 * });
 */
export function useUserQuery(variables: UserQueryVariables | VueCompositionApi.Ref<UserQueryVariables> | ReactiveFunction<UserQueryVariables>, options: VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<UserQuery, UserQueryVariables>(UserDocument, variables, options);
}
export function useUserLazyQuery(variables: UserQueryVariables | VueCompositionApi.Ref<UserQueryVariables> | ReactiveFunction<UserQueryVariables>, options: VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, variables, options);
}
export type UserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a Vue component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useUsersQuery();
 */
export function useUsersQuery(options: VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, {}, options);
}
export function useUsersLazyQuery(options: VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, {}, options);
}
export type UsersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<UsersQuery, UsersQueryVariables>;