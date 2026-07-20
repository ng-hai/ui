import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { useCollapsibleStyles } from "./collapsible-root";

interface CollapsibleTriggerProps extends CollapsiblePrimitive.Trigger.Props {
  className?: string;
}

export function CollapsibleTrigger({ className, ...props }: CollapsibleTriggerProps) {
  const styles = useCollapsibleStyles();
  return (
    <CollapsiblePrimitive.Trigger
      {...props}
      className={styles.trigger({ class: className })}
      data-slot="collapsible-trigger"
    />
  );
}
