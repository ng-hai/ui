import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { useRadioStyles } from "./radio-root";

interface RadioItemProps extends RadioPrimitive.Root.Props {
  className?: string;
}

export function RadioItem({ className, ...props }: RadioItemProps) {
  const styles = useRadioStyles();
  return <RadioPrimitive.Root {...props} className={styles.item({ class: className })} data-slot="radio-item" />;
}
