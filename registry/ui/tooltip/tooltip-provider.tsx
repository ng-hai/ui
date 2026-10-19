import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

interface TooltipProviderProps extends TooltipPrimitive.Provider.Props {}

export function TooltipProvider(props: TooltipProviderProps) {
  return <TooltipPrimitive.Provider {...props} />;
}
