import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { buttonStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type ButtonVariantProps = VariantProps<typeof buttonStyles>;
const splitProps = createPropSplitter(buttonStyles);

interface ButtonRootProps extends ButtonPrimitive.Props, ButtonVariantProps {
  className?: string;
  styles?: ReturnType<typeof buttonStyles>;
}

export function ButtonRoot(props: ButtonRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? buttonStyles(variantProps);
  return <ButtonPrimitive {...htmlProps} className={s.root({ class: className })} data-slot="button" />;
}
