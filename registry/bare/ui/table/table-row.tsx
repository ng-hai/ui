import type { ComponentProps } from "react";
import { useTableStyles } from "./table-root";

interface TableRowProps extends ComponentProps<"tr"> {}

export function TableRow({ className, ...props }: TableRowProps) {
  const styles = useTableStyles();
  return <tr {...props} className={styles.row({ class: className })} data-slot="table-row" />;
}
