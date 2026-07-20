import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useSelectStyles } from "./select-root";

interface SelectPortalProps extends SelectPrimitive.Portal.Props {
  className?: string;
}

export function SelectPortal({ className, ...props }: SelectPortalProps) {
  const styles = useSelectStyles();
  return (
    <SelectPrimitive.Portal {...props} className={styles.portal({ class: className })} data-slot="select-portal" />
  );
}
