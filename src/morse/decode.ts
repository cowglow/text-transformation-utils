import { MORSE_CODE_DICTIONARY } from "./dictonary.ts";

const MORSE_TO_CHAR: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_CODE_DICTIONARY).map(([char, morse]) => [morse, char]),
);

export default function decodeFromMorse(input: string) {
  const morseCharacters = input.split(" ");
  const characters = morseCharacters.map(
    (symbol) => MORSE_TO_CHAR[symbol] ?? symbol,
  );
  return characters.join("");
}
