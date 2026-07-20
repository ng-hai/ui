import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { useNavigationMenuStyles } from "./navigation-menu-root";

interface NavigationMenuIconProps extends NavigationMenuPrimitive.Icon.Props {
  className?: string;
}

export function NavigationMenuIcon({ className, ...props }: NavigationMenuIconProps) {
  const styles = useNavigationMenuStyles();
  return (
    <NavigationMenuPrimitive.Icon
      {...props}
      className={styles.icon({ class: className })}
      data-slot="navigation-menu-icon"
    />
  );
}
