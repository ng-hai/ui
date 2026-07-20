import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { useAvatarStyles } from "./avatar-root";

interface AvatarFallbackProps extends AvatarPrimitive.Fallback.Props {
  className?: string;
}

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  const styles = useAvatarStyles();
  return (
    <AvatarPrimitive.Fallback
      {...props}
      className={styles.fallback({ class: className })}
      data-slot="avatar-fallback"
    />
  );
}
