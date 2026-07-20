import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { useSwitchStyles } from "./switch-root";

interface SwitchThumbProps extends SwitchPrimitive.Thumb.Props {
  className?: string;
}

export function SwitchThumb({ className, ...props }: SwitchThumbProps) {
  const styles = useSwitchStyles();
  return <SwitchPrimitive.Thumb {...props} className={styles.thumb({ class: className })} data-slot="switch-thumb" />;
}
