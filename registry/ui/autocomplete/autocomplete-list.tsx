import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { useAutocompleteStyles } from "./autocomplete-root";

interface AutocompleteListProps extends AutocompletePrimitive.List.Props {
  className?: string;
}

export function AutocompleteList({ className, ...props }: AutocompleteListProps) {
  const styles = useAutocompleteStyles();
  return (
    <AutocompletePrimitive.List
      {...props}
      className={styles.list({ class: className })}
      data-slot="autocomplete-list"
    />
  );
}
