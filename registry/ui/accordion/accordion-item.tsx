import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { useAccordionStyles } from "./accordion-root";

interface AccordionItemProps extends AccordionPrimitive.Item.Props {
  className?: string;
}

export function AccordionItem({ className, ...props }: AccordionItemProps) {
  const styles = useAccordionStyles();
  return (
    <AccordionPrimitive.Item {...props} className={styles.item({ class: className })} data-slot="accordion-item" />
  );
}
