import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { useDrawerStyles } from "./drawer-root";

interface DrawerIndentBackgroundProps extends DrawerPrimitive.IndentBackground.Props {
  className?: string;
}

export function DrawerIndentBackground({ className, ...props }: DrawerIndentBackgroundProps) {
  const styles = useDrawerStyles();
  return (
    <DrawerPrimitive.IndentBackground
      {...props}
      className={styles.indentBackground({ class: className })}
      data-slot="drawer-indent-background"
    />
  );
}
