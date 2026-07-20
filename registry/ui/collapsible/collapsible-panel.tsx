import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { useCollapsibleStyles } from "./collapsible-root";

interface CollapsiblePanelProps extends CollapsiblePrimitive.Panel.Props {
  className?: string;
}

export function CollapsiblePanel({ className, ...props }: CollapsiblePanelProps) {
  const styles = useCollapsibleStyles();
  return (
    <CollapsiblePrimitive.Panel
      {...props}
      className={styles.panel({ class: className })}
      data-slot="collapsible-panel"
    />
  );
}
