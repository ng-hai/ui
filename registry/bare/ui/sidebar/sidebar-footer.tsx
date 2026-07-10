import type { ComponentProps } from "react";
import { useSidebarStyles } from "./sidebar-root";

interface SidebarFooterProps extends ComponentProps<"div"> {}

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  const styles = useSidebarStyles();
  return <div {...props} className={styles.footer({ class: className })} data-slot="sidebar-footer" />;
}
