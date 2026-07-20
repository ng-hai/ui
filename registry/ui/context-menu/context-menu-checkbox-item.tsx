import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContextMenuStyles } from "./context-menu-root";

interface ContextMenuCheckboxItemProps extends ContextMenuPrimitive.CheckboxItem.Props {
  className?: string;
}

export function ContextMenuCheckboxItem({ className, ...props }: ContextMenuCheckboxItemProps) {
  const styles = useContextMenuStyles();
  return (
    <ContextMenuPrimitive.CheckboxItem
      {...props}
      className={styles.checkboxItem({ class: className })}
      data-slot="context-menu-checkbox-item"
    />
  );
}
