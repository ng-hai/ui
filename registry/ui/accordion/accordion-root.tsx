import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { accordionStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type AccordionStyles = ReturnType<typeof accordionStyles>;
type AccordionVariantProps = VariantProps<typeof accordionStyles>;

const { StyleContext, useStyles } = createStyleContext<AccordionStyles>("Accordion");
const splitProps = createPropSplitter(accordionStyles);

export { useStyles as useAccordionStyles };

interface AccordionRootProps extends AccordionPrimitive.Root.Props, AccordionVariantProps {
  className?: string;
  styles?: AccordionStyles;
}

export function AccordionRoot(props: AccordionRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? accordionStyles(variantProps);
  return (
    <StyleContext value={s}>
      <AccordionPrimitive.Root {...htmlProps} className={s.root({ class: className })} data-slot="accordion" />
    </StyleContext>
  );
}
