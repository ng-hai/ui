import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { useScrollAreaStyles } from "./scroll-area-root";

interface ScrollAreaContentProps extends ScrollAreaPrimitive.Content.Props {
  className?: string;
}

export function ScrollAreaContent({ className, ...props }: ScrollAreaContentProps) {
  const styles = useScrollAreaStyles();
  return (
    <ScrollAreaPrimitive.Content
      {...props}
      className={styles.content({ class: className })}
      data-slot="scroll-area-content"
    />
  );
}
