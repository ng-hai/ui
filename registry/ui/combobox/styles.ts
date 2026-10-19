import { tv } from "@/registry/lib/tv-config";

export const comboboxStyles = tv({
  slots: {
    label: [""],
    trigger: [""],
    input: [""],
    inputGroup: [""],
    chips: [""],
    chip: [""],
    chipRemove: [""],
    clear: [""],
    icon: [""],
    portal: [""],
    backdrop: [""],
    positioner: [""],
    popup: [""],
    arrow: [""],
    list: [""],
    row: [""],
    item: [""],
    itemIndicator: [""],
    group: [""],
    groupLabel: [""],
    separator: [""],
    empty: [""],
    status: [""],
  },
  variants: {
    // Combobox.Trigger renders either an icon button beside Combobox.Input
    // (inside InputGroup) or a select-like field wrapping Combobox.Value
    // when the input lives in the popup. Style each mode here.
    trigger: {
      icon: { trigger: "" },
      field: { trigger: "" },
    },
  },
  defaultVariants: {
    trigger: "icon",
  },
});
