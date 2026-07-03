import type { ComponentProps } from "react";
import { createStyleContext } from "@/registry/bare/lib/create-style-context";
import { createPropSplitter } from "@/registry/bare/lib/split-variant-props";
import { tableStyles } from "./styles";
import type { VariantProps } from "@/registry/bare/lib/tv.config";

type TableStyles = ReturnType<typeof tableStyles>;
type TableVariantProps = VariantProps<typeof tableStyles>;

const { StyleContext, useStyles } = createStyleContext<TableStyles>("Table");
const splitProps = createPropSplitter(tableStyles);

export { useStyles as useTableStyles };

interface TableRootProps extends ComponentProps<"table">, TableVariantProps {
  styles?: TableStyles;
}

export function TableRoot(props: TableRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? tableStyles(variantProps);
  return (
    <StyleContext value={s}>
      <table {...htmlProps} className={s.root({ class: className })} data-slot="table" />
    </StyleContext>
  );
}
