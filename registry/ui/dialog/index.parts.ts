import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

export { DialogRoot as Root } from "./dialog-root";
export { DialogTrigger as Trigger } from "./dialog-trigger";
export { DialogPortal as Portal } from "./dialog-portal";
export { DialogBackdrop as Backdrop } from "./dialog-backdrop";
export { DialogPopup as Popup } from "./dialog-popup";
export { DialogViewport as Viewport } from "./dialog-viewport";
export { DialogTitle as Title } from "./dialog-title";
export { DialogDescription as Description } from "./dialog-description";
export { DialogClose as Close } from "./dialog-close";

export const createHandle = DialogPrimitive.createHandle;
export const Handle = DialogPrimitive.Handle;
export type Handle<Payload> = DialogPrimitive.Handle<Payload>;
