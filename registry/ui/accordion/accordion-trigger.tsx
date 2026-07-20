import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { useAccordionStyles } from "./accordion-root";

interface AccordionTriggerProps extends AccordionPrimitive.Trigger.Props {
  className?: string;
}

export function AccordionTrigger({ className, ...props }: AccordionTriggerProps) {
  const styles = useAccordionStyles();
  return (
    <AccordionPrimitive.Trigger
      {...props}
      className={styles.trigger({ class: className })}
      data-slot="accordion-trigger"
    />
  );
}
