import { OTPFieldPreview as OTPFieldPrimitive } from "@base-ui/react/otp-field";
import { useOtpFieldStyles } from "./otp-field-root";

interface OTPFieldInputProps extends OTPFieldPrimitive.Input.Props {
  className?: string;
}

export function OTPFieldInput({ className, ...props }: OTPFieldInputProps) {
  const styles = useOtpFieldStyles();
  return (
    <OTPFieldPrimitive.Input
      {...props}
      className={styles.input({ class: className })}
      data-slot="otp-field-input"
    />
  );
}
