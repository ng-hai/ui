import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { useScrollAreaStyles } from "./scroll-area-root";

interface ScrollAreaViewportProps extends ScrollAreaPrimitive.Viewport.Props {
  className?: string;
}

export function ScrollAreaViewport({ className, ...props }: ScrollAreaViewportProps) {
  const styles = useScrollAreaStyles();
  return (
    <ScrollAreaPrimitive.Viewport
      {...props}
      className={styles.viewport({ class: className })}
      data-slot="scroll-area-viewport"
    />
  );
}
