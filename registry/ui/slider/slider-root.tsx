import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { sliderStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type SliderStyles = ReturnType<typeof sliderStyles>;
type SliderVariantProps = VariantProps<typeof sliderStyles>;

const { StyleContext, useStyles } = createStyleContext<SliderStyles>("Slider");
const splitProps = createPropSplitter(sliderStyles);

export { useStyles as useSliderStyles };

interface SliderRootProps extends SliderPrimitive.Root.Props, SliderVariantProps {
  className?: string;
  styles?: SliderStyles;
}

export function SliderRoot(props: SliderRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? sliderStyles(variantProps);
  return (
    <StyleContext value={s}>
      <SliderPrimitive.Root
        {...(htmlProps as SliderPrimitive.Root.Props)}
        className={s.root({ class: className })}
        data-slot="slider"
      />
    </StyleContext>
  );
}
