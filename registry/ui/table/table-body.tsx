import type { ComponentProps } from "react";
import { useTableStyles } from "./table-root";

interface TableBodyProps extends ComponentProps<"tbody"> {}

export function TableBody({ className, ...props }: TableBodyProps) {
  const styles = useTableStyles();
  return <tbody {...props} className={styles.body({ class: className })} data-slot="table-body" />;
}
