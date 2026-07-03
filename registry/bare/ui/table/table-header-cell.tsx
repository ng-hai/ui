import type { ComponentProps } from "react";
import { useTableStyles } from "./table-root";

interface TableHeaderCellProps extends ComponentProps<"th"> {}

export function TableHeaderCell({ className, ...props }: TableHeaderCellProps) {
  const styles = useTableStyles();
  return <th {...props} className={styles.headerCell({ class: className })} data-slot="table-header-cell" />;
}
