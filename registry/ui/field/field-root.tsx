import { Field as FieldPrimitive } from "@base-ui/react/field";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { fieldStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type FieldStyles = ReturnType<typeof fieldStyles>;
type FieldVariantProps = VariantProps<typeof fieldStyles>;

const { StyleContext, useStyles } = createStyleContext<FieldStyles>("Field");
const splitProps = createPropSplitter(fieldStyles);

export { useStyles as useFieldStyles };

interface FieldRootProps extends FieldPrimitive.Root.Props, FieldVariantProps {
  className?: string;
  styles?: FieldStyles;
}

export function FieldRoot(props: FieldRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? fieldStyles(variantProps);
  return (
    <StyleContext value={s}>
      <FieldPrimitive.Root {...htmlProps} className={s.root({ class: className })} data-slot="field" />
    </StyleContext>
  );
}
