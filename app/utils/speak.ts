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
      const _window = window as typeof window & {
        webkitAudioContext?: typeof AudioContext;
      };
      audioCtx = new (_window.AudioContext || _window.webkitAudioContext!)();
    }
    return audioCtx;
  }
  
  export function shortBeep() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
  
    osc.type = "sine";
    osc.frequency.value = 800; // Hz
    gain.gain.value = 0.2; // volume
  
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15); // 150ms beep
  }
  
  export function longBeep() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
  
    osc.type = "sine";
    osc.frequency.value = 600;
    gain.gain.value = 0.2;
  
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5); // 500ms beep
  }