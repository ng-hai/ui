import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { useAvatarStyles } from "./avatar-root";

interface AvatarImageProps extends AvatarPrimitive.Image.Props {
  className?: string;
}

export function AvatarImage({ className, ...props }: AvatarImageProps) {
  const styles = useAvatarStyles();
  return <AvatarPrimitive.Image {...props} className={styles.image({ class: className })} data-slot="avatar-image" />;
}
