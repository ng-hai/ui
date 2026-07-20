import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { useToolbarStyles } from "./toolbar-root";

interface ToolbarGroupProps extends ToolbarPrimitive.Group.Props {
  className?: string;
}

export function ToolbarGroup({ className, ...props }: ToolbarGroupProps) {
  const styles = useToolbarStyles();
  return <ToolbarPrimitive.Group {...props} className={styles.group({ class: className })} data-slot="toolbar-group" />;
}
