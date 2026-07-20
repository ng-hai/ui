import { Menu as MenuPrimitive } from "@base-ui/react/menu";

interface MenuSubmenuRootProps extends MenuPrimitive.SubmenuRoot.Props {}

export function MenuSubmenuRoot(props: MenuSubmenuRootProps) {
  return <MenuPrimitive.SubmenuRoot {...props} />;
}
