import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { useAutocompleteStyles } from "./autocomplete-root";

interface AutocompleteGroupProps extends AutocompletePrimitive.Group.Props {
  className?: string;
}

export function AutocompleteGroup({ className, ...props }: AutocompleteGroupProps) {
  const styles = useAutocompleteStyles();
  return (
    <AutocompletePrimitive.Group
      {...props}
      className={styles.group({ class: className })}
      data-slot="autocomplete-group"
    />
  );
}
