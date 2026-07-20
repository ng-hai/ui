import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { useSliderStyles } from "./slider-root";

interface SliderControlProps extends SliderPrimitive.Control.Props {
  className?: string;
}

export function SliderControl({ className, ...props }: SliderControlProps) {
  const styles = useSliderStyles();
  return (
    <SliderPrimitive.Control {...props} className={styles.control({ class: className })} data-slot="slider-control" />
  );
}
