export function speak(text: string) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text-to-speech.");
    }
  }

export function longBeep() {
    const beep = new Audio('beep-06.mp3'); // you need a beep.mp3 file
    beep.play();
}

export function shortBeep() {
    const beep = new Audio("beep-07a.mp3"); // you need a beep.mp3 file
    beep.play();
    }
