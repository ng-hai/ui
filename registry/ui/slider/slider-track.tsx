import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { useSliderStyles } from "./slider-root";

interface SliderTrackProps extends SliderPrimitive.Track.Props {
  className?: string;
}

export function SliderTrack({ className, ...props }: SliderTrackProps) {
  const styles = useSliderStyles();
  return <SliderPrimitive.Track {...props} className={styles.track({ class: className })} data-slot="slider-track" />;
}
