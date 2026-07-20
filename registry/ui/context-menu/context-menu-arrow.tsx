import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContextMenuStyles } from "./context-menu-root";

interface ContextMenuArrowProps extends ContextMenuPrimitive.Arrow.Props {
  className?: string;
}

export function ContextMenuArrow({ className, ...props }: ContextMenuArrowProps) {
  const styles = useContextMenuStyles();
  return (
    <ContextMenuPrimitive.Arrow
      {...props}
      className={styles.arrow({ class: className })}
      data-slot="context-menu-arrow"
    />
  );
}
