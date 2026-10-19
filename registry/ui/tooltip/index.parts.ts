import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

export { TooltipRoot as Root } from "./tooltip-root";
export { TooltipProvider as Provider } from "./tooltip-provider";
export { TooltipTrigger as Trigger } from "./tooltip-trigger";
export { TooltipPortal as Portal } from "./tooltip-portal";
export { TooltipPositioner as Positioner } from "./tooltip-positioner";
export { TooltipPopup as Popup } from "./tooltip-popup";
export { TooltipViewport as Viewport } from "./tooltip-viewport";
export { TooltipArrow as Arrow } from "./tooltip-arrow";

export const createHandle = TooltipPrimitive.createHandle;
export const Handle = TooltipPrimitive.Handle;
export type Handle<Payload> = TooltipPrimitive.Handle<Payload>;
