import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { useNavigationMenuStyles } from "./navigation-menu-root";

interface NavigationMenuViewportProps extends NavigationMenuPrimitive.Viewport.Props {
  className?: string;
}

export function NavigationMenuViewport({ className, ...props }: NavigationMenuViewportProps) {
  const styles = useNavigationMenuStyles();
  return (
    <NavigationMenuPrimitive.Viewport
      {...props}
      className={styles.viewport({ class: className })}
      data-slot="navigation-menu-viewport"
    />
  );
}
