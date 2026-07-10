import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { useSidebarStyles } from "./sidebar-root";

interface SidebarGroupContentProps extends CollapsiblePrimitive.Panel.Props {
  className?: string;
}

export function SidebarGroupContent({ className, ...props }: SidebarGroupContentProps) {
  const styles = useSidebarStyles();
  return (
    <CollapsiblePrimitive.Panel
      {...props}
      className={styles.groupContent({ class: className })}
      data-slot="sidebar-group-content"
    />
  );
}
