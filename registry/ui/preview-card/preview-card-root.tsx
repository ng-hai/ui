import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { previewCardStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv-config";

type PreviewCardStyles = ReturnType<typeof previewCardStyles>;
type PreviewCardVariantProps = VariantProps<typeof previewCardStyles>;

const { StyleContext, useStyles } = createStyleContext<PreviewCardStyles>("PreviewCard");
const splitProps = createPropSplitter(previewCardStyles);

export { useStyles as usePreviewCardStyles };
export { StyleContext as PreviewCardStyleContext };

interface PreviewCardRootProps<Payload = unknown> extends PreviewCardPrimitive.Root.Props<Payload>, PreviewCardVariantProps {
  styles?: PreviewCardStyles;
}

export function PreviewCardRoot<Payload = unknown>(props: PreviewCardRootProps<Payload>) {
  const [variantProps, { styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? previewCardStyles(variantProps);
  return (
    <StyleContext value={s}>
      <PreviewCardPrimitive.Root {...htmlProps} />
    </StyleContext>
  );
}
