import { describe, expect, test } from "vitest";
import { morseToText } from "./morse-to-text.ts";

describe(morseToText, () => {
  test("decodes simple morse code sequences", () => {
    expect(morseToText("... --- ...")).toBe("sos");
    expect(morseToText(".... . .-.. .-.. ---")).toBe("hello");
  });
  test("keeps unknown symbols as-is", () => {
    // expect(morseToText(".... ..!")).toBe("hi!");
    expect(morseToText(".-.-")).toBe(".-.-");
  });
  test("decodes numbers correctly", () => {
    expect(morseToText(".---- ..--- ...--")).toBe("123");
  });
  test("decodes mixed letters, numbers and unknown symbols", () => {
    expect(morseToText(".... .. .---- !")).toBe("hi1!");
  });
});
