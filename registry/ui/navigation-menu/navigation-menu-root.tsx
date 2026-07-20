import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { navigationMenuStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type NavigationMenuStyles = ReturnType<typeof navigationMenuStyles>;
type NavigationMenuVariantProps = VariantProps<typeof navigationMenuStyles>;

const { StyleContext, useStyles } = createStyleContext<NavigationMenuStyles>("NavigationMenu");
const splitProps = createPropSplitter(navigationMenuStyles);

export { useStyles as useNavigationMenuStyles };

interface NavigationMenuRootProps extends NavigationMenuPrimitive.Root.Props, NavigationMenuVariantProps {
  className?: string;
  styles?: NavigationMenuStyles;
}

export function NavigationMenuRoot(props: NavigationMenuRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? navigationMenuStyles(variantProps);
  return (
    <StyleContext value={s}>
      <NavigationMenuPrimitive.Root
        {...htmlProps}
        className={s.root({ class: className })}
        data-slot="navigation-menu"
      />
    </StyleContext>
  );
}
