import type { ComponentProps } from "react";
import { useTableStyles } from "./table-root";

interface TablePanelCellProps extends ComponentProps<"td"> {}

export function TablePanelCell({ className, ...props }: TablePanelCellProps) {
  const styles = useTableStyles();
  return <td {...props} className={styles.panelCell({ class: className })} data-slot="table-panel-cell" />;
}
