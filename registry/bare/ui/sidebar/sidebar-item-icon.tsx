import type { ComponentProps } from "react";
import { useSidebarStyles } from "./sidebar-root";

interface SidebarItemIconProps extends ComponentProps<"span"> {}

export function SidebarItemIcon({ className, ...props }: SidebarItemIconProps) {
  const styles = useSidebarStyles();
  return (
    <span aria-hidden="true" {...props} className={styles.itemIcon({ class: className })} data-slot="sidebar-item-icon" />
  );
}
