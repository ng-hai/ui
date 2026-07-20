import { createContext, use } from "react";

export function createStyleContext<T>(componentName: string) {
  const Context = createContext<T | null>(null);

  function useStyles(): T {
    const styles = use(Context);
    if (styles === null) {
      throw new Error(`${componentName} parts must be used within <${componentName}.Root>`);
    }
    return styles;
  }

  return { StyleContext: Context, useStyles } as const;
}
