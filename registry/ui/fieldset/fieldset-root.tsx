import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { fieldsetStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type FieldsetStyles = ReturnType<typeof fieldsetStyles>;
type FieldsetVariantProps = VariantProps<typeof fieldsetStyles>;

const { StyleContext, useStyles } = createStyleContext<FieldsetStyles>("Fieldset");
const splitProps = createPropSplitter(fieldsetStyles);

export { useStyles as useFieldsetStyles };

interface FieldsetRootProps extends FieldsetPrimitive.Root.Props, FieldsetVariantProps {
  className?: string;
  styles?: FieldsetStyles;
}

export function FieldsetRoot(props: FieldsetRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? fieldsetStyles(variantProps);
  return (
    <StyleContext value={s}>
      <FieldsetPrimitive.Root {...htmlProps} className={s.root({ class: className })} data-slot="fieldset" />
    </StyleContext>
  );
}
