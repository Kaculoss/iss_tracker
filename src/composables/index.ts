// import is from "is_js";
import axios from "axios";
import { useSnackbar } from "@/composables/toast/useSnackbar";

// import { reactive } from "vue";
// import { useAuthStore } from "@/stores/auth";

export function useCapitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function useUcwords(str: string) {
  if (typeof str !== "undefined") {
    return str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });
  } else {
    return str;
  }
}

export function useIsValidEmail(email: string) {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export function useShowInfo(message: string) {
  const toast = useSnackbar();
  toast(message, {
    color: "info",
  });
}

export function useShowSuccess(message: string) {
  const toast = useSnackbar();
  toast(message, {
    color: "success",
  });
}

export function useShowWarning(message: string) {
  const toast = useSnackbar();
  toast(message, {
    color: "warning",
  });
}

export function useShowError(message: string) {
  const toast = useSnackbar();
  toast(message, {
    color: "error",
  });
}

// export function useConfirmBeforeAction(action, cancel, props) {
//   const { reveal, onConfirm, onCancel } = createConfirmDialog(
//     SimpleDialog,
//     props
//   );
//   onCancel(cancel);
//   onConfirm(action);
//   reveal();
// }

// export function useConfirmModal() {
//   const modal = reactive({
//     title: "",
//     body: "",
//     open: false,
//     onCancel: null,
//     onConfirm: null,
//   });

//   function showModal(title, body, onCancel, onConfirm) {
//     modal.title = title;
//     modal.body = body;
//     modal.open = true;
//     modal.onCancel = onCancel;
//     modal.onConfirm = onConfirm;
//   }

//   function hideModal() {
//     modal.open = false;
//   }

//   return { modal, showModal, hideModal };
// }

// export function useHandleError(resp: any) {
//   const store = useAuthStore();

//   let k = "Error occurred. Contact System administrator.";
//   let m =
//     is.existy(resp) && is.existy(resp.body) && is.existy(resp.body.userMessage)
//       ? resp.body.userMessage
//       : k;
//   m = is.existy(resp) && is.existy(resp.userMessage) ? resp.userMessage : m;
//   m = this.getParamError(resp, m);
//   if (m === "Unauthenticated.") {
//     store.logout();
//     this.$router.push("/auth");
//   } else {
//     console.log("error", m);
//   }
// }

// export function getParamError(resp, m) {
//   if (is.existy(resp) && is.existy(resp.body) && is.existy(resp.body.message)) {
//     if (resp.body.file.includes("ApiRequest")) {
//       let errors = JSON.parse(resp.body.message);
//       let msg = "Missing information: ";
//       for (let x in errors) {
//         msg += errors[x][0] + "\r\n";
//       }
//       m = msg;
//     }
//   }
//   return m;
// }

export async function getImage(url: string, base64: boolean = false) {
  const image = await axios.get(url, {
    responseType: "arraybuffer",
  });
  const returnedB64 = Buffer.from(image.data).toString("base64");
  const returned = Buffer.from(image.data);

  return base64 ? returnedB64 : returned;
}
