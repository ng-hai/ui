import { Input as InputPrimitive } from "@base-ui/react/input";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { useInputGroupStyles } from "./input-group";
import { inputStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv-config";

type InputVariantProps = VariantProps<typeof inputStyles>;
const splitProps = createPropSplitter(inputStyles);

interface InputRootProps extends InputPrimitive.Props, InputVariantProps {
  className?: string;
  styles?: ReturnType<typeof inputStyles>;
}

export function InputRoot(props: InputRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const groupStyles = useInputGroupStyles();
  const hasVariants = Object.values(variantProps).some((value) => value !== undefined);
  const s = styles ?? (groupStyles && !hasVariants ? groupStyles : inputStyles(variantProps));
  return <InputPrimitive {...htmlProps} className={s.root({ class: className })} data-slot="input" />;
}
