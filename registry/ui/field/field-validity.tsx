import { Field as FieldPrimitive } from "@base-ui/react/field";

interface FieldValidityProps extends FieldPrimitive.Validity.Props {}

export function FieldValidity(props: FieldValidityProps) {
  return <FieldPrimitive.Validity {...props} />;
}
