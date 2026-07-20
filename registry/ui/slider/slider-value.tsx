import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { useSliderStyles } from "./slider-root";

interface SliderValueProps extends SliderPrimitive.Value.Props {
  className?: string;
}

export function SliderValue({ className, ...props }: SliderValueProps) {
  const styles = useSliderStyles();
  return <SliderPrimitive.Value {...props} className={styles.value({ class: className })} data-slot="slider-value" />;
}
