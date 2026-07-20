import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContextMenuStyles } from "./context-menu-root";

interface ContextMenuGroupLabelProps extends ContextMenuPrimitive.GroupLabel.Props {
  className?: string;
}

export function ContextMenuGroupLabel({ className, ...props }: ContextMenuGroupLabelProps) {
  const styles = useContextMenuStyles();
  return (
    <ContextMenuPrimitive.GroupLabel
      {...props}
      className={styles.groupLabel({ class: className })}
      data-slot="context-menu-group-label"
    />
  );
}
