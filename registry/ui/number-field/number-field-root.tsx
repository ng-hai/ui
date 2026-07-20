import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { numberFieldStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type NumberFieldStyles = ReturnType<typeof numberFieldStyles>;
type NumberFieldVariantProps = VariantProps<typeof numberFieldStyles>;

const { StyleContext, useStyles } = createStyleContext<NumberFieldStyles>("NumberField");
const splitProps = createPropSplitter(numberFieldStyles);

export { useStyles as useNumberFieldStyles };

interface NumberFieldRootProps extends NumberFieldPrimitive.Root.Props, NumberFieldVariantProps {
  className?: string;
  styles?: NumberFieldStyles;
}

export function NumberFieldRoot(props: NumberFieldRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? numberFieldStyles(variantProps);
  return (
    <StyleContext value={s}>
      <NumberFieldPrimitive.Root {...htmlProps} className={s.root({ class: className })} data-slot="number-field" />
    </StyleContext>
  );
}
