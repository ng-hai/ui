import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { useSliderStyles } from "./slider-root";

interface SliderLabelProps extends SliderPrimitive.Label.Props {
  className?: string;
}

export function SliderLabel({ className, ...props }: SliderLabelProps) {
  const styles = useSliderStyles();
  return <SliderPrimitive.Label {...props} className={styles.label({ class: className })} data-slot="slider-label" />;
}
