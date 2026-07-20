import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { useNavigationMenuStyles } from "./navigation-menu-root";

interface NavigationMenuContentProps extends NavigationMenuPrimitive.Content.Props {
  className?: string;
}

export function NavigationMenuContent({ className, ...props }: NavigationMenuContentProps) {
  const styles = useNavigationMenuStyles();
  return (
    <NavigationMenuPrimitive.Content
      {...props}
      className={styles.content({ class: className })}
      data-slot="navigation-menu-content"
    />
  );
}
