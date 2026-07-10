import type { ComponentProps } from "react";
import { useSidebarStyles } from "./sidebar-root";

interface SidebarContentProps extends ComponentProps<"nav"> {}

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  const styles = useSidebarStyles();
  return <nav {...props} className={styles.content({ class: className })} data-slot="sidebar-content" />;
}
