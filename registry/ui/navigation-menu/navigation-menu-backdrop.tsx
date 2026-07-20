import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { useNavigationMenuStyles } from "./navigation-menu-root";

interface NavigationMenuBackdropProps extends NavigationMenuPrimitive.Backdrop.Props {
  className?: string;
}

export function NavigationMenuBackdrop({ className, ...props }: NavigationMenuBackdropProps) {
  const styles = useNavigationMenuStyles();
  return (
    <NavigationMenuPrimitive.Backdrop
      {...props}
      className={styles.backdrop({ class: className })}
      data-slot="navigation-menu-backdrop"
    />
  );
}
