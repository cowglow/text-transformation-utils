import { textToMorse } from "./morse/text-to-morse.ts";

const defaultMessage =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const form = document.getElementById("textForm") as HTMLFormElement | null;
const textInput = document.getElementById(
  "textInput",
) as HTMLInputElement | null;
const morseOutput = document.getElementById(
  "morseOutput",
) as HTMLInputElement | null;
const copyBtn = document.getElementById("copyBtn") as HTMLButtonElement | null;
const msgSpan = document.getElementById("msg") as HTMLSpanElement | null;

function updateMorse(
  textInput: HTMLInputElement,
  morseOutput: HTMLInputElement,
  msg: HTMLElement,
  fromInput = true,
) {
  const text = (textInput.value || "").toString();
  // console.log({ text });
  try {
    morseOutput.value = textToMorse(text);
  } catch {
    morseOutput.value = "[conversion error]";
  }
  if (fromInput) {
    // reflect in URL without reloading
    const params = new URLSearchParams(location.search);
    if (text) params.set("t", text);
    else params.delete("t");
    history.replaceState(
      null,
      "",
      location.pathname + (params.toString() ? "?" + params.toString() : ""),
    );
  }
  msg.textContent = "";
}

function hydrateFromUrl({
  textInput,
  morseOutput,
  msgSpan,
}: {
  textInput: HTMLInputElement;
  morseOutput: HTMLInputElement;
  msgSpan: HTMLElement;
}) {
  const params = new URLSearchParams(location.search);
  textInput.value = params.get("t") ?? "";
  updateMorse(textInput, morseOutput, msgSpan, false);
}

if (form && textInput && morseOutput && copyBtn && msgSpan) {
  // form submit explicitly updates URL and keeps focus
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    updateMorse(textInput, morseOutput, msgSpan, true);
    setTimeout(() => (msgSpan.textContent = ""), 1200);
  });

  // copy button
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(morseOutput.value);
      msgSpan.textContent = "Copied!";
      setTimeout(() => (msgSpan.textContent = ""), 1200);
    } catch {
      msgSpan.textContent = "Copy failed";
    }
  });

  // live update input -> morse (does not push history on every keystroke, optionally pass false to avoid URL change)
  textInput.addEventListener("input", () =>
    updateMorse(textInput, morseOutput, msgSpan, false),
  );

  hydrateFromUrl({ textInput, morseOutput, msgSpan });
  textInput.value = defaultMessage;

  window.addEventListener("popstate", () => {
    hydrateFromUrl({ textInput, morseOutput, msgSpan });
  });
}
