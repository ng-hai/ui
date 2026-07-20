import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { useAccordionStyles } from "./accordion-root";

interface AccordionHeaderProps extends AccordionPrimitive.Header.Props {
  className?: string;
}

export function AccordionHeader({ className, ...props }: AccordionHeaderProps) {
  const styles = useAccordionStyles();
  return (
    <AccordionPrimitive.Header
      {...props}
      className={styles.header({ class: className })}
      data-slot="accordion-header"
    />
  );
}
