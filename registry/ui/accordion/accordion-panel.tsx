import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { useAccordionStyles } from "./accordion-root";

interface AccordionPanelProps extends AccordionPrimitive.Panel.Props {
  className?: string;
}

export function AccordionPanel({ className, ...props }: AccordionPanelProps) {
  const styles = useAccordionStyles();
  return (
    <AccordionPrimitive.Panel {...props} className={styles.panel({ class: className })} data-slot="accordion-panel" />
  );
}
