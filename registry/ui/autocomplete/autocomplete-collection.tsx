import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";

interface AutocompleteCollectionProps extends AutocompletePrimitive.Collection.Props {}

export function AutocompleteCollection(props: AutocompleteCollectionProps) {
  return <AutocompletePrimitive.Collection {...props} />;
}
