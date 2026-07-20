import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { useNavigationMenuStyles } from "./navigation-menu-root";

interface NavigationMenuLinkProps extends NavigationMenuPrimitive.Link.Props {
  className?: string;
}

export function NavigationMenuLink({ className, ...props }: NavigationMenuLinkProps) {
  const styles = useNavigationMenuStyles();
  return (
    <NavigationMenuPrimitive.Link
      {...props}
      className={styles.link({ class: className })}
      data-slot="navigation-menu-link"
    />
  );
}
