import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { avatarStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type AvatarStyles = ReturnType<typeof avatarStyles>;
type AvatarVariantProps = VariantProps<typeof avatarStyles>;

const { StyleContext, useStyles } = createStyleContext<AvatarStyles>("Avatar");
const splitProps = createPropSplitter(avatarStyles);

export { useStyles as useAvatarStyles };

interface AvatarRootProps extends AvatarPrimitive.Root.Props, AvatarVariantProps {
  className?: string;
  styles?: AvatarStyles;
}

export function AvatarRoot(props: AvatarRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? avatarStyles(variantProps);
  return (
    <StyleContext value={s}>
      <AvatarPrimitive.Root {...htmlProps} className={s.root({ class: className })} data-slot="avatar" />
    </StyleContext>
  );
}
