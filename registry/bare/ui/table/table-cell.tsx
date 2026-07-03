import type { ComponentProps } from "react";
import { useTableStyles } from "./table-root";

interface TableCellProps extends ComponentProps<"td"> {}

export function TableCell({ className, ...props }: TableCellProps) {
  const styles = useTableStyles();
  return <td {...props} className={styles.cell({ class: className })} data-slot="table-cell" />;
}
