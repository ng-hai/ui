import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { useAutocompleteStyles } from "./autocomplete-root";

interface AutocompleteArrowProps extends AutocompletePrimitive.Arrow.Props {
  className?: string;
}

export function AutocompleteArrow({ className, ...props }: AutocompleteArrowProps) {
  const styles = useAutocompleteStyles();
  return (
    <AutocompletePrimitive.Arrow
      {...props}
      className={styles.arrow({ class: className })}
      data-slot="autocomplete-arrow"
    />
  );
}
