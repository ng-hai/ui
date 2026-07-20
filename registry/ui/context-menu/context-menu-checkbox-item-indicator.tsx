import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContextMenuStyles } from "./context-menu-root";

interface ContextMenuCheckboxItemIndicatorProps extends ContextMenuPrimitive.CheckboxItemIndicator.Props {
  className?: string;
}

export function ContextMenuCheckboxItemIndicator({ className, ...props }: ContextMenuCheckboxItemIndicatorProps) {
  const styles = useContextMenuStyles();
  return (
    <ContextMenuPrimitive.CheckboxItemIndicator
      {...props}
      className={styles.checkboxItemIndicator({ class: className })}
      data-slot="context-menu-checkbox-item-indicator"
    />
  );
}
