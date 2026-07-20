import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { useAutocompleteStyles } from "./autocomplete-root";

interface AutocompletePositionerProps extends AutocompletePrimitive.Positioner.Props {
  className?: string;
}

export function AutocompletePositioner({ className, ...props }: AutocompletePositionerProps) {
  const styles = useAutocompleteStyles();
  return (
    <AutocompletePrimitive.Positioner
      {...props}
      className={styles.positioner({ class: className })}
      data-slot="autocomplete-positioner"
    />
  );
}
