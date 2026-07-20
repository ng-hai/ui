import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useSelectStyles } from "./select-root";

interface SelectPopupProps extends SelectPrimitive.Popup.Props {
  className?: string;
}

export function SelectPopup({ className, ...props }: SelectPopupProps) {
  const styles = useSelectStyles();
  return <SelectPrimitive.Popup {...props} className={styles.popup({ class: className })} data-slot="select-popup" />;
}
