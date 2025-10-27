import { textToMorse } from "./morse/text-to-morse.ts";
import { playMorse } from "./morse/tone.ts";

const form = document.getElementById("textForm") as HTMLFormElement | null;
const textInput = document.getElementById(
  "textInput",
) as HTMLInputElement | null;
const morseOutput = document.getElementById(
  "morseOutput",
) as HTMLInputElement | null;
const copyBtn = document.getElementById("copyBtn") as HTMLButtonElement | null;
const msgSpan = document.getElementById("msg") as HTMLSpanElement | null;
const playBtn = document.getElementById("playBtn") as HTMLButtonElement | null;

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

if (form && textInput && morseOutput && copyBtn && msgSpan && playBtn) {
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
  textInput.addEventListener("input", () => {
    updateMorse(textInput, morseOutput, msgSpan, false);
    playBtn.disabled = !Boolean(morseOutput.value);
  });

  playBtn.addEventListener("click", async () => {
    console.log(`play: ${morseOutput.value}`);

    playMorse("... --- ...");
    // playMorse(morseOutput.value);
  });

  // Initial
  // hydrateFromUrl({ textInput, morseOutput, msgSpan });
  playBtn.disabled = !Boolean(morseOutput.value);

  window.addEventListener("popstate", () => {
    hydrateFromUrl({ textInput, morseOutput, msgSpan });
  });
}
