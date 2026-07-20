import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { autocompleteStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type AutocompleteStyles = ReturnType<typeof autocompleteStyles>;
type AutocompleteVariantProps = VariantProps<typeof autocompleteStyles>;

const { StyleContext, useStyles } = createStyleContext<AutocompleteStyles>("Autocomplete");
const splitProps = createPropSplitter(autocompleteStyles);

export { useStyles as useAutocompleteStyles };

type AutocompleteRootProps<ItemValue> = AutocompletePrimitive.Root.Props<ItemValue> &
  AutocompleteVariantProps & {
    styles?: AutocompleteStyles;
  };

export function AutocompleteRoot<ItemValue>(props: AutocompleteRootProps<ItemValue>) {
  const [variantProps, { styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? autocompleteStyles(variantProps);
  return (
    <StyleContext value={s}>
      <AutocompletePrimitive.Root {...(htmlProps as any)} />
    </StyleContext>
  );
}
