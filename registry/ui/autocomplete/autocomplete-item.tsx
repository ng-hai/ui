import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { useAutocompleteStyles } from "./autocomplete-root";

interface AutocompleteItemProps extends AutocompletePrimitive.Item.Props {
  className?: string;
}

export function AutocompleteItem({ className, ...props }: AutocompleteItemProps) {
  const styles = useAutocompleteStyles();
  return (
    <AutocompletePrimitive.Item
      {...props}
      className={styles.item({ class: className })}
      data-slot="autocomplete-item"
    />
  );
}
