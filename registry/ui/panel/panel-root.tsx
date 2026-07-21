import type { ComponentProps } from "react";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { panelStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type PanelStyles = ReturnType<typeof panelStyles>;
type PanelVariantProps = VariantProps<typeof panelStyles>;

const { StyleContext, useStyles } = createStyleContext<PanelStyles>("Panel");
const splitProps = createPropSplitter(panelStyles);

export { useStyles as usePanelStyles };

interface PanelRootProps extends ComponentProps<"div">, PanelVariantProps {
  styles?: PanelStyles;
}

export function PanelRoot(props: PanelRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? panelStyles(variantProps);
  return (
    <StyleContext value={s}>
      <div {...htmlProps} className={s.root({ class: className })} data-slot="panel" />
    </StyleContext>
  );
}
