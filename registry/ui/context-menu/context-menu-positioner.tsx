import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContextMenuStyles } from "./context-menu-root";

interface ContextMenuPositionerProps extends ContextMenuPrimitive.Positioner.Props {
  className?: string;
}

export function ContextMenuPositioner({ className, ...props }: ContextMenuPositionerProps) {
  const styles = useContextMenuStyles();
  return (
    <ContextMenuPrimitive.Positioner
      {...props}
      className={styles.positioner({ class: className })}
      data-slot="context-menu-positioner"
    />
  );
}
