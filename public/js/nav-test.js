if (SN <= 1) {
  document.getElementById("btn-prev").disabled = true;
}
if (SN >= 20) {
  document.getElementById("btn-next").disabled = true;
}

navBtn.forEach((n) => {
  n.addEventListener("click", (e) => {
    if (n.dataset.button == "next") {
      window.location.search = `?SN=${
        parseInt(SN) + 1
      }&UID=${UID}&TID=${TID}&tipe=${tipe}`;
    }
    if (n.dataset.button == "prev") {
      window.location.search = `?SN=${
        parseInt(SN) - 1
      }&UID=${UID}&TID=${TID}&tipe=${tipe}`;
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

// if (tipe == "listening") {
//   document.getElementById("tipe-test").textContent = tipe.toUpperCase();
// }
