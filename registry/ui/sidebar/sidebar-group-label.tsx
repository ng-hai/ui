import type { ComponentProps } from "react";
import { useSidebarStyles } from "./sidebar-root";

interface SidebarGroupLabelProps extends ComponentProps<"div"> {}

export function SidebarGroupLabel({ className, ...props }: SidebarGroupLabelProps) {
  const styles = useSidebarStyles();
  return <div {...props} className={styles.groupLabel({ class: className })} data-slot="sidebar-group-label" />;
}
