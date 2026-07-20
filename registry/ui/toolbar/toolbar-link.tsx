import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { useToolbarStyles } from "./toolbar-root";

interface ToolbarLinkProps extends ToolbarPrimitive.Link.Props {
  className?: string;
}

export function ToolbarLink({ className, ...props }: ToolbarLinkProps) {
  const styles = useToolbarStyles();
  return <ToolbarPrimitive.Link {...props} className={styles.link({ class: className })} data-slot="toolbar-link" />;
}
