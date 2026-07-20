import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { useSliderStyles } from "./slider-root";

interface SliderThumbProps extends SliderPrimitive.Thumb.Props {
  className?: string;
}

export function SliderThumb({ className, ...props }: SliderThumbProps) {
  const styles = useSliderStyles();
  return <SliderPrimitive.Thumb {...props} className={styles.thumb({ class: className })} data-slot="slider-thumb" />;
}
