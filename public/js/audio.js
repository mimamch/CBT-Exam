const audio = document.getElementById("audio");
if (audio) {
  let played = 0;
  audio.addEventListener("ended", () => {
    played += 1;
  });
  function play(e) {
    if (played >= 1) {
      e.disabled = true;
    }
    audio.play();
  }
}
