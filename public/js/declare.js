const totalQuestion = document.querySelectorAll(".answered table tr").length;
const navBtn = document.querySelectorAll(".nav-btn");
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let SN = params.SN;
let tipe = params.tipe;
let UID = params.UID;
let TID = params.TID;
if (!SN) SN = 1;
if (!tipe) tipe = "reading";

const TOKEN = tipe + TID + UID + SN;

function reading(time) {
  // Set the date we're counting down to
  var countDownDate = new Date().getTime() + time;

  if (!window.sessionStorage.startTest) {
    window.sessionStorage.startTest = countDownDate;
  }

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = window.sessionStorage.startTest - now;

    // Time calculations for days, hours, minutes and seconds

    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with SN="demo"
    document.querySelector(".reading-box .remairing-time span").textContent =
      minutes + ":" + seconds + "";

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      document.querySelector(".reading-box .remairing-time span").innerHTML =
        "EXPIRED";
      alert("waktu habis");
    }
  }, 1000);
}

function sendData(data) {
  $.ajax({
    type: "POST",
    url: `${window.location.pathname}/send`,
    data: data,
    success: function (res) {
      console.log(res);
      console.log("SUCCESS");
    },
  });
}
