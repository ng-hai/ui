import type { ComponentProps } from "react";
import { useSidebarStyles } from "./sidebar-root";

interface SidebarHeaderProps extends ComponentProps<"div"> {}

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  const styles = useSidebarStyles();
  return <div {...props} className={styles.header({ class: className })} data-slot="sidebar-header" />;
}
