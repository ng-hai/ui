import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { useNavigationMenuStyles } from "./navigation-menu-root";

interface NavigationMenuPortalProps extends NavigationMenuPrimitive.Portal.Props {
  className?: string;
}

export function NavigationMenuPortal({ className, ...props }: NavigationMenuPortalProps) {
  const styles = useNavigationMenuStyles();
  return (
    <NavigationMenuPrimitive.Portal
      {...props}
      className={styles.portal({ class: className })}
      data-slot="navigation-menu-portal"
    />
  );
}
