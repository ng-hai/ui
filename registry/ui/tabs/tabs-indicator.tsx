import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { useTabsStyles } from "./tabs-root";

interface TabsIndicatorProps extends TabsPrimitive.Indicator.Props {
  className?: string;
}

export function TabsIndicator({ className, ...props }: TabsIndicatorProps) {
  const styles = useTabsStyles();
  return (
    <TabsPrimitive.Indicator {...props} className={styles.indicator({ class: className })} data-slot="tabs-indicator" />
  );
}
