import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";

interface ComboboxValueProps extends ComboboxPrimitive.Value.Props {}

export function ComboboxValue(props: ComboboxValueProps) {
  return <ComboboxPrimitive.Value {...props} />;
}
