import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { useAutocompleteStyles } from "./autocomplete-root";

interface AutocompleteSeparatorProps extends AutocompletePrimitive.Separator.Props {
  className?: string;
}

export function AutocompleteSeparator({ className, ...props }: AutocompleteSeparatorProps) {
  const styles = useAutocompleteStyles();
  return (
    <AutocompletePrimitive.Separator
      {...props}
      className={styles.separator({ class: className })}
      data-slot="autocomplete-separator"
    />
  );
}
