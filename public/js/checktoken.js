if (localStorage[TOKEN]) {
  const filledToken = localStorage[TOKEN];
  const filledParse = JSON.parse(filledToken);

  if (filledParse.jawaban) {
    const jawaban = filledParse.jawaban;
    document.getElementById(jawaban).checked = true;
  }
}
