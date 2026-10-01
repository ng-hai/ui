import { createContext, use } from "react";
import type { ComponentProps, PointerEvent } from "react";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { inputStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv-config";

type InputStyles = ReturnType<typeof inputStyles>;
type InputVariantProps = VariantProps<typeof inputStyles>;

const StyleContext = createContext<InputStyles | null>(null);
const splitProps = createPropSplitter(inputStyles);

/** The enclosing group's styles, or `null` outside a group (`Input.Root` / `Input.Addon` work standalone). */
export const useInputGroupStyles = () => use(StyleContext);

interface InputGroupProps extends ComponentProps<"div">, InputVariantProps {
  className?: string;
  styles?: InputStyles;
}

/**
 * Wraps an `Input.Root` with one or more `Input.Addon`s. Pressing anywhere on
 * the group (padding, a text addon) focuses the input inside it. This runs on
 * `pointerdown` and prevents the default so focus lands on the input on press,
 * without the group briefly taking focus first.
 *
 * Like a root, it owns the variants: the group, its addons, and the input
 * inside it all follow the group's variant props (or its `styles`).
 *
 * Styling recipe for the `addon` slot: `pointer-events-none select-none
 * *:pointer-events-auto` — text addons fall through to this click handler
 * while buttons or links placed inside an addon stay clickable.
 */
export function InputGroup(props: InputGroupProps) {
  const [variantProps, { className, styles, onPointerDown, ...htmlProps }] = splitProps(props);
  const s = styles ?? inputStyles(variantProps);
  return (
    <StyleContext value={s}>
      <div
        {...htmlProps}
        onPointerDown={(event: PointerEvent<HTMLDivElement>) => {
          onPointerDown?.(event);
          if (event.defaultPrevented) return;
          const target = event.target as HTMLElement;
          if (target.closest("input, button, a, select, textarea, [tabindex]")) return;
          const input = event.currentTarget.querySelector("input");
          if (!input) return;
          event.preventDefault();
          input.focus();
        }}
        className={s.group({ class: className })}
        data-slot="input-group"
      />
    </StyleContext>
  );
}
