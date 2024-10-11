import { afterEach, describe, expect, it, vi } from "vitest";
import {
  makePanelChunkKey,
  storePanelInSync,
  storeLayoutInSync,
  layoutKey,
  settingsKey,
} from "~/utils/hydrate";
import { FakeStorage } from "../tests";
import { emptyLayout } from "~/utils/__tests__/hydrate.constants";

describe("hydrate", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("storePanelInSync", () => {
    it("deletes unused keys", async () => {
      const storage = new FakeStorage({
        [makePanelChunkKey("key")(0)]: "oldValue",
        [makePanelChunkKey("key")(1)]: "anotherOldValue",
        [makePanelChunkKey("key")(20)]: "anotherOldValue",
      });

      vi.stubGlobal("browser", { storage });

      await storePanelInSync("key", "value");

      expect(storage.sync.get.mock.calls.length).toBe(1);
      expect(storage.sync.set.mock.calls).toEqual([
        [
          {
            [makePanelChunkKey("key")(0)]: "value",
          },
        ],
      ]);
      expect(storage.sync.remove.mock.calls).toEqual([
        [[makePanelChunkKey("key")(1), makePanelChunkKey("key")(20)]],
      ]);
    });

    it("splits text in chunks", async () => {
      const storage = new FakeStorage({});

      vi.stubGlobal("browser", { storage });

      await storePanelInSync(
        "key",
        "abcdefgh",
        makePanelChunkKey("key")(1).length + 3
      );

      expect(storage.sync.set.mock.calls).toEqual([
        [
          {
            // first item doesn't have _0, so it's longer by 2 symbols
            [makePanelChunkKey("key")(0)]: "abcde",
            [makePanelChunkKey("key")(1)]: "fgh",
          },
        ],
      ]);
    });
  });

  describe("storeLayoutInSync", () => {
    it("stores layout", async () => {
      const storage = new FakeStorage({});

      vi.stubGlobal("browser", { storage });

      await storeLayoutInSync(emptyLayout);

      expect(storage.sync.set.mock.calls).toEqual([
        [{ [layoutKey]: emptyLayout }],
      ]);
    });

    it("deletes unused panels", async () => {
      const goodKey = "good";
      const badKey = "bad";

      const layout = {
        ...emptyLayout,
        panels: {
          [goodKey]: {
            id: goodKey,
          },
        },
      };

      const storage = new FakeStorage({
        [makePanelChunkKey(goodKey)(0)]: "test",
        [makePanelChunkKey(goodKey)(1)]: "test",
        [makePanelChunkKey(badKey)(0)]: "test",
        [makePanelChunkKey(badKey)(1)]: "test",
        [layoutKey]: layout,
        [settingsKey]: {},
      });

      vi.stubGlobal("browser", { storage });

      await storeLayoutInSync(layout);

      expect(storage.sync.remove.mock.calls).toStrictEqual([
        [[makePanelChunkKey(badKey)(0), makePanelChunkKey(badKey)(1)]],
      ]);
    });
  });
});
