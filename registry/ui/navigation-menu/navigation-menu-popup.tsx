import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { useNavigationMenuStyles } from "./navigation-menu-root";

interface NavigationMenuPopupProps extends NavigationMenuPrimitive.Popup.Props {
  className?: string;
}

export function NavigationMenuPopup({ className, ...props }: NavigationMenuPopupProps) {
  const styles = useNavigationMenuStyles();
  return (
    <NavigationMenuPrimitive.Popup
      {...props}
      className={styles.popup({ class: className })}
      data-slot="navigation-menu-popup"
    />
  );
}
