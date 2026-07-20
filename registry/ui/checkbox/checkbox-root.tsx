import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { checkboxStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type CheckboxStyles = ReturnType<typeof checkboxStyles>;
type CheckboxVariantProps = VariantProps<typeof checkboxStyles>;

const { StyleContext, useStyles } = createStyleContext<CheckboxStyles>("Checkbox");
const splitProps = createPropSplitter(checkboxStyles);

export { useStyles as useCheckboxStyles };

interface CheckboxRootProps extends CheckboxPrimitive.Root.Props, CheckboxVariantProps {
  className?: string;
  styles?: CheckboxStyles;
}

export function CheckboxRoot(props: CheckboxRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? checkboxStyles(variantProps);
  return (
    <StyleContext value={s}>
      <CheckboxPrimitive.Root {...htmlProps} className={s.root({ class: className })} data-slot="checkbox" />
    </StyleContext>
  );
}
