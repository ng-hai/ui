import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContextMenuStyles } from "./context-menu-root";

interface ContextMenuBackdropProps extends ContextMenuPrimitive.Backdrop.Props {
  className?: string;
}

export function ContextMenuBackdrop({ className, ...props }: ContextMenuBackdropProps) {
  const styles = useContextMenuStyles();
  return (
    <ContextMenuPrimitive.Backdrop
      {...props}
      className={styles.backdrop({ class: className })}
      data-slot="context-menu-backdrop"
    />
  );
}
