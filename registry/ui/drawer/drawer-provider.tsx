import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";

interface DrawerProviderProps extends DrawerPrimitive.Provider.Props {}

export function DrawerProvider(props: DrawerProviderProps) {
  return <DrawerPrimitive.Provider {...props} />;
}
