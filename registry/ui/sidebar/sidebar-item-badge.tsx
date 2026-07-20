import type { ComponentProps } from "react";
import { useSidebarStyles } from "./sidebar-root";

interface SidebarItemBadgeProps extends ComponentProps<"span"> {}

export function SidebarItemBadge({ className, ...props }: SidebarItemBadgeProps) {
  const styles = useSidebarStyles();
  return <span {...props} className={styles.itemBadge({ class: className })} data-slot="sidebar-item-badge" />;
}
