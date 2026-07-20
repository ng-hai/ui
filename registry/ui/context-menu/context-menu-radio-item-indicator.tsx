import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContextMenuStyles } from "./context-menu-root";

interface ContextMenuRadioItemIndicatorProps extends ContextMenuPrimitive.RadioItemIndicator.Props {
  className?: string;
}

export function ContextMenuRadioItemIndicator({ className, ...props }: ContextMenuRadioItemIndicatorProps) {
  const styles = useContextMenuStyles();
  return (
    <ContextMenuPrimitive.RadioItemIndicator
      {...props}
      className={styles.radioItemIndicator({ class: className })}
      data-slot="context-menu-radio-item-indicator"
    />
  );
}
