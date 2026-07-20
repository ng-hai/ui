import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { useNavigationMenuStyles } from "./navigation-menu-root";

interface NavigationMenuListProps extends NavigationMenuPrimitive.List.Props {
  className?: string;
}

export function NavigationMenuList({ className, ...props }: NavigationMenuListProps) {
  const styles = useNavigationMenuStyles();
  return (
    <NavigationMenuPrimitive.List
      {...props}
      className={styles.list({ class: className })}
      data-slot="navigation-menu-list"
    />
  );
}
