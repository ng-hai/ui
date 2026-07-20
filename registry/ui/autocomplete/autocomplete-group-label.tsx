import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { useAutocompleteStyles } from "./autocomplete-root";

interface AutocompleteGroupLabelProps extends AutocompletePrimitive.GroupLabel.Props {
  className?: string;
}

export function AutocompleteGroupLabel({ className, ...props }: AutocompleteGroupLabelProps) {
  const styles = useAutocompleteStyles();
  return (
    <AutocompletePrimitive.GroupLabel
      {...props}
      className={styles.groupLabel({ class: className })}
      data-slot="autocomplete-group-label"
    />
  );
}
