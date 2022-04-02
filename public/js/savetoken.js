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
    MID: MID,
  });
  // sendData(JSON.parse(localStorage[TOKEN]));
}
let jawabanTerisi = [];
Object.entries(localStorage).map(([key, value]) => {
  if (key.split(".")[0] == "reading" || key.split(".")[0] == "listening")
    jawabanTerisi.push({ [key]: JSON.parse(value).jawaban });
});

let tableFilled = document.querySelectorAll(".answered table tbody tr td");

jawabanTerisi.forEach((e) => {
  Object.entries(e).map(([key, value]) => {
    let [tipee, testId, userId, soalNumber, mid] = key.split(".");

    if (tipee == tipe) {
      tableFilled[soalNumber - 1].textContent = "COMPLETE";
    }
  });
});
// console.log(jawabanTerisi);
