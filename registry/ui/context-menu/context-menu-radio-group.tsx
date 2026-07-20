import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContextMenuStyles } from "./context-menu-root";

interface ContextMenuRadioGroupProps extends ContextMenuPrimitive.RadioGroup.Props {
  className?: string;
}

export function ContextMenuRadioGroup({ className, ...props }: ContextMenuRadioGroupProps) {
  const styles = useContextMenuStyles();
  return (
    <ContextMenuPrimitive.RadioGroup
      {...props}
      className={styles.radioGroup({ class: className })}
      data-slot="context-menu-radio-group"
    />
  );
}
