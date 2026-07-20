import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { progressStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type ProgressStyles = ReturnType<typeof progressStyles>;
type ProgressVariantProps = VariantProps<typeof progressStyles>;

const { StyleContext, useStyles } = createStyleContext<ProgressStyles>("Progress");
const splitProps = createPropSplitter(progressStyles);

export { useStyles as useProgressStyles };

interface ProgressRootProps extends ProgressPrimitive.Root.Props, ProgressVariantProps {
  className?: string;
  styles?: ProgressStyles;
}

export function ProgressRoot(props: ProgressRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? progressStyles(variantProps);
  return (
    <StyleContext value={s}>
      <ProgressPrimitive.Root
        {...(htmlProps as ProgressPrimitive.Root.Props)}
        className={s.root({ class: className })}
        data-slot="progress"
      />
    </StyleContext>
  );
}
