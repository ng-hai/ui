import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { useAutocompleteStyles } from "./autocomplete-root";

interface AutocompleteEmptyProps extends AutocompletePrimitive.Empty.Props {
  className?: string;
}

export function AutocompleteEmpty({ className, ...props }: AutocompleteEmptyProps) {
  const styles = useAutocompleteStyles();
  return (
    <AutocompletePrimitive.Empty
      {...props}
      className={styles.empty({ class: className })}
      data-slot="autocomplete-empty"
    />
  );
}
