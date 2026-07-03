import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { useTableStyles } from "./table-root";

interface TableRowGroupProps extends CollapsiblePrimitive.Root.Props {
  className?: string;
}

export function TableRowGroup({ className, ...props }: TableRowGroupProps) {
  const styles = useTableStyles();
  return (
    <CollapsiblePrimitive.Root
      render={<tbody />}
      {...props}
      className={styles.rowGroup({ class: className })}
      data-slot="table-row-group"
    />
  );
}
