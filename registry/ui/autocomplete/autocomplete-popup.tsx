import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { useAutocompleteStyles } from "./autocomplete-root";

interface AutocompletePopupProps extends AutocompletePrimitive.Popup.Props {
  className?: string;
}

export function AutocompletePopup({ className, ...props }: AutocompletePopupProps) {
  const styles = useAutocompleteStyles();
  return (
    <AutocompletePrimitive.Popup
      {...props}
      className={styles.popup({ class: className })}
      data-slot="autocomplete-popup"
    />
  );
}
