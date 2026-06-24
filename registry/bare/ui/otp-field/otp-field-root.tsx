import { OTPFieldPreview as OTPFieldPrimitive } from "@base-ui/react/otp-field";
import { createStyleContext } from "@/registry/bare/lib/create-style-context";
import { createPropSplitter } from "@/registry/bare/lib/split-variant-props";
import { otpFieldStyles } from "./styles";
import type { VariantProps } from "@/registry/bare/lib/tv.config";

type OTPFieldStyles = ReturnType<typeof otpFieldStyles>;
type OTPFieldVariantProps = VariantProps<typeof otpFieldStyles>;

const { StyleContext, useStyles } = createStyleContext<OTPFieldStyles>("OTPField");
const splitProps = createPropSplitter(otpFieldStyles);

export { useStyles as useOtpFieldStyles };

interface OTPFieldRootProps extends OTPFieldPrimitive.Root.Props, OTPFieldVariantProps {
  className?: string;
  styles?: OTPFieldStyles;
}

export function OTPFieldRoot(props: OTPFieldRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? otpFieldStyles(variantProps);
  return (
    <StyleContext value={s}>
      <OTPFieldPrimitive.Root
        {...(htmlProps as OTPFieldPrimitive.Root.Props)}
        className={s.root({ class: className })}
        data-slot="otp-field"
      />
    </StyleContext>
  );
}
