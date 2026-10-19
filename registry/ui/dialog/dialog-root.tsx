import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { dialogStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv-config";

type DialogStyles = ReturnType<typeof dialogStyles>;
type DialogVariantProps = VariantProps<typeof dialogStyles>;

const { StyleContext, useStyles } = createStyleContext<DialogStyles>("Dialog");
const splitProps = createPropSplitter(dialogStyles);

export { useStyles as useDialogStyles };
export { StyleContext as DialogStyleContext };

interface DialogRootProps<Payload = unknown> extends DialogPrimitive.Root.Props<Payload>, DialogVariantProps {
  styles?: DialogStyles;
}

export function DialogRoot<Payload = unknown>(props: DialogRootProps<Payload>) {
  const [variantProps, { styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? dialogStyles(variantProps);
  return (
    <StyleContext value={s}>
      <DialogPrimitive.Root {...htmlProps} />
    </StyleContext>
  );
}
