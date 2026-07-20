import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { useNavigationMenuStyles } from "./navigation-menu-root";

interface NavigationMenuPositionerProps extends NavigationMenuPrimitive.Positioner.Props {
  className?: string;
}

export function NavigationMenuPositioner({ className, ...props }: NavigationMenuPositionerProps) {
  const styles = useNavigationMenuStyles();
  return (
    <NavigationMenuPrimitive.Positioner
      {...props}
      className={styles.positioner({ class: className })}
      data-slot="navigation-menu-positioner"
    />
  );
}
