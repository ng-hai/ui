import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { toggleGroupStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type ToggleGroupVariantProps = VariantProps<typeof toggleGroupStyles>;
const splitProps = createPropSplitter(toggleGroupStyles);

interface ToggleGroupRootProps extends ToggleGroupPrimitive.Props, ToggleGroupVariantProps {
  className?: string;
  styles?: ReturnType<typeof toggleGroupStyles>;
}

export function ToggleGroupRoot(props: ToggleGroupRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? toggleGroupStyles(variantProps);
  return <ToggleGroupPrimitive {...htmlProps} className={s.root({ class: className })} data-slot="toggle-group" />;
}
