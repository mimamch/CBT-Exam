let jawaban;

const radio = document.querySelectorAll(".jawaban-wrapper input");
radio.forEach((e) => {
  e.addEventListener("click", function () {
    jawaban = this.id;
    getAnswer();
  });
});

function getAnswer() {
  localStorage[TOKEN] = JSON.stringify({
    TID: TID,
    UID: UID,
    SN: SN,
    tipe: tipe,
    jawaban: jawaban,
  });
  sendData(JSON.parse(localStorage[TOKEN]));
}
