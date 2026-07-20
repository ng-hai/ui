import { Select as SelectPrimitive } from "@base-ui/react/select";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { selectStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type SelectStyles = ReturnType<typeof selectStyles>;
type SelectVariantProps = VariantProps<typeof selectStyles>;

const { StyleContext, useStyles } = createStyleContext<SelectStyles>("Select");
const splitProps = createPropSplitter(selectStyles);

export { useStyles as useSelectStyles };

interface SelectRootProps extends SelectPrimitive.Root.Props<string>, SelectVariantProps {
  className?: string;
  styles?: SelectStyles;
}

export function SelectRoot(props: SelectRootProps) {
  const [variantProps, { styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? selectStyles(variantProps);
  return (
    <StyleContext value={s}>
      <SelectPrimitive.Root {...htmlProps} data-slot="select" />
    </StyleContext>
  );
}
