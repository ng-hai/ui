import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { useSliderStyles } from "./slider-root";

interface SliderIndicatorProps extends SliderPrimitive.Indicator.Props {
  className?: string;
}

export function SliderIndicator({ className, ...props }: SliderIndicatorProps) {
  const styles = useSliderStyles();
  return (
    <SliderPrimitive.Indicator
      {...props}
      className={styles.indicator({ class: className })}
      data-slot="slider-indicator"
    />
  );
}
