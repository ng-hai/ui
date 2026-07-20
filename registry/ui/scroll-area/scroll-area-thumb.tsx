import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { useScrollAreaStyles } from "./scroll-area-root";

interface ScrollAreaThumbProps extends ScrollAreaPrimitive.Thumb.Props {
  className?: string;
}

export function ScrollAreaThumb({ className, ...props }: ScrollAreaThumbProps) {
  const styles = useScrollAreaStyles();
  return (
    <ScrollAreaPrimitive.Thumb
      {...props}
      className={styles.thumb({ class: className })}
      data-slot="scroll-area-thumb"
    />
  );
}
