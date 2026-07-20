import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { useToolbarStyles } from "./toolbar-root";

interface ToolbarButtonProps extends ToolbarPrimitive.Button.Props {
  className?: string;
}

export function ToolbarButton({ className, ...props }: ToolbarButtonProps) {
  const styles = useToolbarStyles();
  return (
    <ToolbarPrimitive.Button {...props} className={styles.button({ class: className })} data-slot="toolbar-button" />
  );
}
