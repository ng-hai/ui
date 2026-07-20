import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { useToolbarStyles } from "./toolbar-root";

interface ToolbarSeparatorProps extends ToolbarPrimitive.Separator.Props {
  className?: string;
}

export function ToolbarSeparator({ className, ...props }: ToolbarSeparatorProps) {
  const styles = useToolbarStyles();
  return (
    <ToolbarPrimitive.Separator
      {...props}
      className={styles.separator({ class: className })}
      data-slot="toolbar-separator"
    />
  );
}
