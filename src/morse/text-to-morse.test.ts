import { describe, expect, test } from "vitest";
import { textToMorse } from "./text-to-morse.ts";

describe(textToMorse, () => {
  test("simple characters transformation", () => {
    const result = textToMorse("sos");
    expect(result).toBe("... --- ...");
  });

  test("can handle uppercase characters input", () => {
    const result = textToMorse("HELLO");
    expect(result).toBe(".... . .-.. .-.. ---");
  });

  test("keeps unknown characters as-is", () => {
    const result = textToMorse("Hi!");
    expect(result).toBe(".... ..!");
  });
});
