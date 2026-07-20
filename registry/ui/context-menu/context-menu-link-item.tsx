import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContextMenuStyles } from "./context-menu-root";

interface ContextMenuLinkItemProps extends ContextMenuPrimitive.LinkItem.Props {
  className?: string;
}

export function ContextMenuLinkItem({ className, ...props }: ContextMenuLinkItemProps) {
  const styles = useContextMenuStyles();
  return (
    <ContextMenuPrimitive.LinkItem
      {...props}
      className={styles.linkItem({ class: className })}
      data-slot="context-menu-link-item"
    />
  );
}
