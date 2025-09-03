export function speak(text: string) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text-to-speech.");
    }
  }

  let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    const _window = window as typeof window & { webkitAudioContext?: typeof AudioContext };
    audioCtx = new (_window.AudioContext || _window.webkitAudioContext!)();

    // Safari requires resume after a gesture
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }
  return audioCtx;
}

function playBeep(frequency: number, duration: number) {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.value = frequency;

  gain.gain.setValueAtTime(0.2, ctx.currentTime); // start volume
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration); // fade out

  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

export function shortBeep() {
  playBeep(800, 0.2); // 200ms
}

export function longBeep() {
  playBeep(600, 0.6); // 600ms
}