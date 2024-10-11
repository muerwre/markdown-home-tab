import { vi } from "vitest";

/** Simulates fake browser storage */
export class FakeStorage {
  constructor(private data: Record<string, unknown>) {}

  sync = {
    get: vi.fn(() => Promise.resolve(this.data)),
    set: vi.fn((input: Record<string, unknown>) => {
      this.data = { ...this.data, ...input };
      return Promise.resolve();
    }),
    remove: vi.fn((keys: string[]) => {
      keys.forEach((key) => {
        delete this.data[key];
      });

      return Promise.resolve();
    }),
  };
}
