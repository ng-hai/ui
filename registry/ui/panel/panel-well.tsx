import type { ComponentProps } from "react";
import { usePanelStyles } from "./panel-root";

interface PanelWellProps extends ComponentProps<"div"> {}

export function PanelWell({ className, ...props }: PanelWellProps) {
  const styles = usePanelStyles();
  return <div {...props} className={styles.well({ class: className })} data-slot="panel-well" />;
}
