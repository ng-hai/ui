import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxPopupProps extends ComboboxPrimitive.Popup.Props {
  className?: string;
}

export function ComboboxPopup({ className, ...props }: ComboboxPopupProps) {
  const styles = useComboboxStyles();
  return (
    <ComboboxPrimitive.Popup {...props} className={styles.popup({ class: className })} data-slot="combobox-popup" />
  );
}
