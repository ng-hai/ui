import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { useAutocompleteStyles } from "./autocomplete-root";

interface AutocompleteInputGroupProps extends AutocompletePrimitive.InputGroup.Props {
  className?: string;
}

export function AutocompleteInputGroup({ className, ...props }: AutocompleteInputGroupProps) {
  const styles = useAutocompleteStyles();
  return (
    <AutocompletePrimitive.InputGroup
      {...props}
      className={styles.inputGroup({ class: className })}
      data-slot="autocomplete-input-group"
    />
  );
}
