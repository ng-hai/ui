import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { useAutocompleteStyles } from "./autocomplete-root";

interface AutocompleteRowProps extends AutocompletePrimitive.Row.Props {
  className?: string;
}

export function AutocompleteRow({ className, ...props }: AutocompleteRowProps) {
  const styles = useAutocompleteStyles();
  return (
    <AutocompletePrimitive.Row {...props} className={styles.row({ class: className })} data-slot="autocomplete-row" />
  );
}
