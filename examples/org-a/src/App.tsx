import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

function App() {
  const [checked, setChecked] = useState(false);
  const [switched, setSwitched] = useState(true);

  return (
    <div className="min-h-screen bg-blue-50 p-8 font-sans">
      <div className="mx-auto max-w-md space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">
            Org A — Blue / Rounded
          </h1>
          <p className="text-sm text-blue-600">
            Components from <code>@registry-a</code>, styled on top of{" "}
            <code>ng-hai/bare-ui</code>
          </p>
        </div>

        <Separator.Root />

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-blue-800">Button</h2>
          <div className="flex gap-3">
            <Button.Root>Primary</Button.Root>
            <Button.Root disabled>Disabled</Button.Root>
          </div>
        </section>

        <Separator.Root />

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-blue-800">Input</h2>
          <Input.Root placeholder="Type something..." />
        </section>

        <Separator.Root />

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-blue-800">Checkbox</h2>
          <label className="flex items-center gap-2 text-sm text-blue-900">
            <Checkbox.Root
              checked={checked}
              onCheckedChange={setChecked}
            >
              <Checkbox.Indicator>✓</Checkbox.Indicator>
            </Checkbox.Root>
            {checked ? "Checked" : "Unchecked"}
          </label>
        </section>

        <Separator.Root />

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-blue-800">Switch</h2>
          <label className="flex items-center gap-2 text-sm text-blue-900">
            <Switch.Root
              checked={switched}
              onCheckedChange={setSwitched}
            >
              <Switch.Thumb />
            </Switch.Root>
            {switched ? "On" : "Off"}
          </label>
        </section>
      </div>
    </div>
  );
}

export default App;
