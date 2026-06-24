import { OTPFieldPreview as OTPFieldPrimitive } from "@base-ui/react/otp-field";
import { useOtpFieldStyles } from "./otp-field-root";

interface OTPFieldSeparatorProps extends OTPFieldPrimitive.Separator.Props {
  className?: string;
}

export function OTPFieldSeparator({ className, ...props }: OTPFieldSeparatorProps) {
  const styles = useOtpFieldStyles();
  return (
    <OTPFieldPrimitive.Separator
      {...props}
      className={styles.separator({ class: className })}
      data-slot="otp-field-separator"
    />
  );
}
