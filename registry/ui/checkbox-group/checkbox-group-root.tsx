import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { checkboxGroupStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type CheckboxGroupVariantProps = VariantProps<typeof checkboxGroupStyles>;
const splitProps = createPropSplitter(checkboxGroupStyles);

interface CheckboxGroupRootProps extends CheckboxGroupPrimitive.Props, CheckboxGroupVariantProps {
  className?: string;
  styles?: ReturnType<typeof checkboxGroupStyles>;
}

export function CheckboxGroupRoot(props: CheckboxGroupRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? checkboxGroupStyles(variantProps);
  return <CheckboxGroupPrimitive {...htmlProps} className={s.root({ class: className })} data-slot="checkbox-group" />;
}
