import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { radioStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type RadioStyles = ReturnType<typeof radioStyles>;
type RadioVariantProps = VariantProps<typeof radioStyles>;

const { StyleContext, useStyles } = createStyleContext<RadioStyles>("Radio");
const splitProps = createPropSplitter(radioStyles);

export { useStyles as useRadioStyles };

interface RadioRootProps extends RadioGroupPrimitive.Props, RadioVariantProps {
  className?: string;
  styles?: RadioStyles;
}

export function RadioRoot(props: RadioRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? radioStyles(variantProps);
  return (
    <StyleContext value={s}>
      <RadioGroupPrimitive {...htmlProps} className={s.root({ class: className })} data-slot="radio" />
    </StyleContext>
  );
}
