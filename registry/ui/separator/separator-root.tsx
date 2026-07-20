import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { separatorStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type SeparatorVariantProps = VariantProps<typeof separatorStyles>;
const splitProps = createPropSplitter(separatorStyles);

interface SeparatorRootProps extends SeparatorPrimitive.Props, SeparatorVariantProps {
  className?: string;
  styles?: ReturnType<typeof separatorStyles>;
}

export function SeparatorRoot(props: SeparatorRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? separatorStyles(variantProps);
  return <SeparatorPrimitive {...htmlProps} className={s.root({ class: className })} data-slot="separator" />;
}
