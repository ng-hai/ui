import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { useSidebarStyles } from "./sidebar-root";

interface SidebarGroupProps extends CollapsiblePrimitive.Root.Props {
  className?: string;
}

export function SidebarGroup({ className, defaultOpen = true, ...props }: SidebarGroupProps) {
  const styles = useSidebarStyles();
  return (
    <CollapsiblePrimitive.Root
      render={<section />}
      defaultOpen={defaultOpen}
      {...props}
      className={styles.group({ class: className })}
      data-slot="sidebar-group"
    />
  );
}
