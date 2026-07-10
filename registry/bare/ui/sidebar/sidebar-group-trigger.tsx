import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { useSidebarStyles } from "./sidebar-root";

interface SidebarGroupTriggerProps extends CollapsiblePrimitive.Trigger.Props {
  className?: string;
}

export function SidebarGroupTrigger({ className, ...props }: SidebarGroupTriggerProps) {
  const styles = useSidebarStyles();
  return (
    <CollapsiblePrimitive.Trigger
      {...props}
      className={styles.groupTrigger({ class: className })}
      data-slot="sidebar-group-trigger"
    />
  );
}
