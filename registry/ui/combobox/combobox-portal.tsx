import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxPortalProps extends ComboboxPrimitive.Portal.Props {
  className?: string;
}

export function ComboboxPortal({ className, ...props }: ComboboxPortalProps) {
  const styles = useComboboxStyles();
  return (
    <ComboboxPrimitive.Portal {...props} className={styles.portal({ class: className })} data-slot="combobox-portal" />
  );
}
