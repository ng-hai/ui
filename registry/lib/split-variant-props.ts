type StylesWithVariantKeys = { variantKeys?: readonly PropertyKey[] };

export function createPropSplitter(styles: StylesWithVariantKeys) {
  const variantKeys = new Set<PropertyKey>(styles.variantKeys ?? []);

  return function split<P extends object>(props: P): [Partial<P>, Partial<P>] {
    const variantProps: Record<string, unknown> = {};
    const rest: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(props)) {
      if (variantKeys.has(key)) variantProps[key] = val;
      else rest[key] = val;
    }
    return [variantProps as Partial<P>, rest as Partial<P>];
  };
}
