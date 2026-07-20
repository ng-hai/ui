import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { useNavigationMenuStyles } from "./navigation-menu-root";

interface NavigationMenuArrowProps extends NavigationMenuPrimitive.Arrow.Props {
  className?: string;
}

export function NavigationMenuArrow({ className, ...props }: NavigationMenuArrowProps) {
  const styles = useNavigationMenuStyles();
  return (
    <NavigationMenuPrimitive.Arrow
      {...props}
      className={styles.arrow({ class: className })}
      data-slot="navigation-menu-arrow"
    />
  );
}
