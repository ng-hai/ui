import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { useAutocompleteStyles } from "./autocomplete-root";

interface AutocompleteTriggerProps extends AutocompletePrimitive.Trigger.Props {
  className?: string;
}

export function AutocompleteTrigger({ className, ...props }: AutocompleteTriggerProps) {
  const styles = useAutocompleteStyles();
  return (
    <AutocompletePrimitive.Trigger
      {...props}
      className={styles.trigger({ class: className })}
      data-slot="autocomplete-trigger"
    />
  );
}
