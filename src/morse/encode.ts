import { MORSE_CODE_DICTIONARY } from "./dictonary.ts";

export default function encodeToMorse(input: string) {
  const lowerCaseInput = input.toLowerCase();
  const characters = lowerCaseInput.split("");

  return characters.reduce((acc, char, idx) => {
    const morse = MORSE_CODE_DICTIONARY[char] ?? char;
    const prevChar = characters[idx - 1];
    const prevIsMorse = prevChar ? MORSE_CODE_DICTIONARY[prevChar] : false;
    const currIsMorse = Boolean(MORSE_CODE_DICTIONARY[char]);

    // Add a space only between Morse symbols
    if (acc.length === 0) return morse;
    return acc + (prevIsMorse && currIsMorse ? " " : "") + morse;
  }, "");
}
