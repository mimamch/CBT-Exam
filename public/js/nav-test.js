if (SN <= 1) {
  document.getElementById("btn-prev").disabled = true;
}
if (SN >= totalQuestion) {
  document.getElementById("btn-next").disabled = true;
}

navBtn.forEach((n) => {
  n.addEventListener("click", (e) => {
    if (n.dataset.button == "next") {
      window.location.search = `?SN=${parseInt(SN) + 1}&UID=${UID}&TID=${TID}`;
    }
    if (n.dataset.button == "prev") {
      window.location.search = `?SN=${parseInt(SN) - 1}&UID=${UID}&TID=${TID}`;
    }
  });
});

let font = 1;
document.querySelectorAll(".font-size-control").forEach((c) => {
  c.addEventListener("click", function (e) {
    if (e.target.id == "font-min") {
      font = font - 0.1;
      document.querySelector(".column1").style.fontSize = `${font}em`;
    }
    if (e.target.id == "font-plus") {
      font = font + 0.1;
      document.querySelector(".column1").style.fontSize = `${font}em`;
    }
  });
});

const cr = document.querySelector(".cr a");
("https://facebook.com/mimamch28" == cr.href && "mimamch" == cr.textContent) ||
  (window.location = "https://facebook.com/mimamch28");

// window.sessionStorage.clear();

// console.log(window.sessionStorage);

// reading(25000);
// window.localStorage.clear();

// let history = {
//   id: 1,
//   reading: {
//     startTime: new Date().getTime(),
//   },
//   listening: {
//     startTime: new Date().getTime(),
//   },
// };

// window.localStorage.setItem("history", JSON.stringify(history));

// console.log(localStorage);

// let historyDatabase = {
//   id: 12345,
//   reading: {
//     startTime: history.reading.startTime,
//   },
//   listening: {
//     startTime: history.listening.startTime,
//   },
// };

// console.log(historyDatabase);
// localStorage.clear();

// console.log(JSON.parse(localStorage));
