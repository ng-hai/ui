import { Toast as ToastPrimitive } from "@base-ui/react/toast";

interface ToastProviderProps extends ToastPrimitive.Provider.Props {}

export function ToastProvider(props: ToastProviderProps) {
  return <ToastPrimitive.Provider {...props} />;
}
