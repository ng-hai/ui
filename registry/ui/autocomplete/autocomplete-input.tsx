import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { useAutocompleteStyles } from "./autocomplete-root";

interface AutocompleteInputProps extends AutocompletePrimitive.Input.Props {
  className?: string;
}

export function AutocompleteInput({ className, ...props }: AutocompleteInputProps) {
  const styles = useAutocompleteStyles();
  return (
    <AutocompletePrimitive.Input
      {...props}
      className={styles.input({ class: className })}
      data-slot="autocomplete-input"
    />
  );
}
