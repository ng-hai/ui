import type { ComponentProps } from "react";
import { useTableStyles } from "./table-root";

interface TableFooterProps extends ComponentProps<"tfoot"> {}

export function TableFooter({ className, ...props }: TableFooterProps) {
  const styles = useTableStyles();
  return <tfoot {...props} className={styles.footer({ class: className })} data-slot="table-footer" />;
}
