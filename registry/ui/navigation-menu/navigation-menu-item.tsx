import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { useNavigationMenuStyles } from "./navigation-menu-root";

interface NavigationMenuItemProps extends NavigationMenuPrimitive.Item.Props {
  className?: string;
}

export function NavigationMenuItem({ className, ...props }: NavigationMenuItemProps) {
  const styles = useNavigationMenuStyles();
  return (
    <NavigationMenuPrimitive.Item
      {...props}
      className={styles.item({ class: className })}
      data-slot="navigation-menu-item"
    />
  );
}
