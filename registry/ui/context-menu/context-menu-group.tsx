import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContextMenuStyles } from "./context-menu-root";

interface ContextMenuGroupProps extends ContextMenuPrimitive.Group.Props {
  className?: string;
}

export function ContextMenuGroup({ className, ...props }: ContextMenuGroupProps) {
  const styles = useContextMenuStyles();
  return (
    <ContextMenuPrimitive.Group
      {...props}
      className={styles.group({ class: className })}
      data-slot="context-menu-group"
    />
  );
}
