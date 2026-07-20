import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { useDrawerStyles } from "./drawer-root";

interface DrawerDescriptionProps extends DrawerPrimitive.Description.Props {
  className?: string;
}

export function DrawerDescription({ className, ...props }: DrawerDescriptionProps) {
  const styles = useDrawerStyles();
  return (
    <DrawerPrimitive.Description
      {...props}
      className={styles.description({ class: className })}
      data-slot="drawer-description"
    />
  );
}
