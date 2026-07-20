import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";

interface AutocompleteValueProps extends AutocompletePrimitive.Value.Props {}

export function AutocompleteValue(props: AutocompleteValueProps) {
  return <AutocompletePrimitive.Value {...props} />;
}
