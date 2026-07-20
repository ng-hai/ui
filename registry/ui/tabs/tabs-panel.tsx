import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { useTabsStyles } from "./tabs-root";

interface TabsPanelProps extends TabsPrimitive.Panel.Props {
  className?: string;
}

export function TabsPanel({ className, ...props }: TabsPanelProps) {
  const styles = useTabsStyles();
  return <TabsPrimitive.Panel {...props} className={styles.panel({ class: className })} data-slot="tabs-panel" />;
}
