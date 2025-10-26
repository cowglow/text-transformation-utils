import decodeFromMorse from "./decode.ts";

export function morseToText(input: string) {
  return decodeFromMorse(input);
}
