import { inject, InjectionKey } from "@vue/composition-api";

export interface CreateSnackbarOptions {
  color?: string;
  transition?: string;
  location?: string;
  timeout?: number;
  showCloseButton?: boolean;
  closeButtonColor?: string;
}

export type CreateSnackbar = (
  text: string,
  options?: CreateSnackbarOptions
) => void;

export const CreateSnackbarKey: InjectionKey<CreateSnackbar> =
  Symbol("CreateSnackbar");

export function useSnackbar() {
  const createSnackbar = inject(CreateSnackbarKey);

  if (!createSnackbar) {
    throw new Error("Could not resolve snackbar provider");
  }

  return createSnackbar;
}
