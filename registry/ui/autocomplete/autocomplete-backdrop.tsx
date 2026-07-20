import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { useAutocompleteStyles } from "./autocomplete-root";

interface AutocompleteBackdropProps extends AutocompletePrimitive.Backdrop.Props {
  className?: string;
}

export function AutocompleteBackdrop({ className, ...props }: AutocompleteBackdropProps) {
  const styles = useAutocompleteStyles();
  return (
    <AutocompletePrimitive.Backdrop
      {...props}
      className={styles.backdrop({ class: className })}
      data-slot="autocomplete-backdrop"
    />
  );
}
