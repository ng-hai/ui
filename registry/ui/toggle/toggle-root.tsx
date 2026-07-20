import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { toggleStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type ToggleVariantProps = VariantProps<typeof toggleStyles>;
const splitProps = createPropSplitter(toggleStyles);

interface ToggleRootProps extends TogglePrimitive.Props, ToggleVariantProps {
  className?: string;
  styles?: ReturnType<typeof toggleStyles>;
}

export function ToggleRoot(props: ToggleRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? toggleStyles(variantProps);
  return <TogglePrimitive {...htmlProps} className={s.root({ class: className })} data-slot="toggle" />;
}
