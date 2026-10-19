import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

export { AlertDialogRoot as Root } from "./alert-dialog-root";
export { AlertDialogTrigger as Trigger } from "./alert-dialog-trigger";
export { AlertDialogPortal as Portal } from "./alert-dialog-portal";
export { AlertDialogBackdrop as Backdrop } from "./alert-dialog-backdrop";
export { AlertDialogPopup as Popup } from "./alert-dialog-popup";
export { AlertDialogViewport as Viewport } from "./alert-dialog-viewport";
export { AlertDialogTitle as Title } from "./alert-dialog-title";
export { AlertDialogDescription as Description } from "./alert-dialog-description";
export { AlertDialogClose as Close } from "./alert-dialog-close";

export const createHandle = AlertDialogPrimitive.createHandle;
export const Handle = AlertDialogPrimitive.Handle;
export type Handle<Payload> = AlertDialogPrimitive.Handle<Payload>;
