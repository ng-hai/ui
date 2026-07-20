import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { useTabsStyles } from "./tabs-root";

interface TabsTabProps extends TabsPrimitive.Tab.Props {
  className?: string;
}

export function TabsTab({ className, ...props }: TabsTabProps) {
  const styles = useTabsStyles();
  return <TabsPrimitive.Tab {...props} className={styles.tab({ class: className })} data-slot="tabs-tab" />;
}
