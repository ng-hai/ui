import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { useAutocompleteStyles } from "./autocomplete-root";

interface AutocompleteClearProps extends AutocompletePrimitive.Clear.Props {
  className?: string;
}

export function AutocompleteClear({ className, ...props }: AutocompleteClearProps) {
  const styles = useAutocompleteStyles();
  return (
    <AutocompletePrimitive.Clear
      {...props}
      className={styles.clear({ class: className })}
      data-slot="autocomplete-clear"
    />
  );
}
