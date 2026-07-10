import type { ComponentProps } from "react";
import { useSidebarStyles } from "./sidebar-root";

interface SidebarItemLabelProps extends ComponentProps<"span"> {}

export function SidebarItemLabel({ className, ...props }: SidebarItemLabelProps) {
  const styles = useSidebarStyles();
  return <span {...props} className={styles.itemLabel({ class: className })} data-slot="sidebar-item-label" />;
}
