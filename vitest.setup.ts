import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// `globals` is off, so Testing Library cannot register its own afterEach.
// Unmount every tree ourselves; otherwise the last render in a file (often
// an open Dialog/Drawer popup) outlives the jsdom environment and its
// scheduled React work throws "window is not defined".
afterEach(cleanup);
