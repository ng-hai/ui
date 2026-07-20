import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { useScrollAreaStyles } from "./scroll-area-root";

interface ScrollAreaCornerProps extends ScrollAreaPrimitive.Corner.Props {
  className?: string;
}

export function ScrollAreaCorner({ className, ...props }: ScrollAreaCornerProps) {
  const styles = useScrollAreaStyles();
  return (
    <ScrollAreaPrimitive.Corner
      {...props}
      className={styles.corner({ class: className })}
      data-slot="scroll-area-corner"
    />
  );
}
