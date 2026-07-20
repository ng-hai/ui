import { useRender } from "@base-ui/react/use-render";
import { useSidebarStyles } from "./sidebar-root";

interface SidebarItemProps extends useRender.ComponentProps<"a"> {
  /** Marks the current item: sets `aria-current="page"` and `data-active`. */
  active?: boolean;
}

export function SidebarItem({ className, active, render = <a />, ...props }: SidebarItemProps) {
  const styles = useSidebarStyles();
  return useRender({
    render,
    props: {
      ...(active && { "aria-current": "page", "data-active": "" }),
      ...props,
      className: styles.item({ class: className }),
      "data-slot": "sidebar-item",
    },
  });
}
