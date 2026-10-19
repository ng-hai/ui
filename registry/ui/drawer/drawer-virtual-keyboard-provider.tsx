import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";

interface DrawerVirtualKeyboardProviderProps extends DrawerPrimitive.VirtualKeyboardProvider.Props {}

export function DrawerVirtualKeyboardProvider(props: DrawerVirtualKeyboardProviderProps) {
  return <DrawerPrimitive.VirtualKeyboardProvider {...props} />;
}
