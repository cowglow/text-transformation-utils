const DOT = 1; // dot unit (in relative time units)
const DASH = 3; // dash = 3 dots
const GAP = 1; // gap between parts of same letter
const LETTER_GAP = 3; // gap between letters
const WORD_GAP = 7; // gap between words

// Create audio context
// const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
export const audioCtx = new window.AudioContext();
console.log(audioCtx);
// function playTone(duration: number, frequency = 600) {
//   const osc = audioCtx.createOscillator();
//   const gain = audioCtx.createGain();
//   osc.frequency.value = frequency;
//   osc.connect(gain);
//   gain.connect(audioCtx.destination);
//   osc.start();
//   osc.stop(audioCtx.currentTime + duration);
// }

export function playMorse(morse: string) {
  let time = audioCtx.currentTime;
  const unit = 0.1; // 1 unit = 100ms

  for (let i = 0; i < morse.length; i++) {
    const symbol = morse[i];
    let freq = 600; // base tone

    if (symbol === ".") {
      playBeep(time, DOT, freq);
      time += unit * (DOT + GAP);
    } else if (symbol === "-") {
      playBeep(time, DASH, freq);
      time += unit * (DASH + GAP);
    } else if (symbol === " ") {
      time += unit * LETTER_GAP;
    } else if (symbol === "/") {
      time += unit * WORD_GAP;
    } else if (symbol === "!") {
      freq = 450; // lower pitch for exclamation
      playBeep(time, DASH, freq);
      time += unit * (DASH + GAP);
    } else if (symbol === "?") {
      freq = 900; // higher pitch for question
      playBeep(time, DOT, freq);
      time += unit * (DOT + GAP);
    }
  }

  function playBeep(
    startTime: number,
    durationUnits: number,
    frequency: number,
  ) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.2, startTime);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(startTime);
    osc.stop(startTime + durationUnits * unit);
  }
}

// document.getElementById("play").addEventListener("click", () => {
//   const morse = document.getElementById("input").value.trim();
//   playMorse(morse);
// });
