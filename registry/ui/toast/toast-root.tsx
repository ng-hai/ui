import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { toastStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type ToastStyles = ReturnType<typeof toastStyles>;
type ToastVariantProps = VariantProps<typeof toastStyles>;

const { StyleContext, useStyles } = createStyleContext<ToastStyles>("Toast");
const splitProps = createPropSplitter(toastStyles);

export { useStyles as useToastStyles };

interface ToastRootProps extends ToastPrimitive.Root.Props, ToastVariantProps {
  className?: string;
  styles?: ToastStyles;
}

export function ToastRoot(props: ToastRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? toastStyles(variantProps);
  return (
    <StyleContext value={s}>
      <ToastPrimitive.Root
        {...(htmlProps as ToastPrimitive.Root.Props)}
        className={s.root({ class: className })}
        data-slot="toast"
      />
    </StyleContext>
  );
}
