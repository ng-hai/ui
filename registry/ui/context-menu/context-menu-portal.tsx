import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContextMenuStyles } from "./context-menu-root";

interface ContextMenuPortalProps extends ContextMenuPrimitive.Portal.Props {
  className?: string;
}

export function ContextMenuPortal({ className, ...props }: ContextMenuPortalProps) {
  const styles = useContextMenuStyles();
  return (
    <ContextMenuPrimitive.Portal
      {...props}
      className={styles.portal({ class: className })}
      data-slot="context-menu-portal"
    />
  );
}
