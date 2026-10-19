import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContextMenuStyles } from "./context-menu-root";

interface ContextMenuSeparatorProps extends ContextMenuPrimitive.Separator.Props {
  className?: string;
}

export function ContextMenuSeparator({ className, ...props }: ContextMenuSeparatorProps) {
  const styles = useContextMenuStyles();
  return (
    <ContextMenuPrimitive.Separator
      {...props}
      className={styles.separator({ class: className })}
      data-slot="context-menu-separator"
    />
  );
}
