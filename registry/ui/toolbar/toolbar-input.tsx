import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { useToolbarStyles } from "./toolbar-root";

interface ToolbarInputProps extends ToolbarPrimitive.Input.Props {
  className?: string;
}

export function ToolbarInput({ className, ...props }: ToolbarInputProps) {
  const styles = useToolbarStyles();
  return <ToolbarPrimitive.Input {...props} className={styles.input({ class: className })} data-slot="toolbar-input" />;
}
