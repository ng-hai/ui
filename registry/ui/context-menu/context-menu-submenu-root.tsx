import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";

interface ContextMenuSubmenuRootProps extends ContextMenuPrimitive.SubmenuRoot.Props {}

export function ContextMenuSubmenuRoot(props: ContextMenuSubmenuRootProps) {
  return <ContextMenuPrimitive.SubmenuRoot {...props} />;
}
