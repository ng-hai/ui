import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContextMenuStyles } from "./context-menu-root";

interface ContextMenuRadioItemProps extends ContextMenuPrimitive.RadioItem.Props {
  className?: string;
}

export function ContextMenuRadioItem({ className, ...props }: ContextMenuRadioItemProps) {
  const styles = useContextMenuStyles();
  return (
    <ContextMenuPrimitive.RadioItem
      {...props}
      className={styles.radioItem({ class: className })}
      data-slot="context-menu-radio-item"
    />
  );
}
