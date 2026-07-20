import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { useTableStyles } from "./table-root";

interface TableExpandTriggerProps extends CollapsiblePrimitive.Trigger.Props {
  className?: string;
}

export function TableExpandTrigger({ className, ...props }: TableExpandTriggerProps) {
  const styles = useTableStyles();
  return (
    <CollapsiblePrimitive.Trigger
      {...props}
      className={styles.expandTrigger({ class: className })}
      data-slot="table-expand-trigger"
    />
  );
}
