const totalQuestion = document.querySelectorAll(".answered table tr").length;
const navBtn = document.querySelectorAll(".nav-btn");
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let SN = params.SN || 1;
let tipe = params.tipe || "reading";
let UID = params.UID || 123;
let TID = params.TID || 1;
let MID = window.location.pathname.split("/").pop();

const TOKEN = `${tipe}.${TID}.${UID}.${SN}.${MID}`;

function listening(time) {
  // Set the date we're counting down to
  var countDownDate = parseInt(window.localStorage[TID]) + time;

  // Update the count down every 1 second
  var y = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = parseInt(countDownDate) - now;

    // Time calculations for days, hours, minutes and seconds

    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with SN="demo"

    document.querySelector(".listening-box .remairing-time span").textContent =
      minutes + ":" + seconds + "";

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(y);
      if (tipe == "listening") {
        document.querySelector(
          ".reading-box .remairing-time span"
        ).textContent = "COMPLETED";
        document.querySelector(
          ".listening-box .remairing-time span"
        ).innerHTML = "COMPLETED";
        // const urlParams = new URLSearchParams(window.location.search);
        // urlParams.set("tipe", "listening");
        // urlParams.set("SN", "1");
        // window.location.search = urlParams;
        sendData(jawabanTerisi);
        setTimeout(() => {
          window.location = `/client/review/${TID}`;
        }, 2000);
      }
    }
  }, 1000);
}

function reading(time) {
  // Set the date we're counting down to
  var countDownDate = new Date().getTime() + time;

  if (!window.localStorage[TID]) {
    window.localStorage[TID] = countDownDate;
  }

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = parseInt(window.localStorage[TID]) - now;

    // Time calculations for days, hours, minutes and seconds

    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with SN="demo"
    if (tipe == "reading") {
      document.querySelector(".reading-box .remairing-time span").textContent =
        minutes + ":" + seconds + "";
    } else {
      document.querySelector(".reading-box .remairing-time span").textContent =
        "00:00";
    }

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      if (tipe == "reading") {
        document.querySelector(
          ".reading-box .remairing-time span"
        ).textContent = "00:00";
        document.querySelector(".reading-box .remairing-time span").innerHTML =
          "EXPIRED";
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("tipe", "listening");
        urlParams.set("SN", "1");
        window.location.search = urlParams;
      }
    }
  }, 1000);
}

if (tipe == "reading") reading(60 * 25);
if (tipe == "listening") listening(60 * 25);

function sendData(data) {
  // console.log(data);
  $.ajax({
    type: "POST",
    url: `${window.location.pathname}/send`,
    data: { startTime: localStorage[TID], data: JSON.stringify(data) },
  })
    .done((res) => console.log(res))
    .fail((err) => console.log(err.responseJSON));
}

if (tipe == "listening" && SN == 20) {
  document.getElementById("backToClient").style.display = "block";
}
