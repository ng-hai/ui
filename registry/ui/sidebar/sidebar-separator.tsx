import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { useSidebarStyles } from "./sidebar-root";

interface SidebarSeparatorProps extends SeparatorPrimitive.Props {
  className?: string;
}

export function SidebarSeparator({ className, ...props }: SidebarSeparatorProps) {
  const styles = useSidebarStyles();
  return (
    <SeparatorPrimitive {...props} className={styles.separator({ class: className })} data-slot="sidebar-separator" />
  );
}
