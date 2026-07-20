import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { useTabsStyles } from "./tabs-root";

interface TabsListProps extends TabsPrimitive.List.Props {
  className?: string;
}

export function TabsList({ className, ...props }: TabsListProps) {
  const styles = useTabsStyles();
  return <TabsPrimitive.List {...props} className={styles.list({ class: className })} data-slot="tabs-list" />;
}
