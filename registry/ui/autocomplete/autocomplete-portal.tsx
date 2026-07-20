import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { useAutocompleteStyles } from "./autocomplete-root";

interface AutocompletePortalProps extends AutocompletePrimitive.Portal.Props {
  className?: string;
}

export function AutocompletePortal({ className, ...props }: AutocompletePortalProps) {
  const styles = useAutocompleteStyles();
  return (
    <AutocompletePrimitive.Portal
      {...props}
      className={styles.portal({ class: className })}
      data-slot="autocomplete-portal"
    />
  );
}
