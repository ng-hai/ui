import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContextMenuStyles } from "./context-menu-root";

interface ContextMenuTriggerProps extends ContextMenuPrimitive.Trigger.Props {
  className?: string;
}

export function ContextMenuTrigger({ className, ...props }: ContextMenuTriggerProps) {
  const styles = useContextMenuStyles();
  return (
    <ContextMenuPrimitive.Trigger
      {...props}
      className={styles.trigger({ class: className })}
      data-slot="context-menu-trigger"
    />
  );
}
