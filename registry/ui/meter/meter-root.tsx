import { Meter as MeterPrimitive } from "@base-ui/react/meter";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { meterStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type MeterStyles = ReturnType<typeof meterStyles>;
type MeterVariantProps = VariantProps<typeof meterStyles>;

const { StyleContext, useStyles } = createStyleContext<MeterStyles>("Meter");
const splitProps = createPropSplitter(meterStyles);

export { useStyles as useMeterStyles };

interface MeterRootProps extends MeterPrimitive.Root.Props, MeterVariantProps {
  className?: string;
  styles?: MeterStyles;
}

export function MeterRoot(props: MeterRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? meterStyles(variantProps);
  return (
    <StyleContext value={s}>
      <MeterPrimitive.Root
        {...(htmlProps as MeterPrimitive.Root.Props)}
        className={s.root({ class: className })}
        data-slot="meter"
      />
    </StyleContext>
  );
}
