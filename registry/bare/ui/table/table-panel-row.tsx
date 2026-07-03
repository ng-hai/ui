import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { useTableStyles } from "./table-root";

interface TablePanelRowProps extends CollapsiblePrimitive.Panel.Props {
  className?: string;
}

export function TablePanelRow({ className, ...props }: TablePanelRowProps) {
  const styles = useTableStyles();
  return (
    <CollapsiblePrimitive.Panel
      render={<tr />}
      {...props}
      className={styles.panelRow({ class: className })}
      data-slot="table-panel-row"
    />
  );
}
