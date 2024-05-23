import type { VerticalNavItems } from "@/@layouts/types";

export default [
  {
    title: "Home",
    icon: { icon: "tabler-home" },
    to: "home",
  },
  {
    title: "All Assets",
    icon: { icon: "tabler-asset" },
    to: "allAssets",
  },
  {
    title: "Users",
    icon: { icon: "tabler-users" },
    to: "users",
  },
  {
    title: "Audit Log",
    icon: { icon: "tabler-article" },
    to: "auditLog",
  },
] as VerticalNavItems;
