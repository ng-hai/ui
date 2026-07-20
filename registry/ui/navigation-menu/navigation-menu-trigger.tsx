import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { useNavigationMenuStyles } from "./navigation-menu-root";

interface NavigationMenuTriggerProps extends NavigationMenuPrimitive.Trigger.Props {
  className?: string;
}

export function NavigationMenuTrigger({ className, ...props }: NavigationMenuTriggerProps) {
  const styles = useNavigationMenuStyles();
  return (
    <NavigationMenuPrimitive.Trigger
      {...props}
      className={styles.trigger({ class: className })}
      data-slot="navigation-menu-trigger"
    />
  );
}
