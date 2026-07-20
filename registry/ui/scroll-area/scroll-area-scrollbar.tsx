import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { useScrollAreaStyles } from "./scroll-area-root";

interface ScrollAreaScrollbarProps extends ScrollAreaPrimitive.Scrollbar.Props {
  className?: string;
}

export function ScrollAreaScrollbar({ className, ...props }: ScrollAreaScrollbarProps) {
  const styles = useScrollAreaStyles();
  return (
    <ScrollAreaPrimitive.Scrollbar
      {...props}
      className={styles.scrollbar({ class: className })}
      data-slot="scroll-area-scrollbar"
    />
  );
}
