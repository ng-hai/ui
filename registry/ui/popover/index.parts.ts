import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

export { PopoverRoot as Root } from "./popover-root";
export { PopoverTrigger as Trigger } from "./popover-trigger";
export { PopoverPortal as Portal } from "./popover-portal";
export { PopoverBackdrop as Backdrop } from "./popover-backdrop";
export { PopoverPositioner as Positioner } from "./popover-positioner";
export { PopoverPopup as Popup } from "./popover-popup";
export { PopoverViewport as Viewport } from "./popover-viewport";
export { PopoverArrow as Arrow } from "./popover-arrow";
export { PopoverTitle as Title } from "./popover-title";
export { PopoverDescription as Description } from "./popover-description";
export { PopoverClose as Close } from "./popover-close";

export const createHandle = PopoverPrimitive.createHandle;
export const Handle = PopoverPrimitive.Handle;
export type Handle<Payload> = PopoverPrimitive.Handle<Payload>;
