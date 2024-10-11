import { it, expect, describe } from "vitest";
import {
  splitTextInChunks,
  joinTextFromChunks,
  makeChunks,
} from "~/utils/chunks";

describe("chunks", () => {
  describe("splitTextInChunks", () => {
    const getKey = () => "a"; // key of length 1

    it("splits text in chunks", () => {
      expect(splitTextInChunks("0123456789", 4, getKey)).toEqual([
        "012",
        "345",
        "678",
        "9",
      ]);

      expect(splitTextInChunks("", 4, getKey)).toEqual([]);
      expect(splitTextInChunks("123", 4, getKey)).toEqual(["123"]);
    });
  });

  describe("joinTextFromChunks", () => {
    const getKey = (i: number) => (i === 0 ? `test` : `test_${i}`);

    it("collects chunks", () => {
      expect(
        joinTextFromChunks(getKey, {
          test: "abc",
          test_1: "def",
          test_2: "ghi",
        })
      ).toBe("abcdefghi");
    });

    it("works with undefined keys", () => {
      expect(
        joinTextFromChunks(getKey, {
          z: "abc",
          z_1: "def",
          z_2: "ghi",
        })
      ).toBeUndefined();
    });

    it("works with empty strings keys", () => {
      expect(
        joinTextFromChunks(getKey, {
          test: "",
          test_1: "def",
          test_2: "ghi",
        })
      ).toBe("defghi");
    });
  });

  describe("makeChunks", () => {
    const getKey = (i: number) => `test_${i}`;
    const chunkSize = 3;

    it("makes chunks", () => {
      expect(
        makeChunks("abcdefghij", getKey, getKey(0).length + chunkSize)
      ).toEqual({
        test_0: "abc",
        test_1: "def",
        test_2: "ghi",
        test_3: "j",
      });
    });
  });
});
