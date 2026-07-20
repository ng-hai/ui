import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContextMenuStyles } from "./context-menu-root";

interface ContextMenuSubmenuTriggerProps extends ContextMenuPrimitive.SubmenuTrigger.Props {
  className?: string;
}

export function ContextMenuSubmenuTrigger({ className, ...props }: ContextMenuSubmenuTriggerProps) {
  const styles = useContextMenuStyles();
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      {...props}
      className={styles.submenuTrigger({ class: className })}
      data-slot="context-menu-submenu-trigger"
    />
  );
}
