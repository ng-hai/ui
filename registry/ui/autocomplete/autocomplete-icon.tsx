import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { useAutocompleteStyles } from "./autocomplete-root";

interface AutocompleteIconProps extends AutocompletePrimitive.Icon.Props {
  className?: string;
}

export function AutocompleteIcon({ className, ...props }: AutocompleteIconProps) {
  const styles = useAutocompleteStyles();
  return (
    <AutocompletePrimitive.Icon
      {...props}
      className={styles.icon({ class: className })}
      data-slot="autocomplete-icon"
    />
  );
}
