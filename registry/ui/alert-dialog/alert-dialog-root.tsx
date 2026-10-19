import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { alertDialogStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv-config";

type AlertDialogStyles = ReturnType<typeof alertDialogStyles>;
type AlertDialogVariantProps = VariantProps<typeof alertDialogStyles>;

const { StyleContext, useStyles } = createStyleContext<AlertDialogStyles>("AlertDialog");
const splitProps = createPropSplitter(alertDialogStyles);

export { useStyles as useAlertDialogStyles };
export { StyleContext as AlertDialogStyleContext };

interface AlertDialogRootProps<Payload = unknown> extends AlertDialogPrimitive.Root.Props<Payload>, AlertDialogVariantProps {
  styles?: AlertDialogStyles;
}

export function AlertDialogRoot<Payload = unknown>(props: AlertDialogRootProps<Payload>) {
  const [variantProps, { styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? alertDialogStyles(variantProps);
  return (
    <StyleContext value={s}>
      <AlertDialogPrimitive.Root {...htmlProps} />
    </StyleContext>
  );
}
