import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";

interface ComboboxCollectionProps extends ComboboxPrimitive.Collection.Props {}

export function ComboboxCollection(props: ComboboxCollectionProps) {
  return <ComboboxPrimitive.Collection {...props} />;
}
