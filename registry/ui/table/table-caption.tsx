import type { ComponentProps } from "react";
import { useTableStyles } from "./table-root";

interface TableCaptionProps extends ComponentProps<"caption"> {}

export function TableCaption({ className, ...props }: TableCaptionProps) {
  const styles = useTableStyles();
  return <caption {...props} className={styles.caption({ class: className })} data-slot="table-caption" />;
}
