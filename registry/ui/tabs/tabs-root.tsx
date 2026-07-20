import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { tabsStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type TabsStyles = ReturnType<typeof tabsStyles>;
type TabsVariantProps = VariantProps<typeof tabsStyles>;

const { StyleContext, useStyles } = createStyleContext<TabsStyles>("Tabs");
const splitProps = createPropSplitter(tabsStyles);

export { useStyles as useTabsStyles };

interface TabsRootProps extends TabsPrimitive.Root.Props, TabsVariantProps {
  className?: string;
  styles?: TabsStyles;
}

export function TabsRoot(props: TabsRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? tabsStyles(variantProps);
  return (
    <StyleContext value={s}>
      <TabsPrimitive.Root {...htmlProps} className={s.root({ class: className })} data-slot="tabs" />
    </StyleContext>
  );
}
