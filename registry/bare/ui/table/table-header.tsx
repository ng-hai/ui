import type { ComponentProps } from "react";
import { useTableStyles } from "./table-root";

interface TableHeaderProps extends ComponentProps<"thead"> {}

export function TableHeader({ className, ...props }: TableHeaderProps) {
  const styles = useTableStyles();
  return <thead {...props} className={styles.header({ class: className })} data-slot="table-header" />;
}
