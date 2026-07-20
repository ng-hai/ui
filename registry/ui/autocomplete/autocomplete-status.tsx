import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { useAutocompleteStyles } from "./autocomplete-root";

interface AutocompleteStatusProps extends AutocompletePrimitive.Status.Props {
  className?: string;
}

export function AutocompleteStatus({ className, ...props }: AutocompleteStatusProps) {
  const styles = useAutocompleteStyles();
  return (
    <AutocompletePrimitive.Status
      {...props}
      className={styles.status({ class: className })}
      data-slot="autocomplete-status"
    />
  );
}
